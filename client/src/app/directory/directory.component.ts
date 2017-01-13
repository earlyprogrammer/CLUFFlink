import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from './person';

import { Family } from './family';

import { DatafaceService } from './dataface.service';

@Component({
	selector: 'app-directory',
	templateUrl: './directory.component.html',
	styleUrls: ['./directory.component.css'],
	providers: [DatafaceService]
})
export class DirectoryComponent implements OnInit {
	searchText: string;
	people: Person[];
	families: Family[];

	constructor(private dataface: DatafaceService, private router: Router) { }

	ngOnInit() {
		this.dataface.getPeople().then(people => this.people = people);
		this.dataface.getFamilies().then(families => this.families = families);
	}

	gotoPerson(person:Person) {
		this.router.navigate(['/person', person.id]);
	}
	
	gotoFamily(family:Family) {
		this.router.navigate(['/family', family.id]);
	}
}
