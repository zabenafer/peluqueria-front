import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../dashboard/service/auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiRestInterceptor implements HttpInterceptor {

  //Va a comprobar si hay algun token en el localStorage, si hay lo añade a la cabecera del request.

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let intReq = request;

    const token = this.authService.getToken();
    if (token != null) {
      intReq = request.clone({ headers: request.headers.set(environment.AUTHORIZATION, environment.BEARER + token) })
    }
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.toastr.error("Se termino el tiempo de la sesion", 'Sesion Expirada', { timeOut: 5000 });
        this.authService.logOut();
      }
      return throwError(err);
    }));
  }

}

export const interceptorSpringProvider = [{provide: HTTP_INTERCEPTORS, useClass: ApiRestInterceptor, multi: true}]
