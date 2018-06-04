import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

@Injectable()
export class SearchPipe implements PipeTransform{
    transform(items: any, term: any):any{
        if(term === undefined){
            return items;
        }

        return items.filter(function(item){
            return item.name.toLowerCase().includes(term.toLowerCase());
        });

    }
}