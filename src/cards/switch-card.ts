import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, SwitchCardConfig } from "../types";
import { getIconByKey } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

const COLOUR_MAP: Record<string, string> = {
  sky: "#38bdf8",
  amber: "#fbbf24",
  emerald: "#34d399",
  purple: "#8b5cf6",
  rose: "#fb7185",
};

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-switch-card",
  name: "Dashboard Switch Card",
  description: "A square widget switch card with purple theme.",
});

@customElement("dashboard-switch-card")
export class DashboardSwitchCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SwitchCardConfig;

  public setConfig(config: SwitchCardConfig): void {
    if (!config.entity) throw new Error("You must define an entity");
    if (!config.entity.startsWith("switch."))
      throw new Error("Entity must be a switch domain (switch.*)");
    this._config = { icon: "power", active_colour: "purple", ...config };
  }

  public getCardSize(): number {
    return 2;
  }

  static getStubConfig(): SwitchCardConfig {
    return {
      entity: "switch.living_room",
      name: "Living Room Switch",
      icon: "power",
      active_colour: "purple",
    };
  }

  private _getEntity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _isOn(): boolean {
    return this._getEntity()?.state === "on";
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._getEntity()?.attributes?.friendly_name ?? this._config?.entity ?? "Switch";
  }

  private _getColour(): string {
    return COLOUR_MAP[this._config?.active_colour ?? "purple"] ?? COLOUR_MAP.purple;
  }

  private handleClick = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("switch", "toggle", { entity_id: this._config.entity });
  };

  private handleKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this.handleClick();
    }
  };

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const entity = this._getEntity();
    if (!entity) return html`<div class="card">Entity not found</div>`;

    const isOn = this._isOn();
    const name = this._getName();
    const colour = this._getColour();
    const iconKey = this._config.icon ?? "power";

    return html`
      <div class="card ${isOn ? "active" : ""}" role="button" tabindex="0"
           aria-label="${name}, ${isOn ? "On" : "Off"}. Activate to toggle."
           @click=${this.handleClick} @keydown=${this.handleKeyDown}>

        <div class="ic" style="${isOn ? `background: ${colour}22; color: ${colour};` : ""}">
          ${getIconByKey(iconKey)}
        </div>

        <span class="nm">${name}</span>

        <div class="toggle ${isOn ? "on" : ""}"
             style="${isOn ? `background: ${colour};` : ""}">
          <div class="knob"></div>
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }

      .card {
        position: relative; overflow: hidden;
        background: var(--card-bg); border: var(--card-border);
        border-radius: var(--card-radius); padding: 16px;
        min-height: 152px;
        display: flex; flex-direction: column;
        cursor: pointer; outline: none; user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background .3s, transform .15s, box-shadow .3s;
        color: var(--text-primary);
      }

      .card.active {
        background: linear-gradient(135deg,
          rgba(139,92,246,.18) 0%,
          rgba(59,34,104,.25) 100%);
        border-color: rgba(139,92,246,.15);
      }

      .card:hover { transform: scale(1.02); }
      .card:active { transform: scale(0.98); }
      .card:focus-visible { box-shadow: 0 0 0 2px var(--accent); }

      .ic {
        display: flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,.06);
        color: var(--text-secondary);
        transition: all .3s;
        margin-bottom: auto;
      }
      .ic svg { width: 22px; height: 22px; }

      .nm {
        font-size: 14px; font-weight: 600;
        margin-top: 12px; margin-bottom: 12px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      .toggle {
        position: relative;
        width: 40px; height: 22px; border-radius: 11px;
        background: var(--toggle-off);
        transition: background .3s;
      }

      .knob {
        position: absolute; top: 2px; left: 2px;
        width: 18px; height: 18px; border-radius: 50%;
        background: #fff; transition: transform .3s;
      }
      .toggle.on .knob { transform: translateX(18px); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-switch-card": DashboardSwitchCard;
  }
}
