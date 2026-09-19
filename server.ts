import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

// Lazy-initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Endpoint: Generate custom diagnostic questions
app.post("/api/generate-questions", async (req, res) => {
  try {
    const { subject, topic, gradeLevel = "Lớp 6-9" } = req.body;
    const ai = getAI();

    if (!ai) {
      // Fallback pre-calculated high quality educational questions in Vietnamese
      return res.json({
        success: true,
        source: "curated",
        questions: getCuratedQuestions(subject, topic),
      });
    }

    const prompt = `Bạn là trợ lý giáo dục StudySync AI. Hãy tạo 3 câu hỏi trắc nghiệm nhanh cho học sinh (${gradeLevel}) môn "${subject || 'Toán'}", chủ đề "${topic || 'Phân số'}".
Mỗi câu hỏi phải bám sát chương trình SGK lớp 6 và nhằm phát hiện các lỗ hổng kiến thức hoặc quan niệm sai lầm phổ biến của học sinh.
QUAN TRỌNG: Các đáp án đúng phải được phân bố ngẫu nhiên đều giữa các phương án (correctIndex ngẫu nhiên là 0, 1, 2 hoặc 3; TUYỆT ĐỐI KHÔNG để đáp án đúng luôn là 0 hoặc luôn là A).
Trả về định dạng JSON thuần túy (không markdown) với cấu trúc:
{
  "subject": "${subject || 'Toán'}",
  "topic": "${topic || 'Phân số'}",
  "questions": [
    {
      "id": "q1",
      "question": "Nội dung câu hỏi",
      "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
      "correctIndex": 1,
      "explanation": "Giải thích chi tiết vì sao đúng và lỗi sai học sinh thường mắc phải",
      "knowledgeGapIfWrong": "Lỗ hổng kiến thức nếu học sinh chọn sai câu này",
      "adviceIfWrong": "Lời khuyên ôn tập thực tế và mẹo ghi nhớ cho học sinh"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json({ success: true, source: "gemini", ...data });
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return res.json({
      success: true,
      source: "curated_fallback",
      questions: getCuratedQuestions(req.body.subject, req.body.topic),
    });
  }
});

// Endpoint: AI Knowledge Gap Diagnostic Analysis
app.post("/api/analyze-gap", async (req, res) => {
  try {
    const { subject, topic, question, selectedAnswer, correctAnswer, isCorrect } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        success: true,
        congratulation: isCorrect ? "🎉 HOAN HÔ! XUẤT SẮC! 🎉 CONGRATULATIONS! Bạn đã trả lời hoàn toàn chính xác!" : "",
        whyWrong: !isCorrect ? `Phương án bạn vừa chọn ("${selectedAnswer}") chưa đúng: Bạn có thể đã nhầm lẫn với quy tắc khác hoặc chọn nhầm bẫy của câu hỏi.` : "",
        diagnostic: isCorrect
          ? `Hoan hô! Bạn đã nắm rất vững kiến thức bài học môn ${subject}. Chuẩn bị tự động chuyển qua câu tiếp theo nhé!`
          : `Đáp án đúng là: "${correctAnswer}". Hãy ghi nhớ phương án này để áp dụng cho các bài tập tương tự.`,
        knowledgeGap: !isCorrect ? "Cần củng cố thêm phần lý thuyết trọng tâm trong SGK lớp 6." : undefined,
        encouragement: !isCorrect ? "Đừng buồn nhé, cố gắng lên! Sai sót là cơ hội tuyệt vời để học hỏi và nhớ lâu hơn!" : "",
        advice: isCorrect
          ? "Rất tuyệt vời! Giữ vững phong độ này trong các câu hỏi tiếp theo nhé!"
          : "Lời khuyên: Dành 1 phút đọc kỹ phần giải thích, ghi chú lại mẹo nhớ để lần sau làm đúng 100%!",
      });
    }

    const prompt = `Học sinh lớp 6 đang làm bài trắc nghiệm môn "${subject}", chủ đề "${topic}".
Câu hỏi: "${question}"
Học sinh chọn: "${selectedAnswer}"
Đáp án đúng: "${correctAnswer}"
Trạng thái: ${isCorrect ? "ĐÚNG" : "CHƯA ĐÚNG"}

Hãy đóng vai gia sư StudySync AI cực kỳ thân thiện và sư phạm:
1. Nếu ĐÚNG:
   - "congratulation": Bắt buộc có các từ "Hoan hô" và "Congratulations!", lời khen ngợi nồng nhiệt, hào hứng.
   - "diagnostic": Phân tích ngắn vì sao học sinh đã tư duy rất chuẩn.
   - "advice": Lời dặn dò sẵn sàng chuyển sang câu tiếp theo.
2. Nếu SAI:
   - "encouragement": Lời ĐỘNG VIÊN ân cần, ấm áp (ví dụ: "Đừng buồn nhé, cố gắng lên nào! Sai sót là một bước đệm giúp ta hiểu sâu và nhớ lâu hơn...").
   - "whyWrong": Giải thích CỤ THỂ, DỄ HIỂU vì sao việc chọn "${selectedAnswer}" là SAI (chỉ rõ điểm nhầm lẫn của học sinh).
   - "diagnostic": Khẳng định rõ RÀNG: "Đáp án đúng là: ${correctAnswer}" và giải thích vì sao đáp án này mới là chuẩn xác theo SGK lớp 6.
   - "knowledgeGap": Lỗ hổng kiến thức cốt lõi học sinh cần lưu ý.
   - "advice": LỜI KHUYÊN ôn tập thiết thực, kèm mẹo ghi nhớ nhanh để lần sau không bị nhầm lẫn.

Trả về định dạng JSON thuần túy:
{
  "congratulation": "chuỗi chúc mừng nếu đúng (chứa Hoan hô và Congratulations)",
  "encouragement": "lời động viên nếu sai",
  "whyWrong": "giải thích chi tiết vì sao phương án đã chọn là sai",
  "diagnostic": "nêu rõ chọn câu nào cho đúng và giải thích lý do",
  "knowledgeGap": "lỗ hổng kiến thức phát hiện",
  "advice": "lời khuyên học tập và mẹo nhớ"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, ...data });
  } catch (err: any) {
    console.error("Error analyzing gap:", err);
    return res.json({
      success: true,
      congratulation: req.body.isCorrect ? "🎉 Chúc mừng bạn đã trả lời rất chính xác!" : "",
      whyWrong: !req.body.isCorrect ? `Lựa chọn "${req.body.selectedAnswer}" chưa đúng với quy tắc chuẩn.` : "",
      diagnostic: req.body.isCorrect
        ? "Tuyệt vời! Kiến thức phần này của bạn rất vững."
        : `Đáp án đúng là "${req.body.correctAnswer}".`,
      advice: req.body.isCorrect
        ? "Bạn có thể chuyển qua câu tiếp theo để tiếp tục bài ôn!"
        : "Lời khuyên: Dành 2 phút xem lại quy tắc và ghi chú lại bẫy này vào sổ tay.",
    });
  }
});

// Endpoint: Generate Study Schedule
app.post("/api/generate-schedule", async (req, res) => {
  try {
    const { subject, examDaysLeft = 5, dailyMinutes = 20 } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        success: true,
        schedule: getDefaultSchedule(subject, examDaysLeft, dailyMinutes),
      });
    }

    const prompt = `Tạo lịch ôn tập thông minh (Spaced Repetition) chuẩn bị thi môn "${subject}".
Còn ${examDaysLeft} ngày trước kỳ thi, mỗi ngày học sinh dành ${dailyMinutes} phút ôn tập kết hợp thông báo qua vòng tay StudySync.
Trả về JSON danh sách các ngày ôn:
{
  "planTitle": "Lộ trình ôn tập nước rút ${subject}",
  "schedule": [
    {
      "day": 1,
      "dayLabel": "Ngày 1 (Hôm nay)",
      "focus": "Chủ đề trọng tâm cần ôn",
      "wristbandAlertTime": "19:00",
      "method": "3 câu kiểm tra chẩn đoán + tóm tắt 1 trang",
      "duration": "${dailyMinutes} phút"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, ...data });
  } catch (err) {
    return res.json({
      success: true,
      schedule: getDefaultSchedule(req.body.subject, req.body.examDaysLeft, req.body.dailyMinutes),
    });
  }
});

function getCuratedQuestions(subject = "Toán", topic = "Phân số") {
  const normSub = (subject || "").toLowerCase();

  if (normSub.includes("việt") || normSub.includes("viet") || normSub.includes("văn")) {
    return [
      {
        id: "tv1",
        question: "Trong các từ sau, từ nào là từ ghép đẳng lập?",
        options: ["Xe đạp", "Quần áo", "Hoa hồng", "Máy bay"],
        correctIndex: 1,
        explanation: "'Quần áo' là từ ghép đẳng lập vì hai tiếng 'quần' và 'áo' bình đẳng với nhau về mặt ngữ pháp và ngữ nghĩa.",
        knowledgeGapIfWrong: "Chưa phân biệt được giữa từ ghép đẳng lập và từ ghép chính phụ.",
      },
      {
        id: "tv2",
        question: "Từ nào dưới đây là từ láy tượng thanh gợi tả âm thanh?",
        options: ["Xanh xao", "Mênh mông", "Róc rách", "Nhỏ nhắn"],
        correctIndex: 2,
        explanation: "'Róc rách' là từ láy tượng thanh vì mô phỏng âm thanh tự nhiên của tiếng nước chảy khe khẽ.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa từ láy tượng thanh và từ láy tượng hình.",
      },
      {
        id: "tv3",
        question: "Câu nào dưới đây sử dụng biện pháp tu từ Nhân hóa?",
        options: [
          "Cây cầu dài ngoằng như một con rồng khổng lồ.",
          "Mặt hồ phẳng lặng và trong veo như tấm gương.",
          "Hôm nay trời nắng chang chang và oi bức.",
          "Bác tre già rung râu rì rào trong gió sớm."
        ],
        correctIndex: 3,
        explanation: "Dùng từ gọi người ('Bác') và tả hành động của người ('rung râu') gán cho cây tre là phép nhân hóa.",
        knowledgeGapIfWrong: "Chưa nhận diện được các cách nhân hóa trong SGK Ngữ văn 6.",
      }
    ];
  }

  if (normSub.includes("khoa học") || normSub.includes("khtn") || normSub.includes("vật lý") || normSub.includes("sinh")) {
    return [
      {
        id: "s1",
        question: "Khí nào chiếm tỉ lệ thể tích lớn nhất trong không khí quyển Trái Đất?",
        options: [
          "Khí Oxygen (khoảng 21%)",
          "Khí Nitrogen (khoảng 78%)",
          "Khí Carbon dioxide (khoảng 0.04%)",
          "Hơi nước và các khí hiếm khác"
        ],
        correctIndex: 1,
        explanation: "Khí Nitrogen chiếm khoảng 78% thể tích không khí quyển, Oxygen chiếm khoảng 21%.",
        knowledgeGapIfWrong: "Lầm tưởng Oxygen là khí chiếm tỉ lệ lớn nhất.",
      },
      {
        id: "s2",
        question: "Cấp độ tổ chức cơ bản nhất cấu tạo nên mọi cơ thể sinh vật là gì?",
        options: ["Tế bào", "Mô", "Cơ quan", "Hệ cơ quan"],
        correctIndex: 0,
        explanation: "Tế bào là đơn vị cơ bản cấu tạo nên mọi cơ thể sống theo SGK KHTN 6.",
        knowledgeGapIfWrong: "Nhầm lẫn trật tự các cấp độ tổ chức sống.",
      }
    ];
  }

  if (normSub.includes("anh") || normSub.includes("english")) {
    return [
      {
        id: "e1",
        question: "Listen! Duy and Phong _____ chess in the classroom.",
        options: ["play", "are playing", "plays", "is playing"],
        correctIndex: 1,
        explanation: "Dấu hiệu 'Listen!' dùng thì Hiện tại tiếp diễn. Duy and Phong là 2 người nên dùng 'are playing'.",
        knowledgeGapIfWrong: "Quên dấu hiệu nhận biết thì tiếp diễn hoặc nhầm số ít/số nhiều.",
      },
      {
        id: "e2",
        question: "There is a dog _____ the table and the sofa.",
        options: ["between", "under", "next", "behind"],
        correctIndex: 0,
        explanation: "Cấu trúc 'between A and B' mang nghĩa ở giữa hai đối tượng A và B.",
        knowledgeGapIfWrong: "Chưa nắm cặp từ 'between ... and ...'.",
      },
      {
        id: "e3",
        question: "My best friend is very _____. She always helps everyone and shares things.",
        options: ["funny", "shy", "kind", "confident"],
        correctIndex: 2,
        explanation: "Hành động 'helps everyone' và 'shares' thể hiện tính cách tốt bụng, hay giúp đỡ ('kind').",
        knowledgeGapIfWrong: "Chưa nắm vững nghĩa các tính từ chỉ tính cách trong SGK Tiếng Anh 6.",
      },
    ];
  }

  // Default Math questions
  return [
    {
      id: "m1",
      question: "Trong các số sau, số nào chia hết cho cả 2, 3 và 5?",
      options: ["145", "124", "180", "190"],
      correctIndex: 2,
      explanation: "180 tận cùng là 0 nên chia hết cho 2 và 5; tổng chữ số 1 + 8 + 0 = 9 chia hết cho 3.",
      knowledgeGapIfWrong: "Chưa kết hợp dấu hiệu chia hết tận cùng và tổng chữ số.",
    },
    {
      id: "m2",
      question: "Trong các số sau, đâu là số nguyên tố?",
      options: ["21", "29", "27", "33"],
      correctIndex: 1,
      explanation: "29 chỉ có 2 ước là 1 và chính nó. Các số 21, 27, 33 đều chia hết cho 3 nên là hợp số.",
      knowledgeGapIfWrong: "Nhầm lẫn số lẻ với số nguyên tố.",
    },
    {
      id: "m3",
      question: "Kết quả của phép tính (-15) + (-25) là:",
      options: ["+40", "-10", "+10", "-40"],
      correctIndex: 3,
      explanation: "Cộng hai số nguyên âm: cộng hai phần số rồi đặt dấu trừ đằng trước: -(15 + 25) = -40.",
      knowledgeGapIfWrong: "Nhầm quy tắc phép nhân âm nhân âm thành dương vào phép cộng.",
    },
  ];
}

function getDefaultSchedule(subject = "Toán", days = 5, dailyMinutes = 20) {
  return [
    {
      day: 1,
      dayLabel: "Ngày 1 (Khởi động)",
      focus: "Định nghĩa & tính chất cốt lõi",
      wristbandAlertTime: "19:00",
      method: "Làm 3 câu chẩn đoán trên điện thoại + ghi nhớ quy tắc",
      duration: `${dailyMinutes} phút`,
    },
    {
      day: 2,
      dayLabel: "Ngày 2 (Khắc phục lỗ hổng)",
      focus: "Các dạng bài hay mắc bẫy",
      wristbandAlertTime: "19:15",
      method: "Vòng tay nhắc ôn 5 phút kỹ năng còn yếu hôm qua",
      duration: `${dailyMinutes} phút`,
    },
    {
      day: 3,
      dayLabel: "Ngày 3 (Luyện phản xạ)",
      focus: "Bài tập phối hợp & tính toán nhanh",
      wristbandAlertTime: "19:00",
      method: "Thử thách 5 câu tính nhẩm không dùng nháp dài",
      duration: `${dailyMinutes} phút`,
    },
    {
      day: 4,
      dayLabel: "Ngày 4 (Thi thử tốc độ)",
      focus: "Đề mô phỏng kiểm tra thực tế",
      wristbandAlertTime: "20:00",
      method: "Làm đề kiểm tra 15 phút, AI chấm điểm ngay",
      duration: `${dailyMinutes} phút`,
    },
    {
      day: 5,
      dayLabel: "Ngày 5 (Tổng duyệt trước ngày thi)",
      focus: "Tự tin & thư giãn tâm lý",
      wristbandAlertTime: "18:30",
      method: "Ôn lại 3 ghi chú sai lầm thường gặp, đi ngủ sớm",
      duration: "15 phút",
    },
  ];
}

async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StudySync AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
