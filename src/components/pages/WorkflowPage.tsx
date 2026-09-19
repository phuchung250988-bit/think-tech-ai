import React, { useState } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Calendar, 
  Watch, 
  Smartphone, 
  Brain, 
  BarChart3, 
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { soundManager } from "../../utils/audio";

interface WorkflowPageProps {
  onNavigateTo: (tabId: string) => void;
}

export const WorkflowPage: React.FC<WorkflowPageProps> = ({ onNavigateTo }) => {
  const [selectedDemoAnswer, setSelectedDemoAnswer] = useState<string | null>("40");

  const handleSelectAnswer = (ans: string) => {
    setSelectedDemoAnswer(ans);
    soundManager.playFeedback(ans === "40");
  };

  return (
    <div className="w-full space-y-12 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-cyan-300 text-xs font-black border border-indigo-400/30">
            <Sparkles className="w-4 h-4" />
            <span>QUY TRÌNH KHÉP KÍN 5 BƯỚC</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Cách hoạt động của StudySync AI
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed">
            Từ lúc nhập ngày thi tới khi tự tin bước vào phòng thi, hệ thống vận hành tự động theo vòng lặp 5 bước khép kín và khoa học.
          </p>
        </div>
      </section>

      {/* 5 Steps Timeline Cards */}
      <section className="space-y-4">
        {[
          {
            step: "01",
            title: "Nhập thông tin kỳ thi",
            desc: "Học sinh hoặc phụ huynh nhập môn học (Toán, Văn, Anh, KHTN...), thời gian thi và các bài/chương kiến thức trọng tâm cần ôn tập.",
            icon: Calendar,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            border: "border-indigo-100",
            badge: "Bước khởi đầu",
          },
          {
            step: "02",
            title: "AI tạo lịch ôn cá nhân hóa",
            desc: "Thuật toán AI tự động phân bổ khối lượng kiến thức thành các phiên ôn nhỏ gọn 3–5 phút mỗi ngày, tránh dồn ứ vào ngày cuối.",
            icon: Brain,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100",
            badge: "Tự động phân bổ",
          },
          {
            step: "03",
            title: "Vòng tay rung nhẹ nhắc nhở",
            desc: "Đúng khung giờ học cố định đã cài đặt (ví dụ 19:00), vòng tay thông minh rung nhẹ trên cổ tay tạo phản xạ học tập tự giác, không ồn ào.",
            icon: Watch,
            color: "text-cyan-700",
            bg: "bg-cyan-50",
            border: "border-cyan-100",
            badge: "Đồng bộ phần cứng",
          },
          {
            step: "04",
            title: "Học sinh làm bài nhanh 20 giây/câu",
            desc: "Mở ứng dụng trên điện thoại, đồng hồ đếm ngược 20 giây cho mỗi câu trắc nghiệm kích thích tư duy phản xạ nhanh và sự tập trung cao độ.",
            icon: Smartphone,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
            badge: "3–5 phút mỗi ngày",
          },
          {
            step: "05",
            title: "AI phân tích & lấp đầy lỗ hổng",
            desc: "Hệ thống tự động ghi nhận câu sai, giải thích chi tiết phương pháp làm đúng và tự động sắp xếp nhắc lại vào buổi ôn tiếp theo.",
            icon: BarChart3,
            color: "text-emerald-700",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            badge: "Khép kín chu trình",
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.step}
              className={`bg-white rounded-3xl p-5 sm:p-6 border-2 ${item.border} shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition`}
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center font-black text-lg shrink-0`}>
                  {item.step}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">GIAI ĐOẠN {idx + 1}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.bg} ${item.color}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className={`p-3 rounded-2xl ${item.bg} ${item.color} hidden lg:flex shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Interactive Mini Demo từ Poster (5 x 8 = ?) */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200/90 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MÔ PHỎNG CÂU HỎI TRÊN POSTER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Thử nghiệm câu hỏi phản xạ 20 giây của StudySync AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Hãy thử bấm chọn đáp án dưới đây để xem cách AI phản hồi giải thích ngay khi bạn trả lời:
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 border border-indigo-100 shadow-md space-y-5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-3">
            <span className="text-indigo-600 font-black">Toán Lớp 6 · Phép nhân số tự nhiên</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">⏱️ 20 giây/câu</span>
          </div>

          <div className="text-center py-2 space-y-1">
            <div className="text-xs text-slate-400 font-bold uppercase">Câu hỏi trắc nghiệm</div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-wider">
              5 × 8 = ?
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "35", label: "A. 35" },
              { key: "40", label: "B. 40" },
              { key: "45", label: "C. 45" },
              { key: "50", label: "D. 50" },
            ].map((opt) => {
              const isSelected = selectedDemoAnswer === opt.key;
              const isCorrect = opt.key === "40";
              let btnStyle = "bg-slate-50 hover:bg-indigo-50/60 text-slate-700 border-slate-200";
              
              if (isSelected) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md";
                } else {
                  btnStyle = "bg-rose-500 text-white border-rose-600 shadow-md";
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectAnswer(opt.key)}
                  className={`cursor-pointer p-3.5 rounded-2xl border-2 font-black text-sm transition-all transform active:scale-95 flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.label}</span>
                  {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                </button>
              );
            })}
          </div>

          {/* AI Explanation feedback */}
          {selectedDemoAnswer && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              selectedDemoAnswer === "40"
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-rose-50 border-rose-200 text-rose-950"
            }`}>
              <div className="font-black flex items-center gap-1.5 mb-1">
                <Brain className="w-4 h-4" />
                <span>{selectedDemoAnswer === "40" ? "Chính xác! AI ghi nhận phản xạ tốt" : "Chưa chính xác! AI phân tích:"}</span>
              </div>
              {selectedDemoAnswer === "40" ? (
                <p>
                  Đáp án đúng là <strong>40</strong> (theo bảng nhân 5: 5 × 8 = 40). Bạn đạt phản xạ trong thời gian chuẩn!
                </p>
              ) : (
                <p>
                  Bạn chọn <strong>{selectedDemoAnswer}</strong>. Đáp án đúng là <strong>40</strong> (5 × 8 = 40). Hệ thống sẽ tự động nhắc lại dạng bài nhân chia trong buổi học ngày mai.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="bg-white border border-indigo-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigateTo("solution")}
          className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Xem lại: Giải pháp</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTo("features")}
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2 active:scale-95"
        >
          <span>Xem tiếp: Tính năng nổi bật</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
