import React from "react";
import { ArrowRight, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";
import { WristbandSimulator } from "./WristbandSimulator";

interface HeroSectionProps {
  onStartStudy: () => void;
  onShowInfo: () => void;
  isVibrating: boolean;
  onTriggerVibration: () => void;
  onStopVibration: () => void;
  currentAlertSubject: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartStudy,
  onShowInfo,
  isVibrating,
  onTriggerVibration,
  onStopVibration,
  currentAlertSubject,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:py-20 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag from user HTML */}
            <div className="inline-flex items-center gap-2 bg-[#e5ebff] text-[#315bea] px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm border border-[#d2deff]">
              <Sparkles className="w-4 h-4 text-[#315bea]" />
              <span>🤖 AI + 📱 Điện thoại + ⌚ Vòng tay thông minh</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#172033] tracking-tight leading-[1.12]">
              Đừng để{" "}
              <span className="text-[#315bea] underline decoration-[#b9ffdc] decoration-4 underline-offset-8">
                quên ôn bài
              </span>{" "}
              trở thành lỗ hổng kiến thức.
            </h1>

            {/* Paragraph */}
            <p className="text-lg sm:text-xl text-[#5d687c] leading-relaxed max-w-2xl">
              StudySync AI đồng hành cùng học sinh trước mỗi kỳ kiểm tra: nhắc đúng lúc, ôn đúng phần và giúp phát hiện những kiến thức còn chưa vững.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-btn-start"
                onClick={onStartStudy}
                className="cursor-pointer bg-[#315bea] hover:bg-[#234acb] text-white px-7 py-4 rounded-xl font-extrabold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition flex items-center gap-2 group"
              >
                <span>Bắt đầu ôn tập</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

              <button
                id="hero-btn-info"
                onClick={onShowInfo}
                className="cursor-pointer bg-white hover:bg-slate-50 text-[#315bea] border border-[#d9e0f0] px-6 py-4 rounded-xl font-bold text-base shadow-sm hover:border-[#b8c6e8] transition flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5 text-[#315bea]" />
                <span>StudySync AI hoạt động thế nào?</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-lg text-xs text-[#5d687c]">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rung êm ái, không xao nhãng</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Chỉ 3–5 câu ôn nhanh</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Chỉ rõ lỗ hổng tư duy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Wristband Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <WristbandSimulator
              isVibrating={isVibrating}
              onTriggerVibration={onTriggerVibration}
              onStopVibration={onStopVibration}
              onStartStudy={onStartStudy}
              currentAlertSubject={currentAlertSubject}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
