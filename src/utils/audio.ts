export type VoiceStyle = 
  | "female_teacher"    // Cô giáo Mai Linh (Nữ - Chuẩn sư phạm, truyền cảm)
  | "male_teacher"      // Thầy giáo Nam Minh (Nam - Trầm ấm, đĩnh đạc, rõ chữ)
  | "male_student"      // Bạn học Tuấn Kiệt (Nam - Năng động, tự tin, vui tươi)
  | "female_southern"   // Cô giáo Hương Giang (Nữ - Dịu ngọt miền Nam)
  | "student_friendly"  // Bạn học Thảo My (Nữ - Tươi tắn, lí lắc, thân thiện)
  | "ai_smart"          // Trợ lý AI StudySync (Trong trẻo, hiện đại)
  | "female_gentle"     // Alias backward compatibility
  | "male_warm"         // Alias backward compatibility
  | "energetic";        // Alias backward compatibility

export interface VoiceProfile {
  id: VoiceStyle;
  name: string;
  shortName: string;
  tag: string;
  icon: string;
  gender: "female" | "male";
  pitch: number;
  rate: number;
  description: string;
  sampleGreeting: string;
}

export type TeacherVoiceProfile = VoiceProfile;

export interface UserVoiceSettings {
  voiceStyle: VoiceStyle;
  rateMultiplier: number; // 0.8 to 1.25 (default 1.0)
  pitchMultiplier: number; // 0.85 to 1.15 (default 1.0)
  preferredVoiceURI: string; // Specific device voice URI if chosen
}

export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  female_teacher: {
    id: "female_teacher",
    name: "Cô giáo Mai Linh (Giọng Nữ - Bắc Chuẩn Sư Phạm)",
    shortName: "Cô Mai Linh (Nữ)",
    tag: "Khuyên dùng · Nữ chuẩn mực",
    icon: "👩‍🏫",
    gender: "female",
    pitch: 1.05, // Thanh sắc tự nhiên, trong trẻo, ấm áp
    rate: 0.92, // Tốc độ thong thả, rõ ràng, giàu cảm xúc
    description: "Giọng nữ Hà Nội chuẩn mực, dịu dàng, phát âm tròn vành rõ chữ, tạo cảm giác an tâm khi nghe giảng",
    sampleGreeting: "Chào các con yêu quý! Cô là Mai Linh. Bài học hôm nay rất thú vị, các con hãy cùng cô giải thật chính xác nhé!",
  },
  male_teacher: {
    id: "male_teacher",
    name: "Thầy giáo Nam Minh (Giọng Nam - Trầm Ấm, Đĩnh Đạc)",
    shortName: "Thầy Nam Minh (Nam)",
    tag: "Nam trầm ấm · Điềm đạm",
    icon: "👨‍🏫",
    gender: "male",
    pitch: 0.58, // Âm vực nam trầm ấm, bản lĩnh, giải quyết triệt để lỗi nghe giống giọng nữ
    rate: 0.88, // Tốc độ chậm rãi, dứt khoát, chắc nịch
    description: "Tông giọng nam chuẩn, trầm ấm, chững chạc và khúc chiết, giúp học sinh tập trung sâu và hiểu chắc bản chất vấn đề",
    sampleGreeting: "Xin chào các em học sinh! Thầy là Nam Minh. Hôm nay thầy trò mình cùng rèn luyện tư duy và giải bài tập nhé!",
  },
  male_student: {
    id: "male_student",
    name: "Bạn học Tuấn Kiệt (Giọng Nam Sinh - Năng Động)",
    shortName: "Bạn Tuấn Kiệt (Nam)",
    tag: "Nam sinh · Cùng tiến",
    icon: "👦",
    gender: "male",
    pitch: 0.72, // Tông nam thiếu niên trẻ trung, rõ nét giọng con trai
    rate: 0.95,
    description: "Giọng bạn nam đồng trang lứa tươi vui, tự nhiên, cùng học bài hào hứng không áp lực",
    sampleGreeting: "Chào bạn nha! Mình là Tuấn Kiệt đây. Cùng mình thi đua trả lời đúng thật nhiều câu đố Lớp 6 nhé!",
  },
  female_southern: {
    id: "female_southern",
    name: "Cô giáo Hương Giang (Giọng Nữ - Dịu Ngọt Miền Nam)",
    shortName: "Cô Hương Giang (Nữ)",
    tag: "Nữ miền Nam · Ngọt ngào",
    icon: "🌸",
    gender: "female",
    pitch: 1.08,
    rate: 0.91,
    description: "Giọng nữ Nam Bộ nhẹ nhàng, thân thương, ấm áp như người chị đang hướng dẫn giải bài",
    sampleGreeting: "Chào các em thương mến! Cô là Hương Giang, hôm nay cô trò mình cùng ôn tập bài học này nha!",
  },
  student_friendly: {
    id: "student_friendly",
    name: "Bạn học Thảo My (Giọng Nữ Sinh - Tươi Tắn, Lí Lắc)",
    shortName: "Bạn Thảo My (Nữ)",
    tag: "Nữ sinh · Nhí nhảnh",
    icon: "👧",
    gender: "female",
    pitch: 1.28, // Tông cao vui tươi, năng động đặc trưng của nữ sinh
    rate: 0.98,
    description: "Giọng bạn nữ đồng trang lứa trong trẻo, vui tươi, khích lệ tinh thần tự tin không sợ sai",
    sampleGreeting: "Chào cậu nha! Tớ là Thảo My nè. Cậu làm bài tập này chưa, dễ lắm để tớ gợi ý cho nhé!",
  },
  ai_smart: {
    id: "ai_smart",
    name: "Trợ lý AI StudySync (Trong Trẻo, Hiện Đại)",
    shortName: "AI StudySync",
    tag: "Trợ lý AI · Rõ nét",
    icon: "✨",
    gender: "female",
    pitch: 0.96,
    rate: 1.05,
    description: "Âm sắc công nghệ số hiện đại, rành mạch từng chi tiết và đáp án",
    sampleGreeting: "Hệ thống Trợ lý StudySync AI đã sẵn sàng hỗ trợ phân tích và chẩn đoán kiến thức cho bạn!",
  },
  // Backward compatibility aliases
  female_gentle: {
    id: "female_gentle",
    name: "Cô giáo Mai Linh (Giọng Nữ - Bắc Chuẩn Sư Phạm)",
    shortName: "Cô Mai Linh (Nữ)",
    tag: "Khuyên dùng · Nữ chuẩn mực",
    icon: "👩‍🏫",
    gender: "female",
    pitch: 1.05,
    rate: 0.92,
    description: "Giọng nữ Hà Nội chuẩn mực, dịu dàng, phát âm tròn vành rõ chữ",
    sampleGreeting: "Chào các con yêu quý! Cô là Mai Linh. Bài học hôm nay rất thú vị, các con hãy cùng cô giải thật chính xác nhé!",
  },
  male_warm: {
    id: "male_warm",
    name: "Thầy giáo Nam Minh (Giọng Nam - Trầm Ấm, Đĩnh Đạc)",
    shortName: "Thầy Nam Minh (Nam)",
    tag: "Nam trầm ấm · Điềm đạm",
    icon: "👨‍🏫",
    gender: "male",
    pitch: 0.58,
    rate: 0.88,
    description: "Tông giọng nam chuẩn, trầm ấm, chững chạc và khúc chiết",
    sampleGreeting: "Xin chào các em học sinh! Thầy là Nam Minh. Hôm nay thầy trò mình cùng rèn luyện tư duy và giải bài tập nhé!",
  },
  energetic: {
    id: "energetic",
    name: "Bạn học Thảo My (Giọng Nữ Sinh - Tươi Tắn, Lí Lắc)",
    shortName: "Bạn Thảo My (Nữ)",
    tag: "Nữ sinh · Nhí nhảnh",
    icon: "👧",
    gender: "female",
    pitch: 1.28,
    rate: 0.98,
    description: "Giọng bạn bè đồng trang lứa tươi sáng, tự nhiên",
    sampleGreeting: "Chào cậu nha! Tớ là Thảo My nè. Cậu làm bài tập này chưa, dễ lắm để tớ gợi ý cho nhé!",
  },
};

/**
 * HÀM CHUẨN HÓA TIẾNG VIỆT THÔNG MINH CHO GIỌNG ĐỌC AI (Text Normalization)
 * Chuyển đổi công thức toán, phân số, đơn vị đo, ký tự đặc biệt thành câu tiếng Việt tự nhiên
 */
export function normalizeVietnameseForSpeech(text: string): string {
  if (!text) return "";

  let result = text;

  // 1. Loại bỏ các ký tự định dạng markdown thô, emoji gây vấp váp
  result = result
    .replace(/[\*\_~#👉⚡⏰💪🎉⚠️✕✓«»"“”\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 2. Chuyển đổi ký hiệu phương án trắc nghiệm: "A." -> "Phương án A:"
  result = result
    .replace(/\bA\.\s*/g, "Phương án A, ")
    .replace(/\bB\.\s*/g, "Phương án B, ")
    .replace(/\bC\.\s*/g, "Phương án C, ")
    .replace(/\bD\.\s*/g, "Phương án D, ");

  // 3. Chuyển đổi phân số quen thuộc môn Toán Lớp 6
  result = result
    .replace(/\b1\/2\b/g, " một phần hai ")
    .replace(/\b1\/3\b/g, " một phần ba ")
    .replace(/\b2\/3\b/g, " hai phần ba ")
    .replace(/\b1\/4\b/g, " một phần tư ")
    .replace(/\b2\/4\b/g, " hai phần tư ")
    .replace(/\b3\/4\b/g, " ba phần tư ")
    .replace(/\b1\/5\b/g, " một phần năm ")
    .replace(/\b2\/5\b/g, " hai phần năm ")
    .replace(/\b3\/5\b/g, " ba phần năm ")
    .replace(/\b4\/5\b/g, " bốn phần năm ")
    .replace(/\b1\/6\b/g, " một phần sáu ")
    .replace(/\b5\/6\b/g, " năm phần sáu ")
    .replace(/\b1\/8\b/g, " một phần tám ")
    .replace(/\b3\/8\b/g, " ba phần tám ")
    .replace(/\b5\/8\b/g, " năm phần tám ")
    .replace(/\b7\/8\b/g, " bảy phần tám ")
    .replace(/\b1\/10\b/g, " một phần mười ");

  // Chuyển đổi phân số tổng quát (\d+)\/(\d+)
  result = result.replace(/(\d+)\/(\d+)/g, "$1 phần $2");

  // 4. Chuyển đổi số nguyên âm trong ngoặc: (-5) -> "âm năm"
  result = result.replace(/\(\-(\d+)\)/g, " âm $1 ");
  result = result.replace(/\s\-(\d+)\b/g, " âm $1 ");

  // 5. Chuyển đổi các toán tử toán học sang lời nói tự nhiên
  result = result
    .replace(/\s*\+\s*/g, " cộng ")
    .replace(/\s*=\s*/g, " bằng ")
    .replace(/\s*≠\s*/g, " khác ")
    .replace(/\s*>\s*/g, " lớn hơn ")
    .replace(/\s*<\s*/g, " bé hơn ")
    .replace(/\s*[\*×]\s*/g, " nhân ")
    .replace(/(\d+)\s*[:÷]\s*(\d+)/g, "$1 chia $2")
    .replace(/\s*÷\s*/g, " chia ")
    .replace(/:\s+/g, ", ");

  // 6. Chuyển đổi đơn vị đo lường thông dụng
  result = result
    .replace(/(\d+)\s*cm²/gi, "$1 xăng ti mét vuông")
    .replace(/(\d+)\s*m²/gi, "$1 mét vuông")
    .replace(/(\d+)\s*km²/gi, "$1 ki lô mét vuông")
    .replace(/(\d+)\s*cm\b/gi, "$1 xăng ti mét")
    .replace(/(\d+)\s*dm\b/gi, "$1 đề xi mét")
    .replace(/(\d+)\s*mm\b/gi, "$1 mi li mét")
    .replace(/(\d+)\s*km\b/gi, "$1 ki lô mét")
    .replace(/(\d+)\s*m\b/gi, "$1 mét")
    .replace(/(\d+)\s*kg\b/gi, "$1 ki lô gam")
    .replace(/(\d+)\s*g\b/gi, "$1 gam")
    .replace(/(\d+)\s*ml\b/gi, "$1 mi li lít")
    .replace(/(\d+)\s*l\b/gi, "$1 lít")
    .replace(/(\d+)\s*°C/gi, "$1 độ C")
    .replace(/(\d+)\s*%/g, "$1 phần trăm");

  // 7. Tạo nhịp thở tự nhiên bằng dấu phẩy và ngắt câu hợp lý
  result = result
    .replace(/;/g, ", ")
    .replace(/\s*:\s*/g, ", đó là: ")
    .replace(/\s+/g, " ")
    .trim();

  return result;
}

// Sinh file âm thanh WAV 16-bit 44.1kHz PCM chất lượng cao giả lập còi buzzer Gameshow chính gốc ("BZZT! ... BZZT!")
// Dải tần số chuẩn 126Hz & 133Hz, xung hẹp 22%, sóng hài méo tương tự analog, bộ lọc cộng hưởng kèn còi 680Hz
function generateBuzzerWavUri(): string {
  const sampleRate = 44100;
  const duration = 0.58;
  const totalSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + totalSamples * 2);
  const view = new DataView(buffer);

  // RIFF Header
  view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46); // 'RIFF'
  view.setUint32(4, 36 + totalSamples * 2, true);
  view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45); // 'WAVE'

  // fmt Subchunk
  view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20); // 'fmt '
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);

  // data Subchunk
  view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61); // 'data'
  view.setUint32(40, totalSamples * 2, true);

  // Bộ lọc IIR Bandpass ở 680Hz (mô phỏng khoang kèn còi buzzer kim loại truyền hình)
  const f0 = 680;
  const Q = 2.4;
  const w0 = (2 * Math.PI * f0) / sampleRate;
  const alpha = Math.sin(w0) / (2 * Q);
  const b0 = alpha;
  const b2 = -alpha;
  const a0 = 1 + alpha;
  const a1 = -2 * Math.cos(w0);
  const a2 = 1 - alpha;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let raw = 0;
    let envelope = 0;

    // Hồi còi 1: 0.0s -> 0.15s (Cú bấm đanh gắt, giòn tan)
    if (t < 0.15) {
      envelope = t < 0.007 ? t / 0.007 : (t > 0.12 ? (0.15 - t) / 0.03 : 1.0);
      const f1 = 126;
      const f2 = 133;
      const pulse1 = ((t * f1) % 1) < 0.22 ? 1.0 : -1.0;
      const pulse2 = ((t * f2) % 1) < 0.22 ? 1.0 : -1.0;
      const saw = ((t * f1) % 1) * 2 - 1;
      const sub = ((t * 63) % 1) < 0.5 ? 0.75 : -0.75;
      const hum = 1 + 0.35 * Math.sin(2 * Math.PI * 60 * t);
      // Tiếng gõ cơ học khi ấn nút buzzer ở mili-giây đầu tiên
      const thud = t < 0.015 ? Math.sin(2 * Math.PI * 85 * t) * (1 - t / 0.015) * 1.6 : 0;
      raw = (pulse1 * 0.48 + pulse2 * 0.38 + saw * 0.25 + sub * 0.35 + thud) * hum;
    }
    // Khoảng ngắt giữa 2 hồi còi: 0.15s -> 0.22s (tĩnh lặng)
    // Hồi còi 2: 0.22s -> 0.54s (Hồi còi dứt khoát, âm lượng đầy đặn, rền vang)
    else if (t >= 0.22 && t < 0.54) {
      const t2 = t - 0.22;
      envelope = t2 < 0.007 ? t2 / 0.007 : (t > 0.48 ? (0.54 - t) / 0.06 : 1.0);
      const f1 = 122;
      const f2 = 129;
      const pulse1 = ((t * f1) % 1) < 0.22 ? 1.0 : -1.0;
      const pulse2 = ((t * f2) % 1) < 0.22 ? 1.0 : -1.0;
      const saw = ((t * f1) % 1) * 2 - 1;
      const sub = ((t * 61) % 1) < 0.5 ? 0.8 : -0.8;
      const hum = 1 + 0.35 * Math.sin(2 * Math.PI * 60 * t);
      const thud = t2 < 0.015 ? Math.sin(2 * Math.PI * 80 * t2) * (1 - t2 / 0.015) * 1.7 : 0;
      raw = (pulse1 * 0.50 + pulse2 * 0.40 + saw * 0.28 + sub * 0.38 + thud) * hum;
    }

    if (envelope > 0) {
      // Cho qua bộ lọc khoang kèn cộng hưởng
      const filtered = (b0 / a0) * raw + (b2 / a0) * x2 - (a1 / a0) * y1 - (a2 / a0) * y2;
      x2 = x1; x1 = raw;
      y2 = y1; y1 = filtered;

      // Hòa trộn tín hiệu và bão hòa phi tuyến tính (Analog Saturation / Tanh overdrive)
      const mixed = (raw * 0.45 + filtered * 1.25) * envelope;
      const saturated = Math.tanh(2.3 * mixed);
      const intVal = Math.max(-32767, Math.min(32767, Math.floor(saturated * 31500)));
      view.setInt16(44 + i * 2, intVal, true);
    } else {
      view.setInt16(44 + i * 2, 0, true);
      x1 = 0; x2 = 0; y1 = 0; y2 = 0;
    }
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 8192;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return "data:audio/wav;base64," + btoa(binary);
}

// Clean Web Audio API synthesis for haptic vibration and alerts
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentVoiceStyle: VoiceStyle = "female_teacher"; // Khuyên dùng mặc định: Cô giáo Mai Linh
  private rateMultiplier: number = 1.0;
  private pitchMultiplier: number = 1.0;
  private preferredVoiceURI: string = "";
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private cachedBuzzerUri: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const savedStyle = localStorage.getItem("grade6_voice_style") as VoiceStyle;
        if (savedStyle && VOICE_PROFILES[savedStyle]) {
          this.currentVoiceStyle = savedStyle;
        }
        const savedRate = localStorage.getItem("grade6_voice_rate");
        if (savedRate) this.rateMultiplier = parseFloat(savedRate) || 1.0;

        const savedPitch = localStorage.getItem("grade6_voice_pitch");
        if (savedPitch) this.pitchMultiplier = parseFloat(savedPitch) || 1.0;

        const savedURI = localStorage.getItem("grade6_voice_uri");
        if (savedURI) this.preferredVoiceURI = savedURI;

        this.initVoiceListener();
      } catch (e) {}
    }
  }

  private initVoiceListener() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  getVoiceStyle(): VoiceStyle {
    return this.currentVoiceStyle;
  }

  getCurrentVoiceProfile(): VoiceProfile {
    return VOICE_PROFILES[this.currentVoiceStyle] || VOICE_PROFILES.female_teacher;
  }

  getVoiceSettings(): UserVoiceSettings {
    return {
      voiceStyle: this.currentVoiceStyle,
      rateMultiplier: this.rateMultiplier,
      pitchMultiplier: this.pitchMultiplier,
      preferredVoiceURI: this.preferredVoiceURI,
    };
  }

  setVoiceSettings(settings: Partial<UserVoiceSettings>): VoiceProfile {
    if (settings.voiceStyle && VOICE_PROFILES[settings.voiceStyle]) {
      this.currentVoiceStyle = settings.voiceStyle;
      try {
        localStorage.setItem("grade6_voice_style", settings.voiceStyle);
      } catch (e) {}
    }
    if (settings.rateMultiplier !== undefined) {
      this.rateMultiplier = Math.max(0.7, Math.min(1.3, settings.rateMultiplier));
      try {
        localStorage.setItem("grade6_voice_rate", this.rateMultiplier.toString());
      } catch (e) {}
    }
    if (settings.pitchMultiplier !== undefined) {
      this.pitchMultiplier = Math.max(0.8, Math.min(1.2, settings.pitchMultiplier));
      try {
        localStorage.setItem("grade6_voice_pitch", this.pitchMultiplier.toString());
      } catch (e) {}
    }
    if (settings.preferredVoiceURI !== undefined) {
      this.preferredVoiceURI = settings.preferredVoiceURI;
      try {
        localStorage.setItem("grade6_voice_uri", this.preferredVoiceURI);
      } catch (e) {}
    }
    return this.getCurrentVoiceProfile();
  }

  setVoiceStyle(style: VoiceStyle): VoiceProfile {
    return this.setVoiceSettings({ voiceStyle: style });
  }

  // Chuyển xoay vòng giữa các phong cách giọng đọc chính
  cycleVoiceStyle(): VoiceProfile {
    const order: VoiceStyle[] = [
      "female_teacher",
      "male_teacher",
      "male_student",
      "female_southern",
      "student_friendly",
      "ai_smart",
    ];
    const currIdx = order.indexOf(this.currentVoiceStyle);
    const nextStyle = order[(currIdx + 1) % order.length];
    return this.setVoiceStyle(nextStyle);
  }

  // Kiểm tra xem một đối tượng giọng đọc của hệ điều hành có phải là giọng nam gốc hay không
  isNativeMaleVoice(voice: SpeechSynthesisVoice | null): boolean {
    if (!voice) return false;
    const name = ((voice.name || "") + " " + ((voice as any).voiceURI || "")).toLowerCase();
    return (
      name.includes("namminh") ||
      name.includes("nam minh") ||
      name.includes("vietnam-male") ||
      name.includes("vi-vn-nam") ||
      name.includes("male") ||
      name.includes("david") ||
      name.includes("guy") ||
      name.includes("george")
    );
  }

  // TÍNH TOÁN CAO ĐỘ (PITCH) VÀ TỐC ĐỘ (RATE) CHUẨN XÁC THEO GIỚI TÍNH VÀ VAI DIỄN:
  // Khắc phục triệt để vấn đề: Hầu hết trình duyệt (Chrome, Android, iOS Safari) chỉ cài 1 giọng nữ tiếng Việt mặc định.
  // Bằng cách điều chỉnh dải tần số âm học (acoustic formant/pitch shift):
  // - Thầy giáo Nam Minh: Hạ pitch xuống 0.58 -> Chuyển hoàn toàn sang giọng Nam trầm ấm, chững chạc, uy lực.
  // - Bạn học Tuấn Kiệt: Hạ pitch xuống 0.72 -> Giọng bạn nam trẻ trung, năng động, chuẩn con trai.
  // - Cô giáo Mai Linh: Giữ 1.05 -> Giọng nữ ấm áp, trong trẻo, chuẩn sư phạm.
  // - Bạn học Thảo My: Nâng lên 1.28 -> Giọng nữ sinh vui tươi, ríu rít, lí lắc.
  computeUtteranceSettings(profile: VoiceProfile, voice: SpeechSynthesisVoice | null): {
    pitch: number;
    rate: number;
    voice: SpeechSynthesisVoice | null;
  } {
    const isProfileMale = profile.gender === "male";
    const voiceIsNativeMale = this.isNativeMaleVoice(voice);

    let effectiveBasePitch = profile.pitch;

    if (isProfileMale && !voiceIsNativeMale) {
      // Khi nhân vật là Nam mà giọng hệ thống là Nữ (như Google Tiếng Việt phổ biến nhất)
      if (profile.id === "male_teacher") {
        effectiveBasePitch = 0.58; // Hạ xuống dải Baritone nam tính
      } else if (profile.id === "male_student") {
        effectiveBasePitch = 0.72; // Giọng nam thanh thiếu niên
      } else {
        effectiveBasePitch = 0.60;
      }
    } else if (isProfileMale && voiceIsNativeMale) {
      // Khi hệ thống đã có giọng nam native (như Microsoft NamMinh Neural trên Edge)
      if (profile.id === "male_teacher") {
        effectiveBasePitch = 0.85;
      } else if (profile.id === "male_student") {
        effectiveBasePitch = 0.98;
      }
    } else if (!isProfileMale && voiceIsNativeMale) {
      // Nếu nhân vật là Nữ mà giọng hệ thống là Nam
      effectiveBasePitch = Math.max(1.25, profile.pitch * 1.35);
    }

    // Áp dụng hệ số tinh chỉnh người dùng (mở rộng ngưỡng tối thiểu xuống 0.35 để không bị chặn âm nam trầm)
    const finalPitch = Math.max(0.35, Math.min(1.75, effectiveBasePitch * this.pitchMultiplier));
    const finalRate = Math.max(0.65, Math.min(1.35, profile.rate * this.rateMultiplier));

    return {
      pitch: finalPitch,
      rate: finalRate,
      voice,
    };
  }

  // Lấy danh sách giọng đọc tiếng Việt và giọng chất lượng cao được cài đặt trong máy
  getAvailableSystemVoices(): Array<{
    name: string;
    voiceURI: string;
    lang: string;
    isVietnamese: boolean;
    isNatural: boolean;
    gender: "female" | "male" | "unknown";
  }> {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    }

    return this.cachedVoices.map((v) => {
      const lang = (v.lang || "").toLowerCase();
      const name = (v.name + " " + (v as any).voiceURI).toLowerCase();
      const isVietnamese = lang.includes("vi") || lang.includes("vie") || name.includes("vietnam") || name.includes("tiếng việt");
      const isNatural = name.includes("natural") || name.includes("online") || name.includes("neural") || name.includes("enhanced") || name.includes("premium");
      
      let gender: "female" | "male" | "unknown" = "unknown";
      if (name.includes("hoaimy") || name.includes("linh") || name.includes("mai") || name.includes("female") || name.includes("nữ")) {
        gender = "female";
      } else if (name.includes("namminh") || name.includes("nam minh") || name.includes("nam") || name.includes("male") || name.includes("david") || name.includes("guy")) {
        gender = "male";
      }

      return {
        name: v.name,
        voiceURI: v.voiceURI,
        lang: v.lang,
        isVietnamese,
        isNatural,
        gender,
      };
    });
  }

  // Tìm voice chuẩn nhất và tự nhiên nhất từ hệ thống
  public getBestVoiceForProfile(profile: VoiceProfile): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    }
    const voices = this.cachedVoices;
    if (!voices || voices.length === 0) return null;

    // 1. Nếu người dùng chọn đích danh một giọng cụ thể trong hệ thống
    if (this.preferredVoiceURI) {
      const chosen = voices.find((v) => v.voiceURI === this.preferredVoiceURI);
      if (chosen) return chosen;
    }

    // Lọc danh sách giọng tiếng Việt
    const viVoices = voices.filter((v) => {
      const l = (v.lang || "").toLowerCase();
      const n = (v.name || "").toLowerCase();
      return l.includes("vi") || l.includes("vie") || n.includes("vietnam") || n.includes("tiếng việt");
    });

    if (viVoices.length === 0) {
      return voices.find((v) => v.default) || voices[0] || null;
    }

    // Ưu tiên 1: Giọng Online/Natural/Neural của Microsoft hoặc Apple Enhanced (cực kỳ truyền cảm và giống người thật)
    const naturalVoices = viVoices.filter((v) => {
      const n = (v.name + " " + (v as any).voiceURI).toLowerCase();
      return n.includes("natural") || n.includes("online") || n.includes("neural") || n.includes("enhanced") || n.includes("premium");
    });

    const targetPool = naturalVoices.length > 0 ? naturalVoices : viVoices;

    if (profile.gender === "male") {
      const maleVoice = targetPool.find((v) => this.isNativeMaleVoice(v));
      if (maleVoice) return maleVoice;
      const anyMale = viVoices.find((v) => this.isNativeMaleVoice(v));
      if (anyMale) return anyMale;
    } else {
      const femaleVoice = targetPool.find((v) => {
        const n = (v.name + " " + (v as any).voiceURI).toLowerCase();
        return n.includes("hoaimy") || n.includes("linh") || n.includes("mai") || n.includes("lan") || n.includes("female") || n.includes("nữ");
      });
      if (femaleVoice) return femaleVoice;
      const anyFemale = viVoices.find((v) => {
        const n = (v.name + " " + (v as any).voiceURI).toLowerCase();
        return n.includes("hoaimy") || n.includes("linh") || n.includes("mai") || n.includes("lan") || n.includes("female") || n.includes("nữ");
      });
      if (anyFemale) return anyFemale;
    }

    // Fallback: Tìm Google Tiếng Việt hoặc giọng đầu tiên
    const googleVoice = viVoices.find((v) => v.name.toLowerCase().includes("google"));
    return googleVoice || viVoices[0];
  }

  // Tìm giọng tiếng Anh chuẩn bản ngữ chất lượng cao (en-US / en-GB) để phát âm các từ quốc tế như "Congratulations!"
  public getBestEnglishVoice(): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    }
    const voices = this.cachedVoices;
    if (!voices || voices.length === 0) return null;

    const enVoices = voices.filter((v) => {
      const l = (v.lang || "").toLowerCase();
      return l.startsWith("en") || l.includes("en-us") || l.includes("en-gb");
    });
    if (enVoices.length === 0) return null;

    // Ưu tiên các giọng tự nhiên cao cấp: Natural, Neural, Google US English, Samantha, Jenny, Siri, Aria
    const highQuality = enVoices.find((v) => {
      const n = (v.name + " " + (v as any).voiceURI).toLowerCase();
      return (
        n.includes("natural") ||
        n.includes("neural") ||
        n.includes("google") ||
        n.includes("samantha") ||
        n.includes("jenny") ||
        n.includes("aria") ||
        n.includes("guy")
      );
    });
    if (highQuality) return highQuality;

    const usVoice = enVoices.find((v) => (v.lang || "").toLowerCase().includes("en-us"));
    if (usVoice) return usVoice;

    return enVoices[0];
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Tactile button click sound
  playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  private vibrationLoopTimer: any = null;

  // Simulate gentle smartband vibration motor buzz
  playVibrationBuzz(durationMs = 450) {
    // Trigger navigator.vibrate if on mobile device
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([180, 70, 180]);
      } catch (e) {}
    }
    if (this.isMuted) return;

    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + durationMs / 1000);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch (e) {
      // Audio might be blocked before first interaction
    }
  }

  // Continuous vibration loop for automatic alarm trigger (until stopped or timeout)
  startContinuousVibration(maxDurationMs = 15000) {
    this.stopContinuousVibration();
    this.playNotification();
    this.playVibrationBuzz(600);

    let elapsed = 0;
    this.vibrationLoopTimer = setInterval(() => {
      elapsed += 1200;
      if (elapsed >= maxDurationMs) {
        this.stopContinuousVibration();
        return;
      }
      this.playVibrationBuzz(600);
    }, 1200);
  }

  // Stop continuous vibration loop
  stopContinuousVibration() {
    if (this.vibrationLoopTimer) {
      clearInterval(this.vibrationLoopTimer);
      this.vibrationLoopTimer = null;
    }
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate(0);
      } catch (e) {}
    }
  }

  // Chime when an alert triggers
  playNotification() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  getBuzzerUri(): string {
    if (!this.cachedBuzzerUri && typeof window !== "undefined") {
      this.cachedBuzzerUri = generateBuzzerWavUri();
    }
    return this.cachedBuzzerUri || "";
  }

  // Tạo đường cong bão hòa phi tuyến tính (Analog Distortion) cho bộ tổng hợp âm Web Audio
  private getDistortionCurve(amount = 25): Float32Array {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Web Audio synthesizer for the authentic broadcast game-show buzzer
  private renderWebAudioBuzzer(ctx: AudioContext) {
    const now = ctx.currentTime;

    // Bộ lọc khoang kèn cộng hưởng 680Hz (Horn Formant Resonator)
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(680, now);
    filter.Q.setValueAtTime(2.4, now);

    // Bộ bão hòa âm analog (Analog Overdrive/Saturator)
    const waveShaper = ctx.createWaveShaper();
    waveShaper.curve = this.getDistortionCurve(30) as any;
    waveShaper.oversample = "4x";

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.55, now);

    filter.connect(waveShaper);
    waveShaper.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Hồi còi 1: 0.0s -> 0.15s (Cú bấm đanh, dứt khoát)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const oscSub1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "square";
    oscSub1.type = "square";

    osc1.frequency.setValueAtTime(126, now);
    osc2.frequency.setValueAtTime(133, now);
    oscSub1.frequency.setValueAtTime(63, now);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.65, now + 0.008);
    gain1.gain.setValueAtTime(0.60, now + 0.12);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc1.connect(gain1);
    osc2.connect(gain1);
    oscSub1.connect(gain1);
    gain1.connect(filter);

    osc1.start(now);
    osc2.start(now);
    oscSub1.start(now);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);
    oscSub1.stop(now + 0.15);

    // Hồi còi 2: 0.22s -> 0.54s (Hồi còi ngân dứt điểm, vang dội truyền hình)
    const osc3 = ctx.createOscillator();
    const osc4 = ctx.createOscillator();
    const oscSub2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc3.type = "sawtooth";
    osc4.type = "square";
    oscSub2.type = "square";

    osc3.frequency.setValueAtTime(122, now + 0.22);
    osc4.frequency.setValueAtTime(129, now + 0.22);
    oscSub2.frequency.setValueAtTime(61, now + 0.22);

    gain2.gain.setValueAtTime(0.001, now + 0.22);
    gain2.gain.linearRampToValueAtTime(0.70, now + 0.228);
    gain2.gain.setValueAtTime(0.65, now + 0.48);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.54);

    osc3.connect(gain2);
    osc4.connect(gain2);
    oscSub2.connect(gain2);
    gain2.connect(filter);

    osc3.start(now + 0.22);
    osc4.start(now + 0.22);
    oscSub2.start(now + 0.22);
    osc3.stop(now + 0.54);
    osc4.stop(now + 0.54);
    oscSub2.stop(now + 0.54);
  }

  // Play realistic, punchy game-show quiz buzzer sound ("BZZT - BZZT!")
  playBuzzer() {
    if (this.isMuted) return;

    // 1. Phát qua HTML5 Audio (bảo đảm 100% phát ngay lập tức trên mọi trình duyệt, cả mobile & iframe)
    try {
      const uri = this.getBuzzerUri();
      if (uri) {
        const audio = new Audio(uri);
        audio.volume = 0.95;
        audio.play().catch(() => {});
      }
    } catch (e) {}

    // 2. Phát qua Web Audio API (tăng thêm độ trầm ấm và âm vang chi tiết)
    try {
      const ctx = this.getContext();
      if (ctx) {
        if (ctx.state === "suspended") {
          ctx.resume().then(() => {
            this.renderWebAudioBuzzer(ctx);
          }).catch(() => {});
        } else {
          this.renderWebAudioBuzzer(ctx);
        }
      }
    } catch (e) {}
  }

  // Quiz feedback chime
  playFeedback(correct: boolean) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (correct) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.5);
      } else {
        // Khi trả lời sai -> Phát tiếng buzzer kép sống động!
        this.playBuzzer();
      }
    } catch (e) {}
  }

  playCorrect() {
    this.playFeedback(true);
  }

  playWrong() {
    this.playBuzzer();
  }

  // Play subtle warning tick when time is low (<= 3s)
  playTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Play buzzer when 20s timer expires
  playTimeout() {
    this.playBuzzer();
  }

  // Speak timeout announcement in Vietnamese
  speakTimeout() {
    if (this.isMuted) return;
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const profile = this.getCurrentVoiceProfile();
        const u = new SpeechSynthesisUtterance("Hết 20 giây! Cố lên câu tiếp theo nhé!");
        u.rate = profile.rate;
        u.pitch = profile.pitch;
        u.lang = "vi-VN";

        const voice = this.getBestVoiceForProfile(profile);
        if (voice) u.voice = voice;

        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  }

  // Celebration fanfare on completing full quiz
  playCelebrate() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
      });
    } catch (e) {}
  }

  // Phát âm tiếng "Congratulations!" cực hay bằng giọng bản ngữ tiếng Anh (en-US) hào hứng, cao độ rộn ràng chuẩn quốc tế, tiếp nối là lời chúc mừng tiếng Việt truyền cảm
  speakCongratulations(customText?: string, onComplete?: () => void) {
    if (this.isMuted) {
      onComplete?.();
      return;
    }
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const profile = this.getCurrentVoiceProfile();
        const viVoice = this.getBestVoiceForProfile(profile);
        const enVoice = this.getBestEnglishVoice();

        // Lời khen tiếng Việt chuẩn theo yêu cầu
        let viPraise = customText
          ? customText.replace(/congratulations!?:?\s*/gi, "").trim()
          : "";
        if (!viPraise) {
          viPraise = "Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!";
        }

        // 1. Chuẩn bị câu chúc mừng tiếng Việt truyền cảm
        const uVietnamese = new SpeechSynthesisUtterance(viPraise);
        uVietnamese.lang = "vi-VN";
        const viSettings = this.computeUtteranceSettings(profile, viVoice);
        uVietnamese.rate = viSettings.rate;
        uVietnamese.pitch = Math.max(1.05, viSettings.pitch); // Cao độ phấn khởi, tươi sáng
        if (viVoice) uVietnamese.voice = viVoice;

        let hasCompleted = false;
        const triggerComplete = () => {
          if (hasCompleted) return;
          hasCompleted = true;
          onComplete?.();
        };

        uVietnamese.onend = triggerComplete;
        uVietnamese.onerror = triggerComplete;

        // 2. Chuẩn bị từ "Congratulations!" bằng giọng tiếng Anh chuẩn bản ngữ (en-US) hào hứng, cao độ rộn ràng, tự nhiên chuẩn quốc tế
        const uEnglish = new SpeechSynthesisUtterance("Congratulations!");
        uEnglish.lang = "en-US";
        uEnglish.rate = 1.0;
        uEnglish.pitch = 1.18; // Âm sắc hào hứng, cao độ rộn ràng
        if (enVoice) uEnglish.voice = enVoice;

        let hasSpokenVi = false;
        const triggerVietnamese = () => {
          if (hasSpokenVi) return;
          hasSpokenVi = true;
          try {
            window.speechSynthesis.speak(uVietnamese);
          } catch (e) {
            triggerComplete();
          }
        };

        // Khi phát âm xong "Congratulations!" bản ngữ -> tiếp nối đọc lời khen tiếng Việt mượt mà
        uEnglish.onend = triggerVietnamese;
        uEnglish.onerror = triggerVietnamese;
        // Fallback bảo đảm nếu trình duyệt nuốt sự kiện onend của uEnglish
        const fallbackTimer = setTimeout(triggerVietnamese, 1300);
        uVietnamese.onstart = () => clearTimeout(fallbackTimer);

        // Fallback bảo đảm toàn bộ câu nói hoàn tất để chuyển câu tiếp theo
        const fullSafetyTimer = setTimeout(triggerComplete, 5500);
        uVietnamese.onend = () => {
          clearTimeout(fullSafetyTimer);
          triggerComplete();
        };

        window.speechSynthesis.speak(uEnglish);
      } else {
        onComplete?.();
      }
    } catch (e) {
      onComplete?.();
    }
  }

  // Speak warm encouragement in Vietnamese when user makes a mistake
  speakEncouragement(customText?: string) {
    if (this.isMuted) return;
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const profile = this.getCurrentVoiceProfile();
        const text = customText || "Không sao! Cố lên bạn nhé!";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = profile.rate;
        utterance.pitch = profile.pitch;
        utterance.lang = "vi-VN";

        const voice = this.getBestVoiceForProfile(profile);
        if (voice) utterance.voice = voice;

        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  }

  // Thử giọng mới khi người dùng bấm đổi giọng hoặc kiểm tra
  previewVoice(style?: VoiceStyle, customText?: string) {
    if (this.isMuted) return;
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();

      if (style) {
        this.setVoiceStyle(style);
      }
      const profile = this.getCurrentVoiceProfile();
      const rawText = customText || profile.sampleGreeting || `Xin chào bạn! Mình là ${profile.name}.`;
      const spokenText = normalizeVietnameseForSpeech(rawText);

      const utterance = new SpeechSynthesisUtterance(spokenText);
      const voice = this.getBestVoiceForProfile(profile);
      const settings = this.computeUtteranceSettings(profile, voice);

      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.lang = "vi-VN";
      if (settings.voice) utterance.voice = settings.voice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  // Speak AI Diagnostic explanation when answer is wrong or timed out
  // TUÂN THỦ NGHIÊM NGẶT: Tuyệt đối không nói lời động viên, chỉ nói đúng 4 phần:
  // 1. Vì sao chọn đáp án đó
  // 2. Đáp án đúng là gì
  // 3. Suy luận ra
  // 4. Điểm cần nhớ
  speakWrongExplanation(params: {
    subject: string;
    isTimeout?: boolean;
    whyWrong: string;
    correctLetter: string;
    correctAnswer: string;
    reasoning: string;
    keyPointsToRemember: string;
    onStart?: () => void;
    onEnd?: () => void;
  }) {
    if (this.isMuted) return;
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();

      // Hàm làm sạch văn bản để đọc mạch lạc, đầy đủ ngữ nghĩa, không bị cắt cụt từ
      const cleanSpokenSentence = (text: string, maxWords = 50): string => {
        if (!text) return "";
        let cleaned = text
          .replace(/[\*\_~#👉⚡⏰💪🎉⚠️✕✓«»"“”\[\]]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        // Lược bỏ các tiền tố trùng lặp nếu có sẵn trong dữ liệu
        cleaned = cleaned
          .replace(/^(vì sao chọn đáp án đó|vì sao câu trả lời của bạn chưa đúng|đáp án đúng là gì|cách suy luận để tìm ra đáp án đúng|điểm cần nhớ để không mắc lại lỗi|quy tắc sgk[:\s]*|điều cần nhớ là[:\s]*|suy luận[:\s]*|điểm cần nhớ[:\s]*|lý do là[:\s]*)\s*/gi, "")
          .trim();

        // Tách theo câu và giữ 1-3 câu trọn vẹn ngữ nghĩa
        const sentences = cleaned.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 2);
        let chosen = sentences.length > 0 ? sentences.slice(0, 3).join(" ") : cleaned;

        const words = chosen.split(" ");
        if (words.length > maxWords) {
          chosen = words.slice(0, maxWords).join(" ");
        }
        return chosen.replace(/[,;:\-\s]+$/, "").trim();
      };

      const shortAns = cleanSpokenSentence(params.correctAnswer, 20);
      const shortReason = cleanSpokenSentence(params.reasoning, 50);
      const shortWhy = cleanSpokenSentence(params.whyWrong, 40);
      const shortKey = cleanSpokenSentence(params.keyPointsToRemember, 40);

      // CẤU TRÚC ĐÚNG 4 Ý CHUẨN — HOÀN TOÀN KHÔNG NÓI LỜI ĐỘNG VIÊN
      let rawScript = "";

      // 1. Vì sao chọn đáp án đó
      if (params.isTimeout) {
        rawScript += `Vì sao chưa chọn được đáp án: Đã hết thời gian 20 giây quy định cho câu hỏi này. `;
      } else if (shortWhy) {
        rawScript += `Vì sao chọn đáp án đó: ${shortWhy}. `;
      }

      // 2. Đáp án đúng là gì
      rawScript += `Đáp án đúng là: phương án ${params.correctLetter}, ${shortAns}. `;

      // 3. Suy luận ra
      if (shortReason) {
        rawScript += `Suy luận ra: ${shortReason}. `;
      }

      // 4. Điểm cần nhớ
      if (shortKey) {
        rawScript += `Điểm cần nhớ: ${shortKey}. `;
      }

      // Chuẩn hóa toàn bộ câu nói bằng bộ xử lý ngữ âm tiếng Việt thông minh
      const speechScript = normalizeVietnameseForSpeech(rawScript);

      const profile = this.getCurrentVoiceProfile();
      const utterance = new SpeechSynthesisUtterance(speechScript);
      const voice = this.getBestVoiceForProfile(profile);
      const settings = this.computeUtteranceSettings(profile, voice);

      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.lang = "vi-VN";
      if (settings.voice) utterance.voice = settings.voice;

      if (params.onStart) {
        utterance.onstart = () => params.onStart && params.onStart();
      }
      utterance.onend = () => {
        if (params.onEnd) params.onEnd();
      };
      utterance.onerror = () => {
        if (params.onEnd) params.onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      if (params.onEnd) params.onEnd();
    }
  }

  // Speak generic text with current profile and normalization
  speakText(text: string): Promise<void> {
    if (this.isMuted) return Promise.resolve();
    return new Promise((resolve) => {
      try {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
          resolve();
          return;
        }
        window.speechSynthesis.cancel();
        const profile = this.getCurrentVoiceProfile();
        const spokenText = normalizeVietnameseForSpeech(text);
        const utterance = new SpeechSynthesisUtterance(spokenText);
        const voice = this.getBestVoiceForProfile(profile);
        const settings = this.computeUtteranceSettings(profile, voice);

        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        utterance.lang = "vi-VN";
        if (settings.voice) utterance.voice = settings.voice;

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        resolve();
      }
    });
  }

  // Stop any ongoing speech
  stopSpeech() {
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {}
  }
}

export const soundManager = new SoundManager();
