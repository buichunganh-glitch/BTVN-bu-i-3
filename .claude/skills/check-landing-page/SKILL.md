---
name: check-landing-page
description: "Kiểm tra chất lượng landing page trước khi chạy Google Ads: tốc độ tải, mobile-friendly, các yếu tố ảnh hưởng Quality Score. Dùng khi user muốn audit/check/kiểm tra landing page, hoặc gõ /check-landing-page kèm URL."
argument-hint: "<url landing page>"
---

# Check Landing Page cho Google Ads

## Quy trình

1. Nhận URL từ user. Nếu thiếu URL, hỏi lại.
2. Gọi Google PageSpeed Insights API (miễn phí, không cần API key) cho cả mobile và desktop:
```bash
   curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<URL>&strategy=mobile" -o /tmp/psi-mobile.json
   curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<URL>&strategy=desktop" -o /tmp/psi-desktop.json
```
3. Đọc JSON, trích các chỉ số: Performance score, FCP, LCP, CLS, TBT.
4. Fetch HTML trang (curl) và kiểm tra thêm: có thẻ title/meta description không, có form/CTA rõ ràng không, có số điện thoại/nút liên hệ không.
5. Xuất báo cáo theo Output Format bên dưới, lưu vào `outputs/audit-landing-<domain>-<ngày>.md`.

## Tiêu chí đánh giá

| Chỉ số | Tốt | Cảnh báo | Nghiêm trọng |
|---|---|---|---|
| Performance (mobile) | >=80 | 50-79 | <50 |
| LCP | <2.5s | 2.5-4s | >4s |
| CLS | <0.1 | 0.1-0.25 | >0.25 |

## Output Format

- Điểm tổng quan mobile/desktop
- Bảng chỉ số Core Web Vitals kèm trạng thái pass/warn/fail
- 3-5 khuyến nghị ưu tiên, viết bằng ngôn ngữ khách hàng hiểu được (không thuần kỹ thuật)
- Kết luận: landing page ĐỦ/CHƯA ĐỦ điều kiện chạy Ads

## Error Handling

| Lỗi | Cách xử lý |
|---|---|
| API trả lỗi 500/timeout | Chờ 10 giây, thử lại 1 lần. Vẫn lỗi thì báo user và chỉ audit phần HTML |
| URL redirect/chặn bot | Báo user kiểm tra lại URL, thử với www hoặc https |
| Trang chưa index/mới | Vẫn chạy được, PSI không cần trang đã index |