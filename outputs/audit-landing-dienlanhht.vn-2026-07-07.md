# Audit Landing Page cho Google Ads

**URL:** https://dienlanhht.vn/
**Ngày kiểm tra:** 2026-07-07
**Đối chiếu:** Đã audit trước đó ngày 2026-07-03 (xem `audit-landing-dienlanhht.vn-2026-07-03.md`) — báo cáo này cập nhật lại, kiểm tra xem các lỗi cũ đã sửa chưa và bổ sung thêm phân tích về nội dung/độ tin cậy/CTA.

> **Lưu ý về giới hạn báo cáo:** Google PageSpeed Insights API tiếp tục báo lỗi **429 — hết quota ngày** (`Quota exceeded... Queries per day`), giống hệt lần kiểm tra trước. Đây là giới hạn của tài khoản API đang dùng, không phải lỗi của trang web. Vì vậy báo cáo này **không có điểm Performance/LCP/CLS/TBT chính thức từ Google**, chỉ dựa trên phân tích mã nguồn HTML thực tế + nội dung hiển thị. Khuyến nghị đo thủ công tại https://pagespeed.web.dev/ để lấy điểm số chính xác trước khi lên ngân sách lớn.

## 1. Tình trạng so với lần kiểm tra trước (03/07 → 07/07)

**Chưa có gì được khắc phục.** Toàn bộ lỗi nghiêm trọng phát hiện lần trước vẫn còn nguyên sau 4 ngày:

| Lỗi | Trạng thái |
|---|---|
| Không có Google Analytics/GTM/Facebook Pixel | Vẫn chưa gắn |
| Lỗi chính tả "thiệt bị" → "thiết bị" trong tiêu đề trang (title + og:title) | Vẫn còn |
| Không có thẻ H1 nào trên trang | Vẫn chưa có |
| Số điện thoại giả `tel:0123456789` gắn trên icon Facebook | Vẫn còn |
| Cache-Control: no-store, no-cache | Vẫn chưa cache |
| 19/23 file JavaScript không có async/defer (render-blocking) | Vẫn chưa tối ưu |
| 16/49 ảnh chưa lazy-load | Vẫn chưa tối ưu |

## 2. Tổng quan kỹ thuật (cập nhật)

| Hạng mục | Kết quả | Đánh giá |
|---|---|---|
| HTTPS | Có, cookie secure | Đạt |
| Nền tảng | WordPress (theme Flatsome) + WooCommerce, dùng cơ chế "add to cart" để đặt dịch vụ | Không phải shop bán sản phẩm vật lý — đây là trang dịch vụ chuyên biệt dùng nền WooCommerce để quản lý đặt lịch, phù hợp hơn đánh giá lần trước |
| Thẻ Title / og:title | "Trung tâm chăm sóc thiệt bị gia đình - Điện Lạnh HT" | Cảnh báo — lỗi chính tả xuất hiện cả trên tab trình duyệt lẫn khi chia sẻ mạng xã hội |
| Meta description | 254 ký tự, bị cắt cụt giữa câu, không có CTA | Cảnh báo |
| Thẻ H1 | Không có | Nghiêm trọng cho SEO/Quality Score |
| Schema.org (dữ liệu có cấu trúc) | Có khai báo nhưng không thấy loại LocalBusiness (chưa khai báo địa chỉ/giờ mở cửa dạng schema) | Cảnh báo — bỏ lỡ cơ hội hiển thị rich snippet |
| Viewport (mobile-friendly) | Khai báo đúng chuẩn | Đạt |
| Đo lường chuyển đổi (GA/GTM/FB Pixel/Google Ads tag) | Không phát hiện | Nghiêm trọng |
| Cache-Control | no-store, no-cache, must-revalidate | Nghiêm trọng — không tận dụng cache trình duyệt |
| Script/CSS chặn hiển thị | 44 thẻ script, 19 file không async/defer; 16 file CSS | Nghiêm trọng |
| Ảnh chưa lazy-load | 16/49 ảnh | Cảnh báo |
| Dung lượng HTML | ~296 KB (chưa gồm ảnh/CSS/JS) | Khá nặng |

## 3. Nội dung có khớp với thông điệp/từ khoá quảng cáo không

Phù hợp tốt về mặt nội dung dịch vụ:
- Menu chính rõ ràng: Giới thiệu, Dịch vụ (Bảo dưỡng, Làm sạch khử khuẩn, Sửa chữa, Lắp đặt), Tin tức, Tuyển dụng, Liên hệ.
- Trang liệt kê cụ thể các dịch vụ khớp nhóm từ khoá dự kiến: sửa điều hòa, sửa tủ lạnh, lắp đặt máy giặt, bình nóng lạnh — khớp tốt với intent tìm kiếm "sửa điều hòa", "sửa tủ lạnh tại nhà".
- Tuy nhiên nếu chạy quảng cáo Search theo từng nhóm từ khoá cụ thể (VD "sửa điều hòa quận Cầu Giấy"), nên trỏ về trang dịch vụ con tương ứng thay vì trang chủ, để thông điệp quảng cáo khớp sát nội dung trang đích hơn (tăng Quality Score phần Ad Relevance/Landing Page Experience).

## 4. Call-to-action (CTA)

Có nhiều CTA, mức độ nổi bật khá tốt:
- Hotline in đậm ở header: 0393 900 599 / 0981 123 149 (dạng tel: bấm gọi được).
- Nút "Đặt dịch vụ" dưới mỗi dịch vụ.
- Form đăng ký tư vấn ở cuối trang (dropdown chọn loại dịch vụ).
- Sidebar nổi: Phone, Zalo, Facebook Messenger; có cả Zalo Mini App (QR code).

Điểm cần cải thiện:
- Số điện thoại giả 0123456789 trên icon Facebook làm giảm uy tín, cần xoá ngay.
- CTA chính (nút đặt dịch vụ/gọi ngay) nên dùng màu tương phản nổi bật hơn so với tổng thể giao diện để tăng tỷ lệ click.

## 5. Độ tin cậy (trust signals)

Tốt hơn đánh giá sơ bộ lần trước — trang có đủ các yếu tố tin cậy cơ bản:
- Địa chỉ cụ thể: "66 Dịch Vọng Hậu, Cầu Giấy, Hà Nội", phạm vi phục vụ "Toàn Hà Nội".
- 5 testimonial khách hàng (bao gồm một số nhân vật có tên tuổi công khai).
- Có trang Chính sách bảo hành (/chinh-sach-bao-hanh/) và Chính sách bảo mật (/chinh-sach-bao-mat/).
- Cam kết dịch vụ: "thi công đúng kỹ thuật – sạch sẽ – không phát sinh chi phí".

Thiếu/cần bổ sung:
- Không thấy Mã số thuế / giấy phép kinh doanh hiển thị công khai — nên bổ sung ở footer để tăng độ tin cậy, nhất là với khách hàng doanh nghiệp.
- Chưa khai báo schema.org LocalBusiness (địa chỉ, giờ mở cửa, số điện thoại dạng structured data) — hỗ trợ tốt cho SEO local và có thể hiển thị đẹp hơn trên kết quả tìm kiếm.

## 6. Core Web Vitals

Không lấy được số liệu chính xác do PageSpeed API hết quota (2 lần liên tiếp 03/07 và 07/07). Dựa trên 19 script chặn hiển thị + không cache trình duyệt + 16 ảnh chưa lazy-load, rủi ro cao là LCP và điểm Performance mobile ở mức cảnh báo hoặc kém. Cần đo thủ công tại pagespeed.web.dev trước khi lên ngân sách lớn.

## 7. Khuyến nghị ưu tiên (dễ hiểu cho khách hàng)

1. Gắn mã theo dõi chuyển đổi (Google Ads Conversion Tracking / GTM) ngay lập tức — vẫn là việc khẩn cấp nhất, đã 4 ngày chưa xử lý. Không có mã này thì chạy quảng cáo sẽ không biết khách bấm vào có gọi điện/điền form hay không, không thể tối ưu ngân sách.
2. Xoá số điện thoại giả 0123456789 trên icon Facebook — lỗi nhỏ nhưng ảnh hưởng trực tiếp đến uy tín khi khách bấm nhầm.
3. Sửa lỗi chính tả "thiệt bị" → "thiết bị" trên tiêu đề trang (xuất hiện cả trên tab trình duyệt và khi chia sẻ lên mạng xã hội).
4. Thêm tiêu đề chính (H1) nêu rõ dịch vụ/lợi ích cốt lõi ngay đầu trang — hiện không có H1 nào, ảnh hưởng Quality Score.
5. Tối ưu tốc độ tải: cho phép trình duyệt lưu cache, trì hoãn tải các file JavaScript/CSS không cần thiết ngay từ đầu — để trang load nhanh hơn trên điện thoại, giảm tỷ lệ khách thoát trang giữa chừng khi vào từ quảng cáo.
6. (Nên làm thêm) Với các nhóm từ khoá cụ thể (sửa điều hòa, sửa tủ lạnh...), cân nhắc trỏ quảng cáo về đúng trang dịch vụ con tương ứng thay vì trang chủ, và bổ sung mã số thuế ở footer để tăng độ tin cậy.

## 8. Kết luận

CHƯA ĐỦ điều kiện chạy Google Ads ở trạng thái hiện tại — không đổi so với kết luận ngày 03/07 vì các lỗi bắt buộc chưa được xử lý.

Về mặt nội dung, CTA và độ tin cậy, trang thực tế khá ổn (địa chỉ rõ ràng, có testimonial, CTA đa kênh, nội dung khớp từ khoá dịch vụ điện lạnh) — đây là điểm tích cực so với đánh giá sơ bộ ban đầu. Rào cản chính để chạy Ads vẫn là thiếu công cụ đo lường chuyển đổi (bắt buộc phải có trước khi chi tiền quảng cáo) và các vấn đề tốc độ tải/kỹ thuật (script chặn hiển thị, không cache) có nguy cơ làm giảm Quality Score và tăng chi phí mỗi click.

Việc cần làm trước khi bật chiến dịch: xử lý mục 1–4 ở trên (ưu tiên mục 1), sau đó đo lại tốc độ tải bằng https://pagespeed.web.dev/ để xác nhận điểm Performance mobile đạt tối thiểu 50 điểm trước khi lên ngân sách lớn.
