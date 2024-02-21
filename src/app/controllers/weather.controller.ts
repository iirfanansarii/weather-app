import { Controller, Get, Query } from '@nestjs/common';
import { WeatherDto } from '../utility/dto/weather.dto';
import { WeatherService } from '../services/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  /**
   * get weather forecast based on location id
   * @param lat:latitude
   * @param lon:longitude
   * @returns weather forecast
   */
  @Get('forecast')
  async getWeatherForecast(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ): Promise<WeatherDto[]> {
    return this.weatherService.getWeatherForecast(lat, lon);
  }
}
