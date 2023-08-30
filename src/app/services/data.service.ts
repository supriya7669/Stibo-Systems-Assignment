import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:3000/';

  fetchData<T>(param: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}${param}`);
  }
}
