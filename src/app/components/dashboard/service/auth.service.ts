import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  CognitoRefreshToken
} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  private getCognitoUser(): CognitoUser | null {
    const userPool = new CognitoUserPool({
      UserPoolId: environment.UserPoolId,
      ClientId: environment.ClientId
    });
    return userPool.getCurrentUser();
  }

  /** ✅ Método asíncrono para verificar autenticación */
  isAuth(): Promise<boolean> {
    return new Promise((resolve) => {
      const user = this.getCognitoUser();
      if (!user) {
        resolve(false);
        return;
      }

      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  /** ✅ Obtener token actualizado de Cognito */
  getToken(): Promise<string | null> {
    return new Promise((resolve) => {
      const user = this.getCognitoUser();
      if (!user) {
        resolve(null);
        return;
      }

      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) {
          resolve(null);
        } else {
          resolve(session.getAccessToken().getJwtToken());
        }
      });
    });
  }

  /** ✅ Método para renovar token */
  refreshToken(): Observable<string> {
    return new Observable<string>((observer) => {
      const user = this.getCognitoUser();
      if (!user) {
        observer.error('No hay usuario autenticado');
        return;
      }

      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) {
          observer.error('Sesión inválida');
          return;
        }

        const refreshToken = session.getRefreshToken();
        user.refreshSession(refreshToken, (err: Error | null, refreshedSession: CognitoUserSession | null) => {
          if (err || !refreshedSession) {
            observer.error('Error al refrescar token');
            return;
          }

          const newToken = refreshedSession.getAccessToken().getJwtToken();
          observer.next(newToken);
          observer.complete();
        });
      });
    });
  }

  /** ✅ Cerrar sesión */
  logOut(): void {
    window.localStorage.clear();
    const user = this.getCognitoUser();
    user?.signOut();
    this.router.navigate(['']);
  }
}
