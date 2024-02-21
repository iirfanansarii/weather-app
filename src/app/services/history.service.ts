import { Injectable } from '@nestjs/common';
import { HistoryDto } from '../utility/dto/history.dto';
import axios from 'axios';

@Injectable()
export class HistoryService {
  /**
   * @description get weather hourly historical data
   * @param latitude
   * @param longitude
   * @param start
   * @param end
   * @returns
   */
  async getHistoricalData(
    latitude: number,
    longitude: number,
    start: number,
    end: number,
  ): Promise<HistoryDto[]> {
    try {
      const apiKey = process.env.WEATHER_APP_API_KEY || '';
      const weatherHistoryBaseUrl = process.env.WEATHER_HISTORY_BASE_URL;
      const response = await axios.get(
        `${weatherHistoryBaseUrl}?lat=${latitude}&lon=${longitude}&type=hour&start=${start}&end=${end}&appid=${apiKey}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch historical data');
    }
  }
}
