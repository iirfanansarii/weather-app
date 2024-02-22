import { Controller, Get, Query } from '@nestjs/common';
import { WeatherDto } from '../utility/dto/weather.dto';
import { WeatherService } from '../services/weather.service';
import { Throttle } from '@nestjs/throttler';
import { client } from '../utility/redis/client';

@Throttle({ default: { limit: 3, ttl: 60000 } })
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
    const cachedWeatherForecastData = await client.get('weatherForecastData');
    if (cachedWeatherForecastData) return JSON.parse(cachedWeatherForecastData);
    const weatherForecastRes = await this.weatherService.getWeatherForecast(
      lat,
      lon,
    );
    await client.set('weatherForecastData', JSON.stringify(weatherForecastRes));
    await client.expire('weatherForecastData', 30);
    return weatherForecastRes;
  }
}
