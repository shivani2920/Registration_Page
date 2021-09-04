import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) { }


  getBoardList() :Observable<any>{

    return this.http.get('https://www.qlsacademy.com/api/board');
  }

  getMediumList(id: number) :Observable<any> {

    return this.http.get('https://www.qlsacademy.com/api/medium?board_id='+ id);

  }

  getStandardList(id: number) :Observable<any> {

    return this.http.get('https://www.qlsacademy.com/api/standard?medium_id=' + id );

  }

  submitDetails(req: any) :Observable<any> {
    
    return this.http.post('https://www.qlsacademy.com/api/students/', req);
  }
}
