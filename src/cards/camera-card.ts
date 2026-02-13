import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { CameraCardConfig, HomeAssistant } from "../types";
import { cameraIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

@customElement("dashboard-camera-card")
export class CameraCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CameraCardConfig;

  public setConfig(config: CameraCardConfig): void {
    if (!config.entity || !config.entity.startsWith("camera.")) {
      throw new Error("A valid camera entity is required");
    }
    this._config = { aspect_ratio: "16:9", ...config };
  }

  public getCardSize(): number {
    return 4;
  }

  static getStubConfig(): CameraCardConfig {
    return { entity: "camera.front_door", name: "Front Door" };
  }

  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._entity?.attributes?.friendly_name ?? this._config?.entity ?? "Camera";
  }

  private _getImageUrl(): string | null {
    const entity = this._entity;
    if (!entity) return null;
    const picture = entity.attributes?.entity_picture;
    if (picture) return picture;
    return null;
  }

  private _getAspectPadding(): string {
    const ratio = this._config?.aspect_ratio ?? "16:9";
    const parts = ratio.split(":");
    if (parts.length === 2) {
      const w = Number.parseFloat(parts[0]);
      const h = Number.parseFloat(parts[1]);
      if (w > 0 && h > 0) return `${(h / w) * 100}%`;
    }
    return "56.25%";
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity) return nothing;

    const name = this._getName();
    const imageUrl = this._getImageUrl();
    const isIdle = entity.state === "idle";
    const stateLabel = entity.state === "streaming" ? "Live" : entity.state;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-circle">${cameraIcon()}</div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="state ${entity.state === "streaming" ? "live" : ""}">
              ${entity.state === "streaming" ? html`<span class="live-dot"></span>` : nothing}
              ${stateLabel}
            </div>
          </div>
        </div>
        <div class="feed" style="padding-bottom: ${this._getAspectPadding()}">
          ${
            imageUrl
              ? html`<img src="${imageUrl}" alt="${name}" class="feed-img" />`
              : html`
              <div class="placeholder ${isIdle ? "idle" : ""}">
                <div class="placeholder-icon">${cameraIcon()}</div>
                <span>${isIdle ? "Camera Idle" : "No Feed"}</span>
              </div>
            `
          }
        </div>
      </ha-card>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        grid-column: span 2;
      }

      ha-card {
        overflow: hidden;
        background: var(--card-bg);
        border: var(--card-border);
        border-radius: var(--card-radius);
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
      }

      .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-secondary);
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .state {
        font-size: 11px;
        color: var(--text-secondary);
        text-transform: capitalize;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .state.live {
        color: #ef4444;
      }

      .live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ef4444;
        animation: pulse-live 1.5s ease-in-out infinite;
      }

      @keyframes pulse-live {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      .feed {
        position: relative;
        width: 100%;
        background: #0a0a14;
      }

      .feed-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--text-secondary);
        font-size: 12px;
      }

      .placeholder.idle {
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255, 255, 255, 0.02) 10px,
          rgba(255, 255, 255, 0.02) 20px
        );
      }

      .placeholder-icon {
        opacity: 0.3;
      }

      .placeholder-icon svg {
        width: 32px;
        height: 32px;
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-camera-card",
  name: "Dashboard Camera Card",
  description: "Camera feed card with live indicator and aspect ratio support.",
});
