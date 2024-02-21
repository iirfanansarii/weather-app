import { Injectable } from '@nestjs/common';
import { WeatherDto } from '../utility/dto/weather.dto';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeatherForecast(
    latitude: number,
    longitude: number,
    count: number,
  ): Promise<WeatherDto[]> {
    try {
      const apiKey = process.env.WEATHER_APP_API_KEY || '';
      const weatherForecastBaseUrl = process.env.WEATHER_APP_API_URL;
      const url = `${weatherForecastBaseUrl}?lat=${latitude}&lon=${longitude}&cnt=${count}&appid=${apiKey}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather forecast data');
    }
  }
}
