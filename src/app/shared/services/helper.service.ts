import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { UserInterface } from '../models/task-item.interface';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  readonly url = `${environment.apiUrl}`;
  members = new BehaviorSubject<UserInterface[]>([]);
  constructor(private http: HttpClient) {}

  uniqueID() {
    return Date.now();
  }
  getBackgroundColor() {
    return this.http.get(`${this.url}/backgroundColor`);
  }

  setBackgroundColor(color) {
    return this.http.post(`${this.url}/backgroundColor`, { color });
  }
  getMembers() {
    return this.http.get<UserInterface[]>(`${this.url}/members`).pipe(
      tap(members => this.members.next(members)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
  addMember(member: UserInterface) {
    return this.http.post(`${this.url}/members`, member);
  }
  deleteMember(id) {
    return this.http.delete(`${this.url}/members/${id}`);
  }

  getDarkColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }
}
