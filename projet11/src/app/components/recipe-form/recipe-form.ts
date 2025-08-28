import { Component, effect, inject, input, computed, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RecipeService} from '../../services/recipe-service';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeCategory } from '../../models/recipe-category';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = toSignal(this.route.params.pipe(map((params: Params) => params['id'])));
  isEditMode = computed(() => !!this.id());

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    category: ['plat' as RecipeCategory, Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    cookingTime: [15, [Validators.required, Validators.min(1)]],
    imageUrl: ['']
  });

  ngOnInit(): void{
    if(this.isEditMode()){
      const recipe = this.recipeService.getRecipe(this.id()!)();
      if(recipe){
        this.recipeForm.patchValue({
          ...recipe,
          ingredients: recipe.ingredients.join(', ')
        });
      }
    }
  }

  onSubmit(): void{
    if(this.recipeForm.valid){
      const formValue = this.recipeForm.value;
      const recipeData = {
        title: formValue.title!,
        category: formValue.category as RecipeCategory,
        ingredients: formValue.ingredients!.split(',').map((i: string) => i.trim()),
        instructions: formValue.instructions!,
        cookingTime: formValue.cookingTime!,
        imageUrl: formValue.imageUrl || '',
      }

      if(this.isEditMode()){
        this.recipeService.updateRecipe(this.id()!, {...recipeData, updatedAt: new Date()});
      }else{
        this.recipeService.addRecipe({...recipeData});
      }

      this.router.navigate(['/']);
    }
  }
}
