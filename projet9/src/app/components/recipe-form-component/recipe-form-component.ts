import { Component , OnInit} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RecipeService} from '../../services/recipe-service';
import {Recipe} from '../../models/recipe';
import { RecipeCategory } from '../../models/recipe-category';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-recipe-form-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './recipe-form-component.html',
  styleUrl: './recipe-form-component.scss'
})
export class RecipeFormComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  isEditMode = false;
  recipeId?: number;

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    category: ['plat' as RecipeCategory, Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    cookingTime: [15, [Validators.required, Validators.min(1)]],
    imageUrl: ['']
  });

  constructor(
    private recipeService : RecipeService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if(id){
      this.isEditMode = true;
      this.recipeId = Number(id);
      this.loadRecipe(this.recipeId!);
    }
  }

  loadRecipe(id: number): void{
    this.recipeService.getRecipe(id).subscribe(recipe => {
      this.recipeForm.patchValue({
        ...recipe,
        ingredients: recipe.ingredients.join(', ')
      });
    });
  }

  onSubmit(): void{
    if(this.recipeForm.valid){
      const formValue = this.recipeForm.value;
      const recipe:  Omit<Recipe, 'id'> = {
        title: formValue.title!,
        category: formValue.category!,
        ingredients: formValue.ingredients!.split(',').map((i: string) => i.trim()),
        instructions: formValue.instructions!,
        cookingTime: formValue.cookingTime!,
        imageUrl: formValue.imageUrl!
      };

      const observable = this.isEditMode && this.recipeId
        ? this.recipeService.updateRecipe(this.recipeId, recipe)
        : this.recipeService.addRecipe(recipe);

      observable.subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

}
