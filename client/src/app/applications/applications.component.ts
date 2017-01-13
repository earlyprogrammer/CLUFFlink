import { Component, OnInit } from '@angular/core';

import { DatafaceService } from '../directory/dataface.service';

import { Person } from '../directory/person';

import { Headers, Http } from '@angular/http';

@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.css'],
	providers: [DatafaceService]
})
export class ApplicationsComponent implements OnInit {
	applications: String[];
	selectedApplication: String;
	selectedPerson: Person;
	people: Person[];

	constructor(private dataface: DatafaceService, private http: Http) { }

	ngOnInit() {
		this.dataface.getApplications().then(apps => this.applications = apps);
		this.dataface.getPeople().then(people => this.people = people);
	}

	private handleJudgementError(error: any): Promise<any> {
		console.error('A judgement error occurred', error);
		return Promise.reject(error.message || error);
	}
	
	private JudgementSuccess(response: any) {
		alert("Thanks for your submission");
	}
	
	
	selectApplication(application:String) {
		this.selectedApplication = application;
	}
	
	selectPerson(person:Person) {
		this.selectedPerson = person;
	}
	
	judge(result:String) {
		return this.http.post("http://localhost:4242/api/judge", {"username":this.selectedApplication, "id":this.selectedPerson.id, "result":result}, {withCredentials: true})
					.toPromise()
					.then(this.JudgementSuccess)
					.catch(this.handleJudgementError);
	}

}
