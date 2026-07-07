---
name: nghien-cuu-tu-khoa
description: "Nghiên cứu và mở rộng bộ từ khoá cho chiến dịch Google Ads Search: gợi ý từ khoá liên quan, phân nhóm theo ý định tìm kiếm, đề xuất match type. Dùng khi user cần nghiên cứu từ khoá, lên danh sách keyword, hoặc gõ /nghien-cuu-tu-khoa kèm từ khoá gốc."
argument-hint: "<từ khoá gốc> [ngành/sản phẩm]"
---

# Nghiên cứu từ khoá Google Ads

## Quy trình
1. Nhận 1-3 từ khoá gốc từ user.
2. Lấy gợi ý thực tế từ Google Autocomplete (API công khai, không cần key):
```bash
   curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=vi&q=<tu-khoa>" -o /tmp/suggest.json
```
   Chạy lặp với từ khoá gốc + các biến thể (thêm "giá", "ở đâu", "tốt nhất", "gần đây"...).
3. Kết hợp gợi ý API với kiến thức ngành, lập danh sách 30-50 từ khoá.
4. Phân nhóm theo ý định tìm kiếm:
   - Thương mại (mua, giá, báo giá, dịch vụ...)
   - Tìm hiểu (là gì, cách, so sánh...)
   - Thương hiệu (tên brand + biến thể)
5. Với mỗi nhóm: đề xuất match type (Exact/Phrase/Broad) và 5-10 từ khoá phủ định.
6. Lưu kết quả vào `outputs/tu-khoa-<chu-de>-<ngày>.md` dạng bảng:
   | Từ khoá | Nhóm ý định | Match type đề xuất | Ghi chú |

## Vết xe đổ
- Không nhồi từ khoá tìm hiểu vào chiến dịch bán hàng — CTR cao nhưng không ra chuyển đổi
- Luôn có danh sách từ khoá phủ định (miễn phí, tuyển dụng, tự làm...)
- API suggest lỗi/timeout: vẫn tiếp tục bằng kiến thức ngành, ghi rõ nguồn nào từ API nguồn nào tự đề xuất
