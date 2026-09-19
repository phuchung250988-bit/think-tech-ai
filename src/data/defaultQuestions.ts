import { SubjectTopic } from "../types";

export const DEFAULT_SUBJECTS: SubjectTopic[] = [
  {
    subject: "Tiếng Việt",
    topic: "Ngữ văn 6 (Từ loại, Tu từ & Ngữ pháp)",
    icon: "📖",
    questions: [
      {
        id: "tv1",
        question: "Trong các từ sau, từ nào là từ ghép đẳng lập?",
        options: ["Xe đạp", "Quần áo", "Hoa hồng", "Máy bay"],
        correctIndex: 1,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Từ đơn và từ phức (Từ ghép & Từ láy)",
        explanation: "'Quần áo' là từ ghép đẳng lập vì hai tiếng 'quần' và 'áo' bình đẳng với nhau về mặt ngữ pháp và ngữ nghĩa, không có tiếng nào phụ thuộc tiếng nào.",
        knowledgeGapIfWrong: "Chưa phân biệt được giữa từ ghép đẳng lập (các tiếng bình đẳng) và từ ghép chính phụ (có tiếng chính và tiếng phụ bổ nghĩa).",
        adviceIfWrong: "Mẹo SGK: Hãy thử xem hai tiếng có bình đẳng cùng chỉ loại trang phục không. 'Quần' và 'áo' bình đẳng, còn 'xe đạp', 'hoa hồng', 'máy bay' có tiếng sau bổ nghĩa phân loại cho tiếng trước nên là từ ghép chính phụ.",
        wrongOptionReasons: {
          0: "'Xe đạp' là từ ghép chính phụ (tiếng chính 'xe', tiếng phụ 'đạp' chỉ cách thức chuyển động).",
          2: "'Hoa hồng' là từ ghép chính phụ (tiếng chính 'hoa', tiếng phụ 'hồng' xác định loài hoa cụ thể).",
          3: "'Máy bay' là từ ghép chính phụ (tiếng chính 'máy', tiếng phụ 'bay' chỉ công dụng của máy)."
        }
      },
      {
        id: "tv2",
        question: "Từ nào dưới đây là từ láy tượng thanh gợi tả âm thanh?",
        options: ["Xanh xao", "Mênh mông", "Róc rách", "Nhỏ nhắn"],
        correctIndex: 2,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Từ láy tượng hình và từ láy tượng thanh",
        explanation: "'Róc rách' là từ láy tượng thanh vì mô phỏng âm thanh tự nhiên của tiếng nước chảy khe khẽ.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa từ láy tượng thanh (mô phỏng âm thanh) với từ láy tượng hình (gợi tả hình ảnh, màu sắc, dáng vẻ).",
        adviceIfWrong: "Ghi nhớ: Từ tượng THANH là nghe thấy bằng tai (như róc rách, tích tắc, ào ào). Từ tượng HÌNH là nhìn thấy bằng mắt (như xanh xao, mênh mông, khúc khuỷu).",
        wrongOptionReasons: {
          0: "'Xanh xao' là từ láy tượng hình mô tả màu sắc của da người khi mệt hoặc ốm, không phải âm thanh.",
          1: "'Mênh mông' là từ láy tượng hình mô tả không gian rộng lớn bao la, không biểu thị tiếng động.",
          3: "'Nhỏ nhắn' là từ láy tượng hình gợi tả hình vóc dáng bé nhỏ xinh xắn."
        }
      },
      {
        id: "tv3",
        question: "Câu thơ 'Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, em nằm trên lưng' sử dụng biện pháp tu từ nào?",
        options: ["Ẩn dụ", "So sánh", "Hoán dụ", "Điệp ngữ"],
        correctIndex: 0,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Biện pháp tu từ Ẩn dụ",
        explanation: "Hình ảnh 'Mặt trời của mẹ' là phép ẩn dụ: đứa con bé bỏng được ngầm ví như vầng mặt trời mang lại ánh sáng, hơi ấm và nguồn sống quý báu cho đời mẹ dựa trên nét tương đồng.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa ẩn dụ (so sánh ngầm, giấu đi vế so sánh và từ so sánh) với so sánh thông thường hoặc hoán dụ.",
        adviceIfWrong: "Phép ẩn dụ thực chất là một phép so sánh ngầm dựa trên quan hệ tương đồng (giống nhau). Tác giả không dùng từ so sánh 'như', mà gọi thẳng người con là 'mặt trời'.",
        wrongOptionReasons: {
          1: "Trong câu không có từ so sánh nào (như, là, tựa...) nên đây không phải là phép so sánh tường minh.",
          2: "Hoán dụ dựa trên mối quan hệ tương cận (gần gũi, đi liền nhau), còn ở đây tác giả so sánh hai đối tượng khác loại dựa trên nét giống nhau nên là ẩn dụ.",
          3: "Dù có lặp từ 'mặt trời' nhưng giá trị nghệ thuật đặc sắc nhất ở vế thứ hai chính là phép ẩn dụ biểu cảm."
        }
      },
      {
        id: "tv4",
        question: "Câu nào dưới đây sử dụng biện pháp tu từ Nhân hóa?",
        options: [
          "Cây cầu dài ngoằng như một con rồng khổng lồ.",
          "Mặt hồ phẳng lặng và trong veo như một tấm gương.",
          "Hôm nay trời nắng chang chang và oi bức.",
          "Bác tre già rung râu rì rào trong gió sớm."
        ],
        correctIndex: 3,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Biện pháp tu từ Nhân hóa",
        explanation: "Dùng từ gọi người ('Bác') và tả hành động đặc trưng của người ('rung râu') để gán cho cây tre là cách nhân hóa sinh động.",
        knowledgeGapIfWrong: "Chưa nhận diện được 3 kiểu nhân hóa: dùng từ gọi người để gọi vật, dùng từ tả người để tả vật, hoặc trò chuyện với vật như với người.",
        adviceIfWrong: "Để nhận ra nhân hóa, hãy tìm xem con vật hoặc đồ vật có mang danh xưng (bác, cô, chú...) hoặc hành động, cảm xúc của con người hay không.",
        wrongOptionReasons: {
          0: "Câu này dùng từ 'như' để đối chiếu cầu với con rồng, đây là phép So sánh.",
          1: "Câu này so sánh mặt hồ với tấm gương thông qua từ 'như', là phép So sánh.",
          2: "Câu này là câu miêu tả thời tiết khách quan, không dùng biện pháp tu từ nhân hóa."
        }
      },
      {
        id: "tv5",
        question: "Trong câu 'Áo nâu cùng với áo xanh / Nông thôn cùng với thị thành đứng lên', hình ảnh 'áo nâu' và 'áo xanh' là phép tu từ gì?",
        options: ["Ẩn dụ", "Hoán dụ", "Nhân hóa", "Nói quá"],
        correctIndex: 1,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Biện pháp tu từ Hoán dụ",
        explanation: "'Áo nâu' (trang phục người nông dân) và 'áo xanh' (trang phục người công nhân) lấy dấu hiệu của sự vật để gọi người dựa trên mối quan hệ tương cận (gần gũi đi liền nhau).",
        knowledgeGapIfWrong: "Dễ nhầm lẫn Hoán dụ với Ẩn dụ. Ẩn dụ dựa trên tương đồng (giống nhau), còn Hoán dụ dựa trên tương cận (gần gũi/dấu hiệu/bộ phận).",
        adviceIfWrong: "Phân biệt nhanh: Áo nâu thường đi liền với người nông dân (quan hệ thực tế gần gũi = Hoán dụ). Người con mang hơi ấm như mặt trời (so sánh ngầm giống nhau = Ẩn dụ).",
        wrongOptionReasons: {
          0: "Đây không phải là so sánh nét tương đồng trừu tượng mà là lấy y phục gắn liền với tầng lớp người dân ngoài thực tế (tương cận).",
          2: "Câu này không gán hành động tính cách con người cho đồ vật nên không phải là nhân hóa.",
          3: "Nói quá là phóng đại quy mô tính chất, ở đây chỉ là cách định danh nghệ thuật."
        }
      },
      {
        id: "tv6",
        question: "Thành phần in đậm trong câu sau đóng vai trò gì: 'Dưới bóng tre xanh, người nông dân Việt Nam dựng nhà dựng cửa.'?",
        options: ["Trạng ngữ chỉ thời gian", "Trạng ngữ chỉ nguyên nhân", "Trạng ngữ chỉ nơi chốn", "Chủ ngữ của câu"],
        correctIndex: 2,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Trạng ngữ và các loại trạng ngữ",
        explanation: "'Dưới bóng tre xanh' trả lời cho câu hỏi 'Ở đâu?', xác định không gian địa điểm diễn ra hành động nên là trạng ngữ chỉ nơi chốn.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa trạng ngữ nơi chốn (trả lời 'ở đâu?') và trạng ngữ thời gian (trả lời 'khi nào?').",
        adviceIfWrong: "Đặt câu hỏi để kiểm tra: 'Người nông dân dựng nhà ở đâu?' -> 'Dưới bóng tre xanh'. Câu trả lời cho câu hỏi Ở ĐÂU chính là trạng ngữ nơi chốn.",
        wrongOptionReasons: {
          0: "Trạng ngữ chỉ thời gian phải chỉ mốc lúc nào, mùa nào, ngày nào (trả lời cho câu hỏi 'Bao giờ? Khi nào?').",
          1: "Trạng ngữ nguyên nhân phải bắt đầu bằng 'Vì, Do, Nhờ...' trả lời cho câu hỏi 'Vì sao?'.",
          3: "Chủ ngữ trong câu này là 'người nông dân Việt Nam', trả lời cho câu hỏi 'Ai?'."
        }
      },
      {
        id: "tv7",
        question: "Dấu chấm phẩy (;) trong tiếng Việt thường được dùng để làm gì?",
        options: [
          "Báo hiệu lời nói trực tiếp của nhân vật.",
          "Đánh dấu ranh giới giữa các vế trong một câu ghép có cấu tạo phức tạp.",
          "Bộc lộ cảm xúc ngạc nhiên, thán phục.",
          "Kết thúc một câu kể chuyện đơn giản."
        ],
        correctIndex: 1,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Công dụng của dấu chấm phẩy (;)",
        explanation: "SGK Ngữ văn 6 quy định: Dấu chấm phẩy dùng để đánh dấu ranh giới giữa các vế trong một câu ghép phức tạp, hoặc giữa các bộ phận trong một phép liệt kê nhiều tầng bậc.",
        knowledgeGapIfWrong: "Chưa nắm rõ công dụng đặc thù của dấu chấm phẩy (nằm giữa dấu phẩy và dấu chấm về mức độ ngắt quãng).",
        adviceIfWrong: "Ghi nhớ: Dấu hai chấm (:) báo hiệu lời dẫn hoặc giải thích. Dấu chấm (.) kết thúc câu kể. Dấu chấm than (!) bộc lộ cảm xúc. Dấu chấm phẩy (;) ngắt các vế câu ghép dài hoặc các ý liệt kê lớn.",
        wrongOptionReasons: {
          0: "Báo hiệu lời nói trực tiếp là công dụng của dấu hai chấm kết hợp ngoặc kép hoặc gạch đầu dòng.",
          2: "Bộc lộ cảm xúc ngạc nhiên là công dụng của dấu chấm than (!).",
          3: "Kết thúc câu kể là công dụng của dấu chấm thông thường (.)."
        }
      },
      {
        id: "tv8",
        question: "Từ nào dưới đây là từ mượn tiếng Hán (từ Hán Việt)?",
        options: ["Nhà cửa", "Cơm nước", "Sông núi", "Quốc gia"],
        correctIndex: 3,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Từ mượn và nguồn gốc từ ngữ",
        explanation: "'Quốc gia' là từ mượn gốc Hán ('quốc' là nước, 'gia' là nhà). Các từ còn lại là từ thuần Việt quen thuộc trong đời sống dân gian.",
        knowledgeGapIfWrong: "Chưa phân biệt được từ thuần Việt và từ Hán Việt dùng trong các văn cảnh trang trọng.",
        adviceIfWrong: "Từ Hán Việt mang sắc thái trang trọng, học thuật, cổ kính hơn từ thuần Việt tương ứng: 'quốc gia' (Hán Việt) tương đương với 'đất nước' (thuần Việt).",
        wrongOptionReasons: {
          0: "'Nhà cửa' là từ ghép thuần Việt chỉ nơi ở.",
          1: "'Cơm nước' là từ ghép thuần Việt chỉ việc ăn uống sinh hoạt hằng ngày.",
          2: "'Sông núi' là từ ghép thuần Việt tương đương với từ Hán Việt 'giang sơn'."
        }
      },
      {
        id: "tv9",
        question: "Cặp từ nào dưới đây là 'từ đồng âm'?",
        options: [
          "Bàn tay (bộ phận) - Bàn bạc (thảo luận việc)",
          "Chân bàn (chân đồ vật) - Chân người (bộ phận cơ thể)",
          "Mũi kim (đầu nhọn) - Mũi người (bộ phận hô hấp)",
          "Mùa xuân (thời gian) - Tuổi xuân (sức trẻ)"
        ],
        correctIndex: 0,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Phân biệt Từ đồng âm và Từ đa nghĩa",
        explanation: "Từ đồng âm là các từ phát âm giống hệt nhau nhưng nghĩa hoàn toàn khác nhau, không có mối liên hệ nào: 'bàn' (bàn tay) là danh từ chỉ bộ phận, 'bàn' (bàn bạc) là động từ trao đổi ý kiến.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa từ đồng âm (nghĩa hoàn toàn độc lập xa lạ) và từ đa nghĩa (các nghĩa có mối liên hệ phái sinh dựa trên đặc điểm tương đồng).",
        adviceIfWrong: "Bí quyết SGK: Nếu tìm thấy mối liên hệ nghĩa (chân bàn và chân người đều ở vị trí nâng đỡ dưới cùng -> Đa nghĩa). Nếu hoàn toàn không liên quan gì nhau (bàn tay và bàn bạc -> Đồng âm).",
        wrongOptionReasons: {
          1: "Chân bàn - chân người là từ đa nghĩa vì cùng có nét nghĩa 'bộ phận tiếp xúc mặt đất nâng đỡ toàn thân'.",
          2: "Mũi kim - mũi người là từ đa nghĩa vì cùng có nét nghĩa 'bộ phận nhọn hướng ra phía trước'.",
          3: "Mùa xuân - tuổi xuân là từ đa nghĩa chuyển nghĩa theo phương thức ẩn dụ biểu thị giai đoạn tươi đẹp nhất."
        }
      },
      {
        id: "tv10",
        question: "Thành ngữ 'Ếch ngồi đáy giếng' nhằm khuyên nhủ hoặc phê phán điều gì?",
        options: [
          "Khuyên con người cần chăm chỉ cần cù rèn luyện mỗi ngày.",
          "Ca ngợi sự dũng cảm dám đối đầu với thử thách cam go.",
          "Phê phán người hiểu biết nông cạn nhưng lại tự cao tự đại, huênh hoang.",
          "Phê phán tính lười biếng, hay ỷ lại vào người khác."
        ],
        correctIndex: 2,
        textbookLesson: "SGK Ngữ văn 6 - Bài: Thành ngữ và bài học từ truyện ngụ ngôn",
        explanation: "Thành ngữ bắt nguồn từ truyện ngụ ngôn lớp 6 'Ếch ngồi đáy giếng', phê phán những người có tầm nhìn hạn hẹp, thiếu học hỏi nhưng lại huênh hoang coi trời bằng vung.",
        knowledgeGapIfWrong: "Chưa liên hệ được nguồn gốc của thành ngữ với văn bản truyện ngụ ngôn đã học trong chương trình Ngữ văn 6.",
        adviceIfWrong: "Nhớ lại câu chuyện chú ếch trong giếng: chỉ thấy bầu trời bé bằng cái vung và tiếng kêu của mình làm muôn loài sợ, khi ra ngoài đã bị trâu giẫm bẹp. Bài học cốt lõi là chớ kiêu ngạo khi tầm nhìn còn hạn hẹp.",
        wrongOptionReasons: {
          0: "Khuyên chăm chỉ cần cù là ý nghĩa của các câu thành ngữ như 'Có công mài sắt có ngày nên kim'.",
          1: "Thành ngữ này không mang ý nghĩa ca ngợi lòng dũng cảm.",
          3: "Phê phán tính lười biếng thường gắn với thành ngữ 'Há miệng chờ sung', không phải ếch ngồi đáy giếng."
        }
      }
    ]
  },
  {
    subject: "Toán",
    topic: "Toán 6 (Số học, Số nguyên & Phân số)",
    icon: "📐",
    questions: [
      {
        id: "m1",
        question: "Trong các số sau, số nào chia hết cho cả 2, 3 và 5?",
        options: ["145", "124", "180", "190"],
        correctIndex: 2,
        textbookLesson: "SGK Toán 6 - Chương I: Dấu hiệu chia hết cho 2, 3, 5, 9",
        explanation: "180 có chữ số tận cùng là 0 nên chia hết cho cả 2 và 5. Tổng các chữ số là 1 + 8 + 0 = 9 (chia hết cho 3). Vậy 180 thỏa mãn cả 3 điều kiện.",
        knowledgeGapIfWrong: "Chưa kết hợp đồng thời dấu hiệu chia hết tận cùng (2 và 5 phải tận cùng là 0) và tổng các chữ số (chia hết cho 3).",
        adviceIfWrong: "Mẹo chia hết: Để chia hết cho cả 2 và 5 thì chữ số tận cùng BẮT BUỘC phải là số 0. Sau đó chỉ cần cộng các chữ số lại xem có chia hết cho 3 không.",
        wrongOptionReasons: {
          0: "145 có tận cùng là 5 nên không chia hết cho 2.",
          1: "124 có tận cùng là 4 nên không chia hết cho 5.",
          3: "190 có tận cùng là 0 (chia hết cho 2 và 5), nhưng tổng chữ số 1 + 9 + 0 = 10 không chia hết cho 3."
        }
      },
      {
        id: "m2",
        question: "Trong các số sau, đâu là số nguyên tố?",
        options: ["21", "29", "27", "33"],
        correctIndex: 1,
        textbookLesson: "SGK Toán 6 - Chương I: Số nguyên tố và hợp số",
        explanation: "29 là số nguyên tố vì nó lớn hơn 1 và chỉ có đúng 2 ước là 1 và chính nó (29).",
        knowledgeGapIfWrong: "Nhầm lẫn số lẻ với số nguyên tố. Nhiều số lẻ là hợp số vì chia hết cho 3.",
        adviceIfWrong: "Cẩn thận bẫy: Không phải mọi số lẻ đều là số nguyên tố! Hãy kiểm tra xem số đó có chia hết cho 3 không (21 = 3×7, 27 = 3×9, 33 = 3×11 đều là hợp số).",
        wrongOptionReasons: {
          0: "21 chia hết cho 1, 3, 7, 21 nên là hợp số, không phải số nguyên tố.",
          2: "27 chia hết cho 1, 3, 9, 27 nên là hợp số.",
          3: "33 chia hết cho 1, 3, 11, 33 nên là hợp số."
        }
      },
      {
        id: "m3",
        question: "Kết quả của phép tính (-15) + (-25) là:",
        options: ["+40", "-10", "+10", "-40"],
        correctIndex: 3,
        textbookLesson: "SGK Toán 6 - Chương II: Phép cộng hai số nguyên cùng dấu âm",
        explanation: "Muốn cộng hai số nguyên âm, ta cộng hai giá trị tuyệt đối của chúng rồi đặt dấu trừ '-' trước kết quả: -(15 + 25) = -40.",
        knowledgeGapIfWrong: "Áp dụng sai quy tắc dấu của phép nhân (âm nhân âm thành dương) vào phép cộng hai số nguyên âm.",
        adviceIfWrong: "Tưởng tượng thực tế: Nợ 15 nghìn rồi nợ thêm 25 nghìn thì tổng số tiền nợ tăng lên thành nợ 40 nghìn (-40). Quy tắc: Âm cộng Âm luôn ra Âm!",
        wrongOptionReasons: {
          0: "Bạn đã nhầm sang quy tắc phép nhân: 'âm nhân âm bằng dương'. Phép cộng hai số âm kết quả luôn là số âm.",
          1: "Bạn đã lấy 25 - 15 = 10, đây là quy tắc cộng hai số khác dấu chứ không phải cùng dấu âm.",
          2: "Dương 10 là kết quả sai hoàn toàn về cả trị số và dấu."
        }
      },
      {
        id: "m4",
        question: "Tính: (-12) + 20 = ?",
        options: ["8", "-8", "-32", "32"],
        correctIndex: 0,
        textbookLesson: "SGK Toán 6 - Chương II: Phép cộng hai số nguyên khác dấu",
        explanation: "Hai số nguyên khác dấu: lấy số có phần số lớn hơn trừ số có phần số bé hơn (20 - 12 = 8) và mang dấu của số có phần số lớn hơn (+20), kết quả là +8.",
        knowledgeGapIfWrong: "Chưa xác định đúng dấu của kết quả phép cộng hai số nguyên khác dấu.",
        adviceIfWrong: "Quy tắc lấy phần lớn trừ phần bé: 20 lớn hơn 12, ta lấy 20 - 12 = 8. Vì 20 mang dấu dương nên kết quả là dương 8 (+8).",
        wrongOptionReasons: {
          1: "Đặt nhầm dấu âm cho kết quả. Vì số dương 20 lớn hơn 12 nên kết quả phải mang dấu dương.",
          2: "Bạn đã cộng hai giá trị tuyệt đối (12 + 20 = 32) và gán dấu trừ, đây là sai quy tắc khác dấu.",
          3: "Bạn đã cộng gộp hai số mà bỏ qua dấu âm của -12."
        }
      },
      {
        id: "m5",
        question: "Bỏ dấu ngoặc trong biểu thức: - (a - b + c) ta được:",
        options: ["- a - b + c", "- a + b - c", "- a - b - c", "a - b + c"],
        correctIndex: 1,
        textbookLesson: "SGK Toán 6 - Chương II: Quy tắc dấu ngoặc",
        explanation: "Khi bỏ dấu ngoặc có dấu trừ '-' đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc: dấu '+' đổi thành '-', dấu '-' đổi thành '+'. Do đó -(a - b + c) = -a + b - c.",
        knowledgeGapIfWrong: "Quên đổi dấu số hạng ở giữa hoặc chỉ đổi dấu số hạng đầu tiên.",
        adviceIfWrong: "Khắc ghi câu thần chú SGK Toán 6: 'Trước ngoặc có dấu trừ -> Bên trong đổi dấu toàn bộ: dương thành âm, âm thành dương!'.",
        wrongOptionReasons: {
          0: "Bạn chưa đổi dấu của '-b' thành '+b', quy tắc yêu cầu phải đổi dấu TẤT CẢ các số hạng.",
          2: "Bạn đã đổi dấu sai đối với '-b' (đáng lẽ phải thành +b).",
          3: "Bạn giữ nguyên biểu thức ban đầu mà không đổi dấu khi bỏ ngoặc có dấu trừ."
        }
      },
      {
        id: "m6",
        question: "Rút gọn phân số 18/24 về phân số tối giản ta được:",
        options: ["9/12", "6/8", "1/2", "3/4"],
        correctIndex: 3,
        textbookLesson: "SGK Toán 6 - Chương III: Rút gọn phân số tối giản",
        explanation: "Ước chung lớn nhất của 18 và 24 là 6. Chia cả tử và mẫu cho 6: 18/6 = 3, 24/6 = 4 => phân số tối giản là 3/4.",
        knowledgeGapIfWrong: "Dừng lại ở phân số chưa tối giản (như 9/12 hoặc 6/8) mà chưa rút gọn triệt để.",
        adviceIfWrong: "Để rút gọn nhanh nhất về tối giản, hãy chia cả tử và mẫu cho ƯCLN (Ước chung lớn nhất) của chúng. 3 và 4 là hai số nguyên tố cùng nhau nên 3/4 là tối giản.",
        wrongOptionReasons: {
          0: "9/12 là phân số bằng 18/24 nhưng chưa tối giản (vẫn chia được tiếp cho 3).",
          1: "6/8 là phân số bằng 18/24 nhưng chưa tối giản (vẫn chia được tiếp cho 2).",
          2: "1/2 = 12/24, không bằng giá trị của 18/24."
        }
      },
      {
        id: "m7",
        question: "Thực hiện phép tính: 1/2 + 1/4 = ?",
        options: ["3/4", "2/6", "1/6", "2/4"],
        correctIndex: 0,
        textbookLesson: "SGK Toán 6 - Chương III: Phép cộng phân số không cùng mẫu",
        explanation: "Quy đồng mẫu số chung là 4: 1/2 = 2/4. Ta có 2/4 + 1/4 = 3/4.",
        knowledgeGapIfWrong: "Cộng trực tiếp tử với tử, mẫu với mẫu thay vì quy đồng mẫu số chung trước khi cộng.",
        adviceIfWrong: "Ghi nhớ quy tắc vàng: 'Khác mẫu thì phải quy đồng trước, tuyệt đối không bao giờ được cộng các mẫu số với nhau'.",
        wrongOptionReasons: {
          1: "Bạn đã cộng tử với tử (1+1=2) và mẫu với mẫu (2+4=6). Phép cộng phân số không được cộng các mẫu số với nhau!",
          2: "Kết quả 1/6 thậm chí còn nhỏ hơn 1/2. Khi cộng thêm một lượng dương thì kết quả phải lớn hơn 1/2.",
          3: "2/4 chỉ bằng 1/2 ban đầu, bạn chưa cộng thêm phân số 1/4 vào."
        }
      },
      {
        id: "m8",
        question: "Tính kết quả phép chia: 3/4 ÷ 1/2 = ?",
        options: ["3/8", "1/2", "3/2 (hoặc 1.5)", "2/3"],
        correctIndex: 2,
        textbookLesson: "SGK Toán 6 - Chương III: Phép nhân và chia phân số",
        explanation: "Chia cho phân số bằng nhân với phân số nghịch đảo: 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2.",
        knowledgeGapIfWrong: "Quên nghịch đảo phân số thứ hai khi thực hiện phép chia phân số.",
        adviceIfWrong: "Khắc ghi câu thần chú chia phân số: 'Giữ nguyên phân số đầu, đổi dấu chia thành nhân, đảo ngược phân số thứ hai' (Keep - Change - Flip).",
        wrongOptionReasons: {
          0: "Bạn đã nhân thẳng 3/4 × 1/2 = 3/8 thay vì đảo ngược 1/2 thành 2/1. Phép chia phân số cần đảo ngược phân số chia!",
          1: "1/2 không phải là kết quả phép tính chia này.",
          3: "2/3 là kết quả nếu bạn lấy 1/2 chia cho 3/4, bạn đã bị ngược thứ tự phép tính."
        }
      },
      {
        id: "m9",
        question: "Kết quả của phép nhân hai số thập phân: (-0.5) × 0.4 là:",
        options: ["0.2", "-0.2", "-0.02", "-2.0"],
        correctIndex: 1,
        textbookLesson: "SGK Toán 6 - Chương III: Số thập phân và các phép tính với số thập phân",
        explanation: "Nhân hai số trái dấu: tích mang dấu âm. Lấy 5 × 4 = 20, có 2 chữ số sau dấu phẩy nên là 0.20 = 0.2. Kết quả là -0.2.",
        knowledgeGapIfWrong: "Đếm nhầm số chữ số thập phân sau dấu phẩy hoặc nhầm dấu âm/dương.",
        adviceIfWrong: "Quy tắc: Nhân hai số tự nhiên (5 × 4 = 20). Đếm tổng số chữ số sau dấu phẩy ở cả hai thừa số (1 + 1 = 2 chữ số) => 0.20 = 0.2. Hai số trái dấu thì kết quả mang dấu trừ (-0.2).",
        wrongOptionReasons: {
          0: "Tích của một số âm với một số dương bắt buộc phải là số âm, bạn đã bỏ quên dấu trừ.",
          2: "Đặt thừa chữ số 0 sau dấu phẩy, 0.5 × 0.4 = 0.2 chứ không phải 0.02.",
          3: "Tính sai phần nguyên và dấu thập phân."
        }
      },
      {
        id: "m10",
        question: "Nếu điểm M nằm giữa hai điểm A và B và MA = MB = 3 cm, thì điểm M được gọi là gì của đoạn thẳng AB?",
        options: [
          "Trung điểm của đoạn thẳng AB",
          "Điểm bất kỳ của đoạn thẳng AB",
          "Điểm nằm ngoài đoạn thẳng AB",
          "Đầu mút của đoạn thẳng AB"
        ],
        correctIndex: 0,
        textbookLesson: "SGK Toán 6 - Chương VIII: Đoạn thẳng và trung điểm của đoạn thẳng",
        explanation: "Định nghĩa SGK: Điểm M nằm giữa hai điểm A, B và cách đều hai điểm đó (MA = MB) được gọi là trung điểm của đoạn thẳng AB.",
        knowledgeGapIfWrong: "Chưa nắm đủ hai điều kiện bắt buộc của trung điểm: Vừa phải nằm giữa, vừa phải cách đều hai đầu mút.",
        adviceIfWrong: "Nhớ công thức: M là trung điểm AB khi và chỉ khi: M nằm giữa A, B VÀ MA = MB = AB/2. Cả 2 điều kiện này đều thỏa mãn trong đề bài.",
        wrongOptionReasons: {
          1: "M không phải điểm bất kỳ vì nó thỏa mãn điều kiện đặc biệt cách đều hai đầu mút (MA = MB = 3cm).",
          2: "Đề bài đã nêu rõ 'M nằm giữa hai điểm A và B' nên không thể là điểm nằm ngoài.",
          3: "Hai đầu mút của đoạn thẳng là điểm A và điểm B, M nằm chính giữa."
        }
      }
    ]
  },
  {
    subject: "Tiếng Anh",
    topic: "Tiếng Anh 6 (Global Success Units 1-10)",
    icon: "🇬🇧",
    questions: [
      {
        id: "e1",
        question: "Listen! Duy and Phong _____ chess in the classroom.",
        options: ["play", "are playing", "plays", "is playing"],
        correctIndex: 1,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 1: My New School (Present Continuous)",
        explanation: "Từ nhận biết 'Listen!' chỉ hành động đang diễn ra ngay lúc nói -> thì Hiện tại tiếp diễn (am/is/are + V-ing). Chủ ngữ hai người 'Duy and Phong' là số nhiều nên dùng 'are playing'.",
        knowledgeGapIfWrong: "Bỏ qua dấu hiệu nhận biết thì tiếp diễn 'Listen!' hoặc nhầm số ít/số nhiều với chủ ngữ ghép.",
        adviceIfWrong: "Mẹo Unit 1: Khi gặp các từ hiệu lệnh như 'Listen!', 'Look!', 'Be quiet!', hãy dùng ngay thì Hiện tại tiếp diễn. 'Duy and Phong' là 2 người (số nhiều) nên đi với 'are'.",
        wrongOptionReasons: {
          0: "'play' là thì Hiện tại đơn chỉ thói quen, ở đây có từ 'Listen!' báo hiệu đang diễn ra.",
          2: "'plays' vừa sai thì vừa sai ngôi vì chủ ngữ Duy and Phong là số nhiều.",
          3: "'is playing' chỉ dùng cho chủ ngữ số ít (He, She, 1 người). Ở đây có 2 người."
        }
      },
      {
        id: "e2",
        question: "There is a dog _____ the table and the sofa.",
        options: ["between", "under", "next", "behind"],
        correctIndex: 0,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 2: My House (Prepositions of Place)",
        explanation: "Cấu trúc giới từ vị trí 'between A and B' mang nghĩa ở giữa hai đối tượng A và B (the table and the sofa).",
        knowledgeGapIfWrong: "Chưa nhận ra cặp liên từ 'and' đi cùng với giới từ 'between'.",
        adviceIfWrong: "Quy tắc vàng Unit 2: Cứ thấy cụm '... A AND B' thì 99% giới từ cần điền là 'BETWEEN' (ở giữa cái này VÀ cái kia). 'Next' thì bắt buộc phải có 'to' (next to).",
        wrongOptionReasons: {
          1: "'under' (ở dưới) không đi với cấu trúc hai vật nối nhau bằng liên từ 'and'.",
          2: "'next' thiếu giới từ 'to' (phải là next to).",
          3: "'behind' (ở đằng sau) chỉ đi với một danh từ, không đi với cấu trúc '... and ...'."
        }
      },
      {
        id: "e3",
        question: "My best friend is very _____. She always helps everyone and shares things.",
        options: ["funny", "shy", "kind", "confident"],
        correctIndex: 2,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 3: My Friends (Personality Adjectives)",
        explanation: "Từ miêu tả tính cách: 'helps everyone' (giúp đỡ mọi người) và 'shares things' (chia sẻ đồ đạc) thể hiện đức tính tốt bụng, nhân hậu ('kind').",
        knowledgeGapIfWrong: "Chưa nắm vững nghĩa các tính từ chỉ tính cách trong Unit 3 SGK lớp 6.",
        adviceIfWrong: "Học từ theo ngữ cảnh Unit 3: kind = tốt bụng, hay giúp đỡ; funny = vui tính làm người khác cười; shy = nhút nhát e dè; confident = tự tin.",
        wrongOptionReasons: {
          0: "'funny' nghĩa là hài hước, hay pha trò chọc cười người khác.",
          1: "'shy' nghĩa là nhút nhát, e thẹn trước đám đông.",
          3: "'confident' nghĩa là tự tin vào bản thân."
        }
      },
      {
        id: "e4",
        question: "Life in the countryside is _____ than life in the city.",
        options: ["peacefuler", "peaceful", "most peaceful", "more peaceful"],
        correctIndex: 3,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 4: My Neighbourhood (Comparative Adjectives)",
        explanation: "'peaceful' là tính từ dài (2 âm tiết kết thúc bằng -ful). So sánh hơn của tính từ dài dùng cấu trúc: more + adj + than -> 'more peaceful'.",
        knowledgeGapIfWrong: "Nhầm lẫn quy tắc so sánh hơn tính từ ngắn (thêm -er) và tính từ dài (dùng more).",
        adviceIfWrong: "Ghi nhớ Unit 4: Tính từ 2 âm tiết có đuôi -ful (như peaceful, helpful) được coi là tính từ dài. So sánh hơn bắt buộc phải dùng 'more + adj + than', không bao giờ thêm đuôi -er!",
        wrongOptionReasons: {
          0: "Tiếng Anh không có dạng 'peacefuler' vì 'peaceful' là tính từ dài.",
          1: "'peaceful' là dạng nguyên mẫu, trong câu có từ so sánh 'than' nên phải biến đổi sang so sánh hơn.",
          2: "'most peaceful' là dạng so sánh nhất (the most), câu này đang so sánh hai đối tượng có 'than'."
        }
      },
      {
        id: "e5",
        question: "You _____ pick flowers in the national park. It is against the rule.",
        options: ["must", "mustn't", "can", "needn't"],
        correctIndex: 1,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 5: Natural Wonders of the World (Must / Mustn't)",
        explanation: "Cụm từ 'It is against the rule' (Điều đó vi phạm nội quy/bị cấm) đòi hỏi dùng động từ khuyết thiếu 'mustn't' (tuyệt đối không được phép).",
        knowledgeGapIfWrong: "Chưa phân biệt mức độ cấm đoán tuyệt đối của 'mustn't' với các động từ khuyết thiếu khác.",
        adviceIfWrong: "Nhớ quy tắc Unit 5: Cứ khi nào nói về LUẬT LỆ (rule) hoặc CẤM ĐOÁN (prohibited) thì dùng 'mustn't' (không được phép làm).",
        wrongOptionReasons: {
          0: "'must' mang nghĩa bắt buộc phải làm, trái ngược với việc bị cấm phạm luật.",
          2: "'can' nghĩa là có thể/được phép, trái ngược với ngữ cảnh.",
          3: "'needn't' nghĩa là không cần thiết, không thể hiện tính cấm đoán của quy định."
        }
      },
      {
        id: "e6",
        question: "At Tet, children _____ behave well and say polite words to adults.",
        options: ["should", "shouldn't", "mustn't", "aren't"],
        correctIndex: 0,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 6: Our Tet Holiday (Should / Shouldn't)",
        explanation: "Đưa ra lời khuyên về điều tốt nên làm vào dịp Tết: Trẻ em 'nên' ngoan ngoãn và nói lời lễ phép -> dùng 'should'.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa điều nên làm (should) và điều không nên làm (shouldn't) trong phong tục ngày Tết.",
        adviceIfWrong: "Mẹo Unit 6: 'behave well' (cư xử tốt) và 'say polite words' (nói lời lễ phép) là việc tốt nên làm -> chọn 'should'.",
        wrongOptionReasons: {
          1: "'shouldn't' nghĩa là không nên, đi ngược lại đạo đức và lời khuyên ngày Tết.",
          2: "'mustn't' là cấm không được làm, không phù hợp ở đây.",
          3: "'aren't' không đi trực tiếp với động từ nguyên mẫu 'behave'."
        }
      },
      {
        id: "e7",
        question: "_____ do you watch football on TV? - Twice a week.",
        options: ["How long", "What", "How often", "When"],
        correctIndex: 2,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 7: Television (Wh-questions)",
        explanation: "Câu trả lời 'Twice a week' (Hai lần một tuần) chỉ tần suất, do đó từ để hỏi bắt buộc phải là 'How often' (Bao lâu một lần / Có thường xuyên không).",
        knowledgeGapIfWrong: "Chưa nối kết câu trả lời về tần suất với từ để hỏi 'How often'.",
        adviceIfWrong: "Bí kíp Unit 7: Thấy câu trả lời có 'always/usually/never' hoặc 'once a week / twice a week / every day' thì câu hỏi luôn là 'HOW OFTEN'.",
        wrongOptionReasons: {
          0: "'How long' dùng để hỏi về độ dài thời gian (Bao lâu? - For 2 hours).",
          1: "'What' dùng để hỏi về cái gì, sự vật gì.",
          3: "'When' dùng để hỏi về thời điểm cụ thể (Vào lúc mấy giờ, ngày nào)."
        }
      },
      {
        id: "e8",
        question: "Last Sunday, we _____ badminton in the sports center with my brother.",
        options: ["play", "plays", "are playing", "played"],
        correctIndex: 3,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 8: Sports and Games (Past Simple)",
        explanation: "Trạng từ thời gian 'Last Sunday' (Chủ nhật tuần trước) báo hiệu thì Quá khứ đơn. Động từ có quy tắc 'play' thêm đuôi '-ed' thành 'played'.",
        knowledgeGapIfWrong: "Không chú ý trạng từ thời gian quá khứ 'Last Sunday'.",
        adviceIfWrong: "Dấu hiệu thì Quá khứ đơn (Unit 8): Khi thấy 'yesterday', 'ago', 'last + thời gian' (last week, last Sunday), động từ phải chia ở quá khứ (thêm -ed hoặc V2).",
        wrongOptionReasons: {
          0: "'play' là thì Hiện tại đơn nguyên thể.",
          1: "'plays' là thì Hiện tại đơn chia ngôi thứ ba số ít.",
          2: "'are playing' là thì Hiện tại tiếp diễn."
        }
      },
      {
        id: "e9",
        question: "Tokyo is one of the _____ cities in the world.",
        options: ["more modern", "most modern", "moderner", "modern"],
        correctIndex: 1,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 9: Cities of the World (Superlatives)",
        explanation: "Cấu trúc so sánh nhất: 'one of the + superlative' (một trong những thành phố hiện đại nhất). Với tính từ dài 'modern', so sánh nhất là 'the most modern'.",
        knowledgeGapIfWrong: "Quên mạo từ 'the' đi cùng với so sánh nhất 'the most + adj'.",
        adviceIfWrong: "Quy tắc Unit 9: Khi có mạo từ 'the' đứng trước tính từ dài thì phải dùng dạng so sánh nhất 'the most + adj' (hiện đại nhất).",
        wrongOptionReasons: {
          0: "'more modern' là so sánh hơn, cần có từ 'than' và so sánh giữa hai đối tượng.",
          2: "'moderner' sai ngữ pháp vì modern là tính từ 2 âm tiết không thêm đuôi -er.",
          3: "'modern' là tính từ nguyên mẫu, không phù hợp sau cụm 'one of the'."
        }
      },
      {
        id: "e10",
        question: "In the future, robots _____ do all the heavy housework for humans.",
        options: ["will", "did", "are", "have"],
        correctIndex: 0,
        textbookLesson: "SGK Tiếng Anh 6 - Unit 10: Our Houses in the Future (Future Simple)",
        explanation: "Cụm từ 'In the future' (Trong tương lai) là dấu hiệu của thì Tương lai đơn. Cấu trúc: will + V nguyên mẫu -> 'will do'.",
        knowledgeGapIfWrong: "Chưa nhận diện trạng từ chỉ tương lai 'In the future'.",
        adviceIfWrong: "Mẹo Unit 10: Nói về tương lai (in the future, tomorrow, next year), hãy dùng 'will + động từ nguyên thể' để diễn đạt dự đoán tương lai.",
        wrongOptionReasons: {
          1: "'did' là trợ động từ của thì quá khứ đơn, không dùng cho tương lai.",
          2: "'are' là to be hiện tại, không thể đứng trước động từ nguyên mẫu 'do'.",
          3: "'have' dùng trong hiện tại hoàn thành, cần đi với quá khứ phân từ (done)."
        }
      }
    ]
  },
  {
    subject: "Khoa học tự nhiên",
    topic: "KHTN 6 (Chất, Tế bào & Năng lượng)",
    icon: "🔬",
    questions: [
      {
        id: "s1",
        question: "Để đo thể tích của một lượng chất lỏng khoảng 80 mL, ta nên dùng dụng cụ nào sau đây là phù hợp và chính xác nhất?",
        options: [
          "Bình tràn có giới hạn đo 500 mL",
          "Cốc thủy tinh không có vạch chia độ",
          "Ống đong có giới hạn đo 100 mL và độ chia nhỏ nhất 1 mL",
          "Ống đong có giới hạn đo 50 mL"
        ],
        correctIndex: 2,
        textbookLesson: "SGK KHTN 6 - Bài: Các phép đo cơ bản và dụng cụ đo",
        explanation: "Để đo 80 mL, cần chọn dụng cụ có Giới hạn đo (GHĐ) lớn hơn giá trị cần đo (100 mL > 80 mL) và có Độ chia nhỏ nhất (ĐCNN) nhỏ (1 mL) để số đo chuẩn xác nhất.",
        knowledgeGapIfWrong: "Chưa nắm vững nguyên tắc chọn dụng cụ đo: GHĐ phải lớn hơn giá trị cần đo, và ĐCNN càng nhỏ thì kết quả càng chính xác.",
        adviceIfWrong: "Quy tắc đo lường KHTN 6: 1. Ước lượng giá trị cần đo. 2. Chọn dụng cụ có GHĐ lớn hơn một chút. 3. Chọn ĐCNN nhỏ để giảm sai số.",
        wrongOptionReasons: {
          0: "Bình tràn 500 mL quá lớn so với 80 mL, gây sai số lớn.",
          1: "Cốc không có vạch chia độ thì không thể đọc được chính xác thể tích.",
          3: "Ống đong 50 mL có giới hạn đo nhỏ hơn 80 mL nên không thể chứa hết lượng chất lỏng trong một lần đo."
        }
      },
      {
        id: "s2",
        question: "Khí nào chiếm tỉ lệ thể tích lớn nhất trong không khí quyển Trái Đất?",
        options: [
          "Khí Oxygen (khoảng 21%)",
          "Khí Nitrogen (khoảng 78%)",
          "Khí Carbon dioxide (khoảng 0.04%)",
          "Hơi nước và các khí hiếm khác"
        ],
        correctIndex: 1,
        textbookLesson: "SGK KHTN 6 - Bài: Oxygen và không khí",
        explanation: "Thành phần không khí theo thể tích: Khí Nitrogen chiếm khoảng 78%, khí Oxygen chiếm khoảng 21%, còn lại 1% là Carbon dioxide, hơi nước và các khí khác.",
        knowledgeGapIfWrong: "Nhiều bạn lầm tưởng khí Oxygen (dùng để thở) là khí chiếm nhiều nhất.",
        adviceIfWrong: "Ghi nhớ biểu đồ tròn không khí KHTN 6: Nitrogen chiếm gần 4/5 (78%), Oxygen chỉ chiếm hơn 1/5 một chút (21%). Tuy ít hơn nhưng Oxygen duy trì sự sống và sự cháy!",
        wrongOptionReasons: {
          0: "Oxygen rất quan trọng cho sự sống nhưng chỉ chiếm khoảng 21% thể tích không khí.",
          2: "Carbon dioxide chiếm tỉ lệ rất nhỏ (chưa tới 0.04%).",
          3: "Hơi nước và khí hiếm chỉ chiếm chưa đầy 1%."
        }
      },
      {
        id: "s3",
        question: "Cấp độ tổ chức cơ bản nhất cấu tạo nên mọi cơ thể sinh vật là gì?",
        options: ["Tế bào", "Mô", "Cơ quan", "Hệ cơ quan"],
        correctIndex: 0,
        textbookLesson: "SGK KHTN 6 - Bài: Tế bào - Đơn vị cơ sở của sự sống",
        explanation: "Tế bào là đơn vị cấu trúc và chức năng cơ bản nhất của mọi cơ thể sống (từ sinh vật đơn bào đến đa bào).",
        knowledgeGapIfWrong: "Nhầm lẫn giữa các bậc thang tổ chức sống từ nhỏ đến lớn.",
        adviceIfWrong: "Sơ đồ trật tự cơ thể đa bào KHTN 6: Tế bào -> Mô -> Cơ quan -> Hệ cơ quan -> Cơ thể. Tế bào luôn là nền tảng khởi nguồn cơ bản nhất!",
        wrongOptionReasons: {
          1: "Mô là tập hợp nhiều tế bào có cùng cấu trúc và chức năng, không phải cấp độ nhỏ nhất.",
          2: "Cơ quan được cấu tạo từ nhiều mô khác nhau.",
          3: "Hệ cơ quan gồm nhiều cơ quan phối hợp thực hiện chức năng."
        }
      },
      {
        id: "s4",
        question: "Thành phần nào dưới đây có ở tế bào thực vật nhưng KHÔNG có ở tế bào động vật?",
        options: [
          "Màng tế bào và nhân",
          "Tế bào chất",
          "Ti thể",
          "Lục lạp và thành tế bào (cell wall)"
        ],
        correctIndex: 3,
        textbookLesson: "SGK KHTN 6 - Bài: Cấu tạo và chức năng các thành phần tế bào",
        explanation: "Tế bào thực vật có thêm 'Thành tế bào' (giúp cây cứng cáp) và 'Lục lạp' (chứa diệp lục để quang hợp), đây là hai thành phần tế bào động vật không có.",
        knowledgeGapIfWrong: "Chưa phân biệt được các bào quan đặc trưng giúp thực vật quang hợp và có hình dạng cố định.",
        adviceIfWrong: "Mẹo nhớ KHTN 6: Thực vật quang hợp nhờ 'Lục lạp' màu xanh, và đứng vững vươn cao nhờ 'Thành tế bào' cứng. Động vật không tự quang hợp nên không có lục lạp.",
        wrongOptionReasons: {
          0: "Màng tế bào và nhân là các thành phần cơ bản mà cả tế bào động vật và thực vật đều có.",
          1: "Tế bào chất là chất nền của mọi tế bào sống, cả hai đều có.",
          2: "Ti thể là nhà máy năng lượng có ở cả tế bào động vật và thực vật."
        }
      },
      {
        id: "s5",
        question: "Theo hệ thống phân loại 5 giới của Whittaker, nấm men và nấm rơm được xếp vào giới nào?",
        options: [
          "Giới Thực vật (Plantae)",
          "Giới Nấm (Fungi)",
          "Giới Nguyên sinh (Protista)",
          "Giới Khởi sinh (Monera)"
        ],
        correctIndex: 1,
        textbookLesson: "SGK KHTN 6 - Bài: Đa dạng thế giới sống và các giới sinh vật",
        explanation: "Nấm không có lục lạp (không quang hợp được như thực vật) và có thành tế bào bằng chitin nên được xếp riêng vào Giới Nấm.",
        knowledgeGapIfWrong: "Nhiều người lầm tưởng nấm mọc từ đất là một loài thực vật.",
        adviceIfWrong: "Lưu ý quan trọng KHTN 6: Nấm KHÔNG phải thực vật vì nấm không có chất diệp lục, nấm sống dị dưỡng (hoại sinh hoặc ký sinh) nên thuộc riêng Giới Nấm!",
        wrongOptionReasons: {
          0: "Nấm không thể quang hợp tự dưỡng nên không thuộc Giới Thực vật.",
          2: "Giới Nguyên sinh là các sinh vật nhân thực đơn bào như trùng roi, trùng giày, tảo lục.",
          3: "Giới Khởi sinh là vi khuẩn (tế bào nhân sơ, chưa có nhân hoàn chỉnh)."
        }
      },
      {
        id: "s6",
        question: "Lực nào sau đây là 'lực không tiếp xúc'?",
        options: [
          "Lực tay người kéo cánh cửa mở ra",
          "Lực chân cầu thủ sút vào quả bóng",
          "Lực hút của Trái Đất tác dụng lên quả táo",
          "Lực ma sát giữa đế giày và mặt đất"
        ],
        correctIndex: 2,
        textbookLesson: "SGK KHTN 6 - Bài: Lực tiếp xúc và lực không tiếp xúc",
        explanation: "Trọng lực (lực hút của Trái Đất) tác dụng lên vật ngay cả khi vật đang lơ lửng trên không trung, không cần có sự tiếp xúc trực tiếp giữa các bề mặt.",
        knowledgeGapIfWrong: "Chưa phân biệt lực tiếp xúc (hai vật phải chạm vào nhau) và lực không tiếp xúc (tác dụng từ xa như lực hấp dẫn, lực từ của nam châm).",
        adviceIfWrong: "Phân biệt nhanh: Hai vật phải chạm vào nhau = Lực tiếp xúc. Hai vật cách xa nhau vẫn hút/đẩy nhau (nam châm, trọng lực Trái Đất) = Lực không tiếp xúc.",
        wrongOptionReasons: {
          0: "Tay chạm vào cánh cửa để kéo là lực tiếp xúc.",
          1: "Chân chạm vào quả bóng để sút là lực tiếp xúc.",
          3: "Đế giày tiếp xúc với mặt đất tạo ra lực ma sát tiếp xúc."
        }
      },
      {
        id: "s7",
        question: "Một vật có khối lượng m = 2.5 kg. Trọng lượng P của vật đó trên Trái Đất bằng bao nhiêu?",
        options: ["25 N", "2.5 N", "250 N", "0.25 N"],
        correctIndex: 0,
        textbookLesson: "SGK KHTN 6 - Bài: Khối lượng và trọng lượng",
        explanation: "Công thức liên hệ giữa trọng lượng P (đơn vị Newton) và khối lượng m (đơn vị kg): P = 10 × m = 10 × 2.5 = 25 N.",
        knowledgeGapIfWrong: "Quên nhân với hệ số 10 hoặc nhầm lẫn đơn vị giữa kg và N.",
        adviceIfWrong: "Công thức bỏ túi KHTN 6: P = 10 × m (với m tính bằng kg, P tính bằng N). Cứ lấy khối lượng (kg) nhân 10 là ra ngay trọng lượng (N).",
        wrongOptionReasons: {
          1: "2.5 N là quên nhân hệ số 10 của gia tốc trọng trường.",
          2: "250 N là nhân thừa thêm một số 0 (nhân 100).",
          3: "0.25 N là lấy khối lượng chia cho 10, hoàn toàn sai quy tắc."
        }
      },
      {
        id: "s8",
        question: "Lực ma sát nào xuất hiện giữ cho một thùng hàng nằm yên trên mặt sàn nghiêng không bị trượt xuống?",
        options: [
          "Lực ma sát trượt",
          "Lực ma sát nghỉ",
          "Lực ma sát lăn",
          "Lực cản của không khí"
        ],
        correctIndex: 1,
        textbookLesson: "SGK KHTN 6 - Bài: Lực ma sát và vai trò của lực ma sát",
        explanation: "Lực ma sát nghỉ xuất hiện ở bề mặt tiếp xúc giữ cho vật đứng yên khi vật đang chịu tác dụng của lực xu hướng làm vật chuyển động.",
        knowledgeGapIfWrong: "Nhầm lẫn giữa ma sát trượt (khi vật đã trượt) và ma sát nghỉ (khi vật vẫn đang đứng yên).",
        adviceIfWrong: "Từ khóa KHTN 6: Vật đang 'nằm yên/đứng yên' không trượt -> đó chính là lực ma sát NGHỈ (nghỉ = đứng yên).",
        wrongOptionReasons: {
          0: "Ma sát trượt chỉ xuất hiện khi thùng hàng ĐANG TRƯỢT trên mặt sàn.",
          2: "Ma sát lăn chỉ xuất hiện khi có bánh xe hoặc con lăn chuyển động lăn.",
          3: "Lực cản không khí rất nhỏ, không phải nguyên nhân chính giữ vật đứng yên trên mặt sàn."
        }
      },
      {
        id: "s9",
        question: "Dạng năng lượng nào dưới đây là nguồn năng lượng tái tạo (vô tận và thân thiện với môi trường)?",
        options: [
          "Than đá",
          "Dầu mỏ",
          "Khí đốt tự nhiên",
          "Năng lượng gió và năng lượng mặt trời"
        ],
        correctIndex: 3,
        textbookLesson: "SGK KHTN 6 - Bài: Năng lượng tái tạo và bảo toàn năng lượng",
        explanation: "Năng lượng gió và năng lượng mặt trời là các nguồn năng lượng tái tạo vì có sẵn trong tự nhiên, liên tục được tái tạo và không bao giờ cạn kiệt.",
        knowledgeGapIfWrong: "Chưa phân biệt được năng lượng tái tạo (mặt trời, gió, nước) và năng lượng hóa thạch không tái tạo (than đá, dầu mỏ).",
        adviceIfWrong: "Ghi nhớ: Nhiên liệu hóa thạch (than đá, dầu mỏ, khí đốt) khai thác mãi sẽ hết = không tái tạo. Gió, ánh sáng mặt trời, thủy triều luôn tự phục hồi = tái tạo.",
        wrongOptionReasons: {
          0: "Than đá là nhiên liệu hóa thạch hình thành qua hàng triệu năm, khai thác sẽ cạn kiệt.",
          1: "Dầu mỏ là nguồn năng lượng không tái tạo và gây ô nhiễm môi trường.",
          2: "Khí đốt tự nhiên là tài nguyên hóa thạch hữu hạn."
        }
      },
      {
        id: "s10",
        question: "Hiện tượng nào sau đây là sự ngưng tụ của chất?",
        options: [
          "Hơi nước trong không khí gặp lạnh đọng thành những giọt sương trên lá cây buổi sớm",
          "Nước trong ấm sôi bốc hơi lên nghi ngút",
          "Viên nước đá để ngoài trời tan chảy thành nước lỏng",
          "Cho nước vào ngăn đá tủ lạnh đông cứng thành đá"
        ],
        correctIndex: 0,
        textbookLesson: "SGK KHTN 6 - Bài: Các thể của chất và sự chuyển thể",
        explanation: "Sự ngưng tụ là quá trình chuyển từ thể hơi (khí) sang thể lỏng khi gặp nhiệt độ thấp (hơi nước -> giọt sương lỏng).",
        knowledgeGapIfWrong: "Nhầm lẫn giữa các quá trình: bay hơi (lỏng -> khí), ngưng tụ (khí -> lỏng), nóng chảy (rắn -> lỏng), đông đặc (lỏng -> rắn).",
        adviceIfWrong: "Quy tắc chuyển thể KHTN 6: Hơi nước (khí) biến thành Giọt sương (lỏng) = NGƯNG TỤ. Nước lỏng biến thành hơi nước = BAY HƠI.",
        wrongOptionReasons: {
          1: "Nước sôi bốc hơi là quá trình bay hơi (lỏng sang khí).",
          2: "Đá tan chảy thành nước là quá trình nóng chảy (rắn sang lỏng).",
          3: "Nước lỏng đông thành đá là quá trình đông đặc (lỏng sang rắn)."
        }
      }
    ]
  }
];
