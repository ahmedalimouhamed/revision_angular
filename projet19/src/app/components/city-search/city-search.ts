import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/weather-service';
import { City } from '../../models/city';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-search',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './city-search.html',
  styleUrl: './city-search.scss'
})
export class CitySearch {

  @Output() citySelected = new EventEmitter<string>();

  searchQuery: string = '';
  suggestions: City[] = [];
  showSuggestions: boolean = false;

  constructor(private weatherService: WeatherService){}

  onSearch(){
    if(this.searchQuery.length > 2){
      this.weatherService.searchCities(this.searchQuery).subscribe((cities: City[]) => {
        this.suggestions = cities;
        this.showSuggestions = true;
      })
    }else{
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  selectCity(city: City){
    this.searchQuery = city.name;
    this.citySelected.emit(city.name);
    this.showSuggestions = false;
  }

  onSubmit(){
    if(this.searchQuery.trim()){
      this.citySelected.emit(this.searchQuery.trim());
    }
  }

  onBlur(){
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

}
