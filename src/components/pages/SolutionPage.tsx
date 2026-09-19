import React, { useState } from "react";
import { 
  Sparkles, 
  Watch, 
  Brain, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  CalendarCheck, 
  Zap, 
  Smile,
  ExternalLink,
  Clock
} from "lucide-react";
import { soundManager } from "../../utils/audio";
import { SolutionDetailModal, SolutionType } from "../SolutionDetailModal";

interface SolutionPageProps {
  onNavigateTo: (tabId: string) => void;
  alertSubject?: string;
  alertTime?: string;
  isWatchVibrating?: boolean;
  onTriggerWatchBuzz?: () => void;
  onStopWatchBuzz?: () => void;
  onSetWatchAlert?: (time: string, subject: string) => void;
  testCountdown?: number | null;
  onStartTestCountdown?: (seconds: number) => void;
  isAutoAlarmEnabled?: boolean;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ 
  onNavigateTo,
  alertSubject = "Toán 6",
  alertTime = "19:00",
  isWatchVibrating = false,
  onTriggerWatchBuzz = () => {},
  onStopWatchBuzz = () => {},
  onSetWatchAlert = () => {},
  testCountdown = null,
  onStartTestCountdown = () => {},
  isAutoAlarmEnabled = true,
}) => {
  const [activeSolutionModal, setActiveSolutionModal] = useState<SolutionType | null>(null);

  const handleOpenSolution = (sol: SolutionType) => {
    soundManager.playClick();
    setActiveSolutionModal(sol);
  };

  return (
    <div className="w-full space-y-10 animate-fadeIn">
      {/* Detail Modal for Selected Solution */}
      <SolutionDetailModal
        isOpen={activeSolutionModal !== null}
        activeSolution={activeSolutionModal}
        onClose={() => setActiveSolutionModal(null)}
        onSelectSolution={(sol) => setActiveSolutionModal(sol)}
        alertSubject={alertSubject}
        alertTime={alertTime}
        isWatchVibrating={isWatchVibrating}
        onTriggerWatchBuzz={onTriggerWatchBuzz}
        onStopWatchBuzz={onStopWatchBuzz}
        onSetWatchAlert={onSetWatchAlert}
        testCountdown={testCountdown}
        onStartTestCountdown={onStartTestCountdown}
        isAutoAlarmEnabled={isAutoAlarmEnabled}
        onNavigateToTab={onNavigateTo}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-black border border-cyan-400/30">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>ĐỘT PHÁ CÔNG NGHỆ EDTECH</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Giải pháp toàn diện từ StudySync AI
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed">
            Kết hợp thông minh giữa <strong>Vòng tay công nghệ</strong> và <strong>Trí tuệ nhân tạo (AI)</strong>: Nhắc đúng giờ ➔ Ôn đúng trọng tâm ➔ Lấp đầy lỗ hổng tức thì.
          </p>

          <p className="text-xs sm:text-sm text-cyan-200 font-bold pt-1">
            👇 Bấm vào bất kỳ giải pháp nào dưới đây để mở giao diện trải nghiệm và cài đặt giờ tự động rung!
          </p>
        </div>

        {/* Quick Solution Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          <span className="text-xs text-slate-300 font-semibold mr-1">Mở nhanh:</span>
          <button
            type="button"
            onClick={() => handleOpenSolution("schedule")}
            className="cursor-pointer text-xs font-black bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-white/20 active:scale-95"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-indigo-300" />
            <span>1. Lập lịch tự động</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenSolution("watch")}
            className="cursor-pointer text-xs font-black bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-white/20 active:scale-95"
          >
            <Watch className="w-3.5 h-3.5 text-cyan-300" />
            <span>2. Vòng tay tự rung</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenSolution("quiz")}
            className="cursor-pointer text-xs font-black bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-white/20 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-purple-300" />
            <span>3. Đề thi 20s</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenSolution("ai")}
            className="cursor-pointer text-xs font-black bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-white/20 active:scale-95"
          >
            <Brain className="w-3.5 h-3.5 text-emerald-300" />
            <span>4. AI chữa lỗi</span>
          </button>
        </div>
      </section>

      {/* 4 Core Pillars of Solution — Clickable Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Giải pháp 1: Lịch ôn thông minh */}
        <div 
          onClick={() => handleOpenSolution("schedule")}
          className="bg-white rounded-3xl p-6 border-2 border-indigo-100 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 cursor-pointer group transform hover:-translate-y-1 select-none relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black group-hover:scale-110 transition">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Giải pháp 01</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition">
                  Lên lịch ôn tập tự động theo ngày thi
                </h3>
              </div>
            </div>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition flex items-center gap-1">
              <span>Mở</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Chỉ cần nhập ngày thi và môn học, AI sẽ tự động phân bổ khối lượng kiến thức thành các phiên ôn tập nhỏ gọn 5–10 phút mỗi ngày và cài đặt giờ tự động rung vào vòng tay.
          </p>

          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-indigo-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tự động hóa hoàn toàn:</span>
            </div>
            <p className="text-slate-600">
              Cài giờ một lần, đến đúng giờ vòng tay tự rung nhắc học. Bấm vào đây để xem lộ trình và cài đặt giờ!
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Giờ hiện tại: {alertTime}
            </span>
            <span className="flex items-center gap-1 group-hover:underline">
              Bấm để mở lịch ➔
            </span>
          </div>
        </div>

        {/* Giải pháp 2: Vòng tay rung nhắc nhở */}
        <div 
          onClick={() => handleOpenSolution("watch")}
          className="bg-white rounded-3xl p-6 border-2 border-cyan-100 hover:border-cyan-400 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 cursor-pointer group transform hover:-translate-y-1 select-none relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black group-hover:scale-110 transition">
                <Watch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Giải pháp 02</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-cyan-700 transition">
                  Vòng tay thông minh rung nhẹ êm ái
                </h3>
              </div>
            </div>
            <span className="text-xs font-black text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-xl border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white transition flex items-center gap-1">
              <span>Mở</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Đến đúng giờ học, vòng tay <strong>TỰ ĐỘNG RUNG NHẸ</strong> trên cổ tay (không cần bấm thủ công) kèm tên môn học, nhắc nhở trực tiếp mà không cần bật chuông ồn ào.
          </p>

          <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-100 text-xs text-cyan-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-cyan-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cơ chế tự động rung khi đúng giờ:</span>
            </div>
            <p className="text-slate-600">
              Đồng hồ hệ thống liên tục giám sát. Đúng giờ cài đặt, mô tơ haptic tự kích hoạt. Bấm vào để thử nghiệm ngay!
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs font-bold text-cyan-700">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Tự động rung: Bật
            </span>
            <span className="flex items-center gap-1 group-hover:underline">
              Bấm để mở vòng tay & cài giờ ➔
            </span>
          </div>
        </div>

        {/* Giải pháp 3: Trắc nghiệm phản xạ 20s */}
        <div 
          onClick={() => handleOpenSolution("quiz")}
          className="bg-white rounded-3xl p-6 border-2 border-purple-100 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 cursor-pointer group transform hover:-translate-y-1 select-none relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black group-hover:scale-110 transition">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Giải pháp 03</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition">
                  Kiểm tra phản xạ 20 giây/câu chuẩn SGK
                </h3>
              </div>
            </div>
            <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition flex items-center gap-1">
              <span>Mở</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Học sinh mở ứng dụng làm ngay 3–5 câu hỏi trắc nghiệm ngắn gọn. Đồng hồ đếm ngược 20 giây rèn luyện tốc độ phản xạ và sự tập trung cao độ.
          </p>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-purple-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Học nhẹ nhàng, hiệu quả cao:</span>
            </div>
            <p className="text-slate-600">
              Chỉ mất 3–5 phút mỗi ngày, không áp lực bài vở nặng nề. Bấm vào đây để thử trả lời 1 câu trắc nghiệm 20s ngay!
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs font-bold text-purple-600">
            <span>⏱️ 20 giây mỗi câu</span>
            <span className="flex items-center gap-1 group-hover:underline">
              Bấm để thử đề 20s ➔
            </span>
          </div>
        </div>

        {/* Giải pháp 4: AI chẩn đoán & bù lỗ hổng */}
        <div 
          onClick={() => handleOpenSolution("ai")}
          className="bg-white rounded-3xl p-6 border-2 border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 cursor-pointer group transform hover:-translate-y-1 select-none relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black group-hover:scale-110 transition">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Giải pháp 04</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition">
                  AI tự động phân tích & chữa lỗi sai ngay
                </h3>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition flex items-center gap-1">
              <span>Mở</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Mỗi khi làm sai một câu hỏi, AI giải thích chi tiết phương pháp làm, nhắc lại công thức cốt lõi và tự động đưa câu hỏi đó vào danh sách ôn lại sau 24 giờ.
          </p>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Chẩn đoán 4 cấp độ:</span>
            </div>
            <p className="text-slate-600">
              Bắt mạch sai lầm ➔ Lời giải chuẩn SGK ➔ Tư duy bản chất ➔ Quy tắc cốt lõi ghi nhớ. Bấm vào để nghe giọng đọc AI!
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>🗣️ Đọc to bằng giọng nói ấm áp</span>
            <span className="flex items-center gap-1 group-hover:underline">
              Bấm để xem & nghe thử ➔
            </span>
          </div>
        </div>
      </section>

      {/* Tuyên ngôn giá trị */}
      <section className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 border border-indigo-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
            <Smile className="w-3.5 h-3.5" />
            <span>CAM KẾT CỦA STUDYSYNC AI</span>
          </div>
          <h4 className="text-lg sm:text-xl font-black text-slate-900">
            Học thông minh hơn · Không học quá nhiều · Tự tin đạt điểm cao
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Quy trình hoàn chỉnh giúp học sinh hình thành thói quen kỷ luật tự giác mỗi ngày mà phụ huynh không cần quát mắng hay thúc giục.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTo("problem")}
            className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem lại: Vấn đề</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo("practice")}
            className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <span>Trải nghiệm thực tế đầy đủ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
