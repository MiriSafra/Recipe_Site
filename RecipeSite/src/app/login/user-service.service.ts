import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { user } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http: HttpClient) { }
  public getUserDetails(): Observable<user[]> {
    return this.http.get<user[]>('/api/User')
  }

  // public getUserById(id: number): Observable<user> {
  //   return this.http.get<user>(`https://localhost:7142/api/User/${id}`)
  // }
  public AddUser(s:user): Observable<user> {
    // debugger;
     return this.http.post<user>(`/api/User`,s);
   
   }
}