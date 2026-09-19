import React, { useState, useEffect } from "react";
import { 
  X, 
  CalendarCheck, 
  Watch, 
  Zap, 
  Brain, 
  Clock, 
  CheckCircle2, 
  Play, 
  Volume2, 
  Sparkles, 
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { soundManager, TeacherVoiceProfile } from "../utils/audio";
import { WristbandSimulator } from "./WristbandSimulator";

export type SolutionType = "schedule" | "watch" | "quiz" | "ai";

interface SolutionDetailModalProps {
  isOpen: boolean;
  activeSolution: SolutionType | null;
  onClose: () => void;
  onSelectSolution: (sol: SolutionType) => void;
  alertSubject: string;
  alertTime: string;
  isWatchVibrating: boolean;
  onTriggerWatchBuzz: () => void;
  onStopWatchBuzz: () => void;
  onSetWatchAlert: (time: string, subject: string) => void;
  testCountdown: number | null;
  onStartTestCountdown: (seconds: number) => void;
  isAutoAlarmEnabled: boolean;
  onNavigateToTab: (tabId: string) => void;
}

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({
  isOpen,
  activeSolution,
  onClose,
  onSelectSolution,
  alertSubject,
  alertTime,
  isWatchVibrating,
  onTriggerWatchBuzz,
  onStopWatchBuzz,
  onSetWatchAlert,
  testCountdown,
  onStartTestCountdown,
  isAutoAlarmEnabled,
  onNavigateToTab,
}) => {
  if (!isOpen || !activeSolution) return null;

  // Local state for interactive 20s quiz demo
  const [demoAnswerSelected, setDemoAnswerSelected] = useState<number | null>(null);
  const [demoTimer, setDemoTimer] = useState<number>(20);
  const [demoTimerActive, setDemoTimerActive] = useState<boolean>(false);
  const [isSpeakingVoice, setIsSpeakingVoice] = useState<boolean>(false);

  // Local state for schedule time input
  const [scheduleTimeInput, setScheduleTimeInput] = useState<string>(alertTime);

  useEffect(() => {
    setScheduleTimeInput(alertTime);
  }, [alertTime]);

  // Demo 20s quiz timer tick
  useEffect(() => {
    let interval: any = null;
    if (demoTimerActive && demoTimer > 0) {
      interval = setInterval(() => {
        setDemoTimer((prev) => prev - 1);
      }, 1000);
    } else if (demoTimer === 0 && demoTimerActive) {
      setDemoTimerActive(false);
      soundManager.playFeedback(false);
    }
    return () => clearInterval(interval);
  }, [demoTimerActive, demoTimer]);

  const handleStartDemoQuiz = () => {
    soundManager.playClick();
    setDemoTimer(20);
    setDemoAnswerSelected(null);
    setDemoTimerActive(true);
  };

  const handleSelectDemoAnswer = (idx: number) => {
    if (demoAnswerSelected !== null) return;
    setDemoAnswerSelected(idx);
    setDemoTimerActive(false);
    const isCorrect = idx === 1; // Option B: 3/4
    soundManager.playFeedback(isCorrect);
  };

  const handleVoiceDemo = async () => {
    soundManager.playClick();
    setIsSpeakingVoice(true);
    const demoScript = "Chào em! Quy tắc cộng hai phân số cùng mẫu số rất đơn giản: ta cộng các tử số với nhau và giữ nguyên mẫu số. Nhớ đừng cộng cả hai mẫu số nhé!";
    await soundManager.speakText(demoScript);
    setIsSpeakingVoice(false);
  };

  const solutionsList = [
    {
      id: "schedule" as SolutionType,
      title: "Lên lịch ôn tập tự động",
      badge: "Giải pháp 01",
      icon: CalendarCheck,
      color: "from-indigo-600 to-blue-600",
      textColor: "text-indigo-600",
    },
    {
      id: "watch" as SolutionType,
      title: "Vòng tay rung thông minh",
      badge: "Giải pháp 02",
      icon: Watch,
      color: "from-cyan-600 to-teal-600",
      textColor: "text-cyan-700",
    },
    {
      id: "quiz" as SolutionType,
      title: "Kiểm tra phản xạ 20s",
      badge: "Giải pháp 03",
      icon: Zap,
      color: "from-purple-600 to-pink-600",
      textColor: "text-purple-600",
    },
    {
      id: "ai" as SolutionType,
      title: "AI tự phân tích lỗi sai",
      badge: "Giải pháp 04",
      icon: Brain,
      color: "from-emerald-600 to-green-600",
      textColor: "text-emerald-700",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-scaleUp">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
                Chi tiết giải pháp StudySync AI
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Trải nghiệm & Cài đặt giải pháp
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="cursor-pointer text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PILL SWITCHER TABS FOR 4 SOLUTIONS */}
        <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {solutionsList.map((sol) => {
            const Icon = sol.icon;
            const isSelected = activeSolution === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectSolution(sol.id);
                }}
                className={`cursor-pointer whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-sm border border-slate-300"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? sol.textColor : "text-slate-400"}`} />
                <span>{sol.title}</span>
              </button>
            );
          })}
        </div>

        {/* MODAL CONTENT BODY (SCROLLABLE) */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          
          {/* SOLUTION 1: SCHEDULE */}
          {activeSolution === "schedule" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black mb-2 border border-indigo-200">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Giải pháp 01</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Lên lịch ôn tập tự động theo ngày thi & Đồng bộ vòng tay
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Học sinh nhập ngày kiểm tra và môn học, AI tự động chia nhỏ kiến thức thành từng ngày. Khi đến giờ học, vòng tay sẽ <strong>TỰ ĐỘNG RUNG</strong> mà không cần bạn phải bấm gì cả!
                </p>
              </div>

              {/* Auto Alarm Time Setup Card */}
              <div className="bg-gradient-to-r from-indigo-50 via-white to-blue-50 rounded-2xl p-5 border border-indigo-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Cài đặt giờ vòng tay tự rung:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold text-emerald-700">
                      Tự động canh giờ: Đúng {alertTime} sẽ TỰ RUNG
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="time"
                    value={scheduleTimeInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setScheduleTimeInput(val);
                      onSetWatchAlert(val, alertSubject);
                    }}
                    className="bg-white text-slate-900 font-mono font-black text-base px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-500 shadow-xs cursor-pointer"
                  />

                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-400 font-medium">Chọn nhanh:</span>
                    {["18:30", "19:00", "19:30", "20:00"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setScheduleTimeInput(t);
                          onSetWatchAlert(t, alertSubject);
                        }}
                        className={`cursor-pointer px-2.5 py-1 rounded-lg font-bold transition border ${
                          alertTime === t
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Countdown test */}
                  <button
                    type="button"
                    onClick={() => onStartTestCountdown(10)}
                    disabled={testCountdown !== null && testCountdown > 0}
                    className="cursor-pointer text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border border-amber-300 shadow-xs active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                    <span>{testCountdown !== null ? `Đếm: ${testCountdown}s...` : "⚡ Thử tự rung sau 10s"}</span>
                  </button>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Cơ chế tự động:</strong> Bạn không cần bấm nút rung! Khi đồng hồ hệ thống điểm đúng <strong>{alertTime}</strong>, vòng tay StudySync sẽ tự động rung nhịp haptic vào cổ tay.
                  </span>
                </div>
              </div>

              {/* Sample 5-day AI schedule preview */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                  Lộ trình mẫu 5 ngày ôn môn {alertSubject}:
                </h4>
                {[
                  { day: "Ngày 1", title: "Khởi động & Phân số cơ bản", time: alertTime, status: "Đang canh giờ tự rung" },
                  { day: "Ngày 2", title: "Quy đồng mẫu số & Phép cộng phân số", time: "19:15", status: "Chưa tới giờ" },
                  { day: "Ngày 3", title: "Phép nhân & Phép chia phân số", time: "19:00", status: "Chưa tới giờ" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        {item.day}
                      </span>
                      <span className="font-bold text-slate-800">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigate to full schedule */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToTab("practice");
                  }}
                  className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <span>Mở khu vực Lập lịch ôn đầy đủ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SOLUTION 2: WATCH SIMULATOR */}
          {activeSolution === "watch" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-black mb-2 border border-cyan-200">
                  <Watch className="w-3.5 h-3.5" />
                  <span>Giải pháp 02</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Vòng tay thông minh StudySync — Rung nhẹ êm ái, Tự động đúng giờ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Thiết bị đeo cổ tay chuyên dụng cho học sinh. Không cài game, không phát chuông xao nhãng. Khi cài đặt giờ, vòng tay sẽ <strong>TỰ ĐỘNG RUNG</strong> đúng giờ mà không cần học sinh phải bấm trước.
                </p>
              </div>

              {/* Live Wristband Component */}
              <div className="flex justify-center py-2">
                <WristbandSimulator
                  isVibrating={isWatchVibrating}
                  onTriggerVibration={onTriggerWatchBuzz}
                  onStopVibration={onStopWatchBuzz}
                  onStartStudy={() => {
                    onClose();
                    onNavigateToTab("practice");
                  }}
                  currentAlertSubject={alertSubject}
                  alertTime={alertTime}
                  onSetAlertTime={(time) => onSetWatchAlert(time, alertSubject)}
                  testCountdown={testCountdown}
                  onStartTestCountdown={onStartTestCountdown}
                  isAutoAlarmEnabled={isAutoAlarmEnabled}
                />
              </div>
            </div>
          )}

          {/* SOLUTION 3: 20-SECOND QUIZ */}
          {activeSolution === "quiz" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-black mb-2 border border-purple-200">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Giải pháp 03</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Kiểm tra phản xạ 20 giây/câu chuẩn SGK Lớp 6
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Chỉ 3–5 câu hỏi ngắn gọn mỗi ngày. Bộ đếm ngược 20 giây giúp học sinh rèn luyện tốc độ xử lý nhanh, không trì hoãn và không tạo áp lực học tập nặng nề.
                </p>
              </div>

              {/* Interactive Mini Quiz Simulation */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4">
                {/* Header of quiz card */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-purple-700 uppercase bg-purple-100/80 px-2.5 py-1 rounded-lg">
                    Câu hỏi mẫu: Toán 6 · Phân số
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">Thời gian:</span>
                    <span className={`text-sm font-mono font-black px-2.5 py-0.5 rounded-lg border ${
                      demoTimer <= 5 ? "bg-rose-100 text-rose-700 border-rose-300 animate-pulse" : "bg-white text-slate-800 border-slate-200"
                    }`}>
                      ⏱️ {demoTimer}s
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      demoTimer <= 5 ? "bg-rose-500" : "bg-gradient-to-r from-purple-500 to-indigo-600"
                    }`}
                    style={{ width: `${(demoTimer / 20) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h4 className="text-base sm:text-lg font-black text-slate-900 pt-2">
                  Tính kết quả của phép tính: <span className="text-indigo-600 font-mono">1/4 + 2/4 = ?</span>
                </h4>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    { label: "A", text: "3/8 (Cộng cả tử và mẫu)" },
                    { label: "B", text: "3/4 (Cộng tử, giữ nguyên mẫu)", correct: true },
                    { label: "C", text: "2/4" },
                    { label: "D", text: "1/2" },
                  ].map((opt, idx) => {
                    const isPicked = demoAnswerSelected === idx;
                    const isRight = opt.correct;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectDemoAnswer(idx)}
                        disabled={demoAnswerSelected !== null}
                        className={`cursor-pointer p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition flex items-center gap-3 ${
                          demoAnswerSelected !== null
                            ? isRight
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs"
                              : isPicked
                              ? "bg-rose-50 border-rose-300 text-rose-900"
                              : "bg-white border-slate-200 opacity-60"
                            : "bg-white hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-purple-300"
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          isPicked && isRight
                            ? "bg-emerald-600 text-white"
                            : isPicked && !isRight
                            ? "bg-rose-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {opt.label}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback result if answered */}
                {demoAnswerSelected !== null && (
                  <div className={`p-4 rounded-2xl text-xs font-semibold animate-fadeIn ${
                    demoAnswerSelected === 1
                      ? "bg-emerald-50 text-emerald-950 border border-emerald-300"
                      : "bg-amber-50 text-amber-950 border border-amber-300"
                  }`}>
                    {demoAnswerSelected === 1 ? (
                      <p className="flex items-center gap-2 font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Chính xác tuyệt đối! Bạn nắm vững quy tắc cộng phân số cùng mẫu!</span>
                      </p>
                    ) : (
                      <p>
                        <strong>Chưa chính xác!</strong> Lỗi phổ biến là cộng cả hai mẫu số lại với nhau. Đáp án đúng là <strong>3/4</strong> vì phải giữ nguyên mẫu số.
                      </p>
                    )}
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleStartDemoQuiz}
                    className="cursor-pointer text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại câu này (Đếm lại 20s)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToTab("practice");
                    }}
                    className="cursor-pointer text-xs font-black text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-500/20"
                  >
                    <span>Vào làm bài thi thật trên điện thoại</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SOLUTION 4: AI ERROR ANALYSIS */}
          {activeSolution === "ai" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black mb-2 border border-emerald-200">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Giải pháp 04</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  AI Tự động phân tích nguyên nhân & chữa lỗi sai ngay tức thì
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Khi học sinh làm sai, AI không chỉ đưa ra đáp án đúng mà còn "bắt mạch" chính xác lỗi sai tư duy, đưa ra quy tắc SGK và đọc to lời giảng với giọng ấm áp, chậm rãi.
                </p>
              </div>

              {/* 4 Diagnostic Pillars Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 uppercase">
                    <span>1. Bắt mạch nguyên nhân</span>
                  </div>
                  <h5 className="font-extrabold text-sm text-rose-950">
                    Nhầm lẫn quy tắc cộng tử và mẫu
                  </h5>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Học sinh thường có thói quen trực giác cộng cả tử số và mẫu số (1+2=3, 4+4=8 ra 3/8). Đây là lỗi tư duy phổ biến nhất ở lớp 6.
                  </p>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase">
                    <span>2. Lời giải chuẩn SGK</span>
                  </div>
                  <h5 className="font-extrabold text-sm text-emerald-950">
                    1/4 + 2/4 = (1+2)/4 = 3/4
                  </h5>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Muốn cộng hai phân số có cùng mẫu số, ta cộng các tử số với nhau và giữ nguyên mẫu số.
                  </p>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 uppercase">
                    <span>3. Lập luận trực quan</span>
                  </div>
                  <h5 className="font-extrabold text-sm text-blue-950">
                    Ví dụ chiếc bánh 4 phần
                  </h5>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Có một chiếc bánh chia làm 4 phần bằng nhau. Bạn lấy 1 miếng (1/4), rồi lấy thêm 2 miếng (2/4), tổng cộng bạn có 3 miếng trên tổng 4 miếng (3/4).
                  </p>
                </div>

                <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-purple-700 uppercase">
                    <span>4. Quy tắc cốt lõi ghi nhớ</span>
                  </div>
                  <h5 className="font-extrabold text-sm text-purple-950">
                    "Cộng tử số — Giữ nguyên mẫu số"
                  </h5>
                  <p className="text-xs text-purple-800 leading-relaxed">
                    Khắc sâu câu thần chú này vào sổ tay lỗi sai cá nhân, tự động đưa câu hỏi vào danh sách ôn lại sau 24 giờ.
                  </p>
                </div>
              </div>

              {/* Voice Demo button */}
              <div className="bg-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">
                      Nghe giọng đọc AI giảng giải (Chậm rãi, dễ hiểu)
                    </h5>
                    <p className="text-xs text-slate-500">
                      Tự động chọn giọng đọc Thầy giáo hoặc Cô giáo ấm áp, câu văn ngắn gọn cho học sinh Lớp 6.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleVoiceDemo}
                  disabled={isSpeakingVoice}
                  className="cursor-pointer shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeakingVoice ? "animate-ping" : ""}`} />
                  <span>{isSpeakingVoice ? "Đang nói..." : "▶️ Nghe thử giọng AI"}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
            StudySync AI · Vòng tay haptic kết hợp Trắc nghiệm phản xạ 20s
          </span>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition"
          >
            Đóng cửa sổ
          </button>
        </div>

      </div>
    </div>
  );
};
