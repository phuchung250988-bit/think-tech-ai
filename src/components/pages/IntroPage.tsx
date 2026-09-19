import React from "react";
import { 
  Sparkles, 
  Brain, 
  Watch, 
  BarChart3, 
  ArrowRight, 
  ZoomIn, 
  BookOpen, 
  ShieldCheck, 
  Smartphone,
  CheckCircle2,
  Users,
  Zap
} from "lucide-react";
import posterImg from "../../assets/images/studysync_banner_donghanh_1789787021080.jpg";
import { soundManager } from "../../utils/audio";

interface IntroPageProps {
  onOpenPosterModal: () => void;
  onNavigateTo: (tabId: string) => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({
  onOpenPosterModal,
  onNavigateTo,
}) => {
  return (
    <div className="w-full space-y-12 animate-fadeIn">
      {/* 1. HERO SECTION WITH PROMINENT PANORAMIC BANNER & VALUE PROPOSITION */}
      <section className="relative overflow-hidden pt-4 pb-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/70 via-white to-indigo-50/30 rounded-3xl border border-indigo-100 shadow-sm space-y-8">
        {/* Glow decor */}
        <div className="absolute top-0 right-10 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Panoramic Official Banner Card matching user reference image */}
          <div 
            className="group relative w-full bg-white rounded-3xl p-2.5 sm:p-4 shadow-2xl shadow-purple-500/20 border-2 border-indigo-200/90 transition-all"
          >
            {/* Ambient glowing colorful aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 rounded-[28px] blur-md opacity-25 group-hover:opacity-45 transition duration-500 -z-10" />

            {/* Top Right Floating Badge */}
            <div 
              onClick={onOpenPosterModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 bg-slate-950/85 backdrop-blur-md text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 border border-purple-400/40 cursor-pointer hover:scale-105 active:scale-95 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Bấm phóng to poster</span>
            </div>

            <div className="relative overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[2.1/1] lg:aspect-[2.35/1] bg-slate-900 shadow-inner">
              {/* High-res generated base artwork with character and background */}
              <img
                src={posterImg}
                alt="StudySync AI - Đồng hành cùng bạn trong hành trình ôn tập!"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.01]"
              />

              {/* Exact In-Banner Glass Panel on left (matching user's reference image) */}
              <div className="absolute inset-y-3 left-3 sm:inset-y-4 sm:left-4 z-20 w-[92%] sm:w-[58%] md:w-[52%] lg:w-[46%] max-w-lg bg-white/92 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 flex flex-col justify-between transition-all">
                <div className="space-y-2 sm:space-y-3">
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-black text-indigo-700 uppercase tracking-wide">
                      Học thông minh • Thi tự tin
                    </span>
                  </div>

                  {/* Main Title & Subtitle inside the image panel */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      StudySync AI
                    </h1>
                    <h2 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug mt-1">
                      Đồng hành cùng bạn trong hành trình ôn tập!
                    </h2>
                  </div>

                  {/* Description inside image panel */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium line-clamp-3 sm:line-clamp-none">
                    Ứng dụng AI thông minh kết hợp với vòng tay thông minh, giúp học sinh ôn tập đúng trọng tâm, không bỏ sót kiến thức và tự tin hơn trước mỗi kỳ kiểm tra.
                  </p>

                  {/* Action Buttons inside banner */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        onNavigateTo("practice");
                      }}
                      className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition transform border border-white/20"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Trải nghiệm ngay ➔</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenPosterModal}
                      className="cursor-pointer bg-white hover:bg-slate-50 text-indigo-800 font-bold text-xs sm:text-sm px-3.5 py-2 sm:py-2.5 rounded-xl border border-indigo-200 shadow-2xs flex items-center gap-1.5 hover:scale-105 active:scale-95 transition"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Xem poster gốc</span>
                    </button>
                  </div>
                </div>

                {/* 3 mini cards inside banner panel (matching reference) */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-indigo-100/80">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-white/95 border border-indigo-100 text-center shadow-2xs">
                    <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 mx-auto mb-0.5" />
                    <div className="text-[10px] sm:text-[11px] font-black text-slate-800 leading-tight">Thông minh hơn</div>
                    <div className="text-[9px] text-slate-500 truncate mt-0.5">Phát hiện lỗ hổng</div>
                  </div>

                  <div className="p-1.5 sm:p-2 rounded-xl bg-white/95 border border-indigo-100 text-center shadow-2xs">
                    <Watch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 mx-auto mb-0.5" />
                    <div className="text-[10px] sm:text-[11px] font-black text-slate-800 leading-tight">Tiện lợi hơn</div>
                    <div className="text-[9px] text-slate-500 truncate mt-0.5">Vòng tay rung nhẹ</div>
                  </div>

                  <div className="p-1.5 sm:p-2 rounded-xl bg-white/95 border border-indigo-100 text-center shadow-2xs">
                    <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mx-auto mb-0.5" />
                    <div className="text-[10px] sm:text-[11px] font-black text-slate-800 leading-tight">Hiệu quả hơn</div>
                    <div className="text-[9px] text-slate-500 truncate mt-0.5">Tiến bộ từng ngày</div>
                  </div>
                </div>
              </div>

              {/* Right Bottom Pulse Badge */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 hidden sm:flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md text-cyan-300 text-[11px] font-extrabold px-3 py-1.5 rounded-lg border border-cyan-400/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>AI Lớp 6 · Đồng hành cùng bạn</span>
              </div>
            </div>

            {/* Banner Footer Caption */}
            <div className="mt-3 flex items-center justify-between px-1">
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
                  <span>Banner StudySync AI · Đồng hành cùng bạn trong hành trình ôn tập!</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border border-purple-200">
                    Official
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Thiết kế đầy đủ các thành phần: Ứng dụng AI, vòng tay thông minh và quy trình ôn tập hiệu quả.
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenPosterModal}
                className="cursor-pointer text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Mở toàn màn hình</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick highlight bar under the all-in-one hero banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/80 border border-indigo-100/90 shadow-2xs text-center">
              <div className="text-base sm:text-lg font-black text-indigo-600">Lớp 6</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Chuẩn GDPT 2018</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-indigo-100/90 shadow-2xs text-center">
              <div className="text-base sm:text-lg font-black text-purple-600">4 Môn Học</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Toán · Văn · Anh · KHTN</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-indigo-100/90 shadow-2xs text-center">
              <div className="text-base sm:text-lg font-black text-cyan-600">Vòng Tay Smart</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Rung nhắc & Bấm giờ</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-indigo-100/90 shadow-2xs text-center">
              <div className="text-base sm:text-lg font-black text-emerald-600">AI Trợ Lý</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Lấp lỗ hổng tức thì</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHI TIẾT VỀ HỆ THỐNG STUDYSYNC AI */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Giới thiệu chuyên sâu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            StudySync AI là gì và ra đời vì điều gì?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            StudySync AI không chỉ là một ứng dụng di động thông thường, mà là một <strong>hệ sinh thái công nghệ hỗ trợ học tập khép kín</strong> kết nối giữa Điện thoại, Vòng tay thông minh và Trợ lý AI giáo dục.
          </p>
        </div>

        {/* 3 Core Architecture Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-sm">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">
              1. Ứng dụng điện thoại
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Nơi học sinh quản lý môn học, nhận kế hoạch ôn tập chia đều các ngày và thực hiện các bài kiểm tra trắc nghiệm phản xạ 20 giây/câu chuẩn chương trình SGK mới.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black text-base shadow-sm">
              <Watch className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">
              2. Vòng tay thông minh
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Thiết bị đeo tay rung nhẹ êm ái đúng giờ học đã lên lịch. Tạo phản xạ tự giác ôn bài mà không gây ồn ào hay khiến học sinh bị phân tâm bởi mạng xã hội.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-base shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">
              3. Trí tuệ nhân tạo (AI)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Động cơ AI tự động phát hiện chính xác lỗ hổng kiến thức khi học sinh làm sai, lập tức đề xuất tóm tắt công thức và bài tập tương tự để củng cố ngay.
            </p>
          </div>
        </div>

        {/* Target Audience & Program alignment */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-cyan-300 text-xs font-black">
              <ShieldCheck className="w-4 h-4" />
              <span>CHUẨN CHƯƠNG TRÌNH GDPT MỚI</span>
            </div>
            <h4 className="text-base font-black">
              Thiết kế chuyên biệt cho học sinh Lớp 6 và THCS
            </h4>
            <p className="text-xs text-slate-300">
              Bao trọn các bộ sách giáo khoa hiện hành: <em>Kết nối tri thức, Chân trời sáng tạo, Cánh Diều</em> cho các môn Toán, Ngữ văn, Tiếng Anh và Khoa học Tự nhiên.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTo("problem")}
            className="cursor-pointer shrink-0 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <span>Xem tiếp: Vấn đề học sinh gặp phải</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </section>
    </div>
  );
};
