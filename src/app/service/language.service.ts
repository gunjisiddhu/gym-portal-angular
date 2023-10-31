import {Injectable} from '@angular/core';
import {BaseUrlService} from "./BaseUrlService";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {


  private selectedLanguage: string = 'en';

  private baseUrl;

  constructor(private baseUrlService: BaseUrlService, private httpclient: HttpClient, private snackBar: MatSnackBar) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }

}
