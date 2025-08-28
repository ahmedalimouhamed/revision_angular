import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './services/movie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projet12');

  constructor(movieService: MovieService){
    if(movieService.movies().length < 3){
      
      movieService.addMovie({
        title: 'Movie 1',
        year: 2022,
        genre: 'Action',
        rating: 5,
        director: 'Director 1',
        posterUrl: 'https://via.placeholder.com/150'
      })

      movieService.addMovie({
        title: 'Movie 2',
        year: 2022,
        genre: 'Action',
        rating: 5,
        director: 'Director 2',
        posterUrl: 'https://via.placeholder.com/150'
      })

      movieService.addMovie({
        title: 'Movie 3',
        year: 2022,
        genre: 'Action',
        rating: 5,
        director: 'Director 3',
        posterUrl: 'https://via.placeholder.com/150'
      })
    }
  }
}
