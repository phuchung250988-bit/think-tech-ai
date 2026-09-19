import React, { useState } from "react";
import { 
  Calendar, 
  Watch, 
  Smartphone, 
  BrainCircuit, 
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";
import { ScheduleSection } from "../ScheduleSection";
import { ReminderSection } from "../ReminderSection";
import { Grade6LearningApp } from "../Grade6LearningApp";
import { soundManager } from "../../utils/audio";

interface InteractivePracticePageProps {
  onNavigateTo: (tabId: string) => void;
  alertSubject: string;
  alertTime: string;
  isWatchVibrating: boolean;
  onTriggerWatchBuzz: () => void;
  onStopWatchBuzz: () => void;
  onSetWatchAlert: (time: string, subject: string) => void;
  testCountdown?: number | null;
  onStartTestCountdown?: (seconds: number) => void;
  isAutoAlarmEnabled?: boolean;
}

export const InteractivePracticePage: React.FC<InteractivePracticePageProps> = ({
  onNavigateTo,
  alertSubject,
  alertTime,
  isWatchVibrating,
  onTriggerWatchBuzz,
  onStopWatchBuzz,
  onSetWatchAlert,
  testCountdown = null,
  onStartTestCountdown = () => {},
  isAutoAlarmEnabled = true,
}) => {
  const [subTab, setSubTab] = useState<"quiz" | "schedule" | "watch">("quiz");

  const handleSwitchSubTab = (tab: "quiz" | "schedule" | "watch") => {
    soundManager.playClick();
    setSubTab(tab);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-cyan-300 text-xs font-black border border-indigo-400/30">
            <Zap className="w-4 h-4 text-cyan-300" />
            <span>KHU VỰC THỰC HÀNH & TRẢI NGHIỆM</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Trải nghiệm trực tiếp hệ sinh thái StudySync AI
          </h1>

          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            Chọn một trong 3 công cụ bên dưới để thử nghiệm thực tế: Ôn tập 20s/câu trên điện thoại, Lập lịch ôn tập AI, hoặc Thử rung vòng tay thông minh.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          <button
            type="button"
            onClick={() => handleSwitchSubTab("quiz")}
            className={`cursor-pointer px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
              subTab === "quiz"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Smartphone className="w-4 h-4 text-cyan-300" />
            <span>1. Ứng dụng thi 20s (Điện thoại)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchSubTab("schedule")}
            className={`cursor-pointer px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
              subTab === "schedule"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-300" />
            <span>2. Lập lịch ôn tự động</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchSubTab("watch")}
            className={`cursor-pointer px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
              subTab === "watch"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Watch className="w-4 h-4 text-emerald-300" />
            <span>3. Vòng tay thông minh (Báo rung)</span>
          </button>
        </div>
      </section>

      {/* SUBTAB 1: PHONE APP */}
      {subTab === "quiz" && (
        <section className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase">
                <BrainCircuit className="w-4 h-4" />
                <span>MÔ PHỎNG ĐIỆN THOẠI HỌC SINH</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Luyện trắc nghiệm phản xạ 20 giây chuẩn SGK Lớp 6
              </h3>
              <p className="text-xs text-slate-500">
                Chọn môn Toán, Ngữ văn, Tiếng Anh hoặc Khoa học Tự nhiên. Bấm <strong>▶️ BẮT ĐẦU</strong> để đếm ngược 20 giây mỗi câu!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSwitchSubTab("schedule")}
                className="cursor-pointer text-xs font-bold px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
              >
                Sang Lập lịch ➔
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Grade6LearningApp />
          </div>
        </section>
      )}

      {/* SUBTAB 2: SCHEDULE */}
      {subTab === "schedule" && (
        <section className="space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleSwitchSubTab("watch")}
              className="cursor-pointer text-xs font-bold px-4 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 transition flex items-center gap-1.5"
            >
              <span>Thử nghiệm Vòng tay báo rung</span>
              <span>➔</span>
            </button>
          </div>
          <ScheduleSection 
            onSetWatchAlert={onSetWatchAlert}
            alertTime={alertTime}
            isAutoAlarmEnabled={isAutoAlarmEnabled}
            testCountdown={testCountdown}
            onStartTestCountdown={onStartTestCountdown}
            isWatchVibrating={isWatchVibrating}
            onStopWatchBuzz={onStopWatchBuzz}
          />
        </section>
      )}

      {/* SUBTAB 3: WATCH REMINDER */}
      {subTab === "watch" && (
        <section className="space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleSwitchSubTab("quiz")}
              className="cursor-pointer text-xs font-bold px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition flex items-center gap-1.5"
            >
              <span>Về Ứng dụng điện thoại 20s</span>
              <span>➔</span>
            </button>
          </div>
          <ReminderSection 
            alertSubject={alertSubject}
            alertTime={alertTime}
            isVibrating={isWatchVibrating}
            onTriggerVibration={onTriggerWatchBuzz}
            onStopVibration={onStopWatchBuzz}
            onScrollToQuiz={() => handleSwitchSubTab("quiz")}
            onSetWatchAlert={onSetWatchAlert}
            testCountdown={testCountdown}
            onStartTestCountdown={onStartTestCountdown}
            isAutoAlarmEnabled={isAutoAlarmEnabled}
          />
        </section>
      )}

      {/* Bottom Bar to navigate back */}
      <section className="bg-white border border-indigo-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigateTo("features")}
          className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Xem lại: Tính năng nổi bật</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTo("about")}
          className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl transition flex items-center gap-2"
        >
          <span>Về trang Giới thiệu chính</span>
        </button>
      </section>
    </div>
  );
};
