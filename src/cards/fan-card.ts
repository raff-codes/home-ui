import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { FanCardConfig, HomeAssistant } from "../types";
import { fanIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

const SPEED_LIST = ["off", "low", "medium", "high"];

@customElement("dashboard-fan-card")
export class FanCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: FanCardConfig;

  public setConfig(config: FanCardConfig): void {
    if (!config.entity || !config.entity.startsWith("fan.")) {
      throw new Error("A valid fan entity is required");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  static getStubConfig(): FanCardConfig {
    return { entity: "fan.range_hood", name: "Range Hood" };
  }

  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _isOn(): boolean {
    return this._entity?.state === "on";
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._entity?.attributes?.friendly_name ?? this._config?.entity ?? "Fan";
  }

  private _getPercentage(): number {
    return (this._entity?.attributes?.percentage as number) ?? 0;
  }

  private _getPresetMode(): string {
    return (this._entity?.attributes?.preset_mode as string) ?? "";
  }

  private _getSpeedList(): string[] {
    const modes = this._entity?.attributes?.preset_modes;
    if (Array.isArray(modes) && modes.length > 0) return modes as string[];
    return SPEED_LIST;
  }

  private handleToggle = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("fan", "toggle", { entity_id: this._config.entity });
  };

  private handleSetSpeed = (speed: string): void => {
    if (!this.hass || !this._config) return;
    if (speed === "off") {
      this.hass.callService("fan", "turn_off", { entity_id: this._config.entity });
      return;
    }
    this.hass.callService("fan", "set_preset_mode", {
      entity_id: this._config.entity,
      preset_mode: speed,
    });
  };

  private handlePercentageChange = (ev: Event): void => {
    if (!this.hass || !this._config) return;
    const input = ev.target as HTMLInputElement;
    const percentage = Number.parseInt(input.value, 10);
    this.hass.callService("fan", "set_percentage", {
      entity_id: this._config.entity,
      percentage,
    });
  };

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity) return nothing;

    const isOn = this._isOn();
    const name = this._getName();
    const percentage = this._getPercentage();
    const presetMode = this._getPresetMode();
    const speeds = this._getSpeedList();

    return html`
      <div class="card ${isOn ? "active" : ""}">
        ${isOn ? html`<div class="glow"></div>` : nothing}
        <div class="inner">
          <div class="head">
            <div class="ic ${isOn ? "on" : ""}">${fanIcon()}</div>
            <span class="nm">${name}</span>
            <button class="toggle-switch" role="switch"
                    aria-checked="${isOn}" aria-label="Toggle ${name}"
                    @click=${this.handleToggle}>
              <div class="toggle-knob"></div>
            </button>
          </div>

          <div class="status">
            ${
              isOn
                ? html`<span class="speed-label">${presetMode || `${percentage}%`}</span>`
                : html`<span class="off-label">Off</span>`
            }
          </div>

          ${
            isOn
              ? html`
              <div class="fan-visual">
                <div class="fan-spinner ${isOn ? "spinning" : ""}"
                     style="animation-duration: ${percentage > 66 ? "0.4s" : percentage > 33 ? "0.8s" : "1.5s"}">
                  ${fanIcon()}
                </div>
              </div>

              <div class="speed-buttons">
                ${speeds.map(
                  (speed) => html`
                    <button class="speed-btn ${(presetMode || "").toLowerCase() === speed.toLowerCase() ? "active" : ""}"
                            @click=${() => this.handleSetSpeed(speed)}>
                      ${speed}
                    </button>
                  `,
                )}
              </div>

              <div class="slider">
                <input type="range" min="0" max="100" .value=${String(percentage)}
                  @change=${this.handlePercentageChange}
                  style="--value-pct: ${percentage}%;"
                  aria-label="Fan speed percentage" />
              </div>
            `
              : nothing
          }
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding: 20px;
        transition: background 0.3s, box-shadow 0.5s;
        color: var(--text-primary);
      }

      .card.active {
        background: var(--card-bg-active);
      }

      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 40%,
          rgba(139, 92, 246, 0.1) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .inner {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .head {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        margin-bottom: 8px;
      }

      .ic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .ic.on {
        background: rgba(139, 92, 246, 0.15);
        color: #8b5cf6;
      }

      .ic svg {
        width: 20px;
        height: 20px;
      }

      .nm {
        font-size: 16px;
        font-weight: 700;
        flex: 1;
      }

      .status {
        align-self: flex-start;
        margin-bottom: 12px;
      }

      .speed-label {
        font-size: 12px;
        color: var(--accent);
        text-transform: capitalize;
      }

      .off-label {
        font-size: 12px;
        color: var(--text-secondary);
      }

      .fan-visual {
        margin: 8px 0 16px;
      }

      .fan-spinner {
        width: 56px;
        height: 56px;
        color: var(--accent);
      }

      .fan-spinner svg {
        width: 100%;
        height: 100%;
      }

      .fan-spinner.spinning {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .speed-buttons {
        display: flex;
        gap: 6px;
        width: 100%;
        margin-bottom: 12px;
      }

      .speed-btn {
        flex: 1;
        padding: 6px 4px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        background: transparent;
        color: var(--text-secondary);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        text-transform: capitalize;
      }

      .speed-btn:hover {
        background: rgba(255, 255, 255, 0.06);
      }

      .speed-btn.active {
        background: rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.3);
        color: #8b5cf6;
      }

      .slider {
        width: 100%;
      }

      .slider input[type="range"] {
        background: linear-gradient(
          to right,
          #8b5cf6 0%,
          #8b5cf6 var(--value-pct, 50%),
          rgba(255, 255, 255, 0.08) var(--value-pct, 50%),
          rgba(255, 255, 255, 0.08) 100%
        );
        height: 6px;
        border-radius: 3px;
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-fan-card",
  name: "Dashboard Fan Card",
  description: "Fan speed control card with visual spinner and preset modes.",
});
