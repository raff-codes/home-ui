import { css, html, LitElement, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LightCardConfig } from "../types";
import { brightnessToPercent, debounce } from "../utils/helpers";
import { bulbIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-light-card",
  name: "Dashboard Light Card",
  description: "A light card with circular brightness ring and purple theme.",
});

const RING_R = 68;
const RING_W = 10;
const RING_C = 2 * Math.PI * RING_R;
const RING_BOX = (RING_R + RING_W) * 2;

@customElement("dashboard-light-card")
export class DashboardLightCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LightCardConfig;

  private _debouncedBrightness = debounce((entityId: string, brightness: number) => {
    this.hass.callService("light", "turn_on", {
      entity_id: entityId,
      brightness,
    });
  }, 100);

  public setConfig(config: LightCardConfig): void {
    if (!config.entity) throw new Error("You must define an entity");
    if (!config.entity.startsWith("light."))
      throw new Error("Entity must be a light domain (light.*)");
    this._config = { show_brightness_value: true, ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  static getStubConfig(): LightCardConfig {
    return { entity: "light.living_room", name: "Living Room Light", show_brightness_value: true };
  }

  private _getEntity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _isOn(): boolean {
    return this._getEntity()?.state === "on";
  }

  private _getBrightness(): number {
    return this._getEntity()?.attributes?.brightness ?? 255;
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._getEntity()?.attributes?.friendly_name ?? this._config?.entity ?? "Light";
  }

  private handleToggle = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("light", "toggle", { entity_id: this._config.entity });
  };

  private handleBrightnessChange = (ev: Event): void => {
    if (!this.hass || !this._config) return;
    const input = ev.target as HTMLInputElement;
    const brightness = parseInt(input.value, 10);
    const pct = Math.round((brightness / 255) * 100);
    input.style.setProperty("--value-pct", `${pct}%`);
    this._debouncedBrightness(this._config.entity, brightness);
  };

  private _renderRing(pct: number, isOn: boolean) {
    const filled = isOn ? (pct / 100) * RING_C : 0;
    const gap = RING_C - filled;
    const half = RING_BOX / 2;

    return svg`
      <svg viewBox="0 0 ${RING_BOX} ${RING_BOX}" class="ring-svg">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#c084fc" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="${half}" cy="${half}" r="${RING_R}"
          fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${RING_W}" />
        ${
          isOn
            ? svg`
          <circle cx="${half}" cy="${half}" r="${RING_R}"
            fill="none" stroke="url(#rg)" stroke-width="${RING_W}"
            stroke-linecap="round"
            stroke-dasharray="${filled} ${gap}"
            transform="rotate(-90 ${half} ${half})"
            class="ring-arc" />
        `
            : nothing
        }
      </svg>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const entity = this._getEntity();
    if (!entity) return html`<div class="card err">Entity not found: ${this._config.entity}</div>`;

    const isOn = this._isOn();
    const brightness = this._getBrightness();
    const pct = brightnessToPercent(brightness);
    const name = this._getName();

    return html`
      <div class="card ${isOn ? "active" : ""}">
        ${isOn ? html`<div class="glow"></div>` : nothing}
        <div class="inner">
          <div class="head">
            <div class="ic ${isOn ? "on" : ""}">${bulbIcon(isOn)}</div>
            <span class="nm">${name}</span>
          </div>
          <div class="sub">Light Temperature</div>
          <div class="ring" @click=${this.handleToggle} role="button" tabindex="0"
               aria-label="${isOn ? "Turn off" : "Turn on"}">
            ${this._renderRing(pct, isOn)}
            <div class="centre"><span class="on-off">${isOn ? "ON" : "OFF"}</span></div>
          </div>
          ${
            isOn
              ? html`
            <div class="slider">
              <input type="range" min="1" max="255" .value=${String(brightness)}
                @input=${this.handleBrightnessChange}
                style="--value-pct: ${pct}%;" aria-label="Brightness" />
            </div>`
              : nothing
          }
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .card {
        position: relative; overflow: hidden;
        background: var(--card-bg); border: var(--card-border);
        border-radius: var(--card-radius); padding: 20px;
        transition: background .3s, box-shadow .5s; color: var(--text-primary);
      }
      .card.active { background: var(--card-bg-active); }
      .card.err { padding: 16px; color: #ef4444; }

      .glow {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at 50% 40%, rgba(139,92,246,.12) 0%, transparent 70%);
        pointer-events: none;
      }

      .inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }

      .head { display: flex; align-items: center; gap: 10px; width: 100%; margin-bottom: 4px; }
      .ic {
        display: flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: 50%;
        background: rgba(255,255,255,.06); color: var(--text-secondary);
        transition: all .3s;
      }
      .ic.on { background: rgba(251,191,36,.15); color: #fbbf24; }
      .ic svg { width: 20px; height: 20px; }
      .nm { font-size: 16px; font-weight: 700; }

      .sub { font-size: 12px; color: var(--text-secondary); margin-bottom: 12px; align-self: flex-start; }

      .ring {
        position: relative; width: 170px; height: 170px;
        cursor: pointer; margin: 0 auto 16px; outline: none;
      }
      .ring:focus-visible { filter: drop-shadow(0 0 6px var(--accent)); }
      .ring-svg { width: 100%; height: 100%; }
      .ring-arc { transition: stroke-dasharray .4s ease; filter: drop-shadow(0 0 6px rgba(139,92,246,.4)); }
      .centre {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .on-off {
        font-size: 22px; font-weight: 700; letter-spacing: 2px;
        text-shadow: 0 0 20px rgba(139,92,246,.3);
      }

      .slider { width: 100%; }
      .slider input[type="range"] {
        background: linear-gradient(to right,
          #8b5cf6 0%, #8b5cf6 var(--value-pct, 50%),
          rgba(255,255,255,.08) var(--value-pct, 50%),
          rgba(255,255,255,.08) 100%);
        height: 8px; border-radius: 4px;
      }
      .slider input[type="range"]::-webkit-slider-thumb {
        width: 20px; height: 20px; border: 3px solid #8b5cf6; background: #fff;
      }
      .slider input[type="range"]::-moz-range-thumb {
        width: 20px; height: 20px; border: 3px solid #8b5cf6; background: #fff;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-light-card": DashboardLightCard;
  }
}
