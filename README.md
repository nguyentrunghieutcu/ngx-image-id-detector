# 📷 ngx-image-id-detector

**ngx-image-id-detector** is an Angular library for detecting whether an image is a Vietnamese Citizen ID card (CCCD) using OCR (`Tesseract.js`). It can distinguish between the front side, back side, or unrecognized images.

## ✨ Features

- ✅ Detects the **front** side of CCCD
- ✅ Detects the **back** side of CCCD
- ❌ Distinguishes invalid images (blurred, glare, cropped, not CCCD)
- 🔠 Supports Vietnamese language with Tesseract.js (`lang: vie`)
- 🔁 Returns results as Observable, suitable for Angular

---

## 📦 Installation

```bash
npm install ngx-image-id-detector tesseract.js
```

---

## 📋 Version Compatibility

| ngx-image-id-detector | Angular version | Tesseract.js version |
|----------------------|-----------------|----------------------|
| 1.x                  | 16+             | 4.x                  |
| 0.x                  | 13–15           | 2.x                  |

--- 