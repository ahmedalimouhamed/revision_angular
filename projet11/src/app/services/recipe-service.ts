import { Injectable, signal, computed, effect } from '@angular/core';
import {Recipe} from '../models/recipe';
import { RecipeCategory } from '../models/recipe-category';
import {HttpClient} from '@angular/common/http';
import {localStorageUtil} from '../utils/StorageUtil';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = signal<Recipe[]>([]);

  categories = computed(() => [...new Set(this.recipes().map((r: Recipe) => r.category))]);

  latestRecipes = computed(() => 
    [...this.recipes()].sort((a: Recipe, b: Recipe) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 3)
  );

  constructor(private http: HttpClient){
    this.loadFromStorage();

    effect(() => {
      localStorageUtil.save('recipes', this.recipes());
    })
  }

  private loadFromStorage(): void{
    const saved = localStorageUtil.load<Recipe[]>('recipes');
    if(saved) this.recipes.set(saved);
  }

  getRecipes(){
    return computed(() => this.recipes())
  }

  getRecipe(id: string){
    return computed(() => 
      this.recipes().find((r: Recipe) => r.id === id)
    )
  }

  addRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>){
    const newRecipe: Recipe = {
      ...recipe,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    this.recipes.update((items: Recipe[]) => [...items, newRecipe])
  }

  updateRecipe(id: string, recipe: Partial<Recipe>){
    this.recipes.update((items: Recipe[]) => 
      items.map((r: Recipe) => 
        r.id === id ? {...r, ...recipe, updatedAt: new Date()} : r
      )
    )
  }

  deleteRecipe(id: string){
    this.recipes.update((items: Recipe[]) => 
      items.filter((r: Recipe) => r.id !== id)
    )
  }

  filterByCategory(category: RecipeCategory | 'all'){
    return computed(() => 
      category === 'all'
        ? this.recipes()
        : this.recipes().filter((r: Recipe) => r.category === category)
    )
  }

  searchRecipes(term: string){
    return computed(() => 
      this.recipes().filter((r: Recipe) => 
        r.title.toLowerCase().includes(term.toLowerCase()) ||
        r.ingredients.some((i: string) => i.toLowerCase().includes(term.toLowerCase()))
      )
    )
  }
}
