import React from "react";
import { 
  Sparkles, 
  Brain, 
  Watch, 
  Calendar, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { soundManager } from "../../utils/audio";

interface FeaturesPageProps {
  onNavigateTo: (tabId: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigateTo }) => {
  return (
    <div className="w-full space-y-12 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-black border border-purple-400/30">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>5 TÍNH NĂNG CỐT LÕI TỪ POSTER</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Tính năng nổi bật của StudySync AI
          </h1>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
            Hệ sinh thái EdTech được nghiên cứu kỹ lưỡng để giải quyết dứt điểm các vướng mắc của học sinh THCS trong quá trình ôn bài mỗi ngày.
          </p>
        </div>
      </section>

      {/* 5 Core Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. AI tạo câu hỏi */}
        <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm hover:border-indigo-300 transition space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
              <Brain className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider">Tính năng 01</span>
            <h3 className="text-lg font-black text-slate-900">
              AI tạo câu hỏi đa dạng
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ngân hàng câu hỏi trắc nghiệm tự sinh liên tục theo chuẩn khung năng lực SGK mới. Đa dạng mức độ từ Nhận biết, Thông hiểu đến Vận dụng.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-bold">
            <span>Bám sát 3 bộ SGK mới</span>
            <span className="bg-indigo-50 px-2 py-0.5 rounded-md">20s/câu</span>
          </div>
        </div>

        {/* 2. Vòng tay thông minh */}
        <div className="bg-white rounded-3xl p-6 border-2 border-cyan-100 shadow-sm hover:border-cyan-300 transition space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-black">
              <Watch className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold text-cyan-700 uppercase tracking-wider">Tính năng 02</span>
            <h3 className="text-lg font-black text-slate-900">
              Vòng tay thông minh nhắc nhở
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Báo rung nhẹ êm ái trên cổ tay đúng giờ học. Nhắc nhở mọi lúc, mọi nơi mà không gây ồn ào hay làm phiền những người xung quanh.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-cyan-800 font-bold">
            <span>Rung êm ái, kín đáo</span>
            <span className="bg-cyan-50 px-2 py-0.5 rounded-md">Không chuông ồn</span>
          </div>
        </div>

        {/* 3. Lịch ôn cá nhân hóa */}
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-sm hover:border-purple-300 transition space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold text-purple-600 uppercase tracking-wider">Tính năng 03</span>
            <h3 className="text-lg font-black text-slate-900">
              Lịch ôn cá nhân hóa
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tự động phân bổ lịch trình ôn tập theo từng môn học và ngày thi thực tế, tối ưu hóa thời gian và năng lượng của học sinh.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
            <span>Tối ưu thời gian</span>
            <span className="bg-purple-50 px-2 py-0.5 rounded-md">Chia nhỏ 5p</span>
          </div>
        </div>

        {/* 4. Theo dõi tiến độ */}
        <div className="bg-white rounded-3xl p-6 border-2 border-blue-100 shadow-sm hover:border-blue-300 transition space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">Tính năng 04</span>
            <h3 className="text-lg font-black text-slate-900">
              Theo dõi tiến độ & điểm yếu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Biết rõ điểm mạnh, điểm yếu và mức độ hoàn thành bài ôn mỗi ngày qua hệ thống radar biểu đồ kiến thức trực quan và sinh động.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-bold">
            <span>Radar kiến thức</span>
            <span className="bg-blue-50 px-2 py-0.5 rounded-md">Tiến bộ từng ngày</span>
          </div>
        </div>

        {/* 5. Báo cáo chi tiết cho phụ huynh & giáo viên */}
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm hover:border-emerald-300 transition space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-2">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">Tính năng 05</span>
            <h3 className="text-lg font-black text-slate-900">
              Báo cáo chi tiết cho phụ huynh và giáo viên
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Báo cáo tiến độ học tập hàng tuần tự động gửi tới phụ huynh và giáo viên chủ nhiệm. Giúp người lớn thấu hiểu nỗ lực của con em mà không cần gây áp lực hay kiểm tra điện thoại gắt gao.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-bold">
            <span>Đồng hành tin cậy</span>
            <span className="bg-emerald-50 px-2 py-0.5 rounded-md">Báo cáo tuần tự động</span>
          </div>
        </div>
      </section>

      {/* Bảng so sánh Trước & Sau khi dùng StudySync AI */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-1">
          <div className="text-xs font-black text-indigo-600 uppercase tracking-wider">BẢNG SO SÁNH TRỰC QUAN</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Sự khác biệt khi học sinh có StudySync AI đồng hành
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột Trước kia */}
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-black text-sm uppercase">
              <XCircle className="w-4 h-4" />
              <span>Khi chưa có StudySync AI</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Thường xuyên quên lịch kiểm tra cho đến tối hôm trước.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Học dồn 3–4 tiếng trước khi thi, mệt mỏi và dễ quên sạch.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Ôn lan man toàn bộ sách, không rõ mình đang yếu phần nào.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Phụ huynh phải thường xuyên nhắc nhở, dễ gây cáu gắt.</span>
              </li>
            </ul>
          </div>

          {/* Cột Hiện tại */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Có StudySync AI đồng hành</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Vòng tay rung nhẹ nhắc giờ ôn đều đặn mỗi tối.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Chỉ 3–5 phút ôn nhẹ nhàng, kiến thức ngấm sâu tự nhiên.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>AI chỉ rõ lỗ hổng và chữa lỗi sai ngay tức thì.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Tự giác 100%, phụ huynh an tâm với báo cáo tiến độ tuần.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="bg-white border border-indigo-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigateTo("workflow")}
          className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Xem lại: Cách hoạt động</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTo("practice")}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 active:scale-95"
        >
          <span>Trải nghiệm thực tế ngay (3 Tính năng)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
