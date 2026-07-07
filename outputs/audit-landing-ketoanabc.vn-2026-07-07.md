# Audit Landing Page: ketoanabc.vn
**Ngày audit:** 07/07/2026
**Khách hàng:** Công ty Kế toán ABC
**Dịch vụ:** Dịch vụ kế toán trọn gói cho doanh nghiệp nhỏ
**Từ khoá dự kiến:** "dịch vụ kế toán", "kế toán trọn gói"
**Ngân sách dự kiến:** 30.000.000đ/tháng

---

## KẾT LUẬN NHANH: LANDING PAGE CHƯA ĐỦ ĐIỀU KIỆN CHẠY GOOGLE ADS

**Lý do: Website ketoanabc.vn hiện tại KHÔNG CÓ NỘI DUNG.** Tên miền đã trỏ đúng, hosting đang chạy (LiteSpeed server), nhưng chưa có bất kỳ trang landing page nào được deploy lên. Đây không phải là vấn đề tối ưu — đây là vấn đề "chưa có gì để tối ưu".

---

## 1. Chi tiết kiểm tra kỹ thuật

Đã thử truy cập tất cả các biến thể URL để loại trừ khả năng sai sót:

| URL kiểm tra | Kết quả |
|---|---|
| https://ketoanabc.vn | HTTP 200 nhưng trả về trang "Index of /" (danh sách thư mục trống của server) |
| https://www.ketoanabc.vn | HTTP 200, cùng nội dung "Index of /" |
| http://ketoanabc.vn | HTTP 200, cùng nội dung "Index of /" |
| https://ketoanabc.vn/index.html | HTTP 404 Not Found |
| https://ketoanabc.vn/index.php | HTTP 404 Not Found |
| https://ketoanabc.vn/robots.txt | HTTP 404 Not Found |
| https://ketoanabc.vn/sitemap.xml | HTTP 404 Not Found |

**Toàn bộ nội dung HTML trả về khi truy cập trang chủ:**
```html
<h1>Index of /</h1>
... (danh sách thư mục trống)
Proudly Served by LiteSpeed Web Server at ketoanabc.vn Port 443
```

DNS phân giải bình thường (ketoanabc.vn về 103.255.237.243), tức là tên miền và hosting đã được cấu hình, nhưng chưa có file website nào (index.html/index.php/CMS...) được upload vào thư mục gốc.

### Giới hạn của lần audit này
- Không gọi được Google PageSpeed Insights API (lỗi 429, "Quota exceeded... Queries per day" — quota API miễn phí của tài khoản đã hết cho ngày hôm nay). Tuy nhiên không cần PSI để kết luận: vì không có trang nội dung nào tồn tại, mọi chỉ số tốc độ tải, Core Web Vitals đều vô nghĩa ở thời điểm này.
- Khi khách hàng đã upload website thật, cần chạy lại PSI (hoặc công cụ web https://pagespeed.web.dev) để đo Performance, LCP, CLS, TBT trước khi bật ngân sách.

---

## 2. Đánh giá theo từng tiêu chí yêu cầu

| Tiêu chí | Trạng thái | Ghi chú |
|---|---|---|
| Tốc độ tải trang (mobile/desktop) | Không đánh giá được | Chưa có nội dung để đo |
| Mobile-friendliness | Không đánh giá được | Chưa có nội dung để đo |
| Nội dung khớp từ khoá/thông điệp quảng cáo | Không đạt | Không có nội dung nào về "dịch vụ kế toán trọn gói" |
| CTA (gọi điện, form, chat) | Không đạt | Không tồn tại |
| Độ tin cậy (địa chỉ, giấy phép, đánh giá KH) | Không đạt | Không tồn tại |
| Đo lường chuyển đổi (GA4/GTM/Ads Conversion Tracking) | Không đạt | Không tồn tại, đây là điều kiện bắt buộc |
| Cấu trúc trang, điều hướng | Không đạt | Chỉ có trang danh sách thư mục mặc định |
| SEO onpage (H1, title, meta, chính tả) | Không đạt | Title hiện tại là "Index of /", H1 là "Index of /" |

---

## 3. Việc cần làm, theo mức độ ưu tiên

### Ưu tiên 1 - Bắt buộc trước khi cân nhắc chạy Ads
1. **Deploy website/landing page thật lên hosting.** Đây là việc gốc rễ, không có bước nào khác có ý nghĩa nếu chưa xong bước này. Cần làm rõ với khách hàng: website đang trong quá trình xây dựng hay đã có sẵn nhưng chưa upload đúng?
2. **Gắn công cụ đo lường:** Google Tag Manager + Google Analytics 4 + Google Ads Conversion Tracking (form liên hệ, click gọi điện, click Zalo/chat). Không có tracking nghĩa là không đo được hiệu quả tiêu tiền quảng cáo, không tối ưu được chiến dịch.
3. **Xây nội dung khớp với từ khoá quảng cáo:** trang chủ/landing page cần nêu rõ "dịch vụ kế toán trọn gói cho doanh nghiệp nhỏ" ngay ở đầu trang (H1, tiêu đề), kèm bảng giá/gói dịch vụ, quy trình làm việc.

### Ưu tiên 2 - Cần có trước khi launch chiến dịch
4. **CTA rõ ràng:** nút "Gọi ngay [hotline]" nổi bật (click-to-call trên mobile), form đăng ký tư vấn ngắn gọn (tên, SĐT, nhu cầu), nút chat Zalo/Messenger.
5. **Yếu tố tin cậy:** địa chỉ văn phòng cụ thể, mã số thuế/giấy phép hành nghề kế toán, chứng chỉ hành nghề của người phụ trách, logo khách hàng đã hợp tác, đánh giá/testimonial thực tế.
6. **Tốc độ tải & mobile-friendly:** sau khi có website, chạy lại PageSpeed Insights (mobile là ưu tiên vì phần lớn traffic tìm kiếm dịch vụ kế toán trên điện thoại), đảm bảo Performance mobile từ 50 trở lên, LCP dưới 4 giây.

### Ưu tiên 3 - Tối ưu thêm sau khi chạy ổn định
7. Thẻ SEO onpage: title, meta description chứa từ khoá chính; kiểm tra chính tả nội dung.
8. Tạo sitemap.xml, robots.txt (hiện đang 404, không ảnh hưởng trực tiếp Ads nhưng nên có cho SEO tổng thể).
9. Cấu trúc điều hướng rõ ràng: Trang chủ / Dịch vụ / Bảng giá / Về chúng tôi / Liên hệ.

---

## 4. Khuyến nghị hành động

- Không nên bật ngân sách 30 triệu/tháng ở thời điểm hiện tại. Mọi click quảng cáo trả tiền sẽ dẫn khách hàng tới một trang trống, gây lãng phí ngân sách gần như 100% và ảnh hưởng xấu tới Quality Score (Landing Page Experience sẽ bị Google đánh giá ở mức thấp).
- Liên hệ ngay với khách hàng/bộ phận kỹ thuật để xác nhận: website đã có sẵn code nhưng deploy sai, hay đang trong giai đoạn thiết kế và chưa hoàn thiện.
- Sau khi khách hàng deploy website, cần audit lại toàn bộ (bao gồm chạy PageSpeed Insights thật) trước khi lên kế hoạch chạy Ads.
