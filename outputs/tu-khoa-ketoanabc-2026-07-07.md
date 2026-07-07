# Nghiên cứu từ khoá Google Ads Search — Công ty Kế toán ABC

- Khách hàng: Công ty Kế toán ABC
- Dịch vụ: Kế toán trọn gói cho **doanh nghiệp nhỏ** (KHÔNG nhắm cá nhân, KHÔNG nhắm doanh nghiệp lớn)
- Từ khoá gốc: "dịch vụ kế toán", "kế toán trọn gói"
- Ngân sách: 30.000.000 VNĐ/tháng (mức vừa phải)
- Ngày thực hiện: 2026-07-07
- Nguồn dữ liệu: Google Autocomplete API (suggestqueries.google.com, hl=vi) + kiến thức ngành dịch vụ kế toán/thuế

---

## 1. Danh sách từ khoá theo nhóm ý định

### Nhóm A — Mua/thuê ngay, ĐÚNG phân khúc DN nhỏ/startup/hộ kinh doanh (ƯU TIÊN CHẠY TRƯỚC)

| Từ khoá | Match type | Ghi chú |
|---|---|---|
| dịch vụ kế toán cho doanh nghiệp nhỏ | Phrase | Nguồn: API — trúng target chính xác nhất |
| dịch vụ kế toán cho doanh nghiệp siêu nhỏ | Phrase | Nguồn: API |
| kế toán trọn gói cho doanh nghiệp nhỏ | Phrase | Tự đề xuất, ghép core keyword + phân khúc |
| dịch vụ kế toán trọn gói cho công ty mới thành lập | Phrase | Nguồn: API |
| kế toán cho công ty mới thành lập | Phrase | Nguồn: API |
| dịch vụ kế toán cho công ty mới thành lập | Phrase | Nguồn: API |
| dịch vụ kế toán cho doanh nghiệp mới thành lập | Phrase | Nguồn: API |
| kế toán trọn gói cho startup | Exact | Nguồn: API (volume thấp nhưng target rất đúng, giữ Exact để tránh nổ ngân sách sang nghĩa khác) |
| dịch vụ kế toán cho startup | Phrase | Tự đề xuất |
| dịch vụ kế toán cho hộ kinh doanh | Phrase | Nguồn: API |
| dịch vụ kế toán cho hộ kinh doanh cá thể | Phrase | Nguồn: API |
| dịch vụ kế toán thuế cho hộ kinh doanh | Phrase | Nguồn: API |
| kế toán cho hộ kinh doanh | Phrase | Nguồn: API — lưu ý theo dõi, một phần traffic là kế toán viên tự tra cứu nghiệp vụ (xem mục negative) |
| thuê kế toán ngoài cho doanh nghiệp nhỏ | Phrase | Tự đề xuất |
| thuê kế toán ngoài | Phrase | Nguồn: API |
| dịch vụ kế toán thuê ngoài | Phrase | Nguồn: API — đồng nghĩa "outsourcing kế toán" |
| dịch vụ kế toán trọn gói giá rẻ cho doanh nghiệp nhỏ | Phrase | Tự đề xuất, long-tail ghép giá + phân khúc |

**Lý do ưu tiên nhóm A:** đây là nhóm bắt trúng đối tượng mục tiêu (DN nhỏ/startup/hộ kinh doanh), ít bị cạnh tranh bởi các công ty kế toán chuyên phục vụ DN lớn/tập đoàn, CPC dự kiến thấp hơn nhóm từ khoá chung, tỷ lệ chuyển đổi cao hơn vì đúng nhu cầu.

### Nhóm B — Mua/thuê ngay, từ khoá chung của ngành (không phân biệt rõ quy mô DN)

| Từ khoá | Match type | Ghi chú |
|---|---|---|
| dịch vụ kế toán | Phrase | Từ khoá gốc, volume cao nhất — cần theo dõi sát search terms |
| dịch vụ kế toán trọn gói | Phrase | Từ khoá gốc |
| kế toán trọn gói | Phrase | Từ khoá gốc |
| thuê dịch vụ kế toán trọn gói | Phrase | Nguồn: API |
| thuê kế toán trọn gói | Exact | Nguồn: API — intent mạnh, CPC thường cao, dùng Exact để kiểm soát chi phí |
| công ty dịch vụ kế toán uy tín | Phrase | Nguồn: API |
| công ty dịch vụ kế toán | Phrase | Nguồn: API — rủi ro dính "tuyển dụng công ty kế toán", cần negative kèm theo |
| dịch vụ kế toán thuế | Phrase | Nguồn: API |
| dịch vụ kế toán thuế trọn gói | Phrase | Nguồn: API |
| dịch vụ báo cáo thuế trọn gói | Phrase | Nguồn: API |

**Ghi chú:** nhóm này cần thiết để phủ thêm volume nhưng KHÔNG lọc rõ được quy mô doanh nghiệp trong câu truy vấn, có thể lẫn cả DN lớn/khách không phù hợp target — nên landing page/quảng cáo phải nêu rõ "chuyên phục vụ doanh nghiệp nhỏ" để tự lọc khách ngay từ trang đích.

### Nhóm C — So sánh/giá (Consideration)

| Từ khoá | Match type | Ghi chú |
|---|---|---|
| dịch vụ kế toán trọn gói giá rẻ | Phrase | Nguồn: API |
| kế toán trọn gói giá rẻ | Phrase | Nguồn: API |
| kế toán trọn gói giá bao nhiêu | Phrase | Nguồn: API |
| bảng giá dịch vụ kế toán trọn gói | Phrase | Nguồn: API |
| báo giá dịch vụ kế toán trọn gói | Phrase | Nguồn: API |
| báo giá dịch vụ kế toán | Phrase | Nguồn: API |
| giá dịch vụ kế toán trọn gói | Phrase | Nguồn: API |
| chi phí thuê kế toán ngoài | Phrase | Nguồn: API |
| phí dịch vụ kế toán cho hộ kinh doanh | Phrase | Nguồn: API |
| bảng giá dịch vụ kế toán cho hộ kinh doanh | Phrase | Nguồn: API |
| nên thuê hay tự làm kế toán | Broad (nhóm quảng cáo riêng, ngân sách thấp) | Tự đề xuất — top-of-funnel, cần landing page dạng so sánh lợi ích |

**Ghi chú:** nhóm nhạy cảm giá, dễ bị khách "click để so sánh nhiều nơi rồi không chốt" — nên landing page có bảng giá minh bạch, gói theo quy mô DN nhỏ để tăng tỷ lệ chuyển đổi.

### Nhóm D — Tìm hiểu thông tin (Informational — KHÔNG ưu tiên ngân sách Search bán hàng)

| Từ khoá | Match type | Ghi chú |
|---|---|---|
| dịch vụ kế toán trọn gói là gì | Phrase | Nguồn: API |
| kế toán trọn gói gồm những gì | Phrase | Tự đề xuất |
| thủ tục kế toán cho công ty mới thành lập | Không chạy trong campaign bán hàng | Nguồn: API — rủi ro cao trùng với kế toán viên/chủ DN tự tra cứu để tự làm, không phải người tìm thuê dịch vụ |
| nghiệp vụ kế toán cho công ty mới thành lập | Không chạy trong campaign bán hàng | Nguồn: API — tương tự, nguy cơ dính người học nghiệp vụ |
| kế toán cho hộ kinh doanh cần làm những gì | Phrase (ngân sách rất thấp, nếu chạy) | Nguồn: API |

**Lưu ý theo skill:** không nhồi nhóm tìm hiểu vào chiến dịch bán hàng chính vì CTR cao nhưng chuyển đổi thấp. Với ngân sách 30tr/tháng, khuyến nghị **không phân bổ ngân sách riêng** cho nhóm này ở giai đoạn đầu; ưu tiên dùng content SEO/remarketing sau này.

### Nhóm E — Theo địa phương (Local intent)

| Từ khoá | Match type | Ghi chú |
|---|---|---|
| dịch vụ kế toán trọn gói tphcm | Phrase | Nguồn: API |
| dịch vụ kế toán trọn gói hà nội | Phrase | Nguồn: API |
| kế toán trọn gói tại hà nội | Phrase | Nguồn: API |
| dịch vụ kế toán cho doanh nghiệp nhỏ tại tphcm | Phrase | Tự đề xuất, ghép SME + địa phương |

**Ghi chú:** với ngân sách 30tr/tháng, KHÔNG nên tách thành campaign địa phương riêng (sẽ dàn trải quá mỏng). Thay vào đó: (1) dùng cài đặt Location Targeting ở cấp campaign cho khu vực trọng điểm (TPHCM/Hà Nội), (2) chỉ thêm 1-2 keyword địa phương nổi bật vào nhóm A/B hiện có thay vì tạo cấu trúc phức tạp.

---

## 2. Danh sách từ khoá phủ định (Negative Keywords)

| Từ khoá phủ định | Match type | Lý do loại trừ |
|---|---|---|
| tuyển kế toán | Phrase | Người tìm ứng viên/tìm việc làm, không phải khách thuê dịch vụ |
| tuyển dụng kế toán | Phrase | Đồng nghĩa với trên |
| việc làm kế toán | Phrase | Người tìm việc làm |
| tìm việc kế toán | Phrase | Người tìm việc làm |
| học kế toán | Phrase | Người muốn học nghề, không phải thuê dịch vụ |
| khóa học kế toán | Phrase | Tương tự |
| học kế toán online | Phrase | Tương tự |
| học kế toán thực hành | Phrase | Tương tự |
| tự học kế toán | Phrase | Người muốn tự làm, không thuê ngoài |
| phần mềm kế toán | Phrase | Người tìm mua/thuê phần mềm, không phải dịch vụ trọn gói |
| phần mềm kế toán miễn phí | Phrase | Tương tự, nhấn mạnh "miễn phí" |
| miễn phí | Broad (áp toàn tài khoản) | Loại khách tìm dịch vụ free, không phải khách trả phí |
| mẫu | Broad (thận trọng, theo dõi search terms trước khi thêm rộng) | Dễ dính "mẫu báo cáo/mẫu hợp đồng" tải về miễn phí |
| ebook kế toán | Phrase | Tài liệu tự học |
| giáo trình kế toán | Phrase | Tài liệu học tập |
| kế toán trưởng lương | Phrase | Người tìm hiểu mức lương nghề, không phải thuê dịch vụ |
| lương kế toán | Phrase | Tương tự |
| quyết toán thuế thu nhập cá nhân | Phrase | Khách hàng cá nhân — ngoài target (chỉ phục vụ DN) |
| kê khai thuế tncn cá nhân | Phrase | Tương tự, loại khách cá nhân |
| kế toán tập đoàn | Phrase | Ngoài target (DN lớn) |
| kế toán doanh nghiệp lớn | Phrase | Ngoài target (DN lớn) |
| kế toán công ty niêm yết | Phrase | Ngoài target (DN lớn) |
| kế toán doanh nghiệp fdi | Phrase | Thường là DN quy mô lớn/vốn nước ngoài, ngoài target |
| sổ kế toán hộ kinh doanh nhóm 2 | Phrase | Nguồn: API — có dấu hiệu là kế toán viên tự tra cứu nghiệp vụ để tự làm sổ sách, không phải người tìm thuê dịch vụ |

**Lưu ý vận hành:** đây là danh sách khởi điểm dựa trên rủi ro thường gặp của ngành kế toán và đặc thù target "chỉ DN nhỏ, không cá nhân, không DN lớn". Cần bổ sung liên tục dựa trên báo cáo Search Terms thực tế sau 1-2 tuần chạy.

---

## 3. Đề xuất phân bổ ngân sách 30 triệu/tháng theo mức ưu tiên

Ước tính CPC bình quân ngành dịch vụ kế toán khoảng 8.000–25.000đ/click tuỳ từ khoá và khu vực → 30tr/tháng tương đương khoảng 1.500–3.000 click nếu phân bổ tập trung đúng nhóm. Với mức ngân sách vừa phải, KHÔNG nên dàn trải cùng lúc 5 nhóm — khuyến nghị chỉ chạy 2 campaign ở giai đoạn đầu:

| Ưu tiên | Nhóm | % ngân sách đề xuất | Số tiền ước tính | Lý do |
|---|---|---|---|---|
| 1 (cao nhất) | Nhóm A — DN nhỏ/startup/hộ kinh doanh, mua/thuê ngay | 60% | ~18.000.000đ | Đúng target, ít cạnh tranh hơn, CPC thấp hơn, tỷ lệ chuyển đổi cao hơn — chạy trước để tối ưu chi phí ngay từ đầu |
| 2 | Nhóm B — Mua/thuê ngay (từ khoá chung ngành) | 25% | ~7.500.000đ | Cần thiết để phủ volume, nhưng theo dõi sát vì cạnh tranh cao hơn (bao gồm cả DN lớn tìm dịch vụ) |
| 3 | Nhóm C — So sánh/giá | 15% | ~4.500.000đ | Nhạy cảm giá, chạy landing page có bảng giá rõ để tăng conversion, giữ ngân sách thấp vì dễ bị so sánh nhiều nơi |
| Tạm hoãn | Nhóm D — Tìm hiểu | 0% | 0đ | CTR cao nhưng chuyển đổi thấp, không phù hợp ngân sách hạn chế; để dành cho SEO/remarketing sau |
| Tích hợp, không tách riêng | Nhóm E — Địa phương | (đã tính trong A & B) | — | Dùng Location Targeting thay vì tách campaign riêng để tránh dàn trải ngân sách |

**Cấu trúc campaign đề xuất:**
1. **Campaign 1 — "DN nhỏ & Startup" (Nhóm A):** ngân sách chính 60%, match Phrase + Exact cho vài cụm hiệu suất cao ("kế toán trọn gói cho startup"). Location targeting: khu vực kinh doanh trọng điểm của khách hàng.
2. **Campaign 2 — "Mua ngay & So sánh giá" (Nhóm B + C gộp chung, tách ad group):** ngân sách 40% còn lại, theo dõi CPA riêng theo ad group để biết nhóm nào hiệu quả hơn, sẵn sàng dịch chuyển ngân sách về Nhóm A nếu Nhóm B/C không ra chuyển đổi tốt.
3. Áp dụng toàn bộ danh sách negative keywords ở cấp Campaign/Account ngay từ đầu.
4. Sau 2-4 tuần chạy, review Search Terms Report để: (a) bổ sung negative keyword mới, (b) xác nhận Nhóm A có CPA tốt hơn Nhóm B/C hay không để điều chỉnh tỷ lệ ngân sách.
