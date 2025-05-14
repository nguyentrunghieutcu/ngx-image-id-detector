import { Injectable } from '@angular/core';
import { createWorker, PSM, Worker } from 'tesseract.js';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export type IdCardSide = 'front' | 'back' | 'unknown';

export interface DetectIdResult {
  side: IdCardSide;
  text: string;
}

export interface DetectIdOptions {
  language?: string;
  whitelist?: string;
  logger?: (msg: any) => void;
}

@Injectable({
  providedIn: 'root'
})
export class DetectIdService {
  private readonly SIDE_PATTERNS = new Map<IdCardSide, string[]>([
    ['front', [
      'CANCUCCONGDAN',
      'CONGHAXHICHNGHAVITNAM',
      'CNGHAXHICHNGHAVIETNAM',
      'CONGHOAXAHOICHUNGHIAVIETNAM',
      'DOCLAPTUDOHANHPHUC',
      'HOVATENEULLNAME'
    ]],
    ['back', [
      'DACDIEMNHANDANGPERSONALIDENTIFICATION',
      'CUCTRUONGCUCCANHSAT',
      'DANGPERSONALIDENTILICATION',
      'CUCCANHSAT',
      'NGONTROTRAI',
      'NGONTROPHAI',
      'CCTRUNGCCCNH',
      'QUNLHNHCHNHVETRATTUXAHDHU',
      'THEPOLICEDEPARTMENT',
      'NHANDANGPERSONALIDENTILICATI'
    ]]
  ]);

  detectIdCard(file: File, options?: DetectIdOptions): Observable<DetectIdResult> {
    return from(this.processImage(file, options)).pipe(
      map(result => result),
      catchError(error => {
        console.error('OCR Processing Error:', error);
        throw new Error('Không thể xử lý hình ảnh CCCD. Vui lòng thử lại.');
      })
    );
  }

  private async processImage(file: File, options?: DetectIdOptions): Promise<DetectIdResult> {
    const {
      language = 'vie',
      whitelist = 'AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXYZaăâbcdđeêghiklmnoôơpqrstuưvxyz' +
                  'ÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰ' +
                  'àáảãạâấầẩẫậăắằẳẵặđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữự' +
                  'ÝỲỶỸỴýỳỷỹỵ',
      logger
    } = options || {};

    let worker: Worker | null = null;
    try {
      worker = await createWorker(language, 1, { logger });

      await worker.setParameters({
        tessedit_char_whitelist: whitelist,
        tessedit_pageseg_mode: PSM.AUTO_OSD,
      });

      const { data: { text } } = await worker.recognize(file, { rotateAuto: true });
      const normalizedText = this.normalizeText(text);

      for (const [side, patterns] of this.SIDE_PATTERNS.entries()) {
        if (patterns.some(p => normalizedText.includes(this.normalizeText(p)))) {
          return { side, text: normalizedText };
        }
      }

      return { side: 'unknown', text: normalizedText };
    } catch (error) {
      throw new Error('Không thể xử lý hình ảnh. Vui lòng kiểm tra lại ảnh CCCD.');
    } finally {
      if (worker) {
        await worker.terminate();
      }
    }
  }

  private normalizeText(text: string): string {
    return text
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
  }
}
