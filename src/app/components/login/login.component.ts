import { Iuser } from './../dashboard/models/iuser';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  createForm: FormGroup;
  loading = false;
  value1 = 'zabenaferfotos2@gmail.com';
  value2 = 'zabenafer';

  constructor(private router: Router,
    private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
      this.createForm = this.fb.group({
        nombreUsuario: ['', Validators.required],
        nombre: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
     }

  ngOnInit(): void {
  }
  ingresar() {
    console.log(this.loginForm);
    // Datos grupo (pool)
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    // Datos del user
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    console.log(this.loginForm.value.email);
    var userData = {
      Username: email,
      Pool: userPool
    }
    // Credenciales
    var cognitoUser = new CognitoUser(userData);
    var authData = {
      Username: email,
      Password: password
    }
    var authDetails = new AuthenticationDetails(authData);
    // Inicio Sesion
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Token: '+ result.getAccessToken().getJwtToken());
        this.fakeLoading();
        // this.router.navigate(['/dashboard']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      }
    });

    // this.router.navigateByUrl('/dashboard');
  }

  crearUsuario() {
    console.log(this.createForm);
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    // set atributes
    var attrList = [];
    const email = this.createForm.value.email;
    const given_name = this.createForm.value.nombre;
    const nickname = this.createForm.value.nombreUsuario;
    const password = this.createForm.value.password;
    var iuser: Iuser = {
      email: email,
      given_name: given_name,
      nickname: nickname
    }

    for (let key in iuser) {
      var attrData = {
        Name: key,
        Value: iuser[key]
      }
      var attr = new CognitoUserAttribute(attrData);
      attrList.push(attr);
    }

    //crear usuario
    userPool.signUp(this.createForm.value.email, this.createForm.value.password, attrList, [], (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var newUser = result?.user;
      console.log(JSON.stringify(newUser));
      alert("Enviamos correo para actiar cuenta.");
      this.router.navigateByUrl('/login');

    })
    // this.router.navigateByUrl('/dashboard');
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/dashboard/dashboard-home']);
    }, 1500);
  }



}
