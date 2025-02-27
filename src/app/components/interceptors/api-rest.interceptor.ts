import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { AuthService } from '../dashboard/service/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiRestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        if (token) {
          request = request.clone({
            headers: request.headers.set(environment.AUTHORIZATION, environment.BEARER + token)
          });
        }

        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && !this.isRefreshing) {
              this.isRefreshing = true;
              return this.authService.refreshToken().pipe(
                switchMap((newToken) => {
                  this.isRefreshing = false;
                  request = request.clone({
                    headers: request.headers.set(environment.AUTHORIZATION, environment.BEARER + newToken)
                  });
                  return next.handle(request);
                }),
                catchError(refreshErr => {
                  this.isRefreshing = false;
                  this.toastr.error("Se terminó el tiempo de la sesión", 'Sesión Expirada', { timeOut: 5000 });
                  this.authService.logOut();
                  return throwError(refreshErr);
                })
              );
            } else {
              return throwError(err);
            }
          })
        );
      })
    );
  }
}

export const interceptorSpringProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ApiRestInterceptor, multi: true }];
