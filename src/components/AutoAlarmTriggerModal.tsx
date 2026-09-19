import React from "react";
import { Watch, Bell, Play, X, Zap, Volume2, Sparkles, CheckCircle2 } from "lucide-react";
import { soundManager } from "../utils/audio";

interface AutoAlarmTriggerModalProps {
  isOpen: boolean;
  subject: string;
  time: string;
  onDismiss: () => void;
  onStartStudy: () => void;
}

export const AutoAlarmTriggerModal: React.FC<AutoAlarmTriggerModalProps> = ({
  isOpen,
  subject,
  time,
  onDismiss,
  onStartStudy,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative bg-gradient-to-b from-[#0e1628] via-[#141f3d] to-[#0c1426] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-emerald-400 shadow-[0_0_50px_rgba(108,240,174,0.35)] animate-scaleUp text-center"
      >
        {/* Close Button Top Right */}
        <button
          onClick={() => {
            soundManager.playClick();
            onDismiss();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          title="Đóng / Tắt rung"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pulsing Watch Visual Icon with Ripple */}
        <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
          <div className="absolute -inset-2 rounded-full bg-emerald-400/10 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-vibrate">
            <Watch className="w-10 h-10 animate-bounce" />
          </div>
          <span className="absolute -bottom-1 bg-rose-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
            ĐANG RUNG HAPTIC
          </span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-[#6cf0ae] text-xs font-black border border-emerald-400/40 mb-3">
          <Zap className="w-3.5 h-3.5 fill-[#6cf0ae]" />
          <span>BÁO THỨC TỰ ĐỘNG ĐÃ KÍCH HOẠT</span>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          ⏰ Đúng {time} rồi!
        </h2>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#6cf0ae] mt-1">
          Vòng tay đang TỰ ĐỘNG RUNG nhắc ôn môn {subject}
        </h3>

        {/* Explanation text */}
        <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed max-w-md mx-auto">
          Mô tơ haptic trên vòng tay đang phát nhịp rung êm ái vào cổ tay. Đúng giờ đã cài đặt mà không cần bạn phải bấm nút!
        </p>

        {/* Quick Tips */}
        <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-3.5 text-left text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Chỉ 3–5 câu trắc nghiệm phản xạ (20 giây/câu)</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-200 font-medium">
            <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
            <span>AI sẽ tự phát hiện điểm còn yếu và chữa lỗi sai ngay</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onDismiss();
            }}
            className="cursor-pointer py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs sm:text-sm transition border border-slate-700"
          >
            🔕 Tắt rung vòng tay
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onStartStudy();
            }}
            className="cursor-pointer py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Vào ôn tập 20s ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
