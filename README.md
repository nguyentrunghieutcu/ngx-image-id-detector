# 📷 ngx-image-id-detector

**ngx-image-id-detector** là một thư viện Angular dùng để phát hiện xem một hình ảnh có phải là ảnh CCCD (Căn cước công dân Việt Nam) hay không, bằng cách sử dụng OCR (`Tesseract.js`). Phân biệt được mặt trước, mặt sau, hoặc không nhận diện được.

## ✨ Tính năng

- ✅ Nhận diện mặt **trước** CCCD
- ✅ Nhận diện mặt **sau** CCCD
- ❌ Phân biệt ảnh không hợp lệ (mờ, lóa, cắt, không phải CCCD)
- 🔠 Hỗ trợ tiếng Việt bằng Tesseract.js (`lang: vie`)
- 🔁 Trả kết quả dạng Observable phù hợp với Angular

---

## 📦 Cài đặt

```bash
npm install ngx-image-id-detector tesseract.js
