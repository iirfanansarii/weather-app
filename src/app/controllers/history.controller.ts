import { Controller, Get, Query } from '@nestjs/common';
import { HistoryDto } from '../utility/dto/history.dto';
import { HistoryService } from '../services/history.service';
import { Throttle } from '@nestjs/throttler';

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
  @Throttle({ default: { limit: 3, ttl: 10 } })
  @Get()
  async getHistoricalData(
    @Query('lat') latitude: number,
    @Query('lon') longitude: number,
    @Query('type') type: string,
    @Query('start') start: number,
    @Query('end') end: number,
  ): Promise<HistoryDto[]> {
    return this.historyService.getHistoricalData(
      latitude,
      longitude,
      type,
      start,
      end,
    );
  }
}
