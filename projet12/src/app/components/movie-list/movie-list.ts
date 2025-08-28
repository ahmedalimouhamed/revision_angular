import { Component, computed, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie';
import { MovieFilter } from '../movie-filter/movie-filter';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [MovieFilter, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {
  filter = signal({genre: '', search: ''});

  filteredMovies = computed(() => {
    return this.movieService.movies().filter((movie: Movie) => {
      const matchesGenre = !this.filter().genre || movie.genre === this.filter().genre;
      const matchesSearch = !this.filter().search || movie.title.toLowerCase().includes(this.filter().search.toLowerCase());
      return matchesGenre && matchesSearch;
    })
  })

  constructor(private movieService: MovieService){}

  updateFilter(filter: { genre: string; search: string }) {
    this.filter.set({ ...this.filter(), ...filter });
  }
  
  rateMovie(id: string, rating: number){
    this.movieService.rateMovie(id, rating);
  }
}
