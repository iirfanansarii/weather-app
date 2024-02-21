import { AppController } from '../controllers/app.controller';
import { HistoryController } from '../controllers/history.controller';
import { LocationController } from '../controllers/location.controller';
import { WeatherController } from '../controllers/weather.controller';
import { AppService } from '../services/app.service';
import { HistoryService } from '../services/history.service';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';

export const AppModuleControllers = [
  AppController,
  WeatherController,
  LocationController,
  HistoryController,
];

export const AppModuleService = [
  AppService,
  WeatherService,
  LocationService,
  HistoryService,
];
