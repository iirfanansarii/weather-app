export class CreateLocationDto {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
}

export class LocationDto {
  readonly id: string;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
}

export class UpdateLocationDto {
  readonly name?: string;
  readonly latitude?: number;
  readonly longitude?: number;
}
