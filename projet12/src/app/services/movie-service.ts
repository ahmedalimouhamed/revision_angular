import { Injectable, signal, computed, effect } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public movies = signal<Movie[]>(this.loadMovies());

  public genres = computed(() => 
    [...new Set(this.movies().map((m: Movie) => m.genre))]
  );

  public topRated = computed(() => 
    [...this.movies()].sort((a: Movie, b: Movie) => b.rating - a.rating).slice(0, 5)
  )

  constructor(){
    effect(() => {
      localStorage.setItem('movies', JSON.stringify(this.movies()));
    })
  }


  private loadMovies(): Movie[] {
    const movies = localStorage.getItem('movies');
    return movies ? JSON.parse(movies) : [];
  }

  addMovie(movie: Omit<Movie, 'id'>){
    this.movies.update((m: Movie[]) => [...m, {...movie, id: crypto.randomUUID()}])
  }

  rateMovie(id: string, rating: number){
    this.movies.update((movies: Movie[]) => 
      movies.map((m: Movie) => m.id === id ? {...m, rating} : m)
    )
  }
  
}
