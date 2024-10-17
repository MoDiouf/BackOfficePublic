import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = getAuth().currentUser
    if (currentUser !== null) {
      req = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + currentUser.getIdToken()
        }
      });
    }

    return next.handle(req).pipe(
      tap(x => x, err => {
        if (err.status === 403) {
          this.router.navigate(['login']);
        }
        console.error(`Error performing request, status code =${err.status}`);
      })
    );
  }

}
