import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
   private apiKey = 'ab4b58ad967e8bb62066e6449922c568'
  // private apiKey = '94cd0b124f68de2cf4404056b0a7887e'

  constructor(
    private http : HttpClient
  ) { }

  getWeatherDatas(cityName: string): Observable<any>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&node=json&appid=${this.apiKey}`, {})
  }
}
