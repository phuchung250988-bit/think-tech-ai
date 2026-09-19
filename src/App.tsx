import { useState, useEffect, useRef } from "react";
import { InfoModal } from "./components/InfoModal";
import { PosterModal } from "./components/PosterModal";
import { AutoAlarmTriggerModal } from "./components/AutoAlarmTriggerModal";
import { VoiceStudioModal } from "./components/VoiceStudioModal";
import { IntroPage } from "./components/pages/IntroPage";
import { ProblemPage } from "./components/pages/ProblemPage";
import { SolutionPage } from "./components/pages/SolutionPage";
import { WorkflowPage } from "./components/pages/WorkflowPage";
import { FeaturesPage } from "./components/pages/FeaturesPage";
import { InteractivePracticePage } from "./components/pages/InteractivePracticePage";
import { soundManager } from "./utils/audio";
import { 
  Sparkles, 
  Watch, 
  Volume2, 
  VolumeX, 
  Mic2,
  Sliders,
  ArrowRight,
  BrainCircuit,
  Image as ImageIcon,
  BookOpen,
  AlertCircle,
  Lightbulb,
  Workflow,
  Star,
  Play
} from "lucide-react";

export type NavTabId = "about" | "problem" | "solution" | "workflow" | "features" | "practice";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>("about");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState<boolean>(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState<boolean>(false);
  const [isAutoAlarmModalOpen, setIsAutoAlarmModalOpen] = useState<boolean>(false);
  const [isWatchVibrating, setIsWatchVibrating] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [alertSubject, setAlertSubject] = useState<string>("Toán 6");
  const [alertTime, setAlertTime] = useState<string>("19:00");
  const [testCountdown, setTestCountdown] = useState<number | null>(null);
  const lastTriggeredMinuteRef = useRef<string | null>(null);

  // AUTOMATIC CLOCK CHECK: Compare current system time with alertTime
  useEffect(() => {
    const checkSystemTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const currentHHMM = `${hours}:${minutes}`;

      if (currentHHMM === alertTime && lastTriggeredMinuteRef.current !== currentHHMM) {
        lastTriggeredMinuteRef.current = currentHHMM;
        // Trigger continuous vibration and alarm modal
        soundManager.startContinuousVibration(15000);
        setIsWatchVibrating(true);
        setIsAutoAlarmModalOpen(true);
        setToastMessage(`⏰ ĐÚNG ${alertTime}! Vòng tay StudySync đang TỰ ĐỘNG RUNG nhắc bạn ôn ${alertSubject}!`);
      }
    };

    // Run immediate check and then every 4 seconds
    checkSystemTime();
    const interval = setInterval(checkSystemTime, 4000);
    return () => clearInterval(interval);
  }, [alertTime, alertSubject]);

  // TEST COUNTDOWN EFFECT: When countdown reaches 0, trigger automatic vibration
  useEffect(() => {
    if (testCountdown === null) return;
    if (testCountdown === 0) {
      setTestCountdown(null);
      soundManager.startContinuousVibration(15000);
      setIsWatchVibrating(true);
      setIsAutoAlarmModalOpen(true);
      setToastMessage(`⏰ HẾT ĐẾM NGƯỢC! Vòng tay StudySync đang TỰ ĐỘNG RUNG (Kiểm tra báo thức tự động thành công)!`);
      return;
    }

    const timer = setTimeout(() => {
      setTestCountdown(testCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [testCountdown]);

  const handleStartTestCountdown = (seconds: number = 10) => {
    soundManager.playClick();
    setTestCountdown(seconds);
    setToastMessage(`⏳ Đang đếm ngược ${seconds}s để thử TỰ ĐỘNG RUNG vòng tay...`);
  };

  const handleStopVibration = () => {
    soundManager.stopContinuousVibration();
    setIsWatchVibrating(false);
    setIsAutoAlarmModalOpen(false);
  };

  const handleSwitchTab = (tabId: string) => {
    soundManager.playClick();
    setActiveTab(tabId as NavTabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sound toggle
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  // Manual Trigger watch vibration preview
  const triggerWatchBuzz = () => {
    setIsWatchVibrating(true);
    soundManager.playVibrationBuzz(1400);
    setToastMessage(`⌚ Vòng tay StudySync đang rung: '🔔 Đến giờ ôn ${alertSubject}!'`);
    setTimeout(() => {
      setIsWatchVibrating(false);
    }, 2000);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSetWatchAlert = (time: string, subject: string) => {
    setAlertTime(time);
    setAlertSubject(subject);
    lastTriggeredMinuteRef.current = null; // Reset so new time can trigger
    soundManager.playNotification();
    setToastMessage(`⌚ Đã cài đặt tự động: Đúng ${time} vòng tay sẽ TỰ RUNG nhắc môn ${subject}!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const navItems = [
    { id: "about", label: "Giới thiệu", icon: BookOpen, tag: "Tổng quan" },
    { id: "problem", label: "Vấn đề", icon: AlertCircle, tag: "Thực trạng" },
    { id: "solution", label: "Giải pháp", icon: Lightbulb, tag: "Công nghệ" },
    { id: "workflow", label: "Cách hoạt động", icon: Workflow, tag: "5 bước" },
    { id: "features", label: "Tính năng nổi bật", icon: Star, tag: "Cốt lõi" },
    { id: "practice", label: "Trải nghiệm thực tế", icon: Play, tag: "Demo trực tiếp", highlight: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fe] text-[#172033] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideUp">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-[#6cf0ae]">
            <Watch className="w-5 h-5 animate-bounce" />
          </div>
          <div className="text-xs sm:text-sm font-medium pr-2">
            {toastMessage}
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md text-slate-800 px-4 sm:px-[6%] py-3 sm:py-3.5 flex justify-between items-center border-b border-indigo-100/80 sticky top-0 z-40 shadow-xs">
        <div 
          onClick={() => handleSwitchTab("about")}
          className="flex items-center gap-2.5 cursor-pointer no-underline group" 
          id="header-logo"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
            <BrainCircuit className="w-5 h-5 text-cyan-200" />
          </div>
          <div className="flex flex-col">
            <div className="text-lg sm:text-[20px] font-black tracking-tight leading-none text-slate-900">
              StudySync <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-wide mt-0.5">
              Học thông minh · Thi tự tin
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsPosterModalOpen(true)}
            className="text-purple-700 hover:text-purple-900 transition cursor-pointer flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 text-xs font-bold"
          >
            <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Xem ảnh</span>
            <span>Poster gốc</span>
          </button>

          {/* Voice Studio button */}
          <button
            type="button"
            onClick={() => setIsVoiceStudioOpen(true)}
            className="text-indigo-700 hover:text-indigo-900 transition cursor-pointer flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 text-xs font-bold"
            title="Cài đặt giọng đọc AI và nghe thử"
          >
            <Mic2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Giọng AI:</span>
            <span>{soundManager.getCurrentVoiceProfile().shortName}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isMuted 
                ? "bg-slate-100 text-slate-400 border-slate-200" 
                : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
            }`}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Direct CTA to Practice */}
          <button
            type="button"
            onClick={() => handleSwitchTab("practice")}
            className="cursor-pointer bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl shadow-md shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Trải nghiệm</span>
            <span>Thực tế</span>
          </button>
        </div>
      </header>

      {/* CATEGORY NAV TABS BAR */}
      <div className="bg-white border-b border-indigo-100 sticky top-[57px] sm:top-[61px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSwitchTab(item.id)}
                  className={`cursor-pointer whitespace-nowrap text-xs sm:text-sm font-black px-3 sm:px-4 py-2 rounded-2xl transition flex items-center gap-2 shrink-0 ${
                    isActive
                      ? item.highlight
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                        : "bg-indigo-600 text-white shadow-xs"
                      : item.highlight
                      ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.highlight ? "text-purple-600" : "text-indigo-500"}`} />
                  <span>{item.label}</span>
                  {item.tag && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md hidden md:inline font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER (PAGES) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "about" && (
          <IntroPage 
            onOpenPosterModal={() => setIsPosterModalOpen(true)}
            onNavigateTo={handleSwitchTab}
          />
        )}

        {activeTab === "problem" && (
          <ProblemPage onNavigateTo={handleSwitchTab} />
        )}

        {activeTab === "solution" && (
          <SolutionPage 
            onNavigateTo={handleSwitchTab}
            alertSubject={alertSubject}
            alertTime={alertTime}
            isWatchVibrating={isWatchVibrating}
            onTriggerWatchBuzz={triggerWatchBuzz}
            onStopWatchBuzz={handleStopVibration}
            onSetWatchAlert={handleSetWatchAlert}
            testCountdown={testCountdown}
            onStartTestCountdown={handleStartTestCountdown}
            isAutoAlarmEnabled={true}
          />
        )}

        {activeTab === "workflow" && (
          <WorkflowPage onNavigateTo={handleSwitchTab} />
        )}

        {activeTab === "features" && (
          <FeaturesPage onNavigateTo={handleSwitchTab} />
        )}

        {activeTab === "practice" && (
          <InteractivePracticePage 
            onNavigateTo={handleSwitchTab}
            alertSubject={alertSubject}
            alertTime={alertTime}
            isWatchVibrating={isWatchVibrating}
            onTriggerWatchBuzz={triggerWatchBuzz}
            onStopWatchBuzz={handleStopVibration}
            onSetWatchAlert={handleSetWatchAlert}
            testCountdown={testCountdown}
            onStartTestCountdown={handleStartTestCountdown}
            isAutoAlarmEnabled={true}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-sm text-slate-500 bg-white border-t border-indigo-100/80 mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-200" />
            </div>
            <span className="font-black text-slate-800 text-base">
              StudySync AI
            </span>
            <span className="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold">
              Học thông minh · Thi tự tin
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Hệ sinh thái EdTech kết hợp Trí tuệ nhân tạo (AI) và Vòng tay thông minh hỗ trợ học sinh THCS và Lớp 6 ôn thi hiệu quả.
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <AutoAlarmTriggerModal
        isOpen={isAutoAlarmModalOpen}
        subject={alertSubject}
        time={alertTime}
        onDismiss={handleStopVibration}
        onStartStudy={() => {
          handleStopVibration();
          handleSwitchTab("practice");
        }}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onStartStudy={() => handleSwitchTab("practice")}
      />

      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        onStartStudy={() => handleSwitchTab("practice")}
      />

      <VoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
        onVoiceChanged={() => {
          setToastMessage(`🎙️ Đã chuyển sang: ${soundManager.getCurrentVoiceProfile().name}`);
        }}
      />
    </div>
  );
}

