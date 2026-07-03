---
name: bao-cao-tuan
description: "Phân tích file CSV/XLSX export từ Google Ads và tạo báo cáo tuần gửi khách hàng. Dùng khi user muốn làm báo cáo tuần, báo cáo hiệu suất, phân tích số liệu chiến dịch, hoặc gõ /bao-cao-tuan kèm đường dẫn file."
argument-hint: "<đường dẫn file csv/xlsx trong folder data/>"
---

# Báo cáo tuần Google Ads

## Quy trình
1. Đọc file dữ liệu user đưa (trong `data/`). Nếu file có dòng header phụ của Google Ads (2-3 dòng đầu), bỏ qua chúng.
2. Tính các chỉ số tổng: Chi phí, Hiển thị, Click, CTR, CPC, Chuyển đổi, CPA, Tỉ lệ chuyển đổi.
3. So sánh với tuần trước nếu có dữ liệu 2 tuần.
4. Xác định: top 3 chiến dịch/từ khoá hiệu quả nhất, top 3 kém nhất (CPA cao, CTR thấp).
5. Viết báo cáo theo format dưới, chạy CHECKLIST.md trước khi giao.
6. Lưu vào `outputs/bao-cao-tuan-<ngày>.md` (hỏi user có cần xuất thêm .docx không).

## Format báo cáo
1. Tóm tắt 3-5 dòng cho người không chuyên (khách hàng đọc)
2. Bảng chỉ số tổng quan (có so sánh tuần trước nếu có)
3. Điểm sáng của tuần
4. Vấn đề cần lưu ý
5. Đề xuất hành động tuần tới (tối đa 3 việc, cụ thể)

## Lưu ý
- Số liệu tiền tệ format kiểu VN: 1.250.000đ
- KHÔNG bịa số liệu. Thiếu cột nào thì ghi rõ "không có dữ liệu"
- Ngôn ngữ dành cho khách hàng: hạn chế thuật ngữ, giải thích khi cần