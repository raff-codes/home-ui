export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  entity_picture?: string;
  unit_of_measurement?: string;
  device_class?: string;
  brightness?: number;
  rgb_color?: [number, number, number];
  min_temp?: number;
  max_temp?: number;
  current_temperature?: number;
  temperature?: number;
  hvac_action?: string;
  media_title?: string;
  media_artist?: string;
  source?: string;
  volume_level?: number;
  is_volume_muted?: boolean;
  forecast?: WeatherForecast[];
  humidity?: number;
  wind_speed?: number;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<void>;
  language: string;
}

export interface WeatherForecast {
  datetime: string;
  condition: string;
  temperature: number;
  templow?: number;
  precipitation?: number;
  humidity?: number;
  wind_speed?: number;
}

// Card config interfaces

export interface LightCardConfig {
  type?: string;
  entity: string;
  name?: string;
  show_brightness_value?: boolean;
}

export interface SwitchCardConfig {
  type?: string;
  entity: string;
  name?: string;
  icon?: string;
  active_colour?: "sky" | "amber" | "emerald" | "purple" | "rose";
}

export interface SensorCardConfig {
  type?: string;
  entity: string;
  name?: string;
  icon?: string;
  accent_colour?: string;
}

export interface ClimateCardConfig {
  type?: string;
  entity: string;
  name?: string;
  step?: number;
}

export interface MediaPlayerCardConfig {
  type?: string;
  entity: string;
  name?: string;
}

export interface WeatherCardConfig {
  type?: string;
  entity: string;
  name?: string;
  show_forecast?: boolean;
  num_forecasts?: number;
}

export interface CameraCardConfig {
  type?: string;
  entity: string;
  name?: string;
  aspect_ratio?: string;
}

export interface SceneCardConfig {
  type?: string;
  entity: string;
  name?: string;
  icon?: string;
  active_colour?: "sky" | "amber" | "emerald" | "purple" | "rose";
}

export interface PersonCardConfig {
  type?: string;
  entity: string;
  name?: string;
  tracker_entity?: string;
}

export interface FanCardConfig {
  type?: string;
  entity: string;
  name?: string;
}

export interface DoorbellCardConfig {
  type?: string;
  entity: string;
  camera_entity?: string;
  name?: string;
}

export interface ShoppingListCardConfig {
  type?: string;
  entity: string;
  name?: string;
}

export interface LightGroupCardConfig {
  type?: string;
  entities: string[];
  name?: string;
  icon?: string;
}

export interface BatteryCardConfig {
  type?: string;
  entities: Array<{
    entity: string;
    name?: string;
    icon?: string;
  }>;
  name?: string;
  low_threshold?: number;
}
