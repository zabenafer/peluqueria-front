import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isAuth(): boolean {
    var isAuth = false;
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var currentUser = userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.getSession((err:any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      });
    }
    return isAuth;
  }

  getToken() {
    for (let i = 0; i < localStorage.length; i++ ) {
      if(localStorage.key(i)?.endsWith(environment.ACCESS_TOKEN) && localStorage.key(i)?.includes(environment.ClientId)) {
        console.log(localStorage.getItem(localStorage.key(i)!));
        return localStorage.getItem(localStorage.key(i)!);
      }
    }
    return null;
  }

  public logOut(): void {
    window.localStorage.clear();
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser?.signOut();
    this.router.navigate(['']);
  }
}
