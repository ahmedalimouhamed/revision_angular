import { Component, computed, signal } from '@angular/core';
import {RecipeService} from '../../services/recipe-service';
import {Recipe} from '../../models/recipe';
import {RecipeCategory} from '../../models/recipe-category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  searchTerm = signal('');
  selectedCategory = signal<RecipeCategory | 'all'>('all');

  filteredRecipes = computed(() => {
    const term = this.searchTerm();
    const category = this.selectedCategory();

    let recipes = this.recipeService.filterByCategory(category)();

    if(term){
      recipes = this.recipeService.searchRecipes(term)();
    }
    
    return recipes;
  })

  constructor(public recipeService: RecipeService){}

  updateSearch(event: Event): void{
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  updateCategory(category: RecipeCategory | 'all'): void{
    this.selectedCategory.set(category)
  }
}
