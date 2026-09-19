import React, { useState, useEffect } from "react";
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  Play, 
  Square, 
  Sliders, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  Wand2, 
  Info, 
  Layers, 
  Languages, 
  Mic2,
  BookmarkCheck,
  ChevronRight
} from "lucide-react";
import { 
  soundManager, 
  VOICE_PROFILES, 
  VoiceStyle, 
  VoiceProfile, 
  UserVoiceSettings,
  normalizeVietnameseForSpeech
} from "../utils/audio";

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceChanged?: (profile: VoiceProfile) => void;
}

const SAMPLE_SENTENCES = [
  {
    category: "Toán Lớp 6",
    text: "Phân số một phần tư cộng hai phần tư bằng ba phần tư. Đúng rồi, bạn rất giỏi!",
  },
  {
    category: "Khoa học Tự nhiên",
    text: "Nhiệt độ nóng chảy của nước đá là không độ C. Bạn hãy ghi nhớ quy tắc này nhé!",
  },
  {
    category: "Lời khuyên sư phạm",
    text: "Đừng nản lòng bạn nhé! Làm sai là cơ hội tuyệt vời để mình ghi nhớ kiến thức sâu sắc hơn!",
  },
];

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  onVoiceChanged,
}) => {
  const [currentStyle, setCurrentStyle] = useState<VoiceStyle>("female_teacher");
  const [rateMultiplier, setRateMultiplier] = useState<number>(1.0);
  const [pitchMultiplier, setPitchMultiplier] = useState<number>(1.0);
  const [preferredVoiceURI, setPreferredVoiceURI] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);
  const [customText, setCustomText] = useState<string>("");
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");

  useEffect(() => {
    if (isOpen) {
      const settings = soundManager.getVoiceSettings();
      setCurrentStyle(settings.voiceStyle);
      setRateMultiplier(settings.rateMultiplier);
      setPitchMultiplier(settings.pitchMultiplier);
      setPreferredVoiceURI(settings.preferredVoiceURI);
      setCustomText(SAMPLE_SENTENCES[0].text);

      const voices = soundManager.getAvailableSystemVoices();
      setAvailableVoices(voices);
    } else {
      soundManager.stopSpeech();
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectProfile = (style: VoiceStyle) => {
    soundManager.playClick();
    setCurrentStyle(style);
    const updatedProfile = soundManager.setVoiceSettings({ voiceStyle: style });
    if (onVoiceChanged) onVoiceChanged(updatedProfile);
    // Tự động đọc câu chào mẫu của nhân vật để người dùng nghe ngay ngữ điệu và giới tính
    handlePlaySample(updatedProfile.sampleGreeting, style);
  };

  const handlePlaySample = (textToPlay?: string, specificStyle?: VoiceStyle) => {
    soundManager.stopSpeech();
    setIsPlaying(true);

    const targetStyle = specificStyle || currentStyle;
    const profile = VOICE_PROFILES[targetStyle];
    const text = textToPlay || customText || (profile ? profile.sampleGreeting : SAMPLE_SENTENCES[activeSampleIndex].text);

    soundManager.setVoiceSettings({
      voiceStyle: targetStyle,
      rateMultiplier,
      pitchMultiplier,
      preferredVoiceURI,
    });

    soundManager.previewVoice(targetStyle, text);

    // Watch for end of speech
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const checkInterval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsPlaying(false);
          clearInterval(checkInterval);
        }
      }, 200);
    }
  };

  const handleStop = () => {
    soundManager.stopSpeech();
    setIsPlaying(false);
  };

  const handleResetDefaults = () => {
    soundManager.playClick();
    setRateMultiplier(1.0);
    setPitchMultiplier(1.0);
    setPreferredVoiceURI("");
    setCurrentStyle("female_teacher");

    const updated = soundManager.setVoiceSettings({
      voiceStyle: "female_teacher",
      rateMultiplier: 1.0,
      pitchMultiplier: 1.0,
      preferredVoiceURI: "",
    });
    if (onVoiceChanged) onVoiceChanged(updated);

    // Play confirmation
    handlePlaySample("Đã khôi phục giọng Cô giáo Mai Linh với tốc độ và cao độ chuẩn sư phạm khuyên dùng!");
  };

  const handleSaveAndClose = () => {
    soundManager.playClick();
    const updated = soundManager.setVoiceSettings({
      voiceStyle: currentStyle,
      rateMultiplier,
      pitchMultiplier,
      preferredVoiceURI,
    });
    if (onVoiceChanged) onVoiceChanged(updated);
    onClose();
  };

  // 6 phong cách chuẩn giới tính
  const primaryStyles: VoiceStyle[] = [
    "female_teacher",
    "male_teacher",
    "male_student",
    "female_southern",
    "student_friendly",
    "ai_smart",
  ];

  const filteredStyles = primaryStyles.filter((styleKey) => {
    const p = VOICE_PROFILES[styleKey];
    if (!p) return false;
    if (genderFilter === "male") return p.gender === "male";
    if (genderFilter === "female") return p.gender === "female";
    return true;
  });

  const vietnameseVoices = availableVoices.filter(v => v.isVietnamese);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative bg-white text-slate-800 rounded-3xl p-5 sm:p-7 max-w-2xl w-full shadow-2xl border border-indigo-100 my-auto animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Mic2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Tùy Chỉnh Giọng Đọc AI
                </h2>
                <span className="bg-indigo-100 text-indigo-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Chuẩn Sư Phạm Lớp 6
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                Đổi chất giọng truyền cảm, ấm áp, ngắt nghỉ tự nhiên giúp học sinh tiếp thu dễ dàng
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              handleStop();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-5 max-h-[68vh] overflow-y-auto pr-1">
          
          {/* Section: Select Voice Profile */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Chọn Chất Giọng Chuẩn Giới Tính
              </label>

              {/* Bộ lọc giới tính tiện lợi */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setGenderFilter("all")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    genderFilter === "all"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tất cả (6)
                </button>
                <button
                  type="button"
                  onClick={() => setGenderFilter("male")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                    genderFilter === "male"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  <span>👨</span>
                  <span>Giọng Nam (2)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGenderFilter("female")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                    genderFilter === "female"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-pink-700 hover:bg-pink-50"
                  }`}
                >
                  <span>👩</span>
                  <span>Giọng Nữ (3)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredStyles.map((styleKey) => {
                const profile = VOICE_PROFILES[styleKey];
                if (!profile) return null;
                const isSelected = currentStyle === styleKey;
                const isMale = profile.gender === "male";

                return (
                  <div
                    key={styleKey}
                    onClick={() => handleSelectProfile(styleKey)}
                    className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? isMale
                          ? "border-blue-600 bg-blue-50/70 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20"
                          : "border-indigo-600 bg-indigo-50/70 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/20"
                        : isMale
                          ? "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 bg-white"
                          : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{profile.icon}</span>
                          <div>
                            <div className="text-sm font-bold text-slate-900 leading-snug">
                              {profile.shortName}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className={`inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                                isMale 
                                  ? "bg-blue-100 text-blue-800 border-blue-200" 
                                  : "bg-pink-100 text-pink-800 border-pink-200"
                              }`}>
                                {isMale ? "👨 Giọng Nam" : "👩 Giọng Nữ"}
                              </span>
                              <span className="inline-block text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
                                {profile.tag}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 ${
                            isMale ? "bg-blue-600" : "bg-indigo-600"
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                        {profile.description}
                      </p>
                    </div>

                    {/* Quick Test Voice Button */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySample(profile.sampleGreeting, styleKey);
                        }}
                        className={`text-[11px] font-bold flex items-center gap-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                          isMale
                            ? "text-blue-700 hover:text-blue-900 hover:bg-blue-100/70"
                            : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100/70"
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Thử giọng</span>
                      </button>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {isMale ? "Tông trầm đĩnh đạc" : "Tông cao trong trẻo"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Sliders for Speed & Pitch */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Tinh Chỉnh Tốc Độ & Cao Độ
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại chuẩn</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rate slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Tốc độ đọc (Speed)</span>
                  <span className="font-mono text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-bold">
                    {rateMultiplier.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.25"
                  step="0.05"
                  value={rateMultiplier}
                  onChange={(e) => setRateMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Chậm rãi</span>
                  <span className="text-indigo-600 font-bold">Chuẩn (1.0x)</span>
                  <span>Nhanh hơn</span>
                </div>
              </div>

              {/* Pitch slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Độ cao âm thanh (Pitch)</span>
                  <span className="font-mono text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-bold">
                    {pitchMultiplier.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.25"
                  step="0.05"
                  value={pitchMultiplier}
                  onChange={(e) => setPitchMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Trầm hơn nữa</span>
                  <span className="text-indigo-600 font-bold">Tự nhiên (1.0x)</span>
                  <span>Thanh mảnh</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 flex items-start gap-2">
              <span className="text-blue-600 shrink-0 font-bold">💡 Chuẩn giới tính:</span>
              <span>
                Hệ thống tự động chuyển đổi âm vực sang tông trầm nam tính (Thầy Nam Minh, Bạn Tuấn Kiệt) hoặc trong trẻo nữ tính (Cô Mai Linh, Cô Hương Giang, Bạn Thảo My) ngay cả khi máy bạn chỉ có 1 giọng đọc tiếng Việt mặc định.
              </span>
            </div>
          </div>

          {/* Section: Live Preview with Sample Sentences */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                3. Nghe Thử & Kiểm Tra Âm Thanh
              </span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tự chuẩn hóa công thức toán Lớp 6
              </span>
            </div>

            {/* Quick Sample Selector */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SAMPLE_SENTENCES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveSampleIndex(idx);
                    setCustomText(item.text);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                    activeSampleIndex === idx
                      ? "bg-purple-100 text-purple-800 border border-purple-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>

            {/* Editable Text Area */}
            <div className="relative">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={2}
                placeholder="Nhập câu tiếng Việt bất kỳ để AI đọc thử..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none font-medium leading-relaxed"
              />
            </div>

            {/* Action Bar */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePlaySample()}
                  disabled={isPlaying}
                  className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50 transition transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe thử phát âm</span>
                </button>

                {isPlaying && (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="cursor-pointer bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Dừng</span>
                  </button>
                )}
              </div>

              {isPlaying && (
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  <span>Đang phát giọng đọc...</span>
                </div>
              )}
            </div>

            {/* Quick Test Interactive Feedback Sounds: Buzzer & Congratulations */}
            <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500">Thử âm thanh phản hồi:</span>
              <button
                type="button"
                onClick={() => soundManager.playBuzzer()}
                className="cursor-pointer text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                title="Bấm để nghe thử tiếng còi buzzer báo sai gameshow"
              >
                <span>🚨</span>
                <span>Thử tiếng Buzzer (Báo sai)</span>
              </button>
              <button
                type="button"
                onClick={() => soundManager.speakCongratulations()}
                className="cursor-pointer text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                title="Bấm để nghe thử Congratulations và lời chúc mừng"
              >
                <span>🎉</span>
                <span>Thử Congratulations (Báo đúng)</span>
              </button>
              <button
                type="button"
                onClick={() => soundManager.speakWrongExplanation({
                  subject: "Toán 6",
                  isTimeout: false,
                  whyWrong: "Bạn đã chọn phương án B. Phân số 3 phần 5 lớn hơn 1 phần 2 chứ không bé hơn.",
                  correctLetter: "A",
                  correctAnswer: "1 phần 4",
                  reasoning: "So sánh với 1 phần 2, phân số 1 phần 4 có tử số nhỏ hơn một nửa mẫu số nên bé hơn 1 phần 2.",
                  keyPointsToRemember: "Để so sánh nhanh với 1 phần 2, xét xem tử số gấp đôi có bé hơn mẫu số hay không.",
                })}
                className="cursor-pointer text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                title="Bấm để nghe thử mẫu đọc giải thích 4 ý chuẩn (không lời động viên)"
              >
                <span>🔊</span>
                <span>Thử Nghe giải thích (4 ý chuẩn)</span>
              </button>
            </div>
          </div>

          {/* Section: Advanced System Voices Detection */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>Cài đặt nâng cao: Chọn trực tiếp giọng nói từ thiết bị ({vietnameseVoices.length} giọng Tiếng Việt tìm thấy)</span>
              <ChevronRight className={`w-3.5 h-3.5 transform transition ${showAdvanced ? "rotate-90" : ""}`} />
            </button>

            {showAdvanced && (
              <div className="mt-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Bộ giải mã giọng đọc (TTS Engine):
                  </label>
                  <select
                    value={preferredVoiceURI}
                    onChange={(e) => setPreferredVoiceURI(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">
                      ✨ Tự động chọn giọng chuẩn nhất (Khuyên dùng - Ưu tiên Neural / Tự nhiên)
                    </option>
                    {availableVoices.map((v, i) => (
                      <option key={i} value={v.voiceURI}>
                        {v.isVietnamese ? "🇻🇳 " : "🌐 "}
                        {v.name} {v.isNatural ? "(Cao cấp / Tự nhiên)" : ""} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start gap-2 bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Mẹo để có giọng hay nhất:</strong> Khi sử dụng trên trình duyệt{" "}
                    <strong>Microsoft Edge</strong> hoặc <strong>Google Chrome</strong>, hệ thống tự động kích hoạt giọng đọc trí tuệ nhân tạo (Hoài My Neural / Nam Minh Neural) cực kỳ chân thực, tròn vành rõ chữ như phát thanh viên chuyên nghiệp!
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 py-2 px-3 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            Khôi phục mặc định
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                handleStop();
                onClose();
              }}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl shadow-md shadow-indigo-600/25 transition transform active:scale-95 flex items-center gap-1.5"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Lưu & Áp Dụng</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
