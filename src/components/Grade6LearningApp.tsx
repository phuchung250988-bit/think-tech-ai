import React, { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Sparkles, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  BookOpen, 
  HelpCircle, 
  RotateCcw,
  Flame,
  Award,
  Smartphone,
  Maximize2,
  Minimize2,
  Lightbulb,
  Check,
  ChevronRight,
  Send,
  AlertTriangle,
  Trophy,
  BarChart3,
  CheckCheck,
  Clock,
  Timer,
  Compass,
  Target,
  PauseCircle,
  GraduationCap,
  Square,
  Sliders,
  Mic2
} from "lucide-react";
import { DEFAULT_SUBJECTS } from "../data/defaultQuestions";
import { Question, SubjectTopic } from "../types";
import { soundManager, VOICE_PROFILES, VoiceStyle } from "../utils/audio";
import { VoiceStudioModal } from "./VoiceStudioModal";

interface Grade6LearningAppProps {
  initialSubject?: string;
}

interface SubjectIntroDetail {
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  keyTopics: string[];
  testStructure: string;
  sgkNote: string;
}

const SUBJECT_DETAILS: Record<string, SubjectIntroDetail> = {
  "Toán": {
    title: "Toán 6",
    subtitle: "Chương trình Giáo dục phổ thông 2018",
    badge: "SGK Cánh Diều · Kết nối tri thức · Chân trời sáng tạo",
    accentColor: "blue",
    bgGradient: "from-blue-600 to-indigo-600",
    description: "Rèn luyện tư duy logic, phản xạ tính toán nhanh và làm chủ các dạng toán trắc nghiệm trọng tâm lớp 6.",
    keyTopics: [
      "Tập hợp các số tự nhiên & Phép tính lũy thừa",
      "Số nguyên âm, số nguyên dương & Thứ tự thực hiện phép tính",
      "Phân số, hỗn số & Số thập phân cơ bản",
      "Hình học trực quan: Tam giác đều, Lục giác đều, Hình thoi, Hình bình hành"
    ],
    testStructure: "10 câu hỏi trắc nghiệm nhanh · Đúng 20 giây / câu",
    sgkNote: "Bám sát định dạng câu hỏi đánh giá năng lực SGK Toán 6 mới."
  },
  "Tiếng Việt": {
    title: "Ngữ văn 6",
    subtitle: "Đọc hiểu văn bản & Tiếng Việt chuẩn SGK",
    badge: "Bộ sách Ngữ văn lớp 6 mới",
    accentColor: "emerald",
    bgGradient: "from-emerald-600 to-teal-700",
    description: "Nhận diện từ loại, biện pháp tu từ, kỹ năng đọc hiểu thơ lục bát, truyện đồng thoại và truyện dân gian.",
    keyTopics: [
      "Thơ lục bát, vần nhịp và thể thơ dân tộc",
      "Biện pháp tu từ: So sánh, Nhân hóa, Ẩn dụ, Điệp ngữ",
      "Từ mượn, nghĩa của từ & Thành ngữ tiếng Việt",
      "Đọc hiểu văn bản truyện đồng thoại và truyền thuyết lịch sử"
    ],
    testStructure: "10 câu hỏi trắc nghiệm nhanh · Đúng 20 giây / câu",
    sgkNote: "Tích hợp ví dụ từ các tác phẩm quen thuộc trong SGK Ngữ văn 6."
  },
  "Tiếng Anh": {
    title: "Tiếng Anh 6 (English 6)",
    subtitle: "Global Success & Friends Plus",
    badge: "Tiếng Anh 6 thí điểm & hệ 10 năm",
    accentColor: "indigo",
    bgGradient: "from-indigo-600 to-purple-700",
    description: "Củng cố phản xạ ngữ pháp, từ vựng theo các Unit trọng điểm và giao tiếp hàng ngày của học sinh lớp 6.",
    keyTopics: [
      "Unit 1-3: My New School, My Home, My Friends",
      "Thì Hiện tại đơn (Present Simple) & Hiện tại tiếp diễn",
      "Giới từ chỉ vị trí (in, on, under, behind, next to)",
      "Tính từ miêu tả tính cách & Cấu trúc so sánh hơn (Comparative)"
    ],
    testStructure: "10 câu hỏi trắc nghiệm nhanh · Đúng 20 giây / câu",
    sgkNote: "Từ vựng và cấu trúc bám sát chương trình THCS Lớp 6 chuẩn Bộ GD&ĐT."
  },
  "Khoa học": {
    title: "Khoa học tự nhiên 6 (KHTN 6)",
    subtitle: "Vật lý · Hóa học · Sinh học tích hợp",
    badge: "Môn học tích hợp SGK Lớp 6 mới",
    accentColor: "amber",
    bgGradient: "from-amber-600 to-orange-600",
    description: "Khám phá các hiện tượng tự nhiên, đơn vị đo lường, cấu tạo tế bào sống và sự đa dạng sinh học quanh ta.",
    keyTopics: [
      "Mở đầu KHTN: Dụng cụ đo lường, thang nhiệt độ, đo chiều dài & khối lượng",
      "Các thể của chất: Rắn, lỏng, khí & Hiện tượng chuyển thể của chất",
      "Tế bào - Đơn vị cơ bản của sự sống (màng sinh chất, nhân, tế bào chất)",
      "Lực và chuyển động: Lực tiếp xúc, lực ma sát, lực hấp dẫn"
    ],
    testStructure: "10 câu hỏi trắc nghiệm nhanh · Đúng 20 giây / câu",
    sgkNote: "Nội dung thực tiễn, gắn liền với các câu hỏi thí nghiệm đời sống."
  },
  "all": {
    title: "Thử thách Ngẫu nhiên các môn",
    subtitle: "Tổng hợp Toán 6 · Ngữ văn 6 · Tiếng Anh 6 · KHTN 6",
    badge: "Thử thách toàn diện StudySync AI",
    accentColor: "purple",
    bgGradient: "from-purple-600 to-pink-600",
    description: "Thử thách trí nhớ và phản xạ liên môn: các câu hỏi xuất hiện ngẫu nhiên từ cả 4 môn học chính.",
    keyTopics: [
      "Toán học: Tính nhanh, số nguyên & hình học trực quan",
      "Ngữ văn: Biện pháp tu từ & đọc hiểu văn bản",
      "Tiếng Anh: Từ vựng & ngữ pháp thì hiện tại",
      "Khoa học tự nhiên: Hiện tượng tự nhiên & thế giới sống"
    ],
    testStructure: "Toàn bộ 40 câu hỏi trắc nghiệm · Đúng 20 giây / câu",
    sgkNote: "Chế độ luyện phản xạ đỉnh cao giúp ghi nhớ kiến thức toàn diện."
  }
};

interface WrongExplanationData {
  studentAnswerText: string;
  whyWrong: string;
  correctAnswer: string;
  correctLetter: string;
  reasoning: string;
  keyPointsToRemember: string;
  lessonName?: string;
  streakLostNotice?: string;
  isTimeout?: boolean;
}

interface SubjectStats {
  answeredIds: string[];
  correctCount: number;
  wrongCount: number;
  currentStreak: number;
  bestStreak: number;
}

export const Grade6LearningApp: React.FC<Grade6LearningAppProps> = ({ 
  initialSubject = "Toán" 
}) => {
  const letters = ["A", "B", "C", "D"];

  // Ứng dụng có 3 màn hình chuẩn theo yêu cầu:
  // 1. "select_subject": Màn hình danh sách môn học Lớp 6 (Timer = STOPPED)
  // 2. "subject_intro": Màn hình giới thiệu môn đã chọn với nút "▶️ BẮT ĐẦU" (Timer = STOPPED)
  // 3. "in_quiz": Màn hình bài học đang làm sau khi bấm "▶️ BẮT ĐẦU" (Timer 10s đếm ngược 10 -> 0)
  const [appScreen, setAppScreen] = useState<"select_subject" | "subject_intro" | "in_quiz">("select_subject");

  // Subject selector state: "all" (ngẫu nhiên) or specific subject name ("Toán", "Tiếng Việt", "Tiếng Anh", "Khoa học")
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreenPhone, setIsFullscreenPhone] = useState<boolean>(false);

  // Pool of all questions across subjects
  const allQuestionsMap = useRef<{ [id: string]: { question: Question; subjectName: string; icon: string } }>({});
  const allQuestionIds = useRef<string[]>([]);

  // Per-subject tracking stats
  const [subjectStatsMap, setSubjectStatsMap] = useState<{ [key: string]: SubjectStats }>({
    "all": { answeredIds: [], correctCount: 0, wrongCount: 0, currentStreak: 0, bestStreak: 0 },
    "Toán": { answeredIds: [], correctCount: 0, wrongCount: 0, currentStreak: 0, bestStreak: 0 },
    "Tiếng Việt": { answeredIds: [], correctCount: 0, wrongCount: 0, currentStreak: 0, bestStreak: 0 },
    "Tiếng Anh": { answeredIds: [], correctCount: 0, wrongCount: 0, currentStreak: 0, bestStreak: 0 },
    "Khoa học": { answeredIds: [], correctCount: 0, wrongCount: 0, currentStreak: 0, bestStreak: 0 },
  });

  // Flag for Subject Completion Screen
  const [isSubjectCompleted, setIsSubjectCompleted] = useState<boolean>(false);

  // Initialize questions map
  useEffect(() => {
    const map: { [id: string]: { question: Question; subjectName: string; icon: string } } = {};
    const ids: string[] = [];

    DEFAULT_SUBJECTS.forEach((sub) => {
      sub.questions.forEach((q) => {
        map[q.id] = {
          question: q,
          subjectName: sub.subject,
          icon: sub.icon,
        };
        ids.push(q.id);
      });
    });

    allQuestionsMap.current = map;
    allQuestionIds.current = ids;
  }, []);

  // Helper to get active stats for selected subject
  const currentStats: SubjectStats = subjectStatsMap[selectedSubject] || {
    answeredIds: [],
    correctCount: 0,
    wrongCount: 0,
    currentStreak: 0,
    bestStreak: 0,
  };

  const streak = currentStats.currentStreak;
  const bestStreak = currentStats.bestStreak;
  const correctCount = currentStats.correctCount;
  const wrongCount = currentStats.wrongCount;
  const totalAnswered = correctCount + wrongCount;

  // Current active question state
  const [currentQuestionData, setCurrentQuestionData] = useState<{
    question: Question;
    subjectName: string;
    icon: string;
  } | null>(null);

  // Input state
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Feedback states: "idle" | "correct" | "wrong" | "timeout"
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong" | "timeout">("idle");
  const [wrongExplanation, setWrongExplanation] = useState<WrongExplanationData | null>(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [currentVoiceStyle, setCurrentVoiceStyle] = useState<VoiceStyle>(() => soundManager.getVoiceStyle());
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState<boolean>(false);

  // 2. GIỚI HẠN THỜI GIAN — CHÍNH XÁC 20 GIÂY MỖI CÂU
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance countdown for correct answers
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current refs to avoid stale closures in timer callback
  const currentQuestionDataRef = useRef(currentQuestionData);
  const streakRef = useRef(streak);
  const selectedSubjectRef = useRef(selectedSubject);
  const feedbackStateRef = useRef(feedbackState);
  const appScreenRef = useRef(appScreen);

  useEffect(() => {
    currentQuestionDataRef.current = currentQuestionData;
    streakRef.current = streak;
    selectedSubjectRef.current = selectedSubject;
    feedbackStateRef.current = feedbackState;
    appScreenRef.current = appScreen;
  });

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, []);

  // Live status bar time
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("09:41");
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setCurrentTimeStr(`${h}:${m}`);
    };
    updateTime();
    const t = setInterval(updateTime, 10000);
    return () => clearInterval(t);
  }, []);

  // Helper to get total pool of questions for a subject
  const getSubjectPool = (subjectName: string): string[] => {
    if (subjectName === "all") {
      return allQuestionIds.current;
    }
    const subjectObj = DEFAULT_SUBJECTS.find((s) => s.subject === subjectName);
    return subjectObj ? subjectObj.questions.map((q) => q.id) : [];
  };

  // Helper to format subject display name
  const getSubjectDisplayName = (subjKey: string): string => {
    if (subjKey === "all") return "Ngẫu nhiên các môn";
    if (subjKey === "Tiếng Việt") return "Ngữ văn 6";
    if (subjKey === "Khoa học") return "Khoa học tự nhiên 6";
    return `${subjKey} 6`;
  };

  // Helper to format subject icon
  const getSubjectIcon = (subjKey: string): string => {
    if (subjKey === "Toán") return "📐";
    if (subjKey === "Tiếng Việt") return "📖";
    if (subjKey === "Tiếng Anh") return "🌐";
    if (subjKey === "Khoa học") return "🔬";
    return "🔀";
  };

  // Lời động viên theo từng môn học khi học sinh làm sai - rút gọn súc tích
  const getSubjectEncouragement = (subName: string): string => {
    const s = subName.toLowerCase();
    if (s.includes("toán")) return "Toán 6 · Cố lên bạn ơi, cùng cố gắng thêm nào! 💪";
    if (s.includes("văn") || s.includes("tiếng việt")) return "Ngữ văn 6 · Đọc kỹ từ khóa là làm đúng ngay thôi! 💪";
    if (s.includes("anh")) return "Tiếng Anh 6 · Không sao, nhớ từ vựng và cấu trúc nhé! 💪";
    if (s.includes("khoa") || s.includes("khtn")) return "KHTN 6 · Kiên trì quan sát để phản xạ nhanh nhé! 💪";
    return `${subName} 6 · Cố lên ở câu sau nhé! 💪`;
  };

  // Đổi giọng đọc AI (Thầy giáo / Cô giáo / Bạn học)
  const handleCycleVoice = () => {
    const nextProfile = soundManager.cycleVoiceStyle();
    setCurrentVoiceStyle(nextProfile.id);

    // Nếu đang phát âm thanh thì mới đọc tiếp bằng giọng mới
    if (isAiSpeaking && wrongExplanation && currentQuestionData && (feedbackState === "wrong" || feedbackState === "timeout")) {
      setIsAiSpeaking(true);
      soundManager.speakWrongExplanation({
        subject: currentQuestionData.subjectName || selectedSubject,
        isTimeout: wrongExplanation.isTimeout,
        whyWrong: wrongExplanation.whyWrong,
        correctLetter: wrongExplanation.correctLetter,
        correctAnswer: wrongExplanation.correctAnswer,
        reasoning: wrongExplanation.reasoning,
        keyPointsToRemember: wrongExplanation.keyPointsToRemember,
        onStart: () => setIsAiSpeaking(true),
        onEnd: () => setIsAiSpeaking(false),
      });
    } else {
      // Đọc mẫu 1 câu chào ngắn gọn giới thiệu giọng mới
      soundManager.previewVoice();
    }
  };

  // Dừng giọng đọc AI
  const handleStopSpeech = () => {
    soundManager.stopSpeech();
    setIsAiSpeaking(false);
  };

  // Bật/Tắt phát âm thanh đọc giải thích khi người dùng bấm nút
  const handleToggleAiSpeech = () => {
    if (isAiSpeaking) {
      handleStopSpeech();
      return;
    }
    if (!wrongExplanation || !currentQuestionData) return;
    setIsAiSpeaking(true);
    soundManager.speakWrongExplanation({
      subject: currentQuestionData.subjectName || selectedSubject,
      isTimeout: wrongExplanation.isTimeout,
      whyWrong: wrongExplanation.whyWrong,
      correctLetter: wrongExplanation.correctLetter,
      correctAnswer: wrongExplanation.correctAnswer,
      reasoning: wrongExplanation.reasoning,
      keyPointsToRemember: wrongExplanation.keyPointsToRemember,
      onStart: () => setIsAiSpeaking(true),
      onEnd: () => setIsAiSpeaking(false),
    });
  };

  // Phát lại giọng đọc AI khi bấm nút
  const handleReplaySpeech = handleToggleAiSpeech;

  // 2. GIỚI HẠN THỜI GIAN: XỬ LÝ KHI HẾT 20 GIÂY MÀ CHƯA TRẢ LỜI
  const handleTimeExpired = () => {
    if (feedbackStateRef.current !== "idle" || !currentQuestionDataRef.current) return;

    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }

    setTimeLeft(0);
    setFeedbackState("timeout");

    soundManager.playTimeout();

    const q = currentQuestionDataRef.current.question;
    const currentSub = selectedSubjectRef.current;
    const prevStreak = streakRef.current;

    // Tự động tính câu đó là SAI:
    // → Số câu sai tăng lên 1
    // → Chuỗi đúng lập tức trở về 0
    setSubjectStatsMap((prevMap) => {
      const prev = prevMap[currentSub] || {
        answeredIds: [],
        correctCount: 0,
        wrongCount: 0,
        currentStreak: 0,
        bestStreak: 0,
      };

      const updatedAnsweredIds = prev.answeredIds.includes(q.id)
        ? prev.answeredIds
        : [...prev.answeredIds, q.id];

      return {
        ...prevMap,
        [currentSub]: {
          answeredIds: updatedAnsweredIds,
          correctCount: prev.correctCount,
          wrongCount: prev.wrongCount + 1,
          currentStreak: 0,
          bestStreak: prev.bestStreak,
        },
      };
    });

    let streakLostNotice = "";
    if (prevStreak > 0) {
      streakLostNotice = `⚡ Chuỗi đúng (${prevStreak}) đã trở về 0 do hết thời gian 20 giây. Hãy cố gắng tạo chuỗi mới nhé!`;
    }

    const explanationData: WrongExplanationData = {
      isTimeout: true,
      studentAnswerText: "Hết 20 giây (chưa kịp gửi câu trả lời)",
      whyWrong: "Đã hết chính xác 20 giây quy định cho câu hỏi này mà hệ thống chưa nhận được câu trả lời. Trong các bài kiểm tra trắc nghiệm nhanh, tốc độ phản xạ và phân tích từ khóa quyết định độ chính xác.",
      correctAnswer: q.options[q.correctIndex],
      correctLetter: letters[q.correctIndex],
      reasoning: q.explanation,
      keyPointsToRemember: q.adviceIfWrong || q.knowledgeGapIfWrong || "Luyện thói quen quan sát từ khóa trọng tâm trong 5 giây đầu, loại trừ phương án vô lý để chọn đáp án kịp trong 20 giây.",
      lessonName: q.textbookLesson,
      streakLostNotice: streakLostNotice,
    };

    setWrongExplanation(explanationData);
    // KHÔNG tự động đọc khi hết giờ: chỉ đọc khi người dùng bấm nút
    setIsAiSpeaking(false);
  };

  // ĐIỀU KHIỂN ĐỒNG HỒ 20 GIÂY — TUÂN THỦ NGHIÊM NGẶT YÊU CẦU:
  // - Nếu học sinh đang ở màn hình chọn môn hoặc màn hình giới thiệu môn: Timer = PAUSED / STOPPED.
  // - Không được chạy ngầm. Không được tự động trừ giây.
  // - CHỈ KHI học sinh bấm "▶️ BẮT ĐẦU" và câu hỏi xuất hiện: đồng hồ mới bắt đầu từ 20 giây.
  // - Mỗi khi chuyển sang câu mới: reset đồng hồ về 20 giây và đếm ngay cho câu mới.
  useEffect(() => {
    // Nếu KHÔNG PHẢI đang làm bài (in_quiz), hoặc feedback không phải idle, hoặc chưa có câu hỏi, hoặc môn đã xong:
    // DỪNG TIMER NGAY LẬP TỨC!
    if (
      appScreen !== "in_quiz" ||
      feedbackState !== "idle" ||
      !currentQuestionData ||
      isSubjectCompleted
    ) {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }
      return;
    }

    // Khi câu hỏi mới xuất hiện trong in_quiz: Reset đồng hồ về đúng 20 giây
    setTimeLeft(20);

    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }

    // Bắt đầu đếm ngược 20 -> 0
    questionTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (questionTimerRef.current) {
            clearInterval(questionTimerRef.current);
            questionTimerRef.current = null;
          }
          handleTimeExpired();
          return 0;
        }
        if (prev <= 5) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }
    };
  }, [
    appScreen, 
    currentQuestionData?.question.id, 
    feedbackState, 
    isSubjectCompleted
  ]);

  // Pick a question for active quiz
  const pickNextQuestion = (forceSubject?: string) => {
    handleStopSpeech();
    // Dọn dẹp các timer cũ
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    setCountdown(null);
    setTimeLeft(20);
    setFeedbackState("idle");
    setWrongExplanation(null);
    setInputValue("");
    setSelectedOptionIndex(null);

    const subjectFilter = forceSubject !== undefined ? forceSubject : selectedSubject;
    const pool = getSubjectPool(subjectFilter);

    if (pool.length === 0) return;

    // Check answered IDs for this subject
    const stats = subjectStatsMap[subjectFilter] || {
      answeredIds: [],
      correctCount: 0,
      wrongCount: 0,
      currentStreak: 0,
      bestStreak: 0,
    };

    const answered = stats.answeredIds;

    // CHECK IF ALL QUESTIONS IN THE SUBJECT ARE COMPLETED!
    if (answered.length >= pool.length && pool.length > 0) {
      setIsSubjectCompleted(true);
      soundManager.playCelebrate();
      return;
    }

    setIsSubjectCompleted(false);

    // Pick from un-answered questions
    const unAnswered = pool.filter((id) => !answered.includes(id));
    const finalPool = unAnswered.length > 0 ? unAnswered : pool;

    const randomIndex = Math.floor(Math.random() * finalPool.length);
    const chosenId = finalPool[randomIndex];
    const data = allQuestionsMap.current[chosenId];

    if (data) {
      setCurrentQuestionData(data);
    }
  };

  // KHI HỌC SINH BẤM VÀO MỘT MÔN (Ví dụ: "Toán 6")
  // -> CHỈ MỞ MÀN HÌNH GIỚI THIỆU CỦA MÔN ĐÓ.
  // -> ĐỒNG HỒ VẪN PHẢI DỪNG. CHƯA TÍNH 20 GIÂY.
  // -> HIỂN THỊ NÚT "▶️ BẮT ĐẦU".
  const handleSelectSubject = (newSubject: string) => {
    handleStopSpeech();
    // 1. Dừng timer ngay lập tức — không chạy ngầm
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    soundManager.playClick();
    setSelectedSubject(newSubject);
    setIsSubjectCompleted(false);
    setFeedbackState("idle");
    setWrongExplanation(null);
    setTimeLeft(20);
    setCountdown(null);
    setInputValue("");
    setSelectedOptionIndex(null);

    // 2. Chuyển sang màn hình giới thiệu môn học đã chọn
    // Timer = STOPPED, không chạy ngầm
    setAppScreen("subject_intro");
  };

  // CHỈ KHI HỌC SINH BẤM NÚT "▶️ BẮT ĐẦU":
  // -> Mới bắt đầu bài học.
  // -> Câu hỏi đầu tiên mới xuất hiện.
  // -> Đồng hồ mới bắt đầu từ 20 giây.
  // -> Khi đó mới bắt đầu tính thời gian.
  const handleStartQuiz = () => {
    handleStopSpeech();
    soundManager.playClick();
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    setIsSubjectCompleted(false);
    setFeedbackState("idle");
    setWrongExplanation(null);
    setInputValue("");
    setSelectedOptionIndex(null);
    setTimeLeft(20);
    setCountdown(null);

    // Lấy câu hỏi đầu tiên
    pickNextQuestion(selectedSubject);
    // Chuyển sang màn hình làm bài
    setAppScreen("in_quiz");
  };

  // Khi học sinh thoát khỏi bài đang làm hoặc bấm đổi môn:
  // -> Dừng timer ngay lập tức.
  // -> Quay lại màn hình giới thiệu môn
  const handleExitQuiz = () => {
    handleStopSpeech();
    soundManager.playClick();
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setFeedbackState("idle");
    setWrongExplanation(null);
    setTimeLeft(20);
    setCountdown(null);
    setAppScreen("subject_intro");
  };

  // Khi học sinh từ màn hình giới thiệu quay lại danh sách chọn môn:
  const handleBackToSubjectList = () => {
    handleStopSpeech();
    soundManager.playClick();
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setAppScreen("select_subject");
  };

  // Reset progress for current subject ("Làm lại môn này")
  const handleResetCurrentSubject = () => {
    handleStopSpeech();
    soundManager.playClick();
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setSubjectStatsMap((prev) => ({
      ...prev,
      [selectedSubject]: {
        answeredIds: [],
        correctCount: 0,
        wrongCount: 0,
        currentStreak: 0,
        bestStreak: 0,
      },
    }));
    setIsSubjectCompleted(false);
    setTimeLeft(20);
    setAppScreen("subject_intro");
  };

  // Toggle sound
  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.setMuted(nextState);
    if (nextState) {
      handleStopSpeech();
    }
  };

  // When clicking an option chip: updates both selection and text input
  const handleSelectOptionChip = (index: number) => {
    if (feedbackState !== "idle" || timeLeft <= 0) return; // cannot change after answering or when timed out
    soundManager.playClick();
    setSelectedOptionIndex(index);
    if (currentQuestionData) {
      setInputValue(letters[index]);
    }
  };

  // Evaluate user submission
  const handleSubmitAnswer = () => {
    // Nếu học sinh gửi câu trả lời sau khi đồng hồ đã về 0 giây hoặc không ở trạng thái idle
    if (feedbackState !== "idle" || !currentQuestionData) return;

    if (timeLeft <= 0) {
      handleTimeExpired();
      return;
    }

    const q = currentQuestionData.question;
    const rawInput = inputValue.trim();

    if (!rawInput && selectedOptionIndex === null) return;

    // Dừng ngay đồng hồ 10 giây khi học sinh đã gửi câu trả lời
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }

    // Determine chosen index
    let chosenIdx: number | null = selectedOptionIndex;
    let chosenText = "";

    if (chosenIdx !== null) {
      chosenText = q.options[chosenIdx];
    } else {
      // Analyze typed input
      const norm = rawInput.toLowerCase();
      if (norm === "a" || norm === "1" || norm.startsWith("đáp án a") || norm.startsWith("chọn a") || norm.startsWith("câu a")) {
        chosenIdx = 0;
      } else if (norm === "b" || norm === "2" || norm.startsWith("đáp án b") || norm.startsWith("chọn b") || norm.startsWith("câu b")) {
        chosenIdx = 1;
      } else if (norm === "c" || norm === "3" || norm.startsWith("đáp án c") || norm.startsWith("chọn c") || norm.startsWith("câu c")) {
        chosenIdx = 2;
      } else if (norm === "d" || norm === "4" || norm.startsWith("đáp án d") || norm.startsWith("chọn d") || norm.startsWith("câu d")) {
        chosenIdx = 3;
      } else {
        // Compare with option texts
        const found = q.options.findIndex((opt) => opt.toLowerCase() === norm);
        if (found !== -1) {
          chosenIdx = found;
        } else {
          // Fuzzy check: check if input contains key parts of correct answer
          const correctTextNorm = q.options[q.correctIndex].toLowerCase();
          if (correctTextNorm.includes(norm) && norm.length >= 3) {
            chosenIdx = q.correctIndex;
          }
        }
      }

      chosenText = chosenIdx !== null ? q.options[chosenIdx] : rawInput;
    }

    // Check correctness
    const isCorrect = chosenIdx === q.correctIndex;

    // 2. HỆ THỐNG CHUỖI TRẢ LỜI ĐÚNG (STREAK) & THEO DÕI KẾT QUẢ
    setSubjectStatsMap((prevMap) => {
      const prev = prevMap[selectedSubject] || {
        answeredIds: [],
        correctCount: 0,
        wrongCount: 0,
        currentStreak: 0,
        bestStreak: 0,
      };

      const updatedAnsweredIds = prev.answeredIds.includes(q.id)
        ? prev.answeredIds
        : [...prev.answeredIds, q.id];

      if (isCorrect) {
        const nextStreak = prev.currentStreak + 1;
        const nextBestStreak = Math.max(prev.bestStreak, nextStreak);
        return {
          ...prevMap,
          [selectedSubject]: {
            answeredIds: updatedAnsweredIds,
            correctCount: prev.correctCount + 1,
            wrongCount: prev.wrongCount,
            currentStreak: nextStreak,
            bestStreak: nextBestStreak,
          },
        };
      } else {
        // When wrong: Chuỗi đúng lập tức trở về 0
        return {
          ...prevMap,
          [selectedSubject]: {
            answeredIds: updatedAnsweredIds,
            correctCount: prev.correctCount,
            wrongCount: prev.wrongCount + 1,
            currentStreak: 0,
            bestStreak: prev.bestStreak,
          },
        };
      }
    });

    if (isCorrect) {
      // 3. KHI TRẢ LỜI ĐÚNG TRONG VÒNG 10 GIÂY:
      // → Tính là ĐÚNG.
      // → Tăng số câu đúng lên 1. Tăng Chuỗi đúng lên 1.
      // → Phát âm thanh vui tươi: soundManager.playCorrect()
      // → Phát âm tiếng "Congratulations!" cực hay bằng giọng bản ngữ tiếng Anh (en-US) âm sắc hào hứng, cao độ rộn ràng, tự nhiên chuẩn quốc tế
      // → Tiếp nối là lời chúc mừng tiếng Việt: "Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!"
      // → TỰ ĐỘNG chuyển sang câu tiếp theo khi nói xong.
      soundManager.playCorrect();
      setFeedbackState("correct");

      let count = 4;
      setCountdown(count);

      let hasAdvanced = false;
      const doAutoAdvance = () => {
        if (hasAdvanced) return;
        hasAdvanced = true;
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
        pickNextQuestion();
      };

      // Giọng đọc: Congratulations! + Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!
      // Khi nói xong thì tự động chuyển qua câu tiếp theo
      soundManager.speakCongratulations(
        "Congratulations! Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!",
        () => {
          // Khi giọng nói vừa kết thúc, delay 400ms êm dịu rồi chuyển câu
          setTimeout(() => {
            doAutoAdvance();
          }, 400);
        }
      );

      // Countdown hiển thị đếm ngược đồng bộ
      countdownTimerRef.current = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          doAutoAdvance();
        } else {
          setCountdown(count);
        }
      }, 1000);
    } else {
      // 4. KHI TRẢ LỜI SAI:
      // Tăng số câu sai lên 1. Chuỗi đúng trở về 0.
      // Hiển thị thông báo nhẹ nhàng rằng chuỗi đã bị mất.
      // TỰ ĐỘNG ĐỌC GIỌNG NÓI RÚT GỌN CHUẨN:
      // Môn -> Động viên -> Chọn câu nào -> Lý do sai -> Suy luận -> Kiến thức SGK nhớ nhanh
      // Giải thích đầy đủ 4 ý chuẩn SGK Lớp 6 (vẫn giữ phần viết chữ đầy đủ).
      // Sau khi giải thích xong, hiện nút "Tiếp tục".
      soundManager.playWrong();
      setFeedbackState("wrong");

      const previousStreakValue = streak;
      let streakLostNotice = "";
      if (previousStreakValue > 0) {
        streakLostNotice = `⚡ Chuỗi đúng (${previousStreakValue}) đã trở về 0. Đừng nản lòng, hãy cố gắng tạo chuỗi mới nhé!`;
      }

      let whyWrongText = "";
      if (chosenIdx !== null && q.wrongOptionReasons && q.wrongOptionReasons[chosenIdx]) {
        whyWrongText = `Bạn đã chọn phương án "${q.options[chosenIdx]}". ${q.wrongOptionReasons[chosenIdx]}`;
      } else {
        whyWrongText = `Câu trả lời "${chosenText}" chưa chính xác. ${q.knowledgeGapIfWrong || "Bạn có thể đã đọc sót từ khóa quan trọng hoặc nhầm lẫn giữa các khái niệm trong bài."}`;
      }

      const explanationData: WrongExplanationData = {
        isTimeout: false,
        studentAnswerText: chosenText,
        whyWrong: whyWrongText,
        correctAnswer: q.options[q.correctIndex],
        correctLetter: letters[q.correctIndex],
        reasoning: q.explanation,
        keyPointsToRemember: q.adviceIfWrong || q.knowledgeGapIfWrong || "Đọc kỹ câu hỏi, gạch chân từ khóa quan trọng và đối chiếu với định nghĩa trong SGK Lớp 6.",
        lessonName: q.textbookLesson,
        streakLostNotice: streakLostNotice,
      };

      setWrongExplanation(explanationData);
      // KHÔNG tự động đọc khi sai: chỉ đọc khi người dùng bấm nút
      setIsAiSpeaking(false);
    }
  };

  // Handle retry for wrong answer or timeout
  const handleRetryCurrent = () => {
    handleStopSpeech();
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    soundManager.playClick();
    setTimeLeft(20);
    setFeedbackState("idle");
    setWrongExplanation(null);
    setInputValue("");
    setSelectedOptionIndex(null);
  };

  const q = currentQuestionData?.question;
  const currentPool = getSubjectPool(selectedSubject);
  const subjectDisplayName = getSubjectDisplayName(selectedSubject);
  const subjectName = currentQuestionData?.subjectName || subjectDisplayName;
  const icon = getSubjectIcon(selectedSubject);
  const currentSubjectDetail = SUBJECT_DETAILS[selectedSubject] || SUBJECT_DETAILS["Toán"];

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 sm:py-6 px-2 sm:px-4">
      {/* Top Utility Controls Bar */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between gap-2 px-1">
        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleSelectSubject("Toán")}
            className={`cursor-pointer px-2.5 py-1.5 rounded-full transition flex items-center gap-1 shrink-0 ${
              selectedSubject === "Toán" && appScreen !== "select_subject"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
            }`}
          >
            <span>📐</span>
            <span>Toán 6</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSubject("Tiếng Việt")}
            className={`cursor-pointer px-2.5 py-1.5 rounded-full transition flex items-center gap-1 shrink-0 ${
              selectedSubject === "Tiếng Việt" && appScreen !== "select_subject"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
            }`}
          >
            <span>📖</span>
            <span>Ngữ văn 6</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSubject("Tiếng Anh")}
            className={`cursor-pointer px-2.5 py-1.5 rounded-full transition flex items-center gap-1 shrink-0 ${
              selectedSubject === "Tiếng Anh" && appScreen !== "select_subject"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
            }`}
          >
            <span>🌐</span>
            <span>Tiếng Anh 6</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSubject("Khoa học")}
            className={`cursor-pointer px-2.5 py-1.5 rounded-full transition flex items-center gap-1 shrink-0 ${
              selectedSubject === "Khoa học" && appScreen !== "select_subject"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
            }`}
          >
            <span>🔬</span>
            <span>KHTN 6</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSubject("all")}
            className={`cursor-pointer px-2.5 py-1.5 rounded-full transition flex items-center gap-1 shrink-0 ${
              selectedSubject === "all" && appScreen !== "select_subject"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
            }`}
          >
            <Shuffle className="w-3 h-3" />
            <span>Ngẫu nhiên</span>
          </button>
        </div>

        {/* View Mode & Sound Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Nút Voice Studio & Đổi giọng đọc AI */}
          <button
            type="button"
            onClick={() => setIsVoiceStudioOpen(true)}
            className="cursor-pointer px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 text-indigo-900 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs active:scale-95"
            title="Cài đặt giọng đọc AI (chọn giọng Thầy/Cô/Bạn, chỉnh tốc độ, cao độ, giọng tự nhiên)"
          >
            <span>{VOICE_PROFILES[currentVoiceStyle]?.icon || "🎙️"}</span>
            <span className="text-[11px] font-extrabold">{VOICE_PROFILES[currentVoiceStyle]?.shortName || "Giọng AI"}</span>
            <Sliders className="w-3 h-3 text-indigo-600 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              isMuted
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "bg-white border-slate-200 text-slate-600 hover:text-blue-600"
            }`}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreenPhone(!isFullscreenPhone)}
            className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition cursor-pointer"
            title={isFullscreenPhone ? "Thu nhỏ giao diện" : "Xem toàn màn hình điện thoại"}
          >
            {isFullscreenPhone ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* PHONE CONTAINER: Realistic Smartphone Frame */}
      <div
        className={`w-full transition-all duration-300 ${
          isFullscreenPhone
            ? "max-w-[480px] sm:max-w-[500px]"
            : "max-w-[390px] sm:max-w-[410px]"
        }`}
      >
        <div className="relative bg-[#0f172a] p-3 sm:p-4 rounded-[44px] sm:rounded-[48px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] border-4 border-slate-700/60 ring-1 ring-slate-800">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40">
            <div className="w-24 sm:w-28 h-5 sm:h-5.5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/80"></div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
            </div>
          </div>

          {/* INNER PHONE SCREEN */}
          <div className="relative bg-slate-50 rounded-[34px] sm:rounded-[38px] overflow-hidden flex flex-col min-h-[640px] max-h-[820px] shadow-inner select-none">
            {/* 1. Status Bar */}
            <div className="pt-2 sm:pt-2.5 px-6 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-800 tracking-tight z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
              <span>{currentTimeStr}</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-[10px] tracking-wider font-extrabold text-blue-600">5G</span>
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                <div className="w-5 h-2.5 rounded-sm border border-slate-700 p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-800 rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* 2. App Top Header inside Phone - Thích ứng theo từng màn hình */}
            <div className="px-3.5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between gap-2 z-20">
              {appScreen === "select_subject" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-xs">
                      6
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">StudySync Lớp 6</div>
                      <div className="text-[10px] text-slate-500 font-medium">Chọn môn học để bắt đầu</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    GDPT 2018
                  </span>
                </>
              )}

              {appScreen === "subject_intro" && (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleBackToSubjectList}
                      className="p-1 -ml-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                      title="Quay lại danh sách môn học"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Chọn môn</span>
                    </button>
                    <div className="h-3 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{icon}</span>
                      <span className="text-xs font-black text-slate-900 leading-tight">{subjectDisplayName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <PauseCircle className="w-3 h-3 text-amber-600" />
                    <span>Chưa tính giờ</span>
                  </div>
                </>
              )}

              {appScreen === "in_quiz" && (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExitQuiz}
                      className="p-1 -ml-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                      title="Thoát và đổi môn học"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Đổi môn</span>
                    </button>
                    <div className="h-3 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{icon}</span>
                      <span className="text-xs font-black text-slate-900 leading-tight">{subjectDisplayName}</span>
                    </div>
                  </div>

                  {/* Chuỗi đúng hiển thị rõ ràng */}
                  <div 
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                      streak > 0
                        ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs scale-105"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                    title={`Chuỗi đúng hiện tại: ${streak}`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${streak > 0 ? "text-amber-500 fill-amber-500 animate-pulse" : "text-slate-400"}`} />
                    <span className="tracking-tight">Chuỗi đúng: {streak}</span>
                  </div>
                </>
              )}
            </div>

            {/* 3. SCROLLABLE MAIN CONTENT INSIDE PHONE */}
            <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 custom-scrollbar">

              {/* MÀN HÌNH 1: DANH SÁCH CHỌN MÔN HỌC (Timer = STOPPED) */}
              {appScreen === "select_subject" && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Banner hướng dẫn */}
                  <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Ôn tập Lớp 6 Chuẩn SGK</span>
                      </div>
                      <h3 className="text-base font-black leading-snug">
                        Chọn môn học để bắt đầu
                      </h3>
                      <p className="text-[11px] text-blue-100 leading-relaxed">
                        Bấm vào một môn học để xem giới thiệu và chuẩn bị thử thách 20 giây mỗi câu.
                      </p>
                    </div>
                    <div className="absolute -bottom-6 -right-6 text-7xl opacity-15">
                      📚
                    </div>
                  </div>

                  {/* Thông báo quy định timer */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-amber-900">
                    <Timer className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Quy tắc tính giờ:</strong> Đồng hồ chỉ bắt đầu đếm khi bạn bấm nút <strong>▶️ BẮT ĐẦU</strong> trong màn hình môn. Ở màn hình chọn môn này, đồng hồ hoàn toàn dừng.
                    </div>
                  </div>

                  {/* Danh sách các môn học Lớp 6 */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider px-1">
                      Các môn học chính:
                    </div>

                    {[
                      { key: "Toán", icon: "📐", name: "Toán 6", desc: "Số học, số nguyên, phân số, hình học phẳng", color: "border-blue-200 hover:border-blue-400 bg-white" },
                      { key: "Tiếng Việt", icon: "📖", name: "Ngữ văn 6", desc: "Thơ lục bát, truyện ngắn, biện pháp tu từ", color: "border-emerald-200 hover:border-emerald-400 bg-white" },
                      { key: "Tiếng Anh", icon: "🌐", name: "Tiếng Anh 6", desc: "Global Success: Từ vựng & ngữ pháp Unit 1-3", color: "border-indigo-200 hover:border-indigo-400 bg-white" },
                      { key: "Khoa học", icon: "🔬", name: "KHTN 6", desc: "Phép đo lường, chất, tế bào sống & lực", color: "border-amber-200 hover:border-amber-400 bg-white" },
                      { key: "all", icon: "🔀", name: "Ngẫu nhiên các môn", desc: "Thử thách kiến thức liên môn 40 câu hỏi", color: "border-purple-200 hover:border-purple-400 bg-white" },
                    ].map((item) => {
                      const stats = subjectStatsMap[item.key] || { answeredIds: [], correctCount: 0, wrongCount: 0, currentStreak: 0, bestStreak: 0 };
                      const pool = getSubjectPool(item.key);
                      const isComplete = stats.answeredIds.length >= pool.length && pool.length > 0;

                      return (
                        <div
                          key={item.key}
                          onClick={() => handleSelectSubject(item.key)}
                          className={`cursor-pointer rounded-2xl p-3 border transition-all duration-200 hover:shadow-md active:scale-98 ${item.color}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                                {item.icon}
                              </span>
                              <div>
                                <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                  <span>{item.name}</span>
                                  {isComplete && (
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-sm">
                                      ✓ Hoàn thành
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Tiến độ tóm tắt */}
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                            <span>Tiến độ: <strong>{stats.answeredIds.length}/{pool.length} câu</strong></span>
                            <span>Đúng: <strong className="text-emerald-600">{stats.correctCount}</strong> · Chuỗi cao: <strong className="text-amber-600">🏆 {stats.bestStreak}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MÀN HÌNH 2: GIỚI THIỆU MÔN HỌC & NÚT "▶️ BẮT ĐẦU" (Timer = STOPPED, CHƯA TÍNH 10 GIÂY) */}
              {appScreen === "subject_intro" && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Card giới thiệu môn học */}
                  <div className={`bg-gradient-to-br ${currentSubjectDetail.bgGradient} rounded-2xl p-4 text-white shadow-md relative overflow-hidden`}>
                    <div className="relative z-10 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl p-1.5 bg-white/20 rounded-2xl backdrop-blur-xs">
                          {icon}
                        </span>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
                            {currentSubjectDetail.badge}
                          </span>
                          <h2 className="text-lg font-black leading-tight mt-0.5">
                            {currentSubjectDetail.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/90 leading-relaxed pt-1">
                        {currentSubjectDetail.description}
                      </p>
                    </div>
                  </div>

                  {/* 4 Chủ đề trọng tâm SGK */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
                    <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-blue-600" />
                      <span>Trọng tâm kiến thức chuẩn SGK:</span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-700">
                      {currentSubjectDetail.keyTopics.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KHỐI HIỂN THỊ QUY ĐỊNH 20 GIÂY — ĐỒNG HỒ ĐANG DỪNG */}
                  <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-black text-xs text-amber-950">
                        <Timer className="w-4 h-4 text-amber-600" />
                        <span>QUY ĐỊNH: 20 GIÂY MỖI CÂU</span>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <PauseCircle className="w-3 h-3 text-amber-700" />
                        <span>Đang dừng (20s)</span>
                      </span>
                    </div>

                    <div className="text-[11px] text-amber-900 leading-relaxed font-medium">
                      Đồng hồ 20 giây <strong>chưa bắt đầu</strong>. Khi bạn bấm nút <strong>▶️ BẮT ĐẦU</strong> bên dưới, câu hỏi đầu tiên mới xuất hiện và đồng hồ mới đếm ngược 20 → 19 → 18...
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                      <div className="bg-white/90 p-2 rounded-xl border border-amber-200 font-semibold text-slate-700">
                        ✅ Trả lời đúng trong 20s: Nhận điểm & Tích lũy chuỗi 🔥
                      </div>
                      <div className="bg-white/90 p-2 rounded-xl border border-amber-200 font-semibold text-slate-700">
                        ⏰ Hết 20s hoặc sai: Chuỗi về 0, dừng để xem giải thích SGK
                      </div>
                    </div>
                  </div>

                  {/* Thống kê tiến độ hiện tại */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Tiến độ môn học:</div>
                      <div className="font-black text-slate-800">
                        {currentStats.answeredIds.length} / {currentPool.length} câu
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Đúng / Sai:</div>
                      <div className="font-black text-slate-800">
                        <span className="text-emerald-600">{correctCount}</span> / <span className="text-rose-600">{wrongCount}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Chuỗi cao nhất:</div>
                      <div className="font-black text-amber-600">
                        🏆 {bestStreak}
                      </div>
                    </div>
                  </div>

                  {/* NÚT "▶️ BẮT ĐẦU" TO, NỔI BẬT THEO ĐÚNG YÊU CẦU */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleStartQuiz}
                      className="w-full cursor-pointer py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 ring-4 ring-blue-400/25"
                    >
                      <Play className="w-5 h-5 fill-white" />
                      <span>▶️ BẮT ĐẦU (20 GIÂY/CÂU)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBackToSubjectList}
                      className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-bold py-1.5 transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Quay lại chọn môn học khác</span>
                    </button>
                  </div>
                </div>
              )}

              {/* MÀN HÌNH 3: BÀI THI ĐANG LÀM (in_quiz) VỚI ĐỒNG HỒ 10 GIÂY ĐẾM NGƯỢC */}
              {appScreen === "in_quiz" && (
                <>
                  {/* 6. MÀN HÌNH TỔNG KẾT KHI HOÀN THÀNH MỘT MÔN */}
                  {isSubjectCompleted ? (
                <div className="bg-white rounded-3xl p-5 border-2 border-emerald-300 shadow-lg space-y-4 animate-fadeIn my-auto text-center">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-emerald-400 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-md">
                    🎉
                  </div>

                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-black px-3 py-1 rounded-full border border-emerald-200 mb-1 uppercase tracking-wider">
                      Hoàn thành môn học!
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      🎉 TỔNG KẾT MÔN HỌC
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Chúc mừng bạn đã hoàn thành trọn bộ câu hỏi của môn này!
                    </p>
                  </div>

                  {/* BẢNG TỔNG KẾT THEO YÊU CẦU:
                      Tên môn học.
                      Tổng số câu đã làm.
                      ✅ Số câu trả lời đúng.
                      ❌ Số câu trả lời sai.
                      🔥 Chuỗi đúng cao nhất.
                      📈 Tỷ lệ trả lời đúng (%). */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                      <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                        <span>📚</span> Môn học:
                      </span>
                      <span className="font-black text-slate-900 text-sm">
                        {subjectDisplayName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                      <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                        <span>📝</span> Tổng số câu:
                      </span>
                      <span className="font-black text-slate-900">
                        {totalAnswered} câu
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                        <span>✅</span> Trả lời đúng:
                      </span>
                      <span className="font-black text-emerald-700">
                        {correctCount} câu
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                      <span className="text-rose-700 font-semibold flex items-center gap-1.5">
                        <span>❌</span> Trả lời sai:
                      </span>
                      <span className="font-black text-rose-700">
                        {wrongCount} câu
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                      <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                        <span>🔥</span> Chuỗi đúng cao nhất:
                      </span>
                      <span className="font-black text-amber-700">
                        {bestStreak}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 pt-1.5">
                      <span className="text-blue-700 font-semibold flex items-center gap-1.5">
                        <span>📈</span> Tỷ lệ đúng:
                      </span>
                      <span className="font-black text-blue-700 text-sm">
                        {totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0}%
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleResetCurrentSubject}
                      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm lại môn này</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBackToSubjectList}
                      className="w-full cursor-pointer bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Về danh sách chọn môn học</span>
                    </button>

                    <div className="text-[11px] text-slate-500 font-semibold pt-1">
                      Hoặc chọn ngay môn khác để tiếp tục:
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectSubject("Toán")}
                        className="cursor-pointer bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2 rounded-xl transition"
                      >
                        📐 Toán 6
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSubject("Tiếng Việt")}
                        className="cursor-pointer bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2 rounded-xl transition"
                      >
                        📖 Ngữ văn 6
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSubject("Tiếng Anh")}
                        className="cursor-pointer bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2 rounded-xl transition"
                      >
                        🌐 Tiếng Anh 6
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSubject("Khoa học")}
                        className="cursor-pointer bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2 rounded-xl transition"
                      >
                        🔬 KHTN 6
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* 5. THEO DÕI KẾT QUẢ: WIDGET TIẾN ĐỘ TỰ ĐỘNG CẬP NHẬT NGAY SAU MỖI CÂU TRẢ LỜI
                      Ví dụ:
                      "📊 Tiến độ
                      Câu đã làm: 8
                      ✅ Đúng: 6
                      ❌ Sai: 2
                      🔥 Chuỗi hiện tại: 3
                      🏆 Chuỗi cao nhất: 5" */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-black text-xs text-slate-800">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                        <span>📊 Tiến độ môn học</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {currentStats.answeredIds.length} / {currentPool.length} câu
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                      <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 flex flex-col justify-center items-center">
                        <span className="text-[10px] text-slate-500 font-medium">Câu đã làm</span>
                        <span className="text-slate-900 font-black text-xs">{totalAnswered}</span>
                      </div>

                      <div className="bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-200 flex flex-col justify-center items-center">
                        <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                          <span>✅</span> Đúng
                        </span>
                        <span className="text-emerald-800 font-black text-xs">{correctCount}</span>
                      </div>

                      <div className="bg-rose-50/80 p-1.5 rounded-lg border border-rose-200 flex flex-col justify-center items-center">
                        <span className="text-[10px] text-rose-700 font-medium flex items-center gap-0.5">
                          <span>❌</span> Sai
                        </span>
                        <span className="text-rose-800 font-black text-xs">{wrongCount}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold pt-0.5">
                      <div className="bg-amber-50/80 p-1.5 rounded-lg border border-amber-200 flex items-center justify-between px-2">
                        <span className="text-amber-800 font-semibold text-[10px] flex items-center gap-1">
                          <span>🔥</span> Chuỗi hiện tại:
                        </span>
                        <span className="text-amber-900 font-black text-xs">{streak}</span>
                      </div>

                      <div className="bg-indigo-50/80 p-1.5 rounded-lg border border-indigo-200 flex items-center justify-between px-2">
                        <span className="text-indigo-800 font-semibold text-[10px] flex items-center gap-1">
                          <span>🏆</span> Chuỗi cao nhất:
                        </span>
                        <span className="text-indigo-900 font-black text-xs">{bestStreak}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. GIỚI HẠN THỜI GIAN — CHÍNH XÁC 20 GIÂY MỖI CÂU
                      Hiển thị đồng hồ thật rõ trên màn hình điện thoại
                      Đồng hồ đếm: 20 → 19 → 18 → ... → 1 → 0 */}
                  <div 
                    className={`rounded-2xl p-3 border transition-all duration-300 ${
                      feedbackState === "timeout" 
                        ? "bg-rose-50 border-rose-300 ring-2 ring-rose-400/20"
                        : feedbackState === "correct"
                        ? "bg-emerald-50 border-emerald-300"
                        : feedbackState === "wrong"
                        ? "bg-slate-100 border-slate-200"
                        : timeLeft <= 5
                        ? "bg-rose-50 border-rose-300 shadow-xs ring-2 ring-rose-400/30"
                        : timeLeft <= 10
                        ? "bg-amber-50/80 border-amber-300"
                        : "bg-blue-50/80 border-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm transition-all shadow-xs ${
                            feedbackState === "timeout" || (feedbackState === "idle" && timeLeft <= 5)
                              ? "bg-rose-600 text-white animate-pulse"
                              : feedbackState === "correct"
                              ? "bg-emerald-600 text-white"
                              : feedbackState === "wrong"
                              ? "bg-slate-500 text-white"
                              : timeLeft <= 10
                              ? "bg-amber-500 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          <Timer className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            <span>Thời gian mỗi câu: 20s</span>
                            {feedbackState === "idle" && timeLeft <= 5 && (
                              <span className="text-rose-600 font-black animate-bounce">• Sắp hết giờ!</span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-slate-800">
                            {feedbackState === "timeout" ? (
                              <span className="text-rose-600 font-black">⏰ Đã hết 20 giây!</span>
                            ) : feedbackState === "correct" ? (
                              <span className="text-emerald-700 font-black">⚡ Hoàn thành trong thời gian!</span>
                            ) : feedbackState === "wrong" ? (
                              <span className="text-slate-600">Đã dừng đồng hồ</span>
                            ) : (
                              <span>Đang đếm ngược:</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ĐỒNG HỒ HIỂN THỊ RÕ RÀNG: 20s, 19s, 18s... */}
                      <div 
                        className={`px-3 py-1 rounded-xl font-black text-base sm:text-lg flex items-center gap-1 shadow-xs transition-all ${
                          feedbackState === "timeout"
                            ? "bg-rose-600 text-white ring-2 ring-rose-400"
                            : feedbackState === "correct"
                            ? "bg-emerald-600 text-white"
                            : feedbackState === "wrong"
                            ? "bg-slate-200 text-slate-700"
                            : timeLeft <= 5
                            ? "bg-rose-600 text-white scale-105 animate-pulse ring-2 ring-rose-400"
                            : timeLeft <= 10
                            ? "bg-amber-500 text-white ring-1 ring-amber-400"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        <span>{feedbackState === "idle" ? `${timeLeft}s` : feedbackState === "timeout" ? "0s" : `${timeLeft}s`}</span>
                      </div>
                    </div>

                    {/* THANH TIẾN ĐỘ 20 GIÂY MƯỢT MÀ */}
                    <div className="mt-2.5 w-full bg-slate-200/80 rounded-full h-2 overflow-hidden relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                          feedbackState === "timeout"
                            ? "bg-rose-500 w-0"
                            : feedbackState === "correct"
                            ? "bg-emerald-500"
                            : feedbackState === "wrong"
                            ? "bg-slate-400"
                            : timeLeft <= 5
                            ? "bg-rose-500"
                            : timeLeft <= 10
                            ? "bg-amber-500"
                            : "bg-blue-600"
                        }`}
                        style={{
                          width: feedbackState === "timeout" ? "0%" : `${Math.max(0, Math.min(100, (timeLeft / 20) * 100))}%`
                        }}
                      />
                    </div>

                    {/* Mốc thời gian 20s bên dưới */}
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 mt-1 px-0.5">
                      <span>0s (Hết giờ)</span>
                      <span>5s</span>
                      <span>10s</span>
                      <span>15s</span>
                      <span>20s (Bắt đầu)</span>
                    </div>
                  </div>

                  {/* CÂU HỎI HIỆN TẠI (CHỈ MỘT CÂU DUY NHẤT) */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm border border-blue-100/80 space-y-2.5 transition-all">
                    {/* Lesson Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold tracking-wide uppercase border border-blue-100">
                        <BookOpen className="w-3 h-3 text-blue-600" />
                        <span>{q.textbookLesson || `Bài học SGK ${subjectName} 6`}</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        Câu #{currentStats.answeredIds.length + 1}
                      </span>
                    </div>

                    {/* Question Heading - Prominent & Beautiful */}
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug pt-1">
                      {q.question}
                    </h3>
                  </div>

                  {/* OPTION CARDS (A, B, C, D) - TAP TO SELECT OR FILL INPUT */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Các lựa chọn:
                      </span>
                      <span className="text-[10px] text-blue-600 font-medium">
                        Bấm để chọn nhanh
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {q.options.map((opt, idx) => {
                        const letter = letters[idx];
                        const isSelected = selectedOptionIndex === idx;

                        // Option styling based on feedback state
                        let btnClass = "bg-white hover:bg-blue-50/70 border-slate-200 text-slate-800";
                        if (feedbackState === "idle") {
                          if (isSelected) {
                            btnClass = "bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-500/20";
                          }
                        } else if (feedbackState === "correct") {
                          if (idx === q.correctIndex) {
                            btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                          } else {
                            btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                          }
                        } else if (feedbackState === "wrong") {
                          if (idx === q.correctIndex) {
                            btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isSelected) {
                            btnClass = "bg-rose-50 border-rose-400 text-rose-900 font-bold ring-2 ring-rose-400/20";
                          } else {
                            btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                          }
                        } else if (feedbackState === "timeout") {
                          if (idx === q.correctIndex) {
                            btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                          } else {
                            btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={feedbackState !== "idle" || timeLeft <= 0}
                            onClick={() => handleSelectOptionChip(idx)}
                            className={`w-full text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer active:scale-[0.99] ${btnClass} ${
                              feedbackState !== "idle" || timeLeft <= 0 ? "cursor-default" : ""
                            }`}
                          >
                            <div className="flex items-start gap-2 sm:gap-2.5">
                              <span
                                className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition ${
                                  isSelected
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {letter}
                              </span>
                              <span className="leading-snug pt-0.5 font-medium">
                                {opt}
                              </span>
                            </div>

                            {isSelected && feedbackState === "idle" && (
                              <Check className="w-4 h-4 text-blue-600 shrink-0" />
                            )}
                            {feedbackState === "correct" && idx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {feedbackState === "wrong" && isSelected && idx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            )}
                            {feedbackState === "timeout" && idx === q.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ô NHẬP CÂU TRẢ LỜI RÕ RÀNG & NÚT TRẢ LỜI */}
                  {feedbackState === "idle" && (
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                      <label 
                        htmlFor="student-answer-input"
                        className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between"
                      >
                        <span>Ô nhập câu trả lời:</span>
                        <span className="text-blue-600 font-semibold normal-case">Gửi trong vòng 20 giây</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          id="student-answer-input"
                          type="text"
                          disabled={timeLeft <= 0}
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value);
                            setSelectedOptionIndex(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (inputValue.trim() || selectedOptionIndex !== null)) {
                              handleSubmitAnswer();
                            }
                          }}
                          placeholder={timeLeft <= 0 ? "Đã hết 20 giây..." : "Gõ A, B, C, D hoặc bấm chọn ở trên..."}
                          className="flex-1 bg-slate-50 border border-slate-300 focus:border-blue-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-hidden transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />

                        {/* Nút Trả lời */}
                        <button
                          type="button"
                          onClick={handleSubmitAnswer}
                          disabled={(!inputValue.trim() && selectedOptionIndex === null) || timeLeft <= 0}
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 shrink-0 active:scale-95"
                        >
                          <span>Trả lời</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. KHI HỌC SINH TRẢ LỜI ĐÚNG:
                      "Congratulations! 🎉"
                      "Chúc mừng bạn đã trả lời đúng câu này! Phát huy nhé!"
                      Tăng số câu đúng lên 1. Tăng Chuỗi đúng lên 1.
                      KHÔNG cần giải thích dài dòng và KHÔNG cần đọc lại kiến thức SGK.
                      TỰ ĐỘNG chuyển sang câu hỏi tiếp theo. */}
                  {feedbackState === "correct" && (
                    <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md space-y-3 animate-fadeIn">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shrink-0 backdrop-blur-xs">
                          🎉
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                            Congratulations! 🎉
                          </h4>
                          <p className="text-xs sm:text-sm font-semibold text-emerald-100 mt-0.5">
                            Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!
                          </p>
                        </div>
                      </div>

                      {/* Streak increment visual badge */}
                      <div className="bg-emerald-700/60 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs font-bold border border-emerald-400/30">
                        <span className="flex items-center gap-1 text-emerald-100">
                          <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                          <span>Chuỗi đúng liên tiếp:</span>
                        </span>
                        <span className="text-amber-200 font-black text-sm">
                          🔥 {streak}
                        </span>
                      </div>

                      {/* Auto-advance notice */}
                      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-medium text-emerald-100">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                          <span>Tự động chuyển câu tiếp theo...</span>
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-md font-bold text-white">
                          {countdown !== null ? `${countdown}s` : "..."}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => pickNextQuestion()}
                        className="w-full cursor-pointer bg-white text-emerald-800 font-extrabold text-xs py-2 rounded-xl shadow-xs hover:bg-emerald-50 transition flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <span>Qua câu tiếp theo ngay</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* 4. KHI HỌC SINH TRẢ LỜI SAI:
                      Tăng số câu sai lên 1. Chuỗi đúng trở về 0.
                      Hiển thị thông báo nhẹ nhàng rằng chuỗi đã bị mất.
                      TỰ ĐỘNG ĐỌC GIỌNG NÓI RÚT GỌN CHUẨN:
                      * Môn học + Lời động viên
                      * Đáp án đúng cần chọn
                      * Lý do câu trả lời chưa đúng
                      * Cách suy luận
                      * Kiến thức SGK Lớp 6 cần nhớ để phản xạ nhanh
                      Giải thích rõ 4 ý chuẩn SGK Lớp 6 (vẫn giữ phần viết chữ đầy đủ).
                      Sau khi giải thích xong, hiện nút "Tiếp tục".
                      Học sinh bấm "Tiếp tục" thì mới sang câu tiếp theo.
                      Không tự động chuyển câu khi học sinh trả lời sai. */}
                  {feedbackState === "wrong" && wrongExplanation && (
                    <div className="bg-white border-2 border-rose-200 rounded-2xl sm:rounded-3xl p-4 shadow-sm space-y-3 animate-fadeIn">
                      {/* Lời động viên theo môn học */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
                        <span className="text-lg shrink-0">💪</span>
                        <div>
                          <div className="text-xs sm:text-sm font-extrabold text-amber-900 leading-snug">
                            {getSubjectEncouragement(subjectName)}
                          </div>
                          <div className="text-[11px] text-amber-700 mt-0.5">
                            Cùng xem phân tích chi tiết để nắm thật chắc kiến thức bài học:
                          </div>
                        </div>
                      </div>

                      {/* THANH ĐIỀU KHIỂN GIỌNG ĐỌC AI (CHỈ ĐỌC KHI BẤM NÚT) */}
                      <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 text-xs transition-colors ${
                        isAiSpeaking 
                          ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-xs ring-1 ring-indigo-300"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isAiSpeaking 
                              ? "bg-indigo-600 text-white animate-pulse shadow-xs" 
                              : "bg-indigo-100 text-indigo-700"
                          }`}>
                            <Volume2 className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="font-bold flex items-center gap-1.5 text-xs">
                              <span>{isAiSpeaking ? "🔊 Thầy/Cô đang đọc giải thích..." : "🔊 Giọng đọc AI hướng dẫn (Bấm để nghe):"}</span>
                              {isAiSpeaking && (
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                              )}
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                              {isAiSpeaking 
                                ? `${subjectName} · Vì sao chọn, Đáp án đúng, Suy luận & Điểm cần nhớ` 
                                : `Bấm nút "Nghe giải thích" để nghe Thầy/Cô đọc chi tiết`}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
                          {/* Nút mở Voice Studio tùy chỉnh giọng chuyên sâu */}
                          <button
                            type="button"
                            onClick={() => setIsVoiceStudioOpen(true)}
                            title="Tùy chỉnh chi tiết giọng đọc AI: Tốc độ, Cao độ & Giọng đọc tự nhiên"
                            className="cursor-pointer p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition active:scale-95 shadow-2xs"
                          >
                            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                          </button>

                          {/* Nút đổi giọng đọc AI */}
                          <button
                            type="button"
                            onClick={handleCycleVoice}
                            title={`Đang chọn giọng ${VOICE_PROFILES[currentVoiceStyle]?.name}. Bấm để đổi sang giọng khác!`}
                            className="cursor-pointer px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition active:scale-95 shadow-2xs"
                          >
                            <span>{VOICE_PROFILES[currentVoiceStyle]?.icon || "🎙️"}</span>
                            <span>{VOICE_PROFILES[currentVoiceStyle]?.shortName || "Đổi giọng"}</span>
                          </button>

                          {/* NÚT BẤM ĐỂ NGHE GIẢI THÍCH (HOẶC DỪNG) */}
                          {isAiSpeaking ? (
                            <button
                              type="button"
                              onClick={handleStopSpeech}
                              className="cursor-pointer px-3 sm:px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                            >
                              <Square className="w-3 h-3 fill-white" />
                              <span>Dừng đọc</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleToggleAiSpeech}
                              className="cursor-pointer px-3 sm:px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm ring-2 ring-indigo-500/20"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe giải thích</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Thông báo nhẹ nhàng rằng chuỗi đã bị mất (nếu trước đó có chuỗi) */}
                      {wrongExplanation.streakLostNotice && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-rose-800">
                          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>{wrongExplanation.streakLostNotice}</span>
                        </div>
                      )}

                      {/* 4 Ý GIẢI THÍCH CHUẨN SGK LỚP 6 */}
                      <div className="space-y-2.5 text-xs text-slate-800">
                        {/* Ý 1: Vì sao câu trả lời của học sinh sai */}
                        <div className="bg-rose-50/80 p-3 rounded-xl border border-rose-200 space-y-1">
                          <div className="font-black text-rose-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Vì sao câu trả lời của bạn chưa đúng?</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed pl-1">
                            {wrongExplanation.whyWrong}
                          </p>
                        </div>

                        {/* Ý 2: Đáp án đúng là gì */}
                        <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 space-y-1">
                          <div className="font-black text-emerald-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đáp án đúng là gì?</span>
                          </div>
                          <p className="text-emerald-900 font-bold leading-relaxed pl-1">
                            👉 {wrongExplanation.correctLetter}. {wrongExplanation.correctAnswer}
                          </p>
                        </div>

                        {/* Ý 3: Cách suy luận để tìm ra đáp án đúng */}
                        <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 space-y-1">
                          <div className="font-black text-blue-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                            <span>Cách suy luận để tìm ra đáp án đúng:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed pl-1">
                            {wrongExplanation.reasoning}
                          </p>
                        </div>

                        {/* Ý 4: Những điểm học sinh cần nhớ để không mắc lại lỗi */}
                        <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 space-y-1">
                          <div className="font-black text-amber-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Điểm cần nhớ để không mắc lại lỗi:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed pl-1">
                            {wrongExplanation.keyPointsToRemember}
                          </p>
                        </div>
                      </div>

                      {/* Nút Tiếp tục nhỏ gọn & Nút thử làm lại */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={handleRetryCurrent}
                          className="cursor-pointer text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1 active:scale-95"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Thử làm lại câu này</span>
                        </button>

                        {/* NÚT "TIẾP TỤC" NHỎ GỌN NHƯ YÊU CẦU */}
                        <button
                          type="button"
                          onClick={() => pickNextQuestion()}
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1 active:scale-95"
                        >
                          <span>Tiếp tục</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2. KHI HẾT 20 GIÂY MÀ HỌC SINH CHƯA TRẢ LỜI:
                      Tự động tính là SAI, Chuỗi đúng trở về 0, Số câu sai tăng 1.
                      TỰ ĐỘNG ĐỌC GIỌNG NÓI RÚT GỌN CHUẨN:
                      * Môn học + Lời động viên
                      * Đáp án đúng cần chọn
                      * Lý do hết 20 giây
                      * Cách suy luận nhanh
                      * Kiến thức SGK Lớp 6 cần nhớ để phản xạ nhanh
                      Hiển thị:
                      "⏰ Hết giờ!"
                      "Không sao! Hãy cố gắng hơn ở câu tiếp theo nhé! 💪"
                      Giải thích đáp án đúng và kiến thức cần nhớ theo chuẩn SGK lớp 6.
                      Học sinh bấm "Tiếp tục" thì mới sang câu tiếp theo. */}
                  {feedbackState === "timeout" && wrongExplanation && (
                    <div className="bg-white border-2 border-rose-300 rounded-2xl sm:rounded-3xl p-4 shadow-md space-y-3 animate-fadeIn">
                      {/* Tiêu đề Hết giờ và Lời động viên theo môn */}
                      <div className="bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">⏰</span>
                          <h4 className="text-base sm:text-lg font-black tracking-tight">
                            ⏰ Hết 20 giây!
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-rose-100 flex items-center gap-1 pt-0.5">
                          <span>{getSubjectEncouragement(subjectName)}</span>
                        </p>
                      </div>

                      {/* THANH ĐIỀU KHIỂN GIỌNG ĐỌC AI (CHỈ ĐỌC KHI BẤM NÚT) */}
                      <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 text-xs transition-colors ${
                        isAiSpeaking 
                          ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-xs ring-1 ring-indigo-300"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isAiSpeaking 
                              ? "bg-indigo-600 text-white animate-pulse shadow-xs" 
                              : "bg-indigo-100 text-indigo-700"
                          }`}>
                            <Volume2 className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="font-bold flex items-center gap-1.5 text-xs">
                              <span>{isAiSpeaking ? "🔊 Thầy/Cô đang đọc giải thích..." : "🔊 Giọng đọc AI hướng dẫn (Bấm để nghe):"}</span>
                              {isAiSpeaking && (
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                              )}
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                              {isAiSpeaking 
                                ? `${subjectName} · Vì sao chọn, Đáp án đúng, Suy luận & Điểm cần nhớ` 
                                : `Bấm nút "Nghe giải thích" để nghe Thầy/Cô đọc chi tiết`}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
                          {/* Nút mở Voice Studio tùy chỉnh giọng chuyên sâu */}
                          <button
                            type="button"
                            onClick={() => setIsVoiceStudioOpen(true)}
                            title="Tùy chỉnh chi tiết giọng đọc AI: Tốc độ, Cao độ & Giọng đọc tự nhiên"
                            className="cursor-pointer p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition active:scale-95 shadow-2xs"
                          >
                            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                          </button>

                          {/* Nút đổi giọng đọc AI */}
                          <button
                            type="button"
                            onClick={handleCycleVoice}
                            title={`Đang chọn giọng ${VOICE_PROFILES[currentVoiceStyle]?.name}. Bấm để đổi sang giọng khác!`}
                            className="cursor-pointer px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition active:scale-95 shadow-2xs"
                          >
                            <span>{VOICE_PROFILES[currentVoiceStyle]?.icon || "🎙️"}</span>
                            <span>{VOICE_PROFILES[currentVoiceStyle]?.shortName || "Đổi giọng"}</span>
                          </button>

                          {/* NÚT BẤM ĐỂ NGHE GIẢI THÍCH (HOẶC DỪNG) */}
                          {isAiSpeaking ? (
                            <button
                              type="button"
                              onClick={handleStopSpeech}
                              className="cursor-pointer px-3 sm:px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                            >
                              <Square className="w-3 h-3 fill-white" />
                              <span>Dừng đọc</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleToggleAiSpeech}
                              className="cursor-pointer px-3 sm:px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm ring-2 ring-indigo-500/20"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe giải thích</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Thông báo chuỗi bị mất do hết giờ */}
                      {wrongExplanation.streakLostNotice && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-rose-800">
                          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>{wrongExplanation.streakLostNotice}</span>
                        </div>
                      )}

                      {/* 4 Ý GIẢI THÍCH ĐÁP ÁN ĐÚNG & KIẾN THỨC CẦN NHỚ THEO CHUẨN SGK LỚP 6 */}
                      <div className="space-y-2.5 text-xs text-slate-800">
                        {/* Ý 1: Vì sao tính là sai */}
                        <div className="bg-rose-50/80 p-3 rounded-xl border border-rose-200 space-y-1">
                          <div className="font-black text-rose-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Clock className="w-3.5 h-3.5 text-rose-600" />
                            <span>Lý do câu hỏi bị tính là sai:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed pl-1">
                            {wrongExplanation.whyWrong}
                          </p>
                        </div>

                        {/* Ý 2: Đáp án đúng là gì */}
                        <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 space-y-1">
                          <div className="font-black text-emerald-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đáp án đúng của câu này là:</span>
                          </div>
                          <p className="text-emerald-900 font-bold leading-relaxed pl-1">
                            👉 {wrongExplanation.correctLetter}. {wrongExplanation.correctAnswer}
                          </p>
                        </div>

                        {/* Ý 3: Cách suy luận nhanh để tìm ra đáp án đúng */}
                        <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 space-y-1">
                          <div className="font-black text-blue-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                            <span>Cách suy luận nhanh để tìm ra đáp án:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed pl-1">
                            {wrongExplanation.reasoning}
                          </p>
                        </div>

                        {/* Ý 4: Điểm cần nhớ theo chuẩn SGK để phản xạ kịp 20 giây */}
                        <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 space-y-1">
                          <div className="font-black text-amber-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Kiến thức SGK Lớp 6 cần nhớ để phản xạ nhanh:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed pl-1">
                            {wrongExplanation.keyPointsToRemember}
                          </p>
                        </div>
                      </div>

                      {/* Nút Tiếp tục nhỏ gọn & Nút thử làm lại */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={handleRetryCurrent}
                          className="cursor-pointer text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1 active:scale-95"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Thử lại câu này (20s)</span>
                        </button>

                        {/* NÚT "TIẾP TỤC" NHỎ GỌN NHƯ YÊU CẦU */}
                        <button
                          type="button"
                          onClick={() => pickNextQuestion()}
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1 active:scale-95"
                        >
                          <span>Tiếp tục</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* NÚT "TIẾP THEO" NHỎ, GỌN Ở PHÍA DƯỚI ĐỂ CHUYỂN CÂU KHI CẦN */}
                  {feedbackState === "idle" && (
                    <div className="pt-1 pb-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="text-[10px] text-slate-400">
                        Chuyển câu hỏi khi cần:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          pickNextQuestion();
                        }}
                        className="cursor-pointer font-bold text-blue-600 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100 px-2.5 py-1 rounded-md transition flex items-center gap-1 active:scale-95"
                      >
                        <span>Tiếp theo</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

        </div>

            {/* 4. Bottom Home Bar of Phone */}
            <div className="py-2.5 flex justify-center bg-white border-t border-slate-100">
              <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL STUDIO CÀI ĐẶT & THỬ NGHIỆM GIỌNG ĐỌC AI */}
      <VoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
        onVoiceChanged={(profile) => {
          setCurrentVoiceStyle(profile.id);
        }}
      />
    </div>
  );
};
