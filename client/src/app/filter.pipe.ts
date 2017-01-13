import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	transform(values: any[], args: any[]): any {
		var ret: any[] = [];
		
		var theArg: any;
		var set: any[];
		
		if (Array.isArray(args)) {
			theArg = args[0];
			if (args.length > 1) {
				set = args.slice(1);
			}
			else {
				for (var prop in values[0]) {
					if (values[0].hasOwnProperty(prop)) {
						set.push(prop);
					}
				}
			}
		}
		else {
			theArg = args;
		}
		
		for (var i = 0; i < values.length; i++) {
			var found = false;
			for (var j = 0; j < set.length; j++) {
				if (found) break;
				if (values[i].hasOwnProperty(set[j])) {
					if (!theArg || values[i][set[j]].toLowerCase().indexOf(theArg.toLowerCase()) !== -1)
					{
						ret.push(values[i]);
						found = true;
					}
				}
			}
		}
		
		return ret;
	}
}
