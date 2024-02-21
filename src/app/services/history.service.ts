import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HistoryDto } from '../utility/dto/history.dto';
import axios from 'axios';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

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
    type: string,
    start: number,
    end: number,
  ): Promise<HistoryDto[]> {
    try {
      const apiKey = process.env.WEATHER_APP_API_KEY || '';
      const weatherHistoryBaseUrl = process.env.WEATHER_HISTORY_BASE_URL;
      const url = `${weatherHistoryBaseUrl}?lat=${latitude}&lon=${longitude}&type=${type}&start=${start}&end=${end}&appid=${apiKey}`;
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
