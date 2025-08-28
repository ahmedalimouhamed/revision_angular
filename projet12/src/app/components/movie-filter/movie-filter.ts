import { Component, output, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-filter',
  imports: [],
  templateUrl: './movie-filter.html',
  styleUrl: './movie-filter.scss'
})
export class MovieFilter {
  filterChange = output<{genre: string, search: string}>();
  
  genres = inject(MovieService).genres;
  
  // Local filter state to maintain the current filter values
  filter = { genre: '', search: '' };
  
  updateGenre(event: Event) {
    this.filter.genre = (event.target as HTMLSelectElement).value;
    this.filterChange.emit({...this.filter});
  }
  
  updateSearch(event: Event) {
    this.filter.search = (event.target as HTMLInputElement).value;
    this.filterChange.emit({...this.filter});
  }
  
}
