import {
  Param,
  Put,
  Delete,
  Controller,
  Get,
  Body,
  Post,
} from '@nestjs/common';

import {
  CreateLocationDto,
  LocationDto,
  UpdateLocationDto,
} from '../utility/dto/location.dto';
import { LocationService } from '../services/location.service';
import { SkipThrottle } from '@nestjs/throttler';
@SkipThrottle()
@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  /**
   * @description : add location
   * @param createLocationDto
   * @returns
   */
  @Post()
  async addLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<LocationDto> {
    return this.locationService.addLocation(createLocationDto);
  }

  /**
   * @description : get all locations
   * @returns locations
   */
  @Get()
  async getAllLocations(): Promise<LocationDto[]> {
    return this.locationService.getAllLocations();
  }

  /**
   * @description : get location by id
   * @param locationId
   * @returns
   */
  @Get(':location_id')
  async getLocationById(
    @Param('location_id') locationId: string,
  ): Promise<LocationDto> {
    return this.locationService.getLocationById(locationId);
  }

  /**
   * @description : update location by id
   * @param locationIdF
   * @param updateLocationDto
   * @returns
   */
  @Put(':location_id')
  async updateLocation(
    @Param('location_id') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<LocationDto> {
    return this.locationService.updateLocation(locationId, updateLocationDto);
  }

  /**
   * @description : delete location by id
   * @param locationId
   * @returns
   */
  @Delete(':location_id')
  async deleteLocation(
    @Param('location_id') locationId: string,
  ): Promise<void> {
    return this.locationService.deleteLocation(locationId);
  }
}
