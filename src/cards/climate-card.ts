import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ClimateCardConfig, HomeAssistant } from "../types";
import { clamp, registerCustomCard } from "../utils/helpers";
import { chevronDownIcon, chevronUpIcon, flameIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

const HEATING_COLOUR = "#fb923c";
const IDLE_COLOUR = "#4b5563";
const DEFAULT_STEP = 0.5;

@customElement("dashboard-climate-card")
export class ClimateCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: ClimateCardConfig;

  // -- Configuration --------------------------------------------------------

  public setConfig(config: ClimateCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity is required");
    }

    if (!config.entity.startsWith("climate.")) {
      throw new Error("Entity must be a climate entity");
    }

    this._config = config;
  }

  public getCardSize(): number {
    return 2;
  }

  static getStubConfig(): ClimateCardConfig {
    return { entity: "climate.thermostat" };
  }

  // -- Event handlers -------------------------------------------------------

  /** Increases the target temperature by the configured step. */
  private handleTempUp = (): void => {
    if (!this.hass || !this._config) return;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;

    const step = this._config.step ?? DEFAULT_STEP;
    const currentTarget = stateObj.attributes.temperature ?? 0;
    const maxTemp = stateObj.attributes.max_temp ?? 35;
    const newTemp = clamp(currentTarget + step, stateObj.attributes.min_temp ?? 7, maxTemp);

    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: newTemp,
    });
  };

  /** Decreases the target temperature by the configured step. */
  private handleTempDown = (): void => {
    if (!this.hass || !this._config) return;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;

    const step = this._config.step ?? DEFAULT_STEP;
    const currentTarget = stateObj.attributes.temperature ?? 0;
    const minTemp = stateObj.attributes.min_temp ?? 7;
    const newTemp = clamp(currentTarget - step, minTemp, stateObj.attributes.max_temp ?? 35);

    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: newTemp,
    });
  };

  /** Handles keyboard interaction on temperature buttons. */
  private handleKeyDown =
    (action: "up" | "down") =>
    (e: KeyboardEvent): void => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (action === "up") {
        this.handleTempUp();
      } else {
        this.handleTempDown();
      }
    };

  // -- Rendering ------------------------------------------------------------

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return nothing;

    const attrs = stateObj.attributes;
    const isHeating = attrs.hvac_action === "heating";
    const currentTemp = attrs.current_temperature ?? 0;
    const targetTemp = attrs.temperature ?? 0;
    const minTemp = attrs.min_temp ?? 7;
    const maxTemp = attrs.max_temp ?? 35;
    const displayName = this._config.name ?? attrs.friendly_name ?? entityId;

    // Derive the human-readable action label
    const actionLabel = isHeating ? "Heating" : "Idle";
    const subtitle = `${actionLabel} \u00B7 Currently ${currentTemp}\u00B0C`;

    // Progress bar percentage
    const range = maxTemp - minTemp;
    const progress = range > 0 ? ((currentTemp - minTemp) / range) * 100 : 0;
    const clampedProgress = clamp(progress, 0, 100);

    const accentColour = isHeating ? HEATING_COLOUR : IDLE_COLOUR;

    return html`
      <ha-card>
        ${isHeating ? html`<div class="glow"></div>` : nothing}

        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="icon" style="color: ${accentColour}">
              ${flameIcon()}
            </div>
            <div class="header-text">
              <span class="name">${displayName}</span>
              <span class="subtitle">${subtitle}</span>
            </div>
          </div>

          <!-- Target temperature with controls -->
          <div class="controls">
            <button
              class="btn"
              @click=${this.handleTempDown}
              @keydown=${this.handleKeyDown("down")}
              aria-label="Decrease temperature"
            >
              ${chevronDownIcon()}
            </button>

            <span class="target" style="color: ${accentColour}">
              ${targetTemp}<span class="unit">&deg;C</span>
            </span>

            <button
              class="btn"
              @click=${this.handleTempUp}
              @keydown=${this.handleKeyDown("up")}
              aria-label="Increase temperature"
            >
              ${chevronUpIcon()}
            </button>
          </div>

          <!-- Temperature progress bar -->
          <div class="bar-wrapper">
            <span class="bar-label">${minTemp}&deg;</span>
            <div class="bar">
              <div
                class="bar-fill ${isHeating ? "heating" : "idle"}"
                style="width: ${clampedProgress}%"
              ></div>
            </div>
            <span class="bar-label">${maxTemp}&deg;</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  // -- Styles ---------------------------------------------------------------

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        grid-column: span 2;
      }

      ha-card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
      }

      /* Radial orange glow overlay when heating */
      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 0%,
          rgba(251, 146, 60, 0.15) 0%,
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        z-index: 1;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }

      .icon svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #e0e0e0);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .subtitle {
        font-size: 12px;
        color: var(--secondary-text-color, #9e9e9e);
      }

      /* Target temperature controls */
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
      }

      .target {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
      }

      .target .unit {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.7;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 50%;
        background: var(--card-background-color, rgba(255, 255, 255, 0.05));
        color: var(--primary-text-color, #e0e0e0);
        cursor: pointer;
        transition: background 0.2s ease;
        padding: 0;
      }

      .btn:hover {
        background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));
      }

      .btn:active {
        transform: scale(0.95);
      }

      .btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      /* Progress bar */
      .bar-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .bar-label {
        font-size: 11px;
        color: var(--secondary-text-color, #9e9e9e);
        flex-shrink: 0;
        min-width: 24px;
        text-align: center;
      }

      .bar {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: var(--divider-color, rgba(255, 255, 255, 0.08));
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.4s ease;
      }

      .bar-fill.heating {
        background: linear-gradient(90deg, #fb923c, #ef4444);
      }

      .bar-fill.idle {
        background: #4b5563;
      }
    `,
  ];
}

// -- Registration -----------------------------------------------------------

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-climate-card": ClimateCard;
  }
}

registerCustomCard({
  type: "dashboard-climate-card",
  name: "Climate Card",
  description:
    "Climate control card with target temperature adjustment and heating state visualisation.",
});
