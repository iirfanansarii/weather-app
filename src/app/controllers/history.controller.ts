import { Controller, Get, Query } from '@nestjs/common';
import { HistoryDto } from '../utility/dto/history.dto';
import { HistoryService } from '../services/history.service';
import { Throttle } from '@nestjs/throttler';
import { client } from '../utility/redis/client';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  /**
   * @description get weather hourly historical data
   * @param latitude
   * @param longitude
   * @param start
   * @param end
   * @returns
   */
  @Get()
  async getHistoricalData(
    @Query('lat') latitude: number,
    @Query('lon') longitude: number,
    @Query('type') type: string,
    @Query('start') start: number,
    @Query('end') end: number,
  ): Promise<HistoryDto[]> {
    const cachedHistoricalData = await client.get('historicalData');
    if (cachedHistoricalData) return JSON.parse(cachedHistoricalData);
    const historicalResponse = await this.historyService.getHistoricalData(
      latitude,
      longitude,
      type,
      start,
      end,
    );
    await client.set('historicalData', JSON.stringify(historicalResponse));
    await client.expire('historicalData', 30);
    return historicalResponse;
  }
}
