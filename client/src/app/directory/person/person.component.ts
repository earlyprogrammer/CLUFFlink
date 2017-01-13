import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { DatafaceService } from '../dataface.service';
import { Person } from '../person';

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.css'],
	providers: [DatafaceService]
})
export class PersonComponent implements OnInit {
	person: Person;

	constructor(private dataface: DatafaceService, private route: ActivatedRoute, private location: Location) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.dataface.getPerson(id).then(person => this.person = person)
		});
	}

}
