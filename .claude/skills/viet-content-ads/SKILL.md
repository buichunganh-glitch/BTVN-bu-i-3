---
name: viet-content-ads
description: "Viết mẫu quảng cáo Google Ads dạng RSA (Responsive Search Ads) theo brand tone của khách hàng. Dùng khi user cần viết content ads, headline, description cho chiến dịch Search, hoặc gõ /viet-content-ads kèm sản phẩm/dịch vụ và từ khoá chính."
argument-hint: "<sản phẩm/dịch vụ> <từ khoá chính>"
---

# Viết Content Google Ads (RSA)

## Trước khi viết, PHẢI đọc 2 file:
1. `references/quy-tac-ky-tu.md` — giới hạn ký tự và quy tắc bắt buộc
2. `references/brand-tone.md` — giọng điệu thương hiệu

## Quy trình
1. Hỏi user (nếu chưa có): sản phẩm/dịch vụ, từ khoá chính, USP, khuyến mãi (nếu có), landing page.
2. Đọc 2 file references ở trên.
3. Viết theo template trong `assets/template-rsa.md`:
   - 15 headlines, mỗi cái <= 30 ký tự (đếm cả dấu cách, tiếng Việt có dấu)
   - 4 descriptions, mỗi cái <= 90 ký tự
   - Ít nhất 5 headlines chứa từ khoá chính
   - Ít nhất 2 headlines có CTA
4. Tự kiểm: đếm lại ký tự TỪNG dòng. Dòng nào vượt là FAIL, phải viết lại.
5. Lưu kết quả vào `outputs/content-ads-<ten-khach>-<ngày>.md`

## Vết xe đổ (lỗi thường gặp)
- Đếm ký tự sai vì quên dấu cách → luôn dùng lệnh đếm bằng code, không đếm nhẩm
- Headline trùng ý nhau → 15 headlines phải phủ: từ khoá, USP, CTA, khuyến mãi, uy tín
- Viết hoa toàn bộ (VD: "GIẢM GIÁ SỐC") → vi phạm chính sách Google Ads
- Dùng ký tự đặc biệt !!! ??? → bị Google từ chối