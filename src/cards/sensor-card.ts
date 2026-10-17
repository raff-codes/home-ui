import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, SensorCardConfig } from "../types";
import { registerCustomCard } from "../utils/helpers";
import { boltIcon, dropletIcon, motionIcon, thermometerIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

// Colour mapping keyed by device_class
const COLOUR_MAP: Record<string, string> = {
  temperature: "#fb923c",
  humidity: "#22d3ee",
  energy: "#34d399",
  power: "#34d399",
};

const DEFAULT_COLOUR = "#34d399";
const MOTION_DETECTED_COLOUR = "#a78bfa";
const MOTION_CLEAR_COLOUR = "#4b5563";

// Icon mapping keyed by device_class
const ICON_MAP: Record<string, () => TemplateResult> = {
  temperature: thermometerIcon,
  humidity: dropletIcon,
  energy: boltIcon,
  power: boltIcon,
  motion: motionIcon,
};

const DEFAULT_ICON = boltIcon;

@customElement("dashboard-sensor-card")
export class SensorCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SensorCardConfig;

  // -- Configuration --------------------------------------------------------

  public setConfig(config: SensorCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity is required");
    }

    const domain = config.entity.split(".")[0];
    if (domain !== "sensor" && domain !== "binary_sensor") {
      throw new Error("Entity must be a sensor or binary_sensor");
    }

    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  static getStubConfig(): SensorCardConfig {
    return { entity: "sensor.temperature" };
  }

  // -- Rendering ------------------------------------------------------------

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return nothing;

    const unavailable = stateObj.state === "unavailable" || stateObj.state === "unknown";
    const deviceClass = stateObj.attributes.device_class ?? "";
    const isBinary = entityId.startsWith("binary_sensor.");
    const isMotion = deviceClass === "motion";
    const isDetected = stateObj.state === "on";

    const accentColour = unavailable
      ? "#4b5563"
      : this._resolveColour(deviceClass, isMotion, isDetected);
    const iconFn = this._resolveIcon(deviceClass);
    const displayName = this._config.name ?? stateObj.attributes.friendly_name ?? entityId;

    return html`
      <ha-card class=${unavailable ? "disabled" : ""}>
        <div class="container">
          <div class="header">
            <div class="icon" style="color: ${accentColour}">
              ${iconFn()}
            </div>
            <span class="name">${displayName}</span>
          </div>

          <div class="value" style="color: ${accentColour}">
            ${
              unavailable
                ? "Unavailable"
                : isBinary || isMotion
                  ? isDetected
                    ? "Detected"
                    : "Clear"
                  : html`${stateObj.state}<span class="unit"
                      >${stateObj.attributes.unit_of_measurement ?? ""}</span
                    >`
            }
          </div>
        </div>
      </ha-card>
    `;
  }

  // -- Private helpers ------------------------------------------------------

  /** Resolves the accent colour based on device_class and state. */
  private _resolveColour(deviceClass: string, isMotion: boolean, isDetected: boolean): string {
    if (this._config.accent_colour) return this._config.accent_colour;
    if (isMotion) return isDetected ? MOTION_DETECTED_COLOUR : MOTION_CLEAR_COLOUR;
    return COLOUR_MAP[deviceClass] ?? DEFAULT_COLOUR;
  }

  /** Resolves the icon function based on device_class. */
  private _resolveIcon(deviceClass: string): () => TemplateResult {
    return ICON_MAP[deviceClass] ?? DEFAULT_ICON;
  }

  // -- Styles ---------------------------------------------------------------

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      ha-card {
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        flex-shrink: 0;
      }

      .icon svg {
        width: 20px;
        height: 20px;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary, #fff);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .value {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
      }

      .unit {
        font-size: 14px;
        font-weight: 400;
        margin-left: 2px;
        opacity: 0.7;
      }

      ha-card.disabled {
        opacity: 0.45;
      }

      ha-card.disabled .value {
        font-size: 16px;
      }
    `,
  ];
}

// -- Registration -----------------------------------------------------------

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-sensor-card": SensorCard;
  }
}

registerCustomCard({
  type: "dashboard-sensor-card",
  name: "Sensor Card",
  description: "Displays sensor and binary sensor readings with auto-coloured icons.",
});
