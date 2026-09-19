import React from "react";
import { Calendar, BellRing, BrainCircuit, ArrowRight, CheckCircle } from "lucide-react";

interface FeaturesSectionProps {
  onOpenSchedule: () => void;
  onOpenQuiz: () => void;
  onTestBand: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenSchedule,
  onOpenQuiz,
  onTestBand,
}) => {
  const steps = [
    {
      stepNumber: "1️⃣",
      lucideIcon: Calendar,
      title: "Lập lịch",
      desc: "Nhập môn học và ngày kiểm tra. AI gợi ý lịch ôn tập theo từng ngày.",
      highlight: "Tự động phân bổ theo Spaced Repetition",
      actionText: "Tạo lịch ôn ngay",
      action: onOpenSchedule,
      tag: "Bước 1",
    },
    {
      stepNumber: "2️⃣",
      lucideIcon: BellRing,
      title: "Nhắc đúng lúc",
      desc: "Khi đến giờ học, vòng tay rung nhẹ và điện thoại gửi thông báo.",
      highlight: "Không tiếng ồn chuông reo, bảo vệ sự tập trung",
      actionText: "Thử rung vòng tay",
      action: onTestBand,
      tag: "Bước 2",
    },
    {
      stepNumber: "3️⃣",
      lucideIcon: BrainCircuit,
      title: "AI kiểm tra",
      desc: "AI đưa 3–5 câu hỏi nhanh, phân tích câu trả lời và gợi ý phần cần ôn lại.",
      highlight: "Chẩn đoán chính xác lỗ hổng nhận thức",
      actionText: "Làm bài thử 2 phút",
      action: onOpenQuiz,
      tag: "Bước 3",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-[#f5f8ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#315bea] bg-[#e5ebff] px-3.5 py-1.5 rounded-full border border-blue-200">
            Quy trình khép kín
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight mt-3">
            StudySync AI hoạt động như thế nào?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#687387] leading-relaxed">
            Điện thoại và vòng tay thông minh phối hợp với AI để tạo một quy trình ôn tập đơn giản.
          </p>
        </div>

        {/* Feature 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => {
            const IconComp = item.lucideIcon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-[0_8px_25px_rgba(38,60,122,0.08)] border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.stepNumber}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-blue-50 text-[#315bea]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#172033]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[#687387] text-sm sm:text-base leading-relaxed mt-3">
                    {item.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span>{item.highlight}</span>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-100">
                  <button
                    onClick={item.action}
                    className="cursor-pointer w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#315bea] bg-blue-50 hover:bg-blue-100/80 transition flex items-center justify-center gap-1.5 group"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Ecosystem Visual Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#111b35] via-[#1a2850] to-[#111b35] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-700/50">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6cf0ae] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#6cf0ae] animate-ping" />
              Hệ sinh thái đồng bộ 3 chiều
            </div>
            <h4 className="text-xl sm:text-2xl font-bold">
              AI Cloud ↔ Điện thoại học sinh ↔ Vòng tay thông minh
            </h4>
            <p className="text-slate-300 text-sm max-w-2xl">
              Khi học sinh hoàn thành bài kiểm tra nhanh trên điện thoại, kết quả sẽ ngay lập tức được AI cập nhật vào lịch ôn tiếp theo trên vòng tay.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-center text-xs font-medium">
              <span className="block text-[#6cf0ae] font-bold text-base">3-5 phút</span>
              Thời gian mỗi lượt ôn
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-center text-xs font-medium">
              <span className="block text-[#b9ffdc] font-bold text-base">0 áp lực</span>
              Hình thành thói quen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
