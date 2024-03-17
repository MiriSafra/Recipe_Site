import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from './category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor(private http: HttpClient) { }
  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/Category')
  }

  // public getUserById(id: number): Observable<user> {
  //   return this.http.get<user>(`https://localhost:7142/api/User/${id}`)
  // }
  public AddUser(s:Category): Observable<Category> {
    // debugger;
     return this.http.post<Category>(`/api/User`,s);
   
   }
}