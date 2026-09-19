import React, { useState } from "react";
import { 
  Sparkles, 
  Brain, 
  Watch, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  BarChart3, 
  Calendar, 
  Bell, 
  ShieldCheck, 
  ExternalLink,
  ZoomIn,
  Zap
} from "lucide-react";
import posterImg from "../assets/images/studysync_banner_donghanh_1789787021080.jpg";
import heroBannerImg from "../assets/images/studysync_banner_donghanh_1789787021080.jpg";
import { soundManager } from "../utils/audio";

interface BrandShowcaseSectionProps {
  onOpenPosterModal: () => void;
  onScrollToQuiz: () => void;
  onScrollToSchedule: () => void;
  onScrollToReminder: () => void;
}

export const BrandShowcaseSection: React.FC<BrandShowcaseSectionProps> = ({
  onOpenPosterModal,
  onScrollToQuiz,
  onScrollToSchedule,
  onScrollToReminder,
}) => {
  // Interactive mini quiz demo as shown on the poster: 5 x 8 = ?
  const [selectedDemoAnswer, setSelectedDemoAnswer] = useState<string | null>("40");
  const [activeTab, setActiveTab] = useState<string>("about");

  const scrollToSubSection = (id: string) => {
    setActiveTab(id);
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* QUICK SECTION NAVIGATOR PILL */}
      <div className="sticky top-[69px] z-30 px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-indigo-200/80 shadow-lg shadow-indigo-500/10 rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto max-w-full">
          {[
            { id: "about", label: "📖 Giới thiệu" },
            { id: "problem", label: "⚠️ Vấn đề" },
            { id: "solution", label: "💡 Giải pháp" },
            { id: "workflow", label: "⚙️ Cách hoạt động" },
            { id: "features", label: "⭐ Tính năng nổi bật" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSubSection(tab.id)}
              className={`cursor-pointer text-xs font-black px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenPosterModal}
            className="cursor-pointer text-xs font-black px-3 py-1.5 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 transition whitespace-nowrap border border-purple-200"
          >
            🖼️ Xem poster
          </button>
        </div>
      </div>

      {/* 1. PHẦN GIỚI THIỆU RIÊNG (HERO & ABOUT STUDY SYNC AI) */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-[7%]" id="about">
        {/* Subtle decorative glow backdrops */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Main Hero Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Brand Statement & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/80 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                <span className="text-xs font-black text-indigo-800 tracking-wide uppercase">
                  Giới thiệu hệ thống · Học thông minh · Thi tự tin
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.12]">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    StudySync AI
                  </span>
                  <br />
                  <span className="text-slate-800">
                    Đồng hành cùng bạn trong hành trình ôn tập!
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                  Ứng dụng AI thông minh kết hợp với vòng tay thông minh, giúp bạn ôn tập đúng trọng tâm, không bỏ sót kiến thức và tự tin hơn trước mỗi kỳ kiểm tra.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onScrollToQuiz}
                  className="cursor-pointer bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <span>Bắt đầu ôn tập ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button
                  type="button"
                  onClick={onOpenPosterModal}
                  className="cursor-pointer bg-white hover:bg-slate-50 text-indigo-700 font-extrabold text-sm sm:text-base px-5 py-3.5 rounded-2xl border border-indigo-200 shadow-xs transition flex items-center gap-2 active:scale-95"
                >
                  <ZoomIn className="w-4 h-4 text-purple-600" />
                  <span>Xem poster gốc</span>
                </button>
              </div>

              {/* 3 Value Pillars from Poster: Thông minh hơn - Tiện lợi hơn - Hiệu quả hơn */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-indigo-100/70">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 border border-indigo-100/80 shadow-xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-1.5">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    Thông minh hơn
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline mt-0.5">
                    Phát hiện lỗ hổng
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 border border-indigo-100/80 shadow-xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-1.5">
                    <Watch className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    Tiện lợi hơn
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline mt-0.5">
                    Vòng tay rung nhẹ
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 border border-indigo-100/80 shadow-xs flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    Hiệu quả hơn
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline mt-0.5">
                    Tiến bộ từng ngày
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Poster & Banner Card with Interactive Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <div 
                onClick={onOpenPosterModal}
                className="group relative cursor-pointer w-full bg-white rounded-3xl p-3 sm:p-4 shadow-2xl shadow-purple-500/20 border-2 border-indigo-200/90 transition-all transform hover:-translate-y-1.5 hover:shadow-purple-500/30"
              >
                {/* Ambient glowing colorful aura */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 rounded-[28px] blur-md opacity-25 group-hover:opacity-50 transition duration-500 -z-10" />

                {/* Badge Overlay */}
                <div className="absolute top-5 right-5 z-20 bg-slate-950/80 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 border border-purple-400/40 group-hover:scale-105 transition">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  <span>Bấm xem phóng to</span>
                </div>

                {/* Poster Image */}
                <div className="relative overflow-hidden rounded-2xl aspect-video bg-slate-100 shadow-inner">
                  <img
                    src={posterImg}
                    alt="StudySync AI Poster & Banner - Trải nghiệm ngay"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl transition duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Direct In-Image CTA button */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        onScrollToQuiz();
                      }}
                      className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xl shadow-purple-600/40 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition transform border border-white/25"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                      <span>Trải nghiệm ngay ➔</span>
                    </button>
                  </div>

                  {/* Left Bottom Pulse Badge */}
                  <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[11px] font-extrabold px-3 py-1.5 rounded-lg border border-cyan-400/30">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Luyện đề thi Lớp 6</span>
                  </div>

                  {/* Subtle Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4 pointer-events-none">
                    <span className="text-white text-xs font-bold bg-slate-900/85 px-4 py-2 rounded-xl backdrop-blur-md shadow-md flex items-center gap-1.5 border border-white/20">
                      <ZoomIn className="w-4 h-4 text-cyan-300" />
                      <span>Xem chi tiết toàn bộ thiết kế</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <div>
                    <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <span>Poster & Banner StudySync AI</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border border-purple-200">
                        Vibrant
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Chạm để phóng to & khám phá từng chi tiết
                    </div>
                  </div>
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                    Phóng to 🔍
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DEDICATED ABOUT DETAILS CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-50 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tổng quan hệ sinh thái</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  StudySync AI là gì?
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 self-start sm:self-auto">
                Bản quyền EdTech 2026 · Chuẩn GDPT Lớp 6
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  01
                </div>
                <h4 className="font-black text-slate-900 text-base">
                  Định nghĩa & Sứ mệnh
                </h4>
                <p className="text-xs sm:text-sm">
                  <strong>StudySync AI</strong> là hệ thống hỗ trợ ôn thi thông minh tích hợp giữa <strong>Trí tuệ nhân tạo (AI)</strong> và <strong>Vòng tay công nghệ (Smartband)</strong>. Ứng dụng giúp học sinh xây dựng nếp ôn bài đều đặn mỗi ngày chỉ từ 3–5 phút, xóa bỏ tình trạng học dồn, thức đêm trước ngày thi.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  02
                </div>
                <h4 className="font-black text-slate-900 text-base">
                  Bộ 3 thiết bị đồng bộ
                </h4>
                <p className="text-xs sm:text-sm">
                  Hệ sinh thái gồm 3 mắt xích khép kín: <strong>Ứng dụng di động</strong> (quản lý môn học, làm bài 20s), <strong>Vòng tay thông minh</strong> (báo rung nhẹ êm ái nhắc học), và <strong>Trợ lý AI</strong> (phân tích chẩn đoán lỗ hổng kiến thức chính xác từng dạng bài).
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  03
                </div>
                <h4 className="font-black text-slate-900 text-base">
                  Đối tượng phục vụ
                </h4>
                <p className="text-xs sm:text-sm">
                  Dành riêng cho <strong>học sinh Lớp 6 và THCS</strong> theo chương trình mới (Kết nối tri thức, Chân trời sáng tạo, Cánh Diều), đồng thời là cầu nối tin cậy giúp <strong>phụ huynh & giáo viên</strong> đồng hành cùng tiến độ học sinh mà không tạo áp lực.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION VẤN ĐỀ & GIẢI PHÁP (CHUẨN 100% THEO INFOGRAPHIC) */}
      <section className="px-4 sm:px-[7%]" id="problem-solution">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* CỘT TRÁI: VẤN ĐỀ */}
          <div id="problem" className="bg-gradient-to-br from-purple-50/90 to-pink-50/60 rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm flex flex-col justify-between scroll-mt-24">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-purple-600" />
                <span>Vấn đề</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Bạn có đang gặp những khó khăn này?
              </h2>

              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
                  <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold">
                    ❓
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-slate-800 block">
                      Quên ôn bài, không nhớ lịch kiểm tra
                    </strong>
                    <span className="text-xs text-slate-500">
                      Nhiều môn học xen kẽ khiến bạn dễ bỏ lỡ các mốc ôn quan trọng.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
                  <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold">
                    🧩
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-slate-800 block">
                      Không biết mình còn thiếu kiến thức gì
                    </strong>
                    <span className="text-xs text-slate-500">
                      Lỗ hổng kiến thức bị bỏ sót đến lúc vào phòng thi mới nhận ra.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
                  <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold">
                    🎯
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-slate-800 block">
                      Ôn tập không đúng trọng tâm
                    </strong>
                    <span className="text-xs text-slate-500">
                      Mất nhiều thời gian học lan man nhưng không vào trọng tâm đề thi.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
                  <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold">
                    📉
                  </span>
                  <div>
                    <strong className="text-sm font-bold text-slate-800 block">
                      Dễ mất động lực, dễ bị phân tâm
                    </strong>
                    <span className="text-xs text-slate-500">
                      Không có người đồng hành nhắc nhở hàng ngày khiến bạn trì hoãn.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-200/60 text-xs text-purple-700 font-bold flex items-center gap-1.5">
              <span>Đừng lo! Đã có giải pháp thông minh dành riêng cho bạn</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* CỘT PHẢI: GIẢI PHÁP */}
          <div id="solution" className="bg-gradient-to-br from-indigo-50/90 via-cyan-50/40 to-blue-50/80 rounded-3xl p-6 sm:p-8 border border-indigo-200/80 shadow-sm flex flex-col justify-between scroll-mt-24">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Giải pháp</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                StudySync AI – <br className="hidden sm:inline" />
                AI giúp bạn ôn tập thông minh
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Kết hợp AI và vòng tay thông minh để cá nhân hóa lộ trình học, nhắc nhở đúng lúc, tạo câu hỏi phù hợp và phát hiện lỗ hổng kiến thức.
              </p>

              {/* 3 Feature Cards inside Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div 
                  onClick={onScrollToSchedule}
                  className="bg-white/90 p-4 rounded-2xl border border-indigo-100 shadow-2xs hover:border-indigo-300 transition cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                    Cá nhân hóa lộ trình học
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Lên lịch từng ngày dựa trên ngày thi thực tế.
                  </p>
                </div>

                <div 
                  onClick={onScrollToReminder}
                  className="bg-white/90 p-4 rounded-2xl border border-cyan-100 shadow-2xs hover:border-cyan-300 transition cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                    <Watch className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                    Nhắc nhở bằng vòng tay
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Rung nhẹ đúng giờ ôn bài, không làm phiền.
                  </p>
                </div>

                <div 
                  onClick={onScrollToQuiz}
                  className="bg-white/90 p-4 rounded-2xl border border-purple-100 shadow-2xs hover:border-purple-300 transition cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                    Phân tích & đề xuất ôn lại
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Chẩn đoán lỗi sai và bù đắp lỗ hổng.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Badge from Poster */}
            <div className="mt-6 pt-4 border-t border-indigo-200/60 flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-700 italic">
                “Học đúng cách – Tiến bộ mỗi ngày!”
              </span>
              <button
                type="button"
                onClick={onScrollToQuiz}
                className="cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Thử ngay</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION CÁCH HOẠT ĐỘNG (5 BƯỚC KHÉP KÍN & VÍ DỤ CÂU HỎI AI) */}
      <section className="px-4 sm:px-[7%] scroll-mt-24" id="workflow">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quy trình 5 bước</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cách hoạt động của StudySync AI
            </h2>
            <p className="text-sm text-slate-600">
              5 bước đồng hành khép kín giúp học sinh luôn chủ động và tự tin trước kỳ kiểm tra
            </p>
          </div>

          {/* 5 Steps Linear Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Step 1 */}
            <div 
              onClick={onScrollToSchedule}
              className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <Smartphone className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition" />
              </div>
              <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">
                Nhập môn & ngày thi
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bạn chỉ cần nhập thông tin môn học và ngày kiểm tra vào ứng dụng.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={onScrollToSchedule}
              className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <Calendar className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition" />
              </div>
              <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">
                AI tạo lịch ôn tập
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Lên kế hoạch học tập cá nhân hóa chia đều khối lượng theo từng ngày.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={onScrollToReminder}
              className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-cyan-600 text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <Watch className="w-4 h-4 text-cyan-500 group-hover:text-cyan-700 transition" />
              </div>
              <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">
                Nhắc nhở đúng lúc
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Điện thoại gửi thông báo, vòng tay rung nhẹ êm ái khi đến giờ ôn bài.
              </p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={onScrollToQuiz}
              className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                  4
                </span>
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:text-amber-600 transition" />
              </div>
              <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">
                Tạo câu hỏi nhanh
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                3–5 câu hỏi nhanh (20 giây/câu) bám sát nội dung trọng tâm cần ôn.
              </p>
            </div>

            {/* Step 5 */}
            <div 
              onClick={onScrollToQuiz}
              className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  5
                </span>
                <BarChart3 className="w-4 h-4 text-emerald-500 group-hover:text-emerald-700 transition" />
              </div>
              <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">
                Phân tích kết quả
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Nếu sai, AI xác định đúng lỗ hổng và đề xuất phần kiến thức cần ôn lại.
              </p>
            </div>
          </div>

          {/* Interactive Poster Question Preview (Câu 1: 5 x 8 = ?) */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ví dụ câu hỏi AI trên Poster</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                Câu 1: 5 × 8 = ?
              </h3>
              <p className="text-xs text-slate-300">
                Thử chọn đáp án để xem cách AI phản hồi tức thì với thời gian 20 giây:
              </p>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { key: "A", val: "35" },
                  { key: "B", val: "40" },
                  { key: "C", val: "45" },
                  { key: "D", val: "50" },
                ].map((opt) => {
                  const isCorrect = opt.val === "40";
                  const isSelected = selectedDemoAnswer === opt.val;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedDemoAnswer(opt.val);
                      }}
                      className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between border transition active:scale-95 ${
                        isSelected
                          ? isCorrect
                            ? "bg-emerald-500 text-white border-emerald-400"
                            : "bg-rose-500 text-white border-rose-400"
                          : "bg-white/10 text-white hover:bg-white/20 border-white/10"
                      }`}
                    >
                      <span>{opt.key}. {opt.val}</span>
                      {isSelected && isCorrect && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Box as seen on Poster */}
            <div className="md:col-span-5 bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm space-y-2.5 text-center">
              {selectedDemoAnswer === "40" ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-emerald-400/20 text-emerald-300 mx-auto flex items-center justify-center font-bold text-lg">
                    🎉
                  </div>
                  <h4 className="text-sm font-black text-emerald-300">
                    Tuyệt vời! Bạn đã chọn đúng.
                  </h4>
                  <div className="text-xs text-white/90">
                    Đáp án chính xác: <strong>40</strong>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onScrollToQuiz}
                      className="cursor-pointer text-[11px] font-black bg-indigo-500 hover:bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition inline-flex items-center gap-1"
                    >
                      <span>Vào làm bài 20s thật</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-rose-400/20 text-rose-300 mx-auto flex items-center justify-center font-bold text-lg">
                    ⚠️
                  </div>
                  <h4 className="text-sm font-black text-rose-300">
                    Nếu sai nhiều...
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    AI sẽ phân tích và gợi ý ôn lại phần kiến thức liên quan ngay lập tức!
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDemoAnswer("40")}
                      className="cursor-pointer text-[11px] font-bold text-cyan-300 hover:underline"
                    >
                      Chọn lại đáp án đúng (40)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TÍNH NĂNG NỔI BẬT (5 TÍNH NĂNG Ở CHÂN POSTER) */}
      <section className="px-4 sm:px-[7%] scroll-mt-24" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-50 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base sm:text-xl font-black text-slate-900">
                  Tính năng nổi bật của StudySync AI
                </h3>
              </div>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Ecosystem 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/90 flex flex-col justify-between">
                <div>
                  <div className="text-indigo-600 font-black text-sm mb-1.5 flex items-center gap-1.5">
                    <Brain className="w-4 h-4" />
                    <span>AI tạo câu hỏi</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Đa dạng dạng câu hỏi, bám sát chương trình SGK mới (Toán, Văn, Anh, KHTN).
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md self-start border border-indigo-100">
                  20s/câu hỏi
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100/90 flex flex-col justify-between">
                <div>
                  <div className="text-cyan-700 font-black text-sm mb-1.5 flex items-center gap-1.5">
                    <Watch className="w-4 h-4" />
                    <span>Vòng tay thông minh</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rung nhẹ nhắc nhở học tập mọi lúc, mọi nơi không gây ồn, không làm phiền người xung quanh.
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-bold text-cyan-800 bg-white px-2 py-0.5 rounded-md self-start border border-cyan-100">
                  Rung êm ái
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/90 flex flex-col justify-between">
                <div>
                  <div className="text-purple-700 font-black text-sm mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Lịch ôn cá nhân hóa</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tối ưu thời gian, phù hợp với từng môn học và ngày thi thực tế của học sinh.
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded-md self-start border border-purple-100">
                  Tự động phân bổ
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/90 flex flex-col justify-between">
                <div>
                  <div className="text-blue-700 font-black text-sm mb-1.5 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>Theo dõi tiến độ</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Biết rõ điểm mạnh, điểm yếu và sự tiến bộ từng ngày qua biểu đồ trực quan.
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md self-start border border-blue-100">
                  Chẩn đoán hổng kiến thức
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/90 flex flex-col justify-between">
                <div>
                  <div className="text-emerald-700 font-black text-sm mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Báo cáo chi tiết</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Giúp phụ huynh và giáo viên nắm bắt tình hình học tập và đồng hành hiệu quả.
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md self-start border border-emerald-100">
                  Minh bạch & an toàn
                </span>
              </div>
            </div>

            {/* Bottom Callout Banner as shown in the Poster */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-base font-black">
                  Không chỉ là ứng dụng mà còn là người bạn đồng hành trên con đường học tập của bạn!
                </h4>
                <p className="text-xs text-indigo-100 mt-0.5">
                  Đồng bộ tức thời giữa điện thoại, vòng tay thông minh và trí tuệ nhân tạo.
                </p>
              </div>
              <button
                type="button"
                onClick={onScrollToQuiz}
                className="cursor-pointer shrink-0 bg-white hover:bg-indigo-50 text-indigo-900 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1.5"
              >
                <span>Bắt đầu ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
