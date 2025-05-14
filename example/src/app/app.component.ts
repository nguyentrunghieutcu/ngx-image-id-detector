import { Component } from '@angular/core';
import { DetectIdResult, DetectIdService } from 'projects/ngx-image-id-detector/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loading = false;
  error: string | null = null;

  frontResult?: DetectIdResult;
  backResult?: DetectIdResult;
  frontImage: string | ArrayBuffer | null = null;
  backImage: string | ArrayBuffer | null = null;

  constructor(private detectService: DetectIdService) { }

  onFrontFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.frontImage = reader.result;
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.processFile(file, 'front');
      };
    }
  }

  onBackFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.backImage = reader.result;
      reader.readAsDataURL(file);
      // Sau khi đọc xong ảnh, tiếp tục xử lý OCR
      reader.onloadend = () => {
        this.processFile(file, 'back');
      };
    }
  }
  private extractFile(event: Event): File | null {
    const input = event.target as HTMLInputElement;
    return input?.files?.[0] || null;
  }

  private processFile(file: File, side: 'front' | 'back') {
    this.loading = true;
    this.error = null;

    this.detectService.detectIdCard(file).subscribe({
      next: (result) => {
        if (side === 'front') this.frontResult = result;
        if (side === 'back') this.backResult = result;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  takePhoto(side: 'front' | 'back') {
    alert(`📷 Tính năng chụp ảnh qua webcam cho mặt: ${side} chưa được tích hợp.`);
  }

  submit() {
    alert('🚀 Gửi thông tin CCCD thành công!');
  }
}
