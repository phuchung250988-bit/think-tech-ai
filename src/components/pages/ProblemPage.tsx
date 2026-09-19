import React from "react";
import { 
  AlertCircle, 
  HelpCircle, 
  Target, 
  BatteryLow, 
  Clock, 
  Frown, 
  TrendingDown, 
  ArrowRight,
  ArrowLeft,
  Flame
} from "lucide-react";
import { soundManager } from "../../utils/audio";

interface ProblemPageProps {
  onNavigateTo: (tabId: string) => void;
}

export const ProblemPage: React.FC<ProblemPageProps> = ({ onNavigateTo }) => {
  return (
    <div className="w-full space-y-10 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-black border border-purple-400/30">
            <AlertCircle className="w-4 h-4 text-purple-300" />
            <span>THỰC TRẠNG ÔN THI HIỆN NAY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Những khó khăn lớn nhất học sinh thường gặp khi ôn tập
          </h1>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
            Chuyển cấp lên Lớp 6 với lượng môn học gấp đôi, kiến thức trừu tượng hơn và nhiều bài kiểm tra định kỳ khiến nhiều bạn rơi vào tình trạng quá tải, học trước quên sau.
          </p>
        </div>
      </section>

      {/* 4 Major Problems (From Poster & Deep Dive) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vấn đề 1 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-sm hover:border-purple-300 transition space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Vấn đề 01</span>
              <h3 className="text-lg font-black text-slate-900">Quên ôn bài & quên ngày kiểm tra</h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Lịch học dày đặc các môn Toán, Văn, Anh, KHTN, Sử - Địa, GDCD... khiến học sinh dễ bị sót ngày kiểm tra 15 phút hoặc 1 tiết.
          </p>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Hậu quả thực tế:</span>
            </div>
            <p className="text-slate-600">
              Chỉ nhớ ra vào tối hôm trước thi, dẫn đến việc phải <strong>học dồn dập trong 1 đêm</strong>, thức khuya mệt mỏi và vào phòng thi với tâm lý hoang mang.
            </p>
          </div>
        </div>

        {/* Vấn đề 2 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm hover:border-indigo-300 transition space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Vấn đề 02</span>
              <h3 className="text-lg font-black text-slate-900">Không biết mình hổng kiến thức ở đâu</h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Học sinh đọc lại toàn bộ sách giáo khoa từ đầu tới cuối mà không biết phần nào mình đã vững, công thức nào mình chưa hiểu bản chất.
          </p>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Hậu quả thực tế:</span>
            </div>
            <p className="text-slate-600">
              Có "cảm giác đã học bài" nhưng khi gặp dạng bài biến thể trong đề thi thật thì <strong>lại sai những lỗi quen thuộc</strong> mà không tự phát hiện được.
            </p>
          </div>
        </div>

        {/* Vấn đề 3 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-rose-100 shadow-sm hover:border-rose-300 transition space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Vấn đề 03</span>
              <h3 className="text-lg font-black text-slate-900">Ôn lan man, không đúng trọng tâm</h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Dành quá nhiều thời gian cho những câu hỏi quá dễ đã làm tốt, hoặc sa đà vào lý thuyết phụ mà bỏ qua các dạng bài trọng tâm chiếm nhiều điểm.
          </p>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Hậu quả thực tế:</span>
            </div>
            <p className="text-slate-600">
              Mất hàng tiếng đồng hồ ngồi bên bàn học nhưng kết quả kiểm tra <strong>không tương xứng với công sức bỏ ra</strong>, gây ức chế tâm lý.
            </p>
          </div>
        </div>

        {/* Vấn đề 4 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm hover:border-amber-300 transition space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
              <BatteryLow className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Vấn đề 04</span>
              <h3 className="text-lg font-black text-slate-900">Mất động lực & dễ bị phân tâm</h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Mở điện thoại để học bài thì ngay lập tức bị cuốn vào video ngắn, mạng xã hội hay tin nhắn thông báo trò chuyện cùng bạn bè.
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Hậu quả thực tế:</span>
            </div>
            <p className="text-slate-600">
              Thời gian học bị chia vụn, khó tập trung sâu và phụ huynh phải thường xuyên nhắc nhở gây áp lực căng thẳng trong gia đình.
            </p>
          </div>
        </div>
      </section>

      {/* Tóm tắt vòng xoáy luẩn quẩn */}
      <section className="bg-purple-50/70 border border-purple-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="text-xs font-black text-purple-700 uppercase tracking-wider">
            VÒNG LẶP TIÊU CỰC CẦN PHÁ VỠ
          </div>
          <h4 className="text-lg sm:text-xl font-black text-slate-900">
            Quên lịch ➔ Học dồn đêm trước thi ➔ Điểm thấp ➔ Tự ti và chán nản
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Để giải quyết triệt để vấn đề này, học sinh cần một công cụ thông minh nhắc nhở tự động mỗi ngày và chẩn đoán chính xác lỗ hổng kiến thức.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTo("about")}
            className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Giới thiệu</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo("solution")}
            className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <span>Khám phá Giải pháp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
