import { Component, computed, inject } from '@angular/core';
import {RecipeService} from '../../services/recipe-service';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss'
})
export class RecipeDetails {

  private route = inject(ActivatedRoute);

  id = toSignal(this.route.params.pipe(map((params: Params) => params['id'])));

  recipe = computed(() => 
    this.recipeService.getRecipe(this.id())()
  );

  constructor(
    public recipeService: RecipeService
  ){}

  formatInstructions(instructions: string): string {
    return instructions.split('\n').filter(step => step.trim() !== '').join('<br>');
  }

}
