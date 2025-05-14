import { __awaiter } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, Component, NgModule } from '@angular/core';
import { createWorker, PSM } from 'tesseract.js';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

class DetectIdService {
    constructor() {
        this.SIDE_PATTERNS = new Map([
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
    }
    detectIdCard(file, options) {
        return from(this.processImage(file, options)).pipe(map(result => result), catchError(error => {
            console.error('OCR Processing Error:', error);
            throw new Error('Không thể xử lý hình ảnh CCCD. Vui lòng thử lại.');
        }));
    }
    processImage(file, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { language = 'vie', whitelist = 'AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXYZaăâbcdđeêghiklmnoôơpqrstuưvxyz' +
                'ÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰ' +
                'àáảãạâấầẩẫậăắằẳẵặđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữự' +
                'ÝỲỶỸỴýỳỷỹỵ', logger } = options || {};
            let worker = null;
            try {
                worker = yield createWorker(language, 1, { logger });
                yield worker.setParameters({
                    tessedit_char_whitelist: whitelist,
                    tessedit_pageseg_mode: PSM.AUTO_OSD,
                });
                const { data: { text } } = yield worker.recognize(file, { rotateAuto: true });
                const normalizedText = this.normalizeText(text);
                for (const [side, patterns] of this.SIDE_PATTERNS.entries()) {
                    if (patterns.some(p => normalizedText.includes(this.normalizeText(p)))) {
                        return { side, text: normalizedText };
                    }
                }
                return { side: 'unknown', text: normalizedText };
            }
            catch (error) {
                throw new Error('Không thể xử lý hình ảnh. Vui lòng kiểm tra lại ảnh CCCD.');
            }
            finally {
                if (worker) {
                    yield worker.terminate();
                }
            }
        });
    }
    normalizeText(text) {
        return text
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim();
    }
}
DetectIdService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: DetectIdService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DetectIdService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: DetectIdService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: DetectIdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class NgxImageIdDetectorComponent {
    constructor() { }
    ngOnInit() {
    }
}
NgxImageIdDetectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: NgxImageIdDetectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxImageIdDetectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: NgxImageIdDetectorComponent, selector: "lib-ngx-image-id-detector", ngImport: i0, template: `
    <p>
      ngx-image-id-detector works!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: NgxImageIdDetectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-ngx-image-id-detector',
                    template: `
    <p>
      ngx-image-id-detector works!
    </p>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return []; } });

class NgxImageIdDetectorModule {
}
NgxImageIdDetectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: NgxImageIdDetectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxImageIdDetectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: NgxImageIdDetectorModule, declarations: [NgxImageIdDetectorComponent], exports: [NgxImageIdDetectorComponent] });
NgxImageIdDetectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: NgxImageIdDetectorModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: NgxImageIdDetectorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxImageIdDetectorComponent
                    ],
                    imports: [],
                    exports: [
                        NgxImageIdDetectorComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-image-id-detector
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DetectIdService, NgxImageIdDetectorComponent, NgxImageIdDetectorModule };
//# sourceMappingURL=ngx-image-id-detector.mjs.map
