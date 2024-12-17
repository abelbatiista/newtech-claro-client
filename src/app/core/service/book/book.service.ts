import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_ENVIRONMENT} from '../../../app.config';
import {Observable} from 'rxjs';
import {Book} from '@core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUri: string = APP_ENVIRONMENT.service.book.baseUrl;
  private readonly apiUri: string = '';

  public constructor(
    private readonly http: HttpClient,
  ) {
    const controller: string = 'books';
    this.apiUri = `${this.baseUri}/api/v1/${controller}`;
  }

  public findById(id: number): Observable<Book> {
    const uri: string = `${this.apiUri}/${id}`;
    return this.http.get<Book>(uri, {});
  }

  public get(): Observable<Book[]> {
    const uri: string = this.apiUri;
    return this.http.get<Book[]>(uri, {});
  }

  public create(item: Book): Observable<Book> {
    const uri: string = this.apiUri;
    return this.http.post<Book>(uri, item, {});
  }

  public update(id: number, item: Book): Observable<Book> {
    const uri: string = `${this.apiUri}/${id}`;
    return this.http.put<Book>(uri, item, {});
  }

  public delete(id: number): Observable<void> {
    const uri: string = `${this.apiUri}/${id}`;
    return this.http.delete<void>(uri, {});
  }
}
