import { Pipe, PipeTransform } from '@angular/core';
import { CategoryDTO } from '../generated';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  transform(categories: CategoryDTO[] | null, id: number): unknown {
    return categories?.find((category) => category.id == id)?.name;
  }

}
