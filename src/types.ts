export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  knowledgeGapIfWrong: string;
  adviceIfWrong?: string;
  wrongOptionReasons?: { [optionIndex: number]: string };
  textbookLesson?: string;
}

export interface SubjectTopic {
  subject: string;
  topic: string;
  icon: string;
  questions: Question[];
}

export interface DiagnosticResult {
  isCorrect: boolean;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  feedbackText: string;
  knowledgeGap?: string;
  actionTip?: string;
}

export interface ScheduleDay {
  day: number;
  dayLabel: string;
  focus: string;
  wristbandAlertTime: string;
  method: string;
  duration: string;
  completed?: boolean;
}
