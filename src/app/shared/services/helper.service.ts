import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { environment } from '../../../environments/environment';
import { shareReplay } from 'rxjs';
import { Member } from '../models/member.interface';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  readonly url = `${environment.apiUrl}`;
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
    return this.http
      .get(`${this.url}/members`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
  addMember(member: Member) {
    return this.http.post(`${this.url}/members`, member);
  }
  deleteMember(id) {
    return this.http.delete(`${this.url}/members/${id}`);
  }
}
