import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare type IdCardSide = 'front' | 'back' | 'unknown';
export interface DetectIdResult {
    side: IdCardSide;
    text: string;
}
export interface DetectIdOptions {
    language?: string;
    whitelist?: string;
    logger?: (msg: any) => void;
}
export declare class DetectIdService {
    private readonly SIDE_PATTERNS;
    detectIdCard(file: File, options?: DetectIdOptions): Observable<DetectIdResult>;
    private processImage;
    private normalizeText;
    static ɵfac: i0.ɵɵFactoryDeclaration<DetectIdService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DetectIdService>;
}
