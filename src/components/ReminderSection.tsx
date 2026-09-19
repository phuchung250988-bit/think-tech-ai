import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Smartphone, 
  Watch, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Volume2, 
  RotateCcw,
  Sparkles,
  Bluetooth,
  Clock,
  Radio
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface ReminderSectionProps {
  alertSubject: string;
  alertTime: string;
  isVibrating: boolean;
  onTriggerVibration: () => void;
  onStopVibration: () => void;
  onScrollToQuiz: () => void;
  onSetWatchAlert?: (time: string, subject: string) => void;
  testCountdown?: number | null;
  onStartTestCountdown?: (seconds: number) => void;
  isAutoAlarmEnabled?: boolean;
}

export const ReminderSection: React.FC<ReminderSectionProps> = ({
  alertSubject,
  alertTime,
  isVibrating,
  onTriggerVibration,
  onStopVibration,
  onScrollToQuiz,
  onSetWatchAlert,
  testCountdown = null,
  onStartTestCountdown,
  isAutoAlarmEnabled = true,
}) => {
  const [selectedTime, setSelectedTime] = useState(alertTime || "19:00");
  const [vibePattern, setVibePattern] = useState<"gentle" | "double">("gentle");
  const [showPushNotification, setShowPushNotification] = useState(true);

  // Sync when parent alertTime changes
  useEffect(() => {
    if (alertTime) {
      setSelectedTime(alertTime);
    }
  }, [alertTime]);

  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime);
    if (onSetWatchAlert) {
      onSetWatchAlert(newTime, alertSubject);
    }
  };

  const handleTestTrigger = () => {
    soundManager.playClick();
    onTriggerVibration();
    setShowPushNotification(true);
    soundManager.playNotification();
  };

  return (
    <section id="reminder" className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200/80 shadow-xs">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>2️⃣ Nhắc đúng lúc</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
            Khi đến giờ học, vòng tay rung nhẹ và điện thoại gửi thông báo
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#687387] leading-relaxed">
            Sự kết hợp giữa rung xúc giác (haptic) trên cổ tay và thông báo đẩy trên điện thoại giúp học sinh chủ động ngồi vào bàn học đúng giờ mà không tạo cảm giác gò bó hay ồn ào.
          </p>

          {/* Quick Action Test Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={isVibrating ? onStopVibration : handleTestTrigger}
              className={`cursor-pointer px-6 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2.5 transition-all shadow-md active:scale-95 ${
                isVibrating
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25 animate-pulse"
                  : "bg-[#172033] hover:bg-[#253658] text-white shadow-slate-900/15"
              }`}
            >
              <Zap className={`w-4 h-4 ${isVibrating ? "animate-bounce text-amber-300" : "text-[#6cf0ae]"}`} />
              <span>
                {isVibrating
                  ? "Đang phát rung... (Bấm để dừng)"
                  : "Thử kích hoạt: Rung vòng tay + Thông báo điện thoại"}
              </span>
            </button>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Giờ nhắc:</span>
              <select
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="bg-slate-100 rounded-lg px-2 py-1 text-slate-900 font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="18:30">18:30</option>
                <option value="19:00">19:00 (Mặc định)</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
              </select>
            </div>

            {/* Test Countdown Button */}
            {onStartTestCountdown && (
              <button
                type="button"
                onClick={() => onStartTestCountdown(10)}
                disabled={testCountdown !== null && testCountdown > 0}
                className="cursor-pointer px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 disabled:opacity-50 text-amber-900 font-bold text-xs flex items-center gap-1.5 border border-amber-300 shadow-xs transition active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>
                  {testCountdown !== null ? `Đếm ngược: ${testCountdown}s (Tự rung)` : "⚡ Thử tự rung sau 10s"}
                </span>
              </button>
            )}
          </div>

          {/* Auto Alarm Info Banner */}
          <div className="mt-4 max-w-xl mx-auto p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 flex items-center justify-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
            <span>
              <strong>🟢 Chế độ TỰ ĐỘNG RUNG:</strong> Đúng <strong>{selectedTime}</strong>, vòng tay sẽ tự động rung nhịp haptic trên cổ tay mà bạn không cần phải bấm nút!
            </span>
          </div>
        </div>

        {/* Dual Simulation Layout (Watch on Left, Phone on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          
          {/* LEFT: WRISTBAND SIMULATOR */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(23,32,51,0.06)] border border-slate-200/80 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Watch className="w-4 h-4 text-blue-600" />
              <span>Vòng tay thông minh StudySync</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Bluetooth className="w-3 h-3 text-emerald-500" />
              <span>Bluetooth Đã kết nối</span>
            </div>

            {/* Watch Device Representation */}
            <div className="mt-8 mb-4">
              {/* Strap Top */}
              <div className="w-28 h-10 bg-gradient-to-b from-slate-900 to-slate-800 rounded-t-xl mx-auto shadow-inner border-t border-slate-700 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-700/60 rounded-full"></div>
              </div>

              {/* Watch Dial */}
              <div 
                onClick={() => {
                  soundManager.playClick();
                  if (isVibrating) onStopVibration();
                  else handleTestTrigger();
                }}
                className={`relative w-52 h-52 sm:w-56 sm:h-56 rounded-full mx-auto bg-gradient-to-br from-[#0c1326] via-[#132042] to-[#1c2d5c] text-white flex flex-col justify-center items-center cursor-pointer transition-all select-none ${
                  isVibrating 
                    ? "ring-8 ring-emerald-400/40 shadow-[0_0_35px_rgba(108,240,174,0.6)] animate-pulse scale-105" 
                    : "ring-8 ring-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:scale-[1.02]"
                }`}
                title="Bấm vào mặt vòng tay để bật/tắt rung"
              >
                {isVibrating && (
                  <span className="absolute -top-3 bg-[#6cf0ae] text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md animate-bounce">
                    〰️ ĐANG RUNG NHẸ HAPTIC
                  </span>
                )}

                <div className="text-[11px] tracking-wider text-slate-400 font-semibold mb-0.5">
                  THỨ 6 · {selectedTime}
                </div>
                <div className="text-4xl font-extrabold tracking-tight font-mono text-white">
                  {selectedTime}
                </div>

                <div className={`mt-2.5 px-3 py-1 rounded-full text-xs font-black shadow-xs flex items-center gap-1.5 transition-all ${
                  isVibrating
                    ? "bg-[#6cf0ae] text-[#0f3422] scale-105"
                    : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
                }`}>
                  <Bell className={`w-3.5 h-3.5 ${isVibrating ? "animate-bounce" : ""}`} />
                  <span>Đến giờ ôn {alertSubject}!</span>
                </div>

                <div className="text-[10px] text-slate-400 mt-2">
                  {isVibrating ? "Chạm để tắt rung" : "Chạm để thử rung nhẹ"}
                </div>
              </div>

              {/* Strap Bottom */}
              <div className="w-28 h-10 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-xl mx-auto shadow-inner border-b border-slate-700 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-700/60 rounded-full"></div>
              </div>
            </div>

            <div className="text-center mt-2">
              <h4 className="font-bold text-slate-800 text-sm">Rung xúc giác Haptic Motor</h4>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xs">
                Rung 3 nhịp dịu êm vào cổ tay, nhắc nhở tự nhiên mà không làm phiền người xung quanh.
              </p>
            </div>
          </div>

          {/* RIGHT: PHONE PUSH NOTIFICATION SIMULATOR */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(23,32,51,0.06)] border border-slate-200/80 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Màn hình thông báo điện thoại</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Push Notification
              </span>
            </div>

            {/* Simulated Phone Lockscreen Card */}
            <div className="w-full bg-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-slate-800 my-auto">
              <div className="text-center mb-4">
                <div className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-white/95">
                  {selectedTime}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">
                  Thứ Sáu, ngày 14 tháng 9
                </div>
              </div>

              {/* Push Banner */}
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 border transition-all duration-300 ${
                isVibrating 
                  ? "border-emerald-400/80 bg-white/20 ring-2 ring-emerald-400/30 shadow-lg scale-[1.02]" 
                  : "border-white/15"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5 text-[#b9ffdc]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-white/90">StudySync AI</span>
                      <span className="text-[10px] text-slate-400">Vừa xong</span>
                    </div>
                    <h5 className="text-sm font-bold text-white mt-0.5">
                      🔔 Đã đến giờ ôn tập môn {alertSubject}!
                    </h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      AI đã chuẩn bị sẵn 3–5 câu hỏi nhanh để chẩn đoán kiến thức hôm nay. Ôn chỉ 3 phút để nắm vững bài!
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    onClick={onScrollToQuiz}
                    className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <span>Mở làm 3–5 câu hỏi ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đồng bộ tức thì: Vòng tay rung & Điện thoại nhận tin</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                Học sinh chỉ cần bấm vào thông báo để mở ngay bộ câu hỏi trắc nghiệm chẩn đoán của môn {alertSubject}.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
