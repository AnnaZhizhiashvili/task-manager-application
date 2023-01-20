import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  uniqueID() {
    return Date.now();
  }
}
