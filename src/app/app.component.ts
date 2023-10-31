import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static baseUrls: string = 'http://localhost:8120';
  title = 'learn-portal';
  private baseUrl = 'http://localhost:8120';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
