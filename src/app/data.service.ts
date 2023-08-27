import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/';

  fetchData(param: string) {
    return this.http.get(`${this.url}${param}`);
  }
}
