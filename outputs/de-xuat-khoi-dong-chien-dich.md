# Đề xuất khởi động chiến dịch Google Ads
**Khách hàng:** Công ty Kế toán ABC
**Dịch vụ:** Dịch vụ kế toán trọn gói cho doanh nghiệp nhỏ
**Website:** https://ketoanabc.vn
**Từ khoá gốc:** "dịch vụ kế toán", "kế toán trọn gói"
**Ngân sách dự kiến:** 30.000.000đ/tháng
**Ngày lập:** 07/07/2026

---

## ⚠️ CẢNH BÁO ƯU TIÊN CAO NHẤT — CHƯA THỂ LAUNCH CHIẾN DỊCH

**Website https://ketoanabc.vn hiện chưa có nội dung.** Tên miền và hosting đã hoạt động (server LiteSpeed phản hồi HTTP 200), nhưng trang chủ chỉ hiển thị danh sách thư mục trống mặc định ("Index of /") — chưa có bất kỳ file landing page nào được deploy.

**Khuyến nghị: KHÔNG bật ngân sách 30 triệu/tháng ở thời điểm hiện tại.** Mọi click quảng cáo sẽ dẫn đến trang trống, gây lãng phí gần như 100% ngân sách và ảnh hưởng xấu đến Quality Score (Landing Page Experience bị Google đánh giá thấp), kéo CPC tăng cho cả các chiến dịch sau này.

**Việc cần làm ngay trước khi tiếp tục:**
1. Liên hệ khách hàng xác nhận: website đang xây dựng dở hay bị deploy sai vị trí?
2. Sau khi có website thật, audit lại toàn bộ landing page (bao gồm đo tốc độ tải thực tế bằng PageSpeed Insights).
3. Bộ từ khoá và content RSA dưới đây đã sẵn sàng để dùng ngay khi landing page hoàn thiện — không cần làm lại.

---

## 1. Audit Landing Page

**Kết luận:** Chưa đủ điều kiện chạy Ads (xem chi tiết đầy đủ tại `outputs/audit-landing-ketoanabc.vn-2026-07-07.md`).

| Tiêu chí | Trạng thái |
|---|---|
| Nội dung khớp từ khoá/thông điệp quảng cáo | Không đạt — không có nội dung |
| CTA (gọi điện, form, chat) | Không đạt — không tồn tại |
| Độ tin cậy (địa chỉ, giấy phép, đánh giá KH) | Không đạt — không tồn tại |
| Đo lường chuyển đổi (GA4/GTM/Ads Conversion Tracking) | Không đạt — bắt buộc phải có trước khi chạy |
| Tốc độ tải trang | Không đánh giá được (chưa có nội dung để đo) |
| SEO onpage (H1, title, chính tả) | Không đạt — title/H1 hiện là "Index of /" |

**Việc cần làm theo thứ tự ưu tiên:**
1. **(Bắt buộc)** Deploy website/landing page thật lên hosting
2. **(Bắt buộc)** Gắn Google Tag Manager + GA4 + Google Ads Conversion Tracking (form, click gọi điện, click Zalo)
3. **(Bắt buộc)** Nội dung nêu rõ "dịch vụ kế toán trọn gói cho doanh nghiệp nhỏ" ngay đầu trang, kèm bảng giá/gói dịch vụ
4. CTA nổi bật: nút gọi ngay (click-to-call mobile), form tư vấn ngắn, chat Zalo/Messenger
5. Yếu tố tin cậy: địa chỉ cụ thể, giấy phép/chứng chỉ hành nghề, testimonial khách hàng thật
6. Sau khi có website: đo lại tốc độ tải bằng PageSpeed Insights, đảm bảo Performance mobile ≥ 50, LCP < 4 giây

---

## 2. Bộ từ khoá đã phân nhóm

File đầy đủ: `outputs/tu-khoa-ketoanabc-2026-07-07.md` (~42 từ khoá, 5 nhóm + 23 từ khoá phủ định)

| Nhóm | Số lượng | Ý định | Ưu tiên ngân sách |
|---|---|---|---|
| A — DN nhỏ/startup/hộ KD, mua/thuê ngay | 17 | Đúng target nhất, CPC thấp | **60% (~18tr)** |
| B — Mua/thuê ngay, từ khoá chung ngành | 10 | Volume cao, cạnh tranh cao hơn | 25% (~7.5tr) |
| C — So sánh/giá | 11 | Nhạy cảm giá | 15% (~4.5tr) |
| D — Tìm hiểu thông tin | 5 | CTR cao, chuyển đổi thấp | 0% — tạm hoãn |
| E — Địa phương | 4 | Tích hợp vào Location Targeting của A/B | không tách campaign riêng |

**Cấu trúc campaign đề xuất (2 campaign, tránh dàn trải ngân sách):**
1. **Campaign 1 — "DN nhỏ & Startup"** (Nhóm A, 60% ngân sách): match Phrase + Exact cho cụm hiệu suất cao
2. **Campaign 2 — "Mua ngay & So sánh giá"** (Nhóm B+C, 40% ngân sách, tách ad group riêng để theo dõi CPA)

**Từ khoá phủ định (23 từ khoá)** — nhóm chính: tuyển dụng/việc làm kế toán, học kế toán/khoá học, phần mềm kế toán miễn phí, khách hàng cá nhân (quyết toán TNCN), doanh nghiệp lớn/tập đoàn/FDI/niêm yết (ngoài target).

Review Search Terms Report sau 2-4 tuần để bổ sung negative keyword và điều chỉnh tỷ lệ ngân sách giữa các nhóm.

---

## 3. Bộ content RSA

File đầy đủ: `outputs/rsa-ketoanabc-2026-07-07.md` (15 headlines, 4 descriptions)

**Headlines nổi bật:**
- "Dịch Vụ Kế Toán Trọn Gói" / "Kế Toán Trọn Gói Cho SME" (từ khoá chính)
- "Tiết Kiệm Hơn Thuê Nội Bộ" / "Không Cần Tuyển Kế Toán Riêng" (tiết kiệm chi phí)
- "Trọn Gói Thuế - Sổ Sách - BCTC" (đầy đủ dịch vụ)
- "Cam Kết Bảo Mật Dữ Liệu" / "Cam Kết Đúng Hạn Báo Cáo" (cam kết)
- "Đăng Ký Tư Vấn Ngay Hôm Nay" (CTA)

**Descriptions:** nhấn thông điệp đồng hành cùng DN nhỏ/startup/hộ kinh doanh, tiết kiệm chi phí so với tuyển nội bộ, đăng ký tư vấn miễn phí.

⚠️ **Cần khách hàng xác nhận trước khi chạy:** headline "10 Năm KN" và "Từ 500K" dùng số liệu minh hoạ (placeholder) — phải thay bằng số liệu thật (số năm kinh nghiệm thực tế, mức giá khởi điểm thực tế) để tránh vi phạm chính sách quảng cáo và đảm bảo tính xác thực.

---

## Tổng kết & bước tiếp theo

| Hạng mục | Trạng thái |
|---|---|
| Landing page | ❌ Chưa sẵn sàng — website trống, cần deploy + gắn tracking trước |
| Từ khoá + phân bổ ngân sách | ✅ Sẵn sàng dùng ngay |
| Content RSA | ✅ Sẵn sàng, chờ xác nhận số liệu thật (kinh nghiệm, giá) |

**Bước tiếp theo:** làm việc với khách hàng để deploy website và gắn tracking. Ngay khi landing page sẵn sàng, có thể launch chiến dịch trong vòng 1 ngày vì từ khoá và content quảng cáo đã hoàn thiện.
