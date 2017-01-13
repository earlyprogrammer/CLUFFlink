import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Person } from './person';
import { Family } from './family';

import { environment } from '../../environments/environment';

@Injectable()
export class DatafaceService {

	constructor(private http: Http, private router: Router) { }

	private handleError(error: any, instance : DatafaceService): Promise<any> {
		if (error.status && error.status == 401) {
			instance.router.navigate(['/login']);
		}
		console.error('An HTTP retrieval error occurred', error);
		return Promise.reject(error.message || error);
	}
	
	getPeople(): Promise<Person[]> {
		return this.http.get(environment.api + "/persons", {withCredentials: true})
					.toPromise()
					.then(response => response.json() as Person[])
					.catch(error => {this.handleError(error, this)});
	}
	
	getPerson(id:String): Promise<Person> {
		return this.http.get(environment.api + "/person/" + id, {withCredentials: true})
					.toPromise()
					.then(response => response.json() as Person)
					.catch(error => {this.handleError(error, this)});
	}
	
	getFamilies(): Promise<Family[]> {
		return this.http.get(environment.api + "/families", {withCredentials: true})
					.toPromise()
					.then(response => response.json() as Family[])
					.catch(error => {this.handleError(error, this)});
	}
	
	getFamily(id:String): Promise<Family> {
		return this.http.get(environment.api + "/family/" + id, {withCredentials: true})
					.toPromise()
					.then(response => response.json() as Family)
					.catch(error => {this.handleError(error, this)});
	}
	
	getApplications(): Promise<String[]> {
		return this.http.get(environment.api + "/applications", {withCredentials: true})
					.toPromise()
					.then(response => response.json() as String[])
					.catch(error => {this.handleError(error, this)});
	}
}
