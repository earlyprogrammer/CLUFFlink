import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { DatafaceService } from '../dataface.service';
import { Family } from '../family';

@Component({
	selector: 'app-family',
	templateUrl: './family.component.html',
	styleUrls: ['./family.component.css'],
	providers: [DatafaceService]
})

export class FamilyComponent implements OnInit {
	family:Family;

	constructor(private dataface: DatafaceService, private route: ActivatedRoute, private location: Location) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.dataface.getFamily(id).then(family => this.family = family)
		});
	}

}
