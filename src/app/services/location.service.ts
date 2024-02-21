import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateLocationDto,
  LocationDto,
  UpdateLocationDto,
} from '../utility/dto/location.dto';

@Injectable()
export class LocationService {
  private locations: LocationDto[] = [];

  getAllLocations(): LocationDto[] {
    return this.locations;
  }

  getLocationById(locationId: string): LocationDto {
    const location = this.locations.find((loc) => loc.id === locationId);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  addLocation(createLocationDto: CreateLocationDto): LocationDto {
    const { name, latitude, longitude } = createLocationDto;
    const newLocation: LocationDto = {
      id: uuidv4(),
      name,
      latitude,
      longitude,
    };
    this.locations.push(newLocation);
    return newLocation;
  }

  updateLocation(
    locationId: string,
    updateLocationDto: UpdateLocationDto,
  ): LocationDto {
    const locationIndex = this.locations.findIndex(
      (loc) => loc.id === locationId,
    );
    if (locationIndex === -1) {
      throw new NotFoundException('Location not found');
    }

    const location = this.locations[locationIndex];
    const updatedLocation = { ...location, ...updateLocationDto };
    this.locations[locationIndex] = updatedLocation;
    return updatedLocation;
  }

  deleteLocation(locationId: string): void {
    const locationIndex = this.locations.findIndex(
      (loc) => loc.id === locationId,
    );
    if (locationIndex === -1) {
      throw new NotFoundException('Location not found');
    }
    this.locations.splice(locationIndex, 1);
  }
}
