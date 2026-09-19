import React from "react";
import { Sparkles, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-10 text-center text-[#7b8494] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-800 text-base">
          <Sparkles className="w-4 h-4 text-[#315bea]" />
          <span>StudySync AI</span>
          <span className="text-slate-300">·</span>
          <span className="font-medium text-slate-600">
            Học thông minh hơn, chủ động hơn mỗi ngày.
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Giải pháp đồng hành cùng học sinh: Nhắc đúng lúc qua vòng tay · Ôn đúng trọng tâm trên điện thoại · AI phân tích lỗ hổng kiến thức.
        </p>
      </div>
    </footer>
  );
};
