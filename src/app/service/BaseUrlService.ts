// base-url.service.ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  private baseUrl = 'http://localhost:8120';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
