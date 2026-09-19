import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Watch, 
  Send, 
  BookOpen, 
  ChevronRight,
  Zap
} from "lucide-react";
import { ScheduleDay } from "../types";
import { soundManager } from "../utils/audio";

interface ScheduleSectionProps {
  onSetWatchAlert: (time: string, subject: string) => void;
  alertTime?: string;
  isAutoAlarmEnabled?: boolean;
  testCountdown?: number | null;
  onStartTestCountdown?: (seconds: number) => void;
  isWatchVibrating?: boolean;
  onStopWatchBuzz?: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onSetWatchAlert,
  alertTime = "19:00",
  isAutoAlarmEnabled = true,
  testCountdown = null,
  onStartTestCountdown,
  isWatchVibrating = false,
  onStopWatchBuzz,
}) => {
  const [subject, setSubject] = useState("Toán 6");
  const [daysLeft, setDaysLeft] = useState(5);
  const [examDate, setExamDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split("T")[0];
  });
  const [minutesPerDay, setMinutesPerDay] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [allSyncedToast, setAllSyncedToast] = useState(false);

  const subjectsQuickPick = [
    "Toán 6",
    "Ngữ văn 6",
    "Tiếng Anh 6",
    "Khoa học tự nhiên 6",
  ];

  // When exam date changes, calculate days left
  const handleDateChange = (dateVal: string) => {
    setExamDate(dateVal);
    if (!dateVal) return;
    const target = new Date(dateVal);
    const now = new Date();
    // difference in days
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    setDaysLeft(diffDays);
  };

  const [schedule, setSchedule] = useState<ScheduleDay[]>([
    {
      day: 1,
      dayLabel: "Ngày 1 (Khởi động)",
      focus: "Định nghĩa & Phân số cơ bản",
      wristbandAlertTime: "19:00",
      method: "Làm 3 câu chẩn đoán trên điện thoại + ghi nhớ quy tắc",
      duration: "20 phút",
      completed: true,
    },
    {
      day: 2,
      dayLabel: "Ngày 2 (Khắc phục lỗi)",
      focus: "Quy đồng mẫu số & Phép cộng phân số",
      wristbandAlertTime: "19:15",
      method: "Vòng tay rung nhắc lúc 19:15, làm 3 bài bẫy sai lầm",
      duration: "20 phút",
      completed: false,
    },
    {
      day: 3,
      dayLabel: "Ngày 3 (Luyện tốc độ)",
      focus: "Phép nhân & Chia phân số",
      wristbandAlertTime: "19:00",
      method: "Thử thách 5 câu tính nhẩm không dùng giấy nháp",
      duration: "20 phút",
      completed: false,
    },
    {
      day: 4,
      dayLabel: "Ngày 4 (Mô phỏng thi)",
      focus: "Đề tổng hợp mini",
      wristbandAlertTime: "20:00",
      method: "Làm bài kiểm tra ngắn 15 phút, AI phát hiện kiến thức sót",
      duration: "20 phút",
      completed: false,
    },
    {
      day: 5,
      dayLabel: "Ngày 5 (Tổng duyệt)",
      focus: "Xem lại sổ tay lỗi sai & nghỉ ngơi sớm",
      wristbandAlertTime: "18:30",
      method: "Xem lại 3 lưu ý quan trọng, chuẩn bị tâm lý thoải mái",
      duration: "15 phút",
      completed: false,
    },
  ]);

  const handleGenerateSchedule = async () => {
    soundManager.playClick();
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          examDaysLeft: daysLeft,
          dailyMinutes: minutesPerDay,
        }),
      });
      const data = await res.json();
      if (data.schedule && data.schedule.length > 0) {
        setSchedule(data.schedule);
        soundManager.playNotification();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDayCompletion = (dayIndex: number) => {
    soundManager.playClick();
    setSchedule((prev) =>
      prev.map((item, idx) =>
        idx === dayIndex ? { ...item, completed: !item.completed } : item
      )
    );
    soundManager.playFeedback(true);
  };

  const handleSyncDayToWatch = (item: ScheduleDay) => {
    soundManager.playClick();
    onSetWatchAlert(item.wristbandAlertTime, subject);
    soundManager.playNotification();
  };

  const handleSyncAllDays = () => {
    soundManager.playClick();
    const firstActive = schedule.find((s) => !s.completed) || schedule[0];
    onSetWatchAlert(firstActive.wristbandAlertTime, subject);
    soundManager.playNotification();
    setAllSyncedToast(true);
    setTimeout(() => setAllSyncedToast(false), 3500);
  };

  const completedCount = schedule.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / schedule.length) * 100);

  return (
    <section id="schedule" className="py-16 md:py-24 bg-gradient-to-b from-[#f8faff] to-white border-t border-indigo-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black mb-3 border border-indigo-200/80 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>1️⃣ Lập lịch thông minh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
            Nhập môn học và ngày kiểm tra
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#687387] leading-relaxed">
            AI gợi ý lịch ôn tập theo từng ngày dựa trên phương pháp lặp lại ngắt quãng (Spaced Repetition) và tự động đồng bộ giờ nhắc lên vòng tay thông minh.
          </p>

          {/* Quick Subject Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-xs text-slate-500 font-medium mr-1">Chọn nhanh môn:</span>
            {subjectsQuickPick.map((s) => (
              <button
                key={s}
                onClick={() => {
                  soundManager.playClick();
                  setSubject(s);
                }}
                className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-full transition border ${
                  subject === s
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold"
                    : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Form Controls Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                Môn học cần ôn
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="VD: Toán 6, Ngữ văn 6..."
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                Ngày kiểm tra ({daysLeft} ngày nữa)
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 transition cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                Thời gian ôn mỗi ngày
              </label>
              <select
                value={minutesPerDay}
                onChange={(e) => setMinutesPerDay(Number(e.target.value))}
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 transition cursor-pointer"
              >
                <option value={15}>15 phút / ngày (Ngắn gọn)</option>
                <option value={20}>20 phút / ngày (Lý tưởng)</option>
                <option value={30}>30 phút / ngày (Chuyên sâu)</option>
              </select>
            </div>

            <div>
              <button
                onClick={handleGenerateSchedule}
                disabled={isLoading}
                className="cursor-pointer w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-black py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 text-sm active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>{isLoading ? "AI đang lập lịch..." : "AI gợi ý lịch ôn tập"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Master Auto-Alarm Watch Status Banner */}
        <div className="mb-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-5 text-white shadow-lg border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              isWatchVibrating
                ? "bg-rose-500 text-white animate-bounce ring-4 ring-rose-400/50"
                : "bg-indigo-500/20 text-[#6cf0ae] border border-indigo-400/30"
            }`}>
              <Watch className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm text-white">Vòng tay thông minh StudySync</span>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#6cf0ae] border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6cf0ae] animate-ping"></span>
                  Tự động rung khi đúng giờ
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Đang canh giờ học môn <strong>{subject}</strong> lúc <strong>{alertTime}</strong>. Đúng giờ này, vòng tay sẽ <strong>TỰ ĐỘNG RUNG LÊN</strong> trên cổ tay bạn (không cần bấm thủ công).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onStartTestCountdown && (
              <button
                onClick={() => onStartTestCountdown(10)}
                disabled={testCountdown !== null && testCountdown > 0}
                className="cursor-pointer text-xs font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
                title="Đếm ngược 10 giây để kiểm tra vòng tay tự động rung mà không cần bấm"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>{testCountdown !== null ? `Đếm: ${testCountdown}s...` : "⚡ Thử tự rung sau 10s"}</span>
              </button>
            )}

            {isWatchVibrating && onStopWatchBuzz && (
              <button
                onClick={onStopWatchBuzz}
                className="cursor-pointer text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-2.5 rounded-xl transition animate-pulse"
              >
                Tắt rung vòng tay
              </button>
            )}
          </div>
        </div>

        {/* Schedule Progress & Master Sync Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#172033]">
              Lộ trình {schedule.length} ngày ôn môn {subject}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Tiến độ: {completedCount}/{schedule.length} ngày ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncAllDays}
              className="cursor-pointer text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Watch className="w-3.5 h-3.5 text-[#6cf0ae]" />
              <span>Đồng bộ toàn bộ lịch vào vòng tay</span>
            </button>
          </div>
        </div>

        {allSyncedToast && (
          <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-slideUp">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Đã truyền dữ liệu lịch ôn {schedule.length} ngày sang vòng tay StudySync! Đúng các khung giờ này, vòng tay sẽ tự động rung.</span>
          </div>
        )}

        {/* Schedule Roadmap Cards */}
        <div className="space-y-3.5">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                item.completed
                  ? "border-emerald-200 bg-emerald-50/30"
                  : item.wristbandAlertTime === alertTime
                  ? "border-indigo-300 ring-2 ring-indigo-500/10"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => toggleDayCompletion(idx)}
                  className={`mt-0.5 cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center transition border ${
                    item.completed
                      ? "bg-emerald-500 border-emerald-600 text-white"
                      : "bg-slate-100 border-slate-300 text-transparent hover:border-slate-400"
                  }`}
                  title={item.completed ? "Đã hoàn thành (bấm để hủy)" : "Đánh dấu hoàn thành"}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current text-white" />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-indigo-600">
                      {item.dayLabel}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {item.duration}
                    </span>
                    {item.completed && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Đã ôn xong
                      </span>
                    )}
                    {item.wristbandAlertTime === alertTime && (
                      <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                        Đang canh giờ này
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-[#172033]">
                    {item.focus}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#687387]">
                    {item.method}
                  </p>
                </div>
              </div>

              {/* Right Action: Sync with wristband */}
              <div className="flex items-center gap-2.5 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Editable time per day */}
                <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200" title="Chỉnh sửa giờ tự rung cho ngày này">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <input
                    type="time"
                    value={item.wristbandAlertTime}
                    onChange={(e) => {
                      const newTime = e.target.value;
                      setSchedule((prev) =>
                        prev.map((s, i) =>
                          i === idx ? { ...s, wristbandAlertTime: newTime } : s
                        )
                      );
                    }}
                    className="bg-transparent text-xs font-mono font-bold text-slate-800 focus:outline-hidden cursor-pointer w-16"
                  />
                </div>

                <button
                  onClick={() => handleSyncDayToWatch(item)}
                  className={`cursor-pointer text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border hover:scale-105 active:scale-95 ${
                    item.wristbandAlertTime === alertTime
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 border-indigo-100"
                  }`}
                  title="Cài giờ này vào vòng tay để vòng tay tự rung khi đúng giờ"
                >
                  <Watch className="w-3.5 h-3.5" />
                  <span>{item.wristbandAlertTime === alertTime ? "Đang cài giờ này" : "Cài tự rung"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
