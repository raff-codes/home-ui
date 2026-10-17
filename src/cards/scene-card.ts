import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, SceneCardConfig } from "../types";
import { registerCustomCard } from "../utils/helpers";
import { getIconByKey } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

const COLOUR_MAP: Record<string, string> = {
  sky: "#38bdf8",
  amber: "#fbbf24",
  emerald: "#34d399",
  purple: "#8b5cf6",
  rose: "#fb7185",
};

@customElement("dashboard-scene-card")
export class SceneCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SceneCardConfig;
  @state() private _activated = false;

  public setConfig(config: SceneCardConfig): void {
    if (!config.entity || !config.entity.startsWith("scene.")) {
      throw new Error("A valid scene entity is required");
    }
    this._config = { icon: "scene", active_colour: "purple", ...config };
  }

  public getCardSize(): number {
    return 2;
  }

  static getStubConfig(): SceneCardConfig {
    return {
      entity: "scene.all_lights_off",
      name: "All Lights Off",
      icon: "scene",
      active_colour: "purple",
    };
  }

  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._entity?.attributes?.friendly_name ?? this._config?.entity ?? "Scene";
  }

  private _getColour(): string {
    return COLOUR_MAP[this._config?.active_colour ?? "purple"] ?? COLOUR_MAP.purple;
  }

  private handleActivate = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("scene", "turn_on", { entity_id: this._config.entity });
    this._activated = true;
    setTimeout(() => {
      this._activated = false;
    }, 1500);
  };

  private handleKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this.handleActivate();
    }
  };

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const entity = this._entity;
    if (!entity) return html`<div class="card">Scene not found</div>`;

    const name = this._getName();
    const colour = this._getColour();
    const iconKey = this._config.icon ?? "scene";

    return html`
      <div class="card ${this._activated ? "activated" : ""}" role="button" tabindex="0"
           aria-label="${name}. Activate scene."
           @click=${this.handleActivate} @keydown=${this.handleKeyDown}>

        <div class="ic" style="${this._activated ? `background: ${colour}22; color: ${colour};` : ""}">
          ${getIconByKey(iconKey)}
        </div>

        <span class="nm">${name}</span>

        <div class="activate-btn" style="${this._activated ? `background: ${colour}; color: #fff;` : ""}">
          ${this._activated ? "Activated" : "Activate"}
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
        padding: 16px;
        min-height: 152px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.3s, transform 0.15s, box-shadow 0.3s;
        color: var(--text-primary);
      }

      .card.activated {
        background: linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.18) 0%,
          rgba(59, 34, 104, 0.25) 100%
        );
        border-color: rgba(139, 92, 246, 0.15);
      }

      .card:hover {
        transform: scale(1.02);
      }
      .card:active {
        transform: scale(0.98);
      }
      .card:focus-visible {
        box-shadow: 0 0 0 2px var(--accent);
      }

      .ic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
        transition: all 0.3s;
        margin-bottom: auto;
      }

      .ic svg {
        width: 22px;
        height: 22px;
      }

      .nm {
        font-size: 14px;
        font-weight: 600;
        margin-top: 12px;
        margin-bottom: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .activate-btn {
        align-self: flex-start;
        font-size: 11px;
        font-weight: 600;
        padding: 5px 14px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-secondary);
        transition: all 0.3s;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
    `,
  ];
}

registerCustomCard({
  type: "dashboard-scene-card",
  name: "Dashboard Scene Card",
  description: "A scene activation card with visual feedback.",
});
