import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-details-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-details-component.html',
  styleUrl: './recipe-details-component.scss'
})
export class RecipeDetailsComponent implements OnInit{
  recipe?: Recipe;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void{
    const id = this.route.snapshot.params['id'];
    console.log(id);

    if(id){
      this.recipeService.getRecipe(Number(id)).subscribe({
        next: (recipe) => {
          this.recipe = recipe;
          console.log(this.recipe);
          this.loading = false;
          this.cd.detectChanges();
        },

        error: () => {
          this.loading = false;
          this.cd.detectChanges();
        }
      })
    }
  }

  formatInstructions(instructions: string): string {
    return instructions.split('\n').filter(step => step.trim() !== '').join('<br>');
  }
}
