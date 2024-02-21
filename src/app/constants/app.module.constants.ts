import { AppController } from '../controllers/app.controller';
import { LocationController } from '../controllers/location.controller';
import { WeatherController } from '../controllers/weather.controller';
import { AppService } from '../services/app.service';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';

export const AppModuleControllers = [
  AppController,
  WeatherController,
  LocationController,
];

export const AppModuleService = [AppService, WeatherService, LocationService];
