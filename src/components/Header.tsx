import React, { useState } from "react";
import { Watch, Sparkles, Wifi, Volume2, VolumeX } from "lucide-react";
import { soundManager } from "../utils/audio";

interface HeaderProps {
  onScrollTo: (id: string) => void;
  onTriggerBandAlert: () => void;
  isVibrating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollTo,
  onTriggerBandAlert,
  isVibrating,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#315bea] via-[#4364ee] to-[#6c5ce7] text-white shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onScrollTo("hero")}
          className="cursor-pointer flex items-center gap-2.5 group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 backdrop-blur-sm group-hover:bg-white/25 group-hover:scale-105 transition-all duration-200">
            <Sparkles className="w-5 h-5 text-[#b9ffdc]" />
          </div>
          <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <span>StudySync <span className="text-[#b9ffdc]">AI</span></span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-[#b9ffdc] border border-white/20">
              v1.0 MVP
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-sm">
          <button
            onClick={() => onScrollTo("problem")}
            className="text-white/85 hover:text-white transition cursor-pointer"
            id="nav-problem"
          >
            Vấn đề
          </button>
          <button
            onClick={() => onScrollTo("features")}
            className="text-white/85 hover:text-white transition cursor-pointer"
            id="nav-features"
          >
            Quy trình
          </button>
          <button
            onClick={() => onScrollTo("schedule")}
            className="text-white/85 hover:text-white transition cursor-pointer"
            id="nav-schedule"
          >
            Lập lịch ôn thi
          </button>
          <button
            onClick={() => onScrollTo("demo")}
            className="text-white/85 hover:text-white transition cursor-pointer"
            id="nav-demo"
          >
            Ôn tập chẩn đoán
          </button>
        </nav>

        {/* Action / Sync Status */}
        <div className="flex items-center gap-2.5">
          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={toggleSound}
            className={`cursor-pointer p-2 rounded-xl transition border ${
              isMuted
                ? "bg-white/10 text-white/60 border-white/15 hover:bg-white/20"
                : "bg-white/15 text-[#b9ffdc] border-white/25 hover:bg-white/25"
            }`}
            title={isMuted ? "Bật âm thanh hiệu ứng" : "Tắt âm thanh hiệu ứng"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#6cf0ae] animate-pulse"></span>
            <span className="text-white/90 font-medium">Đồng bộ vòng tay & điện thoại</span>
            <Wifi className="w-3.5 h-3.5 text-[#b9ffdc]" />
          </div>

          <button
            id="btn-quick-vibrate"
            onClick={onTriggerBandAlert}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-sm ${
              isVibrating
                ? "bg-[#6cf0ae] text-[#123b2a] scale-105 shadow-emerald-400/50 shadow-md ring-2 ring-[#6cf0ae]"
                : "bg-white/20 hover:bg-white/30 text-white border border-white/25 hover:scale-[1.02]"
            }`}
            title="Thử nghiệm rung nhẹ trên vòng tay StudySync"
          >
            <Watch className={`w-4 h-4 ${isVibrating ? "animate-bounce" : ""}`} />
            <span>{isVibrating ? "Vòng tay đang rung..." : "Rung thử nghiệm"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
