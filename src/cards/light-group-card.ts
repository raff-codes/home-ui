import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LightGroupCardConfig } from "../types";
import { bulbIcon, getIconByKey } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

@customElement("dashboard-light-group-card")
export class LightGroupCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LightGroupCardConfig;

  public setConfig(config: LightGroupCardConfig): void {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error("At least one light entity is required in the entities array");
    }
    for (const e of config.entities) {
      if (!e.startsWith("light.")) {
        throw new Error(`Entity ${e} is not a light domain`);
      }
    }
    this._config = { name: "All Lights", icon: "bulb", ...config };
  }

  public getCardSize(): number {
    return 2;
  }

  static getStubConfig(): LightGroupCardConfig {
    return {
      entities: ["light.living_room", "light.bedroom"],
      name: "All Lights",
    };
  }

  /** Count how many lights are currently on */
  private _getOnCount(): number {
    if (!this.hass || !this._config) return 0;
    return this._config.entities.filter((e) => this.hass.states[e]?.state === "on").length;
  }

  private _getTotalCount(): number {
    return this._config?.entities?.length ?? 0;
  }

  /** All off → turn all on. Any on → turn all off. */
  private handleToggle = (): void => {
    if (!this.hass || !this._config) return;
    const onCount = this._getOnCount();
    const service = onCount > 0 ? "turn_off" : "turn_on";

    for (const entityId of this._config.entities) {
      this.hass.callService("light", service, { entity_id: entityId });
    }
  };

  private handleKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this.handleToggle();
    }
  };

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const onCount = this._getOnCount();
    const total = this._getTotalCount();
    const allOff = onCount === 0;
    const allOn = onCount === total;
    const name = this._config.name ?? "All Lights";
    const iconKey = this._config.icon ?? "bulb";

    // State: "off" | "partial" | "on"
    const stateClass = allOff ? "off" : allOn ? "on" : "partial";
    const stateLabel = allOff ? "All Off" : allOn ? "All On" : `${onCount} of ${total} On`;

    return html`
      <div class="card ${stateClass}" role="button" tabindex="0"
           aria-label="${name}, ${stateLabel}. Activate to ${allOff ? "turn all on" : "turn all off"}."
           @click=${this.handleToggle} @keydown=${this.handleKeyDown}>

        ${stateClass !== "off" ? html`<div class="glow"></div>` : nothing}

        <div class="inner">
          <div class="ic ${stateClass}">
            ${iconKey === "bulb" ? bulbIcon(onCount > 0) : getIconByKey(iconKey)}
          </div>

          <span class="nm">${name}</span>

          <div class="status">
            <span class="status-label">${stateLabel}</span>
            <div class="dots">
              ${this._config.entities.map((entityId) => {
                const isOn = this.hass.states[entityId]?.state === "on";
                return html`<div class="dot ${isOn ? "on" : ""}"></div>`;
              })}
            </div>
          </div>

          <div class="toggle ${allOff ? "" : "on"}"
               style="${!allOff && !allOn ? "background: rgba(139, 92, 246, 0.5);" : ""}">
            <div class="knob"></div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        grid-column: span 2;
      }

      .card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
        padding: 20px;
        cursor: pointer;
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.3s, transform 0.15s, box-shadow 0.3s;
        color: var(--text-primary);
      }

      .card.on,
      .card.partial {
        background: var(--card-bg-active);
        border-color: rgba(139, 92, 246, 0.15);
      }

      .card.partial {
        background: linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.1) 0%,
          rgba(59, 34, 104, 0.15) 100%
        );
      }

      .card:hover {
        transform: scale(1.01);
      }
      .card:active {
        transform: scale(0.99);
      }
      .card:focus-visible {
        box-shadow: 0 0 0 2px var(--accent);
      }

      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 30%,
          rgba(251, 191, 36, 0.06) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .inner {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .ic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .ic.on {
        background: rgba(251, 191, 36, 0.15);
        color: #fbbf24;
      }

      .ic.partial {
        background: rgba(251, 191, 36, 0.1);
        color: #fbbf24;
        opacity: 0.7;
      }

      .ic svg {
        width: 24px;
        height: 24px;
      }

      .nm {
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
        margin-left: auto;
      }

      .status-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      .dots {
        display: flex;
        gap: 4px;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        transition: background 0.3s;
      }

      .dot.on {
        background: #fbbf24;
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.4);
      }

      .toggle {
        position: relative;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        background: var(--toggle-off);
        transition: background 0.3s;
        flex-shrink: 0;
      }

      .toggle.on {
        background: var(--toggle-on);
      }

      .knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        transition: transform 0.3s;
      }

      .toggle.on .knob {
        transform: translateX(20px);
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-light-group-card",
  name: "Dashboard Light Group Card",
  description: "Group toggle for multiple lights with partial state indicator.",
});
