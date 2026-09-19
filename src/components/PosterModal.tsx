import React from "react";
import { X, ZoomIn, Download, ExternalLink, Sparkles, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import posterImg from "../assets/images/studysync_banner_donghanh_1789787021080.jpg";

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartStudy: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  onClose,
  onStartStudy,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-indigo-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-indigo-50 bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-pink-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/25">
              <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>StudySync AI · Poster & Banner Hệ Thống Toàn Cảnh</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  Official Banner
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Học thông minh · Vòng tay rung nhắc · Trải nghiệm ngay trên ứng dụng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={posterImg}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition"
              title="Mở ảnh gốc trong tab mới"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở tab mới</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Body with Smooth Scroll and Ambient Glow */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gradient-to-b from-slate-900/5 via-slate-50/60 to-slate-50 flex flex-col items-center justify-center">
          <div className="relative group max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-200/80 bg-white">
            <img
              src={posterImg}
              alt="StudySync AI - Đồng hành cùng bạn trong hành trình ôn tập! Trải nghiệm ngay"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-2xl select-none"
            />
            
            {/* Direct In-Image CTA button overlay */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartStudy();
                }}
                className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xl shadow-purple-600/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition transform border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Trải nghiệm ngay ➔</span>
              </button>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 text-center mt-3 font-medium flex items-center gap-1.5">
            <span>💡</span>
            <span>Thiết kế chính thức StudySync AI: Học thông minh · Thi tự tin · Đồng hành cùng bạn trong hành trình ôn tập!</span>
          </p>
        </div>

        {/* Modal Bottom Actions Bar */}
        <div className="px-5 py-3 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Sẵn sàng: Vòng tay thông minh + Ngân hàng đề thi Lớp 6 đã kết nối!</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Đóng lại
            </button>
            <button
              onClick={() => {
                onClose();
                onStartStudy();
              }}
              className="cursor-pointer px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 shadow-md shadow-purple-500/25 transition flex items-center gap-2 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Trải nghiệm ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
