import { HttpException, Injectable, Logger } from '@nestjs/common';
import { WeatherDto } from '../utility/dto/weather.dto';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  /**
   * @description: get weather forecast
   * @param latitude
   * @param longitude
   * @returns
   */
  async getWeatherForecast(
    latitude: number,
    longitude: number,
  ): Promise<WeatherDto[]> {
    try {
      const apiKey = process.env.WEATHER_APP_API_KEY || '';
      const weatherForecastBaseUrl = process.env.WEATHER_FORECAST_BASE_URL;
      const url = `${weatherForecastBaseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const response = await axios.get(url);
      this.logger.log(`GET ${url}`);
      return response.data;
    } catch (error: any) {
      throw new HttpException(
        { message: error.response.data.message },
        error.response.data.code,
      );
    }
  }
}
