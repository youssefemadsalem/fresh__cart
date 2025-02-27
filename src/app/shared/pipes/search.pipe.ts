import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr:any[] , searchkey:string):any[] {
    return arr.filter( (current)=> {return current.title.toLowerCase().includes(searchkey.toLowerCase())} );
  }  
}
