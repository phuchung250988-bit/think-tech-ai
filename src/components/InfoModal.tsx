import React from "react";
import { X, Sparkles, Smartphone, Watch, Brain, CheckCircle2 } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartStudy: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  onStartStudy,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#315bea] to-[#6c5ce7] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6 text-[#b9ffdc]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#172033]">
              StudySync AI hoạt động thế nào?
            </h3>
            <p className="text-xs text-[#687387]">
              Cơ chế phối hợp ba thành phần thông minh
            </p>
          </div>
        </div>

        {/* Main Explanation Block from User Prompt */}
        <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 text-sm text-[#1e3a8a] leading-relaxed font-medium">
          “StudySync AI kết nối ứng dụng trên điện thoại với vòng tay thông minh. AI lập lịch ôn, nhắc giờ bằng rung nhẹ và tạo câu hỏi để phát hiện phần kiến thức còn yếu.”
        </div>

        {/* 3 Pillars Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-blue-100 text-[#315bea] shrink-0">
              <Watch className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-[#172033]">1. Vòng tay thông minh (Smartband)</h5>
              <p className="text-xs text-slate-600 mt-0.5">
                Rung nhẹ nhàng vào đúng khung giờ sinh hoạt phù hợp mà không cần phát tiếng chuông làm gián đoạn lớp học hay gia đình.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-purple-100 text-[#6c5ce7] shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-[#172033]">2. Ứng dụng điện thoại</h5>
              <p className="text-xs text-slate-600 mt-0.5">
                Chỉ mất 3–5 phút để hoàn thành 3 câu hỏi trắc nghiệm chẩn đoán nhanh. Thiết kế gọn nhẹ, không gây áp lực thời gian.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-[#172033]">3. Trí tuệ nhân tạo (StudySync AI)</h5>
              <p className="text-xs text-slate-600 mt-0.5">
                Phân tích sâu xem học sinh sai do bất cẩn hay do rỗng kiến thức nền, từ đó tự động điều chỉnh lịch nhắc cho những ngày tiếp theo.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              onStartStudy();
            }}
            className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#315bea] hover:bg-[#234acb] shadow-md transition flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Trải nghiệm ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
