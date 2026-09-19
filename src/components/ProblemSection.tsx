import React from "react";
import { BookOpen, Puzzle, Target, AlertTriangle } from "lucide-react";

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: "📚",
      lucideIcon: BookOpen,
      title: "Quên ôn bài",
      desc: "Học sinh dễ bỏ quên việc ôn tập khi có nhiều môn học và hoạt động hằng ngày.",
      impact: "Kiến thức cũ trôi đi theo đường cong quên lãng Ebbinghaus chỉ sau 48 giờ.",
      color: "from-blue-500/10 to-indigo-500/10",
      accent: "text-blue-600",
    },
    {
      icon: "🧩",
      lucideIcon: Puzzle,
      title: "Lỗ hổng kiến thức",
      desc: "Những phần chưa hiểu hoặc đã quên không được phát hiện kịp thời.",
      impact: "Tích tụ thành tâm lý sợ kiểm tra và điểm số sụt giảm bất ngờ.",
      color: "from-purple-500/10 to-pink-500/10",
      accent: "text-purple-600",
    },
    {
      icon: "🎯",
      lucideIcon: Target,
      title: "Ôn chưa đúng trọng tâm",
      desc: "Học sinh có thể dành nhiều thời gian nhưng chưa tập trung vào phần mình còn yếu.",
      impact: "Học dàn trải gây mệt mỏi, học vẹt nhưng hiệu quả thi cử không cao.",
      color: "from-amber-500/10 to-orange-500/10",
      accent: "text-amber-600",
    },
  ];

  return (
    <section id="problem" className="py-16 md:py-24 bg-white/70 backdrop-blur-sm border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold mb-3 border border-rose-100">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Thực trạng ôn thi hiện nay</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
            Vấn đề StudySync AI giải quyết
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#687387] leading-relaxed">
            Một số học sinh chưa duy trì thói quen ôn tập thường xuyên. Khi đến lúc kiểm tra, kiến thức dễ bị quên và xuất hiện nhiều “lỗ hổng”.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((p, idx) => {
            const IconComp = p.lucideIcon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-[0_8px_25px_rgba(38,60,122,0.06)] border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl filter drop-shadow-sm">{p.icon}</span>
                    <div className={`p-2.5 rounded-xl bg-slate-50 group-hover:scale-110 transition ${p.accent}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#172033] mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-[#687387] text-sm sm:text-base leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl">
                  <span className="font-bold text-slate-700 shrink-0">Hệ quả:</span>
                  <span>{p.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
