# Audit Landing Page cho Google Ads

**URL:** https://dienlanhht.vn/
**Ngày kiểm tra:** 2026-07-03

> ⚠️ **Lưu ý về giới hạn báo cáo:** Google PageSpeed Insights API bị lỗi **429 - hết quota ngày** ("Queries per day" đã dùng hết) khi kiểm tra cả mobile và desktop. Đây là lỗi giới hạn hạn ngạch (không phải lỗi tạm thời), thử lại ngay không giải quyết được. Vì vậy báo cáo này **không có điểm Performance/LCP/CLS/CLS/TBT chính xác từ Google**, chỉ dựa trên phân tích mã nguồn HTML thực tế của trang. Khuyến nghị chạy lại lệnh `/check-landing-page` vào ngày mai hoặc dùng https://pagespeed.web.dev/ thủ công để lấy điểm số chính xác.

## 1. Tổng quan kỹ thuật

| Hạng mục | Kết quả | Đánh giá |
|---|---|---|
| HTTPS | Có (SSL, cookie secure) | ✅ Đạt |
| Nền tảng | WordPress (theme Flatsome) + WooCommerce | Đây là **trang chủ shop bán hàng**, không phải landing page riêng cho 1 sản phẩm/dịch vụ |
| Thẻ Title | "Trung tâm chăm sóc thiệt bị gia đình - Điện Lạnh HT" | ⚠️ Có lỗi chính tả: "**thiệt bị**" → phải là "**thiết bị**" |
| Meta description | Có, nhưng bị cắt cụt không có câu kêu gọi hành động rõ ràng | ⚠️ Cảnh báo |
| Thẻ H1 | **Không tìm thấy H1 nào trên trang** | 🔴 Nghiêm trọng cho SEO/Quality Score |
| Viewport (mobile-friendly) | Có khai báo đúng chuẩn | ✅ Đạt |
| Google Analytics / GTM / Facebook Pixel | **Không phát hiện** | 🔴 Nghiêm trọng — không đo lường được chuyển đổi từ Ads |
| Số điện thoại / Hotline | 4 số hotline dạng `tel:` link, dễ bấm gọi | ✅ Đạt |
| Số điện thoại rác | Phát hiện `tel:0123456789` (số giả/test) gắn trên icon Facebook | 🔴 Lỗi kỹ thuật, trông thiếu chuyên nghiệp |
| Kênh chat | Có tích hợp Zalo + Messenger | ✅ Đạt |
| Form liên hệ | Có (Contact Form 7 "Form liên hệ") | ✅ Đạt |
| Số lượng script (JS) | 44 thẻ `<script>`, 23 file JS ngoài, **19 file không có `async`/`defer`** | 🔴 Nghiêm trọng — nhiều khả năng chặn hiển thị trang (render-blocking) |
| Số lượng CSS | 16 file stylesheet | ⚠️ Cảnh báo — khá nhiều cho 1 trang |
| Hình ảnh | 49 ảnh, **16 ảnh không có lazy-loading** | ⚠️ Cảnh báo |
| Cache-Control header | `no-store, no-cache, must-revalidate` | 🔴 Trang **không được lưu cache trình duyệt**, mỗi lượt truy cập đều tải lại từ đầu → chậm hơn cho khách quay lại |
| Dung lượng HTML | ~296 KB (chỉ phần HTML, chưa gồm ảnh/CSS/JS) | ⚠️ Khá nặng |

## 2. Core Web Vitals

Không lấy được số liệu chính xác do PageSpeed API hết quota. Dựa trên số lượng script/CSS render-blocking và việc không cache, khả năng cao **LCP và tốc độ tải trên mobile sẽ ở mức cảnh báo hoặc kém**, cần đo lại bằng công cụ thay thế trước khi kết luận chắc chắn.

## 3. Khuyến nghị ưu tiên (viết dễ hiểu cho khách hàng)

1. **Gắn mã theo dõi chuyển đổi (Google Ads Conversion Tracking / GTM) ngay lập tức.** Hiện tại trang hoàn toàn không có Google Analytics, Google Tag Manager hay Facebook Pixel. Nếu chạy quảng cáo mà không gắn mã này, sẽ **không biết được khách bấm quảng cáo có gọi điện, điền form hay mua hàng hay không** — tức là chạy ads mà "mù" hoàn toàn về hiệu quả.
2. **Sửa lỗi chính tả trên tiêu đề trang** ("thiệt bị" → "thiết bị"). Lỗi này hiển thị trên tab trình duyệt và có thể xuất hiện trên kết quả tìm kiếm Google, ảnh hưởng đến độ tin cậy thương hiệu.
3. **Xóa số điện thoại giả `0123456789`** đang gắn trên icon Facebook — đây là số test còn sót lại, nếu khách bấm nhầm sẽ gọi vào số không tồn tại, gây mất uy tín.
4. **Thêm tiêu đề chính (H1) rõ ràng nêu bật dịch vụ/lợi ích** ngay đầu trang. Hiện trang không có H1 nào, ảnh hưởng đến điểm chất lượng (Quality Score) và khả năng Google hiểu nội dung trang.
5. **Giảm tải kỹ thuật để trang chạy nhanh hơn:** trang đang tải 44 đoạn mã JavaScript và 16 file giao diện (CSS), phần lớn không được tối ưu (không "trì hoãn tải"), cộng thêm việc trình duyệt không được phép lưu tạm (cache) trang. Kết quả là khách vào trang, đặc biệt bằng điện thoại/mạng yếu, sẽ cảm thấy **tải chậm**, dễ thoát trang trước khi thấy nội dung — gây lãng phí ngân sách quảng cáo.
6. *(Bổ sung)* Cân nhắc dùng **landing page riêng** tập trung vào 1 dịch vụ cụ thể (VD: sửa điều hòa, bảo trì tủ lạnh) thay vì dẫn quảng cáo về trang chủ shop bán đủ loại hàng — giúp thông điệp quảng cáo khớp với nội dung trang đích hơn, tăng tỷ lệ chuyển đổi.

## 4. Kết luận

**CHƯA ĐỦ điều kiện chạy Google Ads** ở trạng thái hiện tại.

Lý do chính: **thiếu hoàn toàn công cụ đo lường chuyển đổi** (mục 1) — đây là điều kiện tối thiểu bắt buộc trước khi chi tiền quảng cáo, vì nếu không có sẽ không thể tối ưu chiến dịch. Ngoài ra các lỗi về tốc độ tải (script/CSS không tối ưu, không cache) và lỗi nội dung (chính tả, số điện thoại giả, thiếu H1) cần được khắc phục để tối đa hiệu quả và điểm chất lượng quảng cáo.

**Việc cần làm trước khi chạy Ads:** xử lý mục 1–4 (bắt buộc), sau đó nên đo lại tốc độ tải bằng https://pagespeed.web.dev/ để xác nhận điểm Performance đạt trên 50 trước khi lên ngân sách lớn.
