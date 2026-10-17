import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, WeatherCardConfig, WeatherForecast } from "../types";
import { registerCustomCard } from "../utils/helpers";
import {
  boltIcon,
  cloudIcon,
  cloudSunIcon,
  dropletIcon,
  rainIcon,
  snowflakeIcon,
  sunIcon,
  windIcon,
} from "../utils/icons";
import { sharedStyles } from "../utils/styles";

// Mapping from weather condition to a human-readable label
const CONDITION_LABELS: Record<string, string> = {
  sunny: "Sunny",
  partlycloudy: "Partly Cloudy",
  cloudy: "Cloudy",
  rainy: "Rainy",
  pouring: "Heavy Rain",
  snowy: "Snowy",
  lightning: "Thunderstorm",
  windy: "Windy",
  fog: "Foggy",
  "clear-night": "Clear Night",
};

// Abbreviated day names for forecast display
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

@customElement("dashboard-weather-card")
export class WeatherCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WeatherCardConfig;

  public setConfig(config: WeatherCardConfig): void {
    if (!config.entity || !config.entity.startsWith("weather.")) {
      throw new Error("A valid weather entity is required");
    }
    this._config = {
      name: "Weather",
      show_forecast: true,
      num_forecasts: 5,
      ...config,
    };
  }

  public getCardSize(): number {
    return 3;
  }

  static getStubConfig(): WeatherCardConfig {
    return {
      entity: "weather.home",
      name: "Weather",
      show_forecast: true,
      num_forecasts: 5,
    };
  }

  // Retrieve the entity state object from hass
  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  // Return the appropriate icon template for a given weather condition
  private _getConditionIcon(condition: string) {
    switch (condition) {
      case "sunny":
      case "clear-night":
        return sunIcon();
      case "cloudy":
        return cloudIcon();
      case "partlycloudy":
        return cloudSunIcon();
      case "rainy":
      case "pouring":
        return rainIcon();
      case "snowy":
        return snowflakeIcon();
      case "lightning":
        return boltIcon();
      case "windy":
        return windIcon();
      default:
        return cloudSunIcon();
    }
  }

  // Return a human-readable label for the weather condition
  private _getConditionLabel(state: string): string {
    if (CONDITION_LABELS[state]) return CONDITION_LABELS[state];
    // Default: capitalise the first letter
    if (!state) return "";
    return state.charAt(0).toUpperCase() + state.slice(1);
  }

  // Derive abbreviated day name from a forecast datetime string
  private _getDayName(datetime: string): string {
    const date = new Date(datetime);
    return DAY_NAMES[date.getDay()];
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity) return nothing;

    const attrs = entity.attributes || {};
    const temperature = attrs.temperature;
    const humidity = attrs.humidity;
    const windSpeed = attrs.wind_speed;
    const condition = entity.state;
    const name = this._config.name || "Weather";
    const showForecast = this._config.show_forecast !== false;
    const numForecasts = this._config.num_forecasts || 5;
    const forecast: WeatherForecast[] = (attrs.forecast || []).slice(0, numForecasts);

    return html`
      <ha-card>
        <div class="watermark">${this._getConditionIcon(condition)}</div>
        <div class="content">
          <div class="name">${name}</div>

          <div class="current">
            <div class="temperature-section">
              <span class="temperature">${temperature}</span>
              <span class="unit">&deg;C</span>
            </div>
            <div class="condition">${this._getConditionLabel(condition)}</div>
          </div>

          <div class="stats">
            <div class="stat">
              <span class="stat-icon">${dropletIcon()}</span>
              <span class="stat-value">${humidity}%</span>
            </div>
            <div class="stat">
              <span class="stat-icon">${windIcon()}</span>
              <span class="stat-value">${windSpeed} km/h</span>
            </div>
          </div>

          ${
            showForecast && forecast.length
              ? html`
                <div class="forecast-divider"></div>
                <div class="forecast">
                  ${forecast.map(
                    (day) => html`
                      <div class="forecast-day">
                        <span class="forecast-day-name">
                          ${this._getDayName(day.datetime)}
                        </span>
                        <span class="forecast-icon">
                          ${this._getConditionIcon(day.condition)}
                        </span>
                        <span class="forecast-high">${day.temperature}&deg;</span>
                        <span class="forecast-low">${day.templow}&deg;</span>
                      </div>
                    `,
                  )}
                </div>
              `
              : nothing
          }
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          grid-column: span 2;
        }

        ha-card {
          position: relative;
          overflow: hidden;
          padding: 16px;
          background: var(--card-bg);
          border: var(--card-border);
          border-radius: var(--card-radius);
        }

        /* Large background watermark icon */
        .watermark {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 120px;
          height: 120px;
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        .watermark svg {
          width: 100%;
          height: 100%;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .name {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .current {
          margin-bottom: 12px;
        }

        .temperature-section {
          display: flex;
          align-items: flex-start;
        }

        .temperature {
          font-size: 40px;
          font-weight: 300;
          line-height: 1;
        }

        .unit {
          font-size: 18px;
          font-weight: 300;
          opacity: 0.7;
          margin-top: 4px;
          margin-left: 2px;
        }

        .condition {
          font-size: 14px;
          opacity: 0.8;
          margin-top: 4px;
        }

        /* Side stats: humidity and wind speed */
        .stats {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          opacity: 0.7;
        }

        .stat-icon {
          display: flex;
          align-items: center;
        }

        .stat-icon svg {
          width: 16px;
          height: 16px;
        }

        /* Subtle divider before forecast */
        .forecast-divider {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 4px 0 12px;
        }

        /* Forecast row */
        .forecast {
          display: flex;
          justify-content: space-between;
          gap: 4px;
        }

        .forecast-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
          padding: 8px 4px;
          border-radius: 8px;
          cursor: default;
          transition: background 0.2s ease;
        }

        .forecast-day:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .forecast-day-name {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .forecast-icon {
          display: flex;
          align-items: center;
        }

        .forecast-icon svg {
          width: 16px;
          height: 16px;
        }

        .forecast-high {
          font-size: 13px;
          font-weight: 600;
        }

        .forecast-low {
          font-size: 12px;
          opacity: 0.5;
        }
      `,
    ];
  }
}

// Register with Home Assistant custom cards registry
registerCustomCard({
  type: "dashboard-weather-card",
  name: "Dashboard Weather Card",
  description: "A weather card with current conditions and forecast display.",
});
