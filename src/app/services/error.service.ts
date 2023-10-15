import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSubject = new Subject<any>();

  getErrorSubject() {
    return this.errorSubject.asObservable();
  }

  handleError(error: any) {
    this.errorSubject.next(error);
  }
}
