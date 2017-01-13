import { Component, OnInit } from '@angular/core';

import { Headers, Http } from '@angular/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: String;
	password: String;

	constructor(private http: Http) { }

	ngOnInit() {
	}

	
	private handleLoginError(error: any): Promise<any> {
		if (error.status && error.status == 401) {
			alert("username or password incorrect");
		}
		console.error('A login error occurred', error);
		return Promise.reject(error.message || error);
	}
	
	private loginSuccess(response: any) {
		if (response["_body"] == "successfully authenticated") {
			window.location.href = "/";
		}
	}
	
	private signupSuccess(response: any) {
		if (response["_body"] == "successfully applied") {
			alert("Application received, please ask a current user to confirm your application.");
		}
		else {
			alert("Application did not go through, perhaps the username is taken?");
		}
	}
	
	private handleSignupError(error: any): Promise<any> {
		console.error('A signup error occurred', error);
		return Promise.reject(error.message || error);
	}
	
	login() {
		return this.http.post("http://localhost:4242/api/login", {"username":this.username, "password":this.password}, {withCredentials: true})
					.toPromise()
					.then(this.loginSuccess)
					.catch(this.handleLoginError);
	}
	
	signup() {
		return this.http.post("http://localhost:4242/api/signup", {"username":this.username, "password":this.password})
					.toPromise()
					.then(this.signupSuccess)
					.catch(this.handleSignupError);
	}
}
