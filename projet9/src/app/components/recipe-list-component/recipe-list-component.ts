import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe';
import { RecipeCategory } from '../../models/recipe-category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipe-list-component.html',
  styleUrl: './recipe-list-component.scss'
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchTerm = '';
  selectedCategory: RecipeCategory | 'all' = 'all';
  categories: (RecipeCategory | 'all')[] = ['all', 'entrée', 'plat', 'dessert'];

  constructor(
    private recipeService: RecipeService, 
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void{
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.filterRecipes();
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }

  filterRecipes(): void{
    if (!this.searchTerm.trim() && this.selectedCategory === 'all') {
      this.filteredRecipes = [...this.recipes];
      return;
    }

    this.filteredRecipes = this.recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      recipe.ingredients.some(i => i.toLocaleLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCategory = this.selectedCategory === 'all' || recipe.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  onDelete(id: number): void{
    if (confirm('Supprimer cette recette ?')){
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.loadRecipes();
      })
    }
  }

}
