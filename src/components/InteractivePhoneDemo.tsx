import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ChevronRight, 
  ChevronLeft,
  Lightbulb, 
  Send,
  BookOpen, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle, 
  Award, 
  Trophy, 
  Check, 
  Wifi, 
  BatteryMedium,
  Timer,
  Volume2,
  Lock
} from "lucide-react";
import { DEFAULT_SUBJECTS } from "../data/defaultQuestions";
import { soundManager } from "../utils/audio";
import { Question } from "../types";

interface InteractivePhoneDemoProps {
  onSyncWithWristband: (subject: string, message: string) => void;
}

interface DetailedFeedback {
  questionId: string;
  isCorrect: boolean;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  correctOptionText: string;
  textbookLesson?: string;
  congratulation?: string;
  encouragement?: string;
  whyWrong?: string;
  explanation: string;
  knowledgeGap?: string;
  advice?: string;
}

export const InteractivePhoneDemo: React.FC<InteractivePhoneDemoProps> = ({
  onSyncWithWristband,
}) => {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const currentSubject = DEFAULT_SUBJECTS[selectedSubjectIndex] || DEFAULT_SUBJECTS[0];

  // Current active questions
  const [questions, setQuestions] = useState<Question[]>(currentSubject.questions);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    currentSubject.questions[0]?.id || "tv1"
  );
  const [feedback, setFeedback] = useState<DetailedFeedback | null>(null);

  // Auto-advance countdown state (3 seconds)
  const [autoCountdown, setAutoCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);
  const advicePanelRef = useRef<HTMLDivElement | null>(null);

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState("");

  // Helper: Find current question index and next/prev question
  const currentQuestionIndex = questions.findIndex((q) => q.id === activeQuestionId);
  const currentQuestion = questions[currentQuestionIndex >= 0 ? currentQuestionIndex : 0];
  const hasNextQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length - 1;
  const nextQuestion = hasNextQuestion ? questions[currentQuestionIndex + 1] : null;
  const hasPrevQuestion = currentQuestionIndex > 0;
  const prevQuestion = hasPrevQuestion ? questions[currentQuestionIndex - 1] : null;

  // Clear running auto-advance timers safely
  const clearAutoAdvanceTimer = () => {
    if (countdownTimerRef.current) {
      clearTimeout(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setAutoCountdown(null);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearAutoAdvanceTimer();
    };
  }, []);

  // Move to next question handler
  const handleGoToNextQuestion = (explicitNextId?: string) => {
    clearAutoAdvanceTimer();
    soundManager.playClick();

    const targetNext = explicitNextId
      ? questions.find((q) => q.id === explicitNextId)
      : hasNextQuestion && nextQuestion
      ? nextQuestion
      : null;

    if (targetNext) {
      setActiveQuestionId(targetNext.id);
      soundManager.playNotification();

      // If next question was already answered, restore its feedback; otherwise reset
      if (userAnswers[targetNext.id] !== undefined) {
        const chosenIdx = userAnswers[targetNext.id];
        const isCorr = chosenIdx === targetNext.correctIndex;
        setFeedback({
          questionId: targetNext.id,
          isCorrect: isCorr,
          selectedOptionIndex: chosenIdx,
          selectedOptionText: targetNext.options[chosenIdx],
          correctOptionIndex: targetNext.correctIndex,
          correctOptionText: targetNext.options[targetNext.correctIndex],
          textbookLesson: targetNext.textbookLesson,
          congratulation: isCorr
            ? "HOAN HÔ! 🎉 CONGRATULATIONS! 🎉 Bạn đã trả lời hoàn toàn chính xác câu hỏi này!"
            : undefined,
          encouragement: !isCorr
            ? "Đừng nản lòng nhé! Cố gắng lên nào, sai sót là một bước đệm giúp ta hiểu sâu và nhớ lâu hơn!"
            : undefined,
          whyWrong: !isCorr && targetNext.wrongOptionReasons ? targetNext.wrongOptionReasons[chosenIdx] : undefined,
          explanation: targetNext.explanation,
          knowledgeGap: !isCorr ? targetNext.knowledgeGapIfWrong : undefined,
          advice: !isCorr ? targetNext.adviceIfWrong : "Kiến thức của bạn rất vững chắc theo SGK Lớp 6.",
        });
      } else {
        setFeedback(null);
      }
    }
  };

  // Move to previous question handler
  const handleGoToPrevQuestion = () => {
    clearAutoAdvanceTimer();
    soundManager.playClick();
    if (hasPrevQuestion && prevQuestion) {
      setActiveQuestionId(prevQuestion.id);
      if (userAnswers[prevQuestion.id] !== undefined) {
        const chosenIdx = userAnswers[prevQuestion.id];
        const isCorr = chosenIdx === prevQuestion.correctIndex;
        setFeedback({
          questionId: prevQuestion.id,
          isCorrect: isCorr,
          selectedOptionIndex: chosenIdx,
          selectedOptionText: prevQuestion.options[chosenIdx],
          correctOptionIndex: prevQuestion.correctIndex,
          correctOptionText: prevQuestion.options[prevQuestion.correctIndex],
          textbookLesson: prevQuestion.textbookLesson,
          congratulation: isCorr
            ? "HOAN HÔ! 🎉 CONGRATULATIONS! 🎉 Bạn đã trả lời hoàn toàn chính xác câu hỏi này!"
            : undefined,
          encouragement: !isCorr
            ? "Đừng nản lòng nhé! Cố gắng lên nào, sai sót là một bước đệm giúp ta hiểu sâu và nhớ lâu hơn!"
            : undefined,
          whyWrong: !isCorr && prevQuestion.wrongOptionReasons ? prevQuestion.wrongOptionReasons[chosenIdx] : undefined,
          explanation: prevQuestion.explanation,
          knowledgeGap: !isCorr ? prevQuestion.knowledgeGapIfWrong : undefined,
          advice: !isCorr ? prevQuestion.adviceIfWrong : "Kiến thức của bạn rất vững chắc theo SGK Lớp 6.",
        });
      } else {
        setFeedback(null);
      }
    }
  };

  // Handler for selecting an answer
  const handleAnswerSelect = (q: Question, optionIdx: number) => {
    // If user has already answered this question, DO NOT allow clicking or guessing blindly
    if (userAnswers[q.id] !== undefined) {
      return;
    }

    // Clear any previous running auto-advance timer
    clearAutoAdvanceTimer();
    soundManager.playClick();

    const isCorrect = optionIdx === q.correctIndex;
    const nextAnswers = { ...userAnswers, [q.id]: optionIdx };
    setUserAnswers(nextAnswers);
    setActiveQuestionId(q.id);

    // Audio & Voice feedback (Hoan hô & Congratulations nếu đúng; Phát âm thanh buzzer nếu sai)
    soundManager.playFeedback(isCorrect);

    const currentIdx = questions.findIndex((item) => item.id === q.id);
    const canAdvance = currentIdx >= 0 && currentIdx < questions.length - 1;
    const nextQId = canAdvance ? questions[currentIdx + 1].id : null;

    if (isCorrect) {
      // Giọng đọc bản ngữ chuẩn quốc tế: "Congratulations!" + Lời chúc tiếng Việt truyền cảm, sau đó chuyển câu tiếp theo
      soundManager.speakCongratulations(
        "Congratulations! Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!",
        () => {
          if (canAdvance && nextQId) {
            setTimeout(() => {
              clearAutoAdvanceTimer();
              handleGoToNextQuestion(nextQId);
            }, 400);
          }
        }
      );

      // Correct Answer Feedback: Hoan hô & Congratulations!
      const initialFeedback: DetailedFeedback = {
        questionId: q.id,
        isCorrect: true,
        selectedOptionIndex: optionIdx,
        selectedOptionText: q.options[optionIdx],
        correctOptionIndex: q.correctIndex,
        correctOptionText: q.options[q.correctIndex],
        textbookLesson: q.textbookLesson,
        congratulation: "HOAN HÔ! 🎉 CONGRATULATIONS! 🎉 Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé!",
        explanation: q.explanation,
        advice: "Chúc mừng bạn đã trả lời đúng câu này! Cực kỳ xuất sắc, hãy tiếp tục phát huy nhé! Kiến thức SGK Lớp 6 của bạn rất vững vàng.",
      };
      setFeedback(initialFeedback);

      // If there is a next question, automatically pause 4 seconds then auto-advance!
      if (canAdvance && nextQId) {
        setAutoCountdown(4);
        countdownIntervalRef.current = setInterval(() => {
          setAutoCountdown((prev) => {
            if (prev === null || prev <= 1) {
              return 1;
            }
            return prev - 1;
          });
        }, 1000);

        countdownTimerRef.current = setTimeout(() => {
          clearAutoAdvanceTimer();
          handleGoToNextQuestion(nextQId);
        }, 4200);
      } else {
        // Last question (10/10) answered correctly!
        setTimeout(() => {
          soundManager.playCelebrate();
        }, 400);
      }
    } else {
      // Wrong Answer Feedback: Encouragement, Explain why it's wrong, which is correct, and give advice
      const specificReason = q.wrongOptionReasons && q.wrongOptionReasons[optionIdx]
        ? q.wrongOptionReasons[optionIdx]
        : `Lựa chọn "${q.options[optionIdx]}" chưa đúng với kiến thức bài học trong SGK Lớp 6.`;

      const initialFeedback: DetailedFeedback = {
        questionId: q.id,
        isCorrect: false,
        selectedOptionIndex: optionIdx,
        selectedOptionText: q.options[optionIdx],
        correctOptionIndex: q.correctIndex,
        correctOptionText: q.options[q.correctIndex],
        textbookLesson: q.textbookLesson,
        encouragement: "Đừng buồn nhé! Cố gắng lên nào, sai một câu là cơ hội tuyệt vời để hiểu sâu bản chất bài học hơn!",
        whyWrong: specificReason,
        explanation: q.explanation,
        knowledgeGap: q.knowledgeGapIfWrong,
        advice: q.adviceIfWrong || "Hãy đọc kỹ câu hỏi, xem lại quy tắc bài học và thử chọn lại câu này nhé!",
      };
      setFeedback(initialFeedback);
    }

    // Scroll smoothly to the advice section situated directly below the phone
    setTimeout(() => {
      advicePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
  };

  // Retry currently active question
  const handleRetryQuestion = (qId: string) => {
    clearAutoAdvanceTimer();
    soundManager.playClick();
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setFeedback(null);
  };

  // Switch subject
  const handleSubjectChange = (idx: number) => {
    clearAutoAdvanceTimer();
    soundManager.playClick();
    setSelectedSubjectIndex(idx);
    const sub = DEFAULT_SUBJECTS[idx];
    setQuestions(sub.questions);
    setUserAnswers({});
    setActiveQuestionId(sub.questions[0]?.id || null);
    setFeedback(null);
  };

  // Generate new questions with AI (for Grade 6)
  const handleGenerateAiQuestions = async () => {
    clearAutoAdvanceTimer();
    soundManager.playClick();
    setIsAiLoading(true);
    try {
      const topicToAsk = customTopicInput.trim() || currentSubject.topic;
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: currentSubject.subject,
          topic: topicToAsk,
          gradeLevel: "Lớp 6",
        }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setUserAnswers({});
        setActiveQuestionId(data.questions[0].id);
        setFeedback(null);
        soundManager.playNotification();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Reset current quiz
  const handleResetQuiz = () => {
    clearAutoAdvanceTimer();
    soundManager.playClick();
    setUserAnswers({});
    setFeedback(null);
    setActiveQuestionId(questions[0]?.id || null);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([qId, ansIdx]) => {
    const q = questions.find((item) => item.id === qId);
    return q && q.correctIndex === ansIdx;
  }).length;

  const isAllAnswered = answeredCount === questions.length && questions.length > 0;
  const letters = ["A", "B", "C", "D"];

  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer Dark Container */}
        <div className="bg-[#111b35] text-white rounded-[36px] p-6 sm:p-10 shadow-2xl border border-slate-700/60 relative overflow-hidden">
          {/* Ambient lighting accents */}
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* 1. TOP HEADER & SUBJECT SELECTOR */}
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-block bg-[#e5ebff] text-[#315bea] px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xs">
                SGK Lớp 6 · Chuẩn kiến thức
              </span>
              <span className="text-xs text-[#6cf0ae] font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6cf0ae] animate-pulse"></span>
                10 câu/môn · Phản hồi & Lời khuyên ở dưới điện thoại
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Luyện tập trắc nghiệm trên điện thoại
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Bấm chọn đáp án trực tiếp trên chiếc điện thoại bên dưới. Khi trả lời đúng, hệ thống sẽ nói <em>Congratulations! Chúc mừng bạn đã trả lời đúng câu này, phát huy nhé!</em> và tự động chuyển câu sau vài giây. Nếu làm sai, hệ thống sẽ đưa ra lời khuyên ôn tập, giải thích vì sao câu đó sai và hướng dẫn chọn câu nào cho đúng ngay ở dưới điện thoại!
            </p>

            {/* Subject Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {DEFAULT_SUBJECTS.map((s, idx) => (
                <button
                  key={s.subject}
                  onClick={() => handleSubjectChange(idx)}
                  className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 border ${
                    selectedSubjectIndex === idx
                      ? "bg-[#315bea] text-white border-blue-400 shadow-md scale-102"
                      : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
                  }`}
                >
                  <span className="text-base">{s.icon}</span>
                  <span>{s.subject}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-black/25 font-semibold text-slate-300">
                    10 câu
                  </span>
                </button>
              ))}
            </div>

            {/* Progress Counter & Reset */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
              <span>
                Tiến độ bài ôn: <strong className="text-white">{answeredCount}</strong>/{questions.length} câu
              </span>
              {answeredCount > 0 && (
                <span className="text-[#6cf0ae] font-bold">
                  ({Math.round((correctCount / answeredCount) * 100)}% đúng)
                </span>
              )}
              <button
                onClick={handleResetQuiz}
                className="cursor-pointer text-slate-400 hover:text-white flex items-center gap-1 transition underline decoration-dotted"
              >
                <RotateCcw className="w-3 h-3" />
                Làm lại môn này
              </button>
            </div>
          </div>

          {/* 2. CENTER STAGE: THE SMARTPHONE MOCKUP */}
          <div className="relative z-10 flex justify-center mb-8">
            <div className="relative w-full max-w-[390px] bg-slate-950 p-3.5 rounded-[46px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-4 border-slate-700/80">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-between px-3 text-[9px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse"></div>
              </div>

              {/* Phone Screen */}
              <div className="bg-[#f7f9ff] text-[#172033] rounded-[38px] p-4 sm:p-5 pt-7 min-h-[570px] flex flex-col justify-between shadow-inner">
                <div>
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2 px-1">
                    <span>09:41</span>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" />
                      <BatteryMedium className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Subject Title */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-lg">{currentSubject.icon}</span>
                      <h3 className="font-extrabold text-xs sm:text-sm text-[#172033] truncate">
                        {currentSubject.subject} · {currentSubject.topic}
                      </h3>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0">
                      10 câu SGK 6
                    </span>
                  </div>

                  {/* 10 Progress Dots */}
                  <div className="grid grid-cols-10 gap-1 mb-2">
                    {questions.map((q, idx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isCorr = isAnswered && userAnswers[q.id] === q.correctIndex;
                      const isCurr = activeQuestionId === q.id;
                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            clearAutoAdvanceTimer();
                            soundManager.playClick();
                            setActiveQuestionId(q.id);
                          }}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            isCorr
                              ? "bg-emerald-500 shadow-xs"
                              : isAnswered
                              ? "bg-rose-500 shadow-xs"
                              : isCurr
                              ? "bg-blue-600 ring-2 ring-blue-300"
                              : "bg-slate-200 hover:bg-slate-300"
                          }`}
                          title={`Câu ${idx + 1}: ${q.question}`}
                        />
                      );
                    })}
                  </div>

                  {/* Prev / Next Navigation Bar */}
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2.5 px-0.5">
                    <button
                      onClick={handleGoToPrevQuestion}
                      disabled={!hasPrevQuestion}
                      className="cursor-pointer text-[11px] font-bold text-slate-500 hover:text-[#315bea] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-0.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Trước</span>
                    </button>

                    <span className="font-extrabold text-blue-600 text-xs">
                      Câu {currentQuestionIndex + 1} / {questions.length}
                    </span>

                    <button
                      onClick={() => handleGoToNextQuestion()}
                      disabled={!hasNextQuestion}
                      className="cursor-pointer text-[11px] font-bold text-slate-500 hover:text-[#315bea] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-0.5"
                    >
                      <span>Sau</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Scrollable Questions list */}
                  <div className="max-h-[385px] overflow-y-auto pr-1 space-y-2.5">
                    {questions.map((q, qIndex) => {
                      const hasAnswered = userAnswers[q.id] !== undefined;
                      const chosenIdx = userAnswers[q.id];
                      const isCorrectAnswer = hasAnswered && chosenIdx === q.correctIndex;
                      const isExpanded = activeQuestionId === q.id;

                      return (
                        <div
                          key={q.id}
                          className={`rounded-2xl transition-all duration-200 border ${
                            isExpanded
                              ? "bg-white border-[#315bea] shadow-md ring-1 ring-[#315bea]/20"
                              : hasAnswered
                              ? isCorrectAnswer
                                ? "bg-emerald-50/70 border-emerald-200"
                                : "bg-rose-50/70 border-rose-200"
                              : "bg-white border-[#e1e6f1] hover:border-[#315bea] shadow-xs"
                          } p-3 sm:p-3.5`}
                        >
                          {/* Question Header */}
                          <div 
                            onClick={() => {
                              clearAutoAdvanceTimer();
                              soundManager.playClick();
                              setActiveQuestionId(q.id);
                            }}
                            className="cursor-pointer flex items-start justify-between gap-2"
                          >
                            <div>
                              {q.textbookLesson && (
                                <div className="text-[10px] font-semibold text-blue-600 mb-0.5 flex items-center gap-1">
                                  <BookOpen className="w-3 h-3 shrink-0" />
                                  <span className="truncate">{q.textbookLesson.replace("SGK ", "")}</span>
                                </div>
                              )}
                              <div className="text-xs sm:text-sm font-semibold text-[#172033]">
                                <span className="font-bold text-[#315bea] mr-1.5">
                                  {qIndex + 1}.
                                </span>
                                {q.question}
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 shrink-0 transition-transform mt-1 ${
                                isExpanded ? "rotate-90 text-[#315bea]" : ""
                              }`}
                            />
                          </div>

                          {/* Collapsed state summary if answered */}
                          {!isExpanded && hasAnswered && (
                            <div className="mt-2 text-[11px] flex items-center justify-between pt-1 border-t border-slate-100">
                              <span className="text-slate-600 truncate mr-2">
                                Đã chọn: <b>{q.options[chosenIdx]}</b>
                              </span>
                              {isCorrectAnswer ? (
                                <span className="text-emerald-600 font-bold flex items-center gap-1 shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                                </span>
                              ) : (
                                <span className="text-rose-600 font-bold flex items-center gap-1 shrink-0">
                                  <AlertCircle className="w-3.5 h-3.5" /> Sai
                                </span>
                              )}
                            </div>
                          )}

                          {/* Full Options List if Expanded */}
                          {isExpanded && (
                            <div className="mt-2.5 space-y-1.5 pt-2 border-t border-slate-100">
                              {/* Lock warning badge if answered */}
                              {hasAnswered && (
                                <div className={`mb-2 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center justify-between gap-2 ${
                                  isCorrectAnswer 
                                    ? "bg-emerald-50/90 border-emerald-300 text-emerald-800" 
                                    : "bg-rose-50/90 border-rose-300 text-rose-800"
                                }`}>
                                  <div className="flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 shrink-0" />
                                    <span>
                                      {isCorrectAnswer 
                                        ? "Đã trả lời đúng! Đang dừng vài giây rồi tự động chuyển câu..."
                                        : "Đã khóa lựa chọn (không cho bấm bậy để chọn câu đúng)."}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {q.options.map((opt, optIdx) => {
                                const isSelected = chosenIdx === optIdx;
                                const isThisCorrect = optIdx === q.correctIndex;
                                const letter = letters[optIdx] || `${optIdx + 1}`;

                                let optionStyle =
                                  "bg-slate-50 hover:bg-blue-50/70 border-slate-200 text-slate-800 cursor-pointer active:scale-[0.99]";
                                if (hasAnswered) {
                                  if (isThisCorrect) {
                                    optionStyle =
                                      "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold shadow-xs cursor-not-allowed opacity-95";
                                  } else if (isSelected) {
                                    optionStyle =
                                      "bg-rose-100 border-rose-400 text-rose-900 font-bold shadow-xs cursor-not-allowed opacity-95";
                                  } else {
                                    optionStyle =
                                      "bg-slate-100/60 border-slate-200/70 text-slate-400 cursor-not-allowed opacity-50";
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    disabled={hasAnswered}
                                    onClick={() => handleAnswerSelect(q, optIdx)}
                                    className={`w-full text-left p-2.5 rounded-xl text-xs transition border flex items-center justify-between ${
                                      hasAnswered ? "cursor-not-allowed select-none" : ""
                                    } ${optionStyle}`}
                                  >
                                    <div className="flex items-start gap-1.5">
                                      <b className="font-bold text-[#315bea] shrink-0">{letter}.</b>
                                      <span className="leading-snug">{opt}</span>
                                    </div>
                                    {hasAnswered && isThisCorrect && (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                                    )}
                                    {hasAnswered && isSelected && !isThisCorrect && (
                                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 ml-1" />
                                    )}
                                  </button>
                                );
                              })}

                              {/* Subtle indicator pointing to advice below the phone */}
                              {hasAnswered && (
                                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                                  {isCorrectAnswer ? (
                                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng chính xác!
                                    </span>
                                  ) : (
                                    <span className="font-bold text-rose-600 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5" /> Chưa đúng!
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      advicePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                    }}
                                    className="cursor-pointer text-blue-600 font-bold hover:underline flex items-center gap-0.5 text-[10px] bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200 transition"
                                  >
                                    <span>Xem lời khuyên ở dưới 👇</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Phone Bottom Status */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-blue-500" />
                    Học tốt SGK Lớp 6
                  </span>
                  <span className="font-semibold text-blue-600">
                    10 câu chuẩn SGK 6
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. DIRECTLY UNDER THE PHONE (Ở DƯỚI ĐIỆN THOẠI): LỜI KHUYÊN & PHÂN TÍCH */}
          <div ref={advicePanelRef} id="phone-advice-panel" className="relative z-10 w-full max-w-3xl mx-auto space-y-6 pt-2">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span className="h-px w-12 bg-slate-700"></span>
              <span className="text-[#6cf0ae] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                KHUNG LỜI KHUYÊN & PHÂN TÍCH (Ở DƯỚI ĐIỆN THOẠI)
              </span>
              <span className="h-px w-12 bg-slate-700"></span>
            </div>

            {feedback ? (
              <div
                id="result"
                className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 border shadow-2xl ${
                  feedback.isCorrect
                    ? "bg-gradient-to-br from-[#064e3b]/95 via-[#064e3b]/90 to-[#022c22]/98 border-emerald-500/50 text-emerald-100"
                    : "bg-gradient-to-br from-[#451a03]/95 via-[#3f1604]/90 to-[#291004]/98 border-amber-500/50 text-amber-100"
                }`}
              >
                {/* CASE 1: ANSWER IS CORRECT -> CHEER CONGRATULATIONS & AUTO-ADVANCE TIMER */}
                {feedback.isCorrect ? (
                  <div className="space-y-4">
                    {/* Header with celebration */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-3 rounded-2xl bg-emerald-500/20 text-[#6cf0ae] shrink-0 border border-emerald-500/30 shadow-inner">
                        <Trophy className="w-7 h-7 animate-bounce" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#6cf0ae] text-xs font-extrabold uppercase tracking-wide border border-emerald-500/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>HOAN HÔ! TRẢ LỜI ĐÚNG</span>
                          </div>

                          {/* Sound button to replay congratulations voice */}
                          <button
                            type="button"
                            onClick={() => soundManager.speakCongratulations()}
                            className="cursor-pointer text-[11px] font-bold text-emerald-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5 transition active:scale-95"
                            title="Nghe lại phát âm: Congratulations! Chúc mừng bạn đã trả lời đúng câu này, phát huy nhé!"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-[#6cf0ae]" />
                            <span>Nghe đọc chúc mừng 🔊</span>
                          </button>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
                          <span>🎉 CONGRATULATIONS! 🎉</span>
                        </h4>
                        <p className="text-sm sm:text-base font-extrabold text-[#6cf0ae] mt-1">
                          Chúc mừng bạn đã trả lời đúng câu này, phát huy nhé! 👏
                        </p>

                        {feedback.textbookLesson && (
                          <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{feedback.textbookLesson}</span>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed bg-black/20 p-3 rounded-xl border border-emerald-500/20">
                          <strong>Kiến thức SGK Lớp 6:</strong> {feedback.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Auto-Advance Countdown Widget or Quiz Completion Action */}
                    <div className="pt-3 border-t border-emerald-500/30 space-y-3">
                      {hasNextQuestion ? (
                        <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-500/40 space-y-2.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-200">
                            <span className="flex items-center gap-2">
                              <Timer className="w-4 h-4 text-[#6cf0ae] animate-spin" />
                              <span>Hệ thống đang dừng vài giây để bạn ghi nhớ kiến thức & tự động chuyển câu...</span>
                            </span>
                            <span className="text-sm font-black text-white px-2.5 py-0.5 rounded-md bg-emerald-600/70 border border-emerald-400/40">
                              {autoCountdown !== null ? `Chuyển sau ${autoCountdown}s` : "..."}
                            </span>
                          </div>

                          {/* Animated Countdown Progress Bar */}
                          <div className="w-full bg-emerald-900/60 rounded-full h-2.5 overflow-hidden border border-emerald-500/30">
                            <div
                              className="bg-gradient-to-r from-emerald-400 to-[#6cf0ae] h-full transition-all duration-1000 ease-linear rounded-full"
                              style={{
                                width: `${autoCountdown !== null ? Math.max(10, (autoCountdown / 3) * 100) : 100}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-emerald-300/80">
                              Tự động chuyển tiếp sau 3 giây. Hoặc bạn có thể bấm:
                            </span>
                            <button
                              onClick={() => handleGoToNextQuestion()}
                              className="cursor-pointer bg-[#6cf0ae] hover:bg-[#58db99] text-[#064e3b] font-black py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-md text-xs hover:scale-105 active:scale-95 shrink-0"
                            >
                              <span>Qua câu tiếp theo ngay</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="text-xs sm:text-sm text-emerald-200">
                            <span className="font-extrabold text-white flex items-center gap-1.5">
                              <Trophy className="w-4 h-4 text-amber-400" />
                              Đã hoàn thành toàn bộ 10 câu của môn {currentSubject.subject}!
                            </span>
                            <span className="text-emerald-300/90 text-xs block mt-0.5">
                              Điểm số của bạn đã được ghi nhận. Hãy đồng bộ báo cáo sang vòng tay thông minh.
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              onSyncWithWristband(
                                currentSubject.subject,
                                `Chúc mừng! Bạn đã hoàn thành trọn vẹn 10/10 câu hỏi SGK Lớp 6 môn ${currentSubject.subject}.`
                              )
                            }
                            className="cursor-pointer w-full sm:w-auto bg-[#6cf0ae] hover:bg-[#58db99] text-[#064e3b] font-black py-2.5 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-xs hover:scale-105"
                          >
                            <Award className="w-4 h-4" />
                            <span>Báo cáo lên vòng tay</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* CASE 2: ANSWER IS WRONG -> 1. LỜI KHUYÊN & ĐỘNG VIÊN, 2. VÌ SAO SAI, 3. CHỌN CÂU NÀO ĐÚNG */
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300 shrink-0 border border-rose-500/30">
                        <AlertCircle className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-wide border border-amber-500/30">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Lời khuyên & Chẩn đoán sai sót</span>
                          </div>

                          {/* Sound button to listen to voice advice - Bấm vào mới đọc */}
                          <button
                            type="button"
                            onClick={() => soundManager.speakWrongExplanation({
                              subject: currentSubject.subject || "Bài học",
                              isTimeout: false,
                              whyWrong: `Bạn đã chọn phương án ${feedback.selectedOptionText}. ${feedback.whyWrong}`,
                              correctLetter: letters[feedback.correctOptionIndex],
                              correctAnswer: feedback.correctOptionText,
                              reasoning: feedback.explanation || feedback.advice || "Cần đối chiếu kỹ với dữ kiện đề bài.",
                              keyPointsToRemember: feedback.advice || "Ghi nhớ kiến thức cốt lõi trong sách giáo khoa Lớp 6.",
                            })}
                            className="cursor-pointer text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 px-3.5 py-1.5 rounded-full border border-amber-300 flex items-center gap-1.5 transition active:scale-95 shadow-md ring-2 ring-amber-400/30"
                            title="Bấm vào để nghe AI đọc giải thích 4 ý chuẩn"
                          >
                            <Volume2 className="w-4 h-4 text-white" />
                            <span>🔊 Bấm để nghe giải thích</span>
                          </button>
                        </div>

                        <h4 className="text-lg sm:text-xl font-extrabold text-white">
                          Câu trả lời chưa chính xác — Đừng lo lắng nhé!
                        </h4>

                        {feedback.textbookLesson && (
                          <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-200 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                            <span>{feedback.textbookLesson}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* MỤC 1: LỜI KHUYÊN ÔN TẬP & ĐỘNG VIÊN */}
                    <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-400/50 rounded-xl p-4 space-y-2 shadow-inner">
                      <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wide">
                        <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span>1. Lời khuyên ôn tập & Động viên: Mẹo ghi nhớ bài học và khích lệ tinh thần.</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed pl-2 border-l-2 border-amber-400">
                        {feedback.advice || "Hãy đọc kỹ từng từ khóa trong câu hỏi SGK, nhớ lại định nghĩa hoặc công thức bài học và đừng vội vàng khi chọn phương án!"}
                      </p>
                      <p className="text-xs text-amber-200/90 italic pl-2">
                        💬 {feedback.encouragement || "Sai một câu là cơ hội tuyệt vời để ta hiểu sâu bản chất bài học và không bao giờ mắc lại lỗi này!"}
                      </p>
                    </div>

                    {/* MỤC 2: GIẢI THÍCH VÌ SAO CÂU ĐÓ SAI */}
                    <div className="bg-rose-950/70 p-4 rounded-xl border border-rose-500/40 space-y-2">
                      <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>2. Giải thích vì sao câu đó sai: Phân tích lỗi của phương án vừa chọn.</span>
                      </div>
                      <div className="text-xs sm:text-sm text-rose-100/95 leading-relaxed pl-2 border-l-2 border-rose-400">
                        Phương án bạn đã chọn: <strong className="text-white bg-rose-900/80 px-2 py-0.5 rounded border border-rose-400/40">{feedback.selectedOptionText}</strong>.
                        <p className="mt-1.5">{feedback.whyWrong}</p>
                      </div>
                    </div>

                    {/* MỤC 3: CHỌN CÂU NÀO CHO ĐÚNG */}
                    <div className="bg-emerald-950/70 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>3. Chọn câu nào cho đúng: Nêu rõ phương án chuẩn xác theo SGK Lớp 6.</span>
                      </div>
                      <div className="pl-2 border-l-2 border-emerald-400 space-y-2">
                        <div className="text-xs sm:text-sm text-emerald-100 font-bold">
                          👉 Bạn cần chọn đáp án: <span className="text-white bg-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-400 shadow-sm">{letters[feedback.correctOptionIndex]}. {feedback.correctOptionText}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-200/95 leading-relaxed pt-1">
                          <strong>Lý giải chuẩn kiến thức SGK Lớp 6:</strong> {feedback.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons for student */}
                    <div className="pt-2 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-2.5">
                      <button
                        onClick={() => handleRetryQuestion(feedback.questionId)}
                        className="cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 hover:text-white transition flex items-center gap-1.5 border border-amber-500/50 shadow-sm active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Thử chọn lại câu này trên điện thoại</span>
                      </button>

                      {hasNextQuestion && (
                        <button
                          onClick={() => handleGoToNextQuestion()}
                          className="cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition flex items-center gap-1.5 border border-slate-600 active:scale-95"
                        >
                          <span>Chuyển qua câu tiếp theo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Default Guidance Card before answering */
              <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 flex items-start gap-3.5 text-slate-300 text-sm shadow-md">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">
                    Khung lời khuyên & Phân tích SGK Lớp 6
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    👆 Hãy bấm chọn một phương án (A, B, C hoặc D) trên màn hình điện thoại ở trên. Lời chúc mừng <em>Hoan hô & Congratulations!</em> kèm tự động chuyển câu (nếu đúng) hoặc phân tích 3 mục vì sao sai và đáp án chuẩn (nếu sai) sẽ hiển thị ngay tại đây (ở dưới điện thoại)!
                  </p>
                </div>
              </div>
            )}

            {/* Quiz Completion Summary Card if all 10 questions answered */}
            {isAllAnswered && (
              <div className="bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-purple-950/90 p-5 rounded-2xl border border-blue-400/40 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white text-sm sm:text-base">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span>Kết quả bài ôn {currentSubject.subject}: {correctCount}/{questions.length} câu đúng ({Math.round((correctCount / questions.length) * 100)}%)</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {correctCount === questions.length
                    ? "Tuyệt đỉnh! Bạn đã làm chủ 100% nội dung 10 câu SGK Lớp 6 môn này."
                    : `Bạn đã hoàn thành 10 câu! Những câu làm chưa đúng đã được ghi lại để vòng tay StudySync nhắc nhở ôn lại vào khung giờ tối.`}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() =>
                      onSyncWithWristband(
                        currentSubject.subject,
                        `Đã hoàn thành 10 câu ${currentSubject.subject}: Đạt ${correctCount}/${questions.length} câu!`
                      )
                    }
                    className="cursor-pointer bg-[#315bea] hover:bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi báo cáo lên vòng tay</span>
                  </button>
                  <button
                    onClick={handleResetQuiz}
                    className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại 10 câu này</span>
                  </button>
                </div>
              </div>
            )}

            {/* AI Question Generator Input for Custom Grade 6 Topics */}
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#b9ffdc]" />
                  Tạo thêm đề mới theo bài học SGK Lớp 6 (Gemini AI)
                </span>
                <button
                  onClick={handleResetQuiz}
                  className="cursor-pointer text-slate-400 hover:text-white flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Đặt lại mặc định
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTopicInput}
                  onChange={(e) => setCustomTopicInput(e.target.value)}
                  placeholder={`Nhập bài học SGK 6 (VD: Biện pháp tu từ, Số nguyên tố, Unit 4 My Neighbourhood...)`}
                  className="flex-1 bg-slate-900/90 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleGenerateAiQuestions}
                  disabled={isAiLoading}
                  className="cursor-pointer bg-[#315bea] hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition active:scale-95"
                >
                  {isAiLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{isAiLoading ? "Đang tạo..." : "Tạo đề SGK"}</span>
                </button>
              </div>
            </div>

            {/* Bottom Sync with Wristband Action */}
            <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
              <div>
                Đang làm: <span className="font-bold text-white">{currentSubject.subject}</span> ({answeredCount}/{questions.length} câu)
              </div>

              <button
                onClick={() =>
                  onSyncWithWristband(
                    currentSubject.subject,
                    `Vừa hoàn thành ôn ${currentSubject.subject}! Đạt ${correctCount}/${questions.length} câu.`
                  )
                }
                className="cursor-pointer text-xs font-bold text-[#b9ffdc] hover:text-white flex items-center gap-1.5 transition underline decoration-dotted underline-offset-4"
              >
                <Send className="w-3.5 h-3.5" />
                Đồng bộ điểm sang vòng tay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
