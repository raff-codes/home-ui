import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { DoorbellCardConfig, HomeAssistant } from "../types";
import { bellIcon, cameraIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

@customElement("dashboard-doorbell-card")
export class DoorbellCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: DoorbellCardConfig;

  public setConfig(config: DoorbellCardConfig): void {
    if (!config.entity) {
      throw new Error("A doorbell entity is required");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  static getStubConfig(): DoorbellCardConfig {
    return { entity: "binary_sensor.doorbell", camera_entity: "camera.doorbell" };
  }

  private get _doorbellEntity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private get _cameraEntity() {
    if (!this.hass || !this._config?.camera_entity) return undefined;
    return this.hass.states[this._config.camera_entity];
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._doorbellEntity?.attributes?.friendly_name ?? this._config?.entity ?? "Doorbell";
  }

  private _isRinging(): boolean {
    const entity = this._doorbellEntity;
    return entity?.state === "on";
  }

  private _hasMotion(): boolean {
    const entity = this._doorbellEntity;
    const attrs = entity?.attributes;
    return (attrs?.motion as boolean) === true || entity?.state === "motion";
  }

  private _getCameraImage(): string | null {
    return this._cameraEntity?.attributes?.entity_picture ?? null;
  }

  private _getLastEvent(): string {
    const entity = this._doorbellEntity;
    if (!entity?.last_changed) return "";
    const diff = Date.now() - new Date(entity.last_changed).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const doorbell = this._doorbellEntity;
    if (!doorbell) return nothing;

    const name = this._getName();
    const isRinging = this._isRinging();
    const hasMotion = this._hasMotion();
    const cameraImage = this._getCameraImage();
    const lastEvent = this._getLastEvent();

    return html`
      <ha-card class="${isRinging ? "ringing" : ""}">
        <div class="header">
          <div class="icon-circle ${isRinging ? "alert" : ""}">
            ${bellIcon()}
          </div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="event-row">
              ${isRinging ? html`<span class="badge ring-badge">Ringing</span>` : nothing}
              ${hasMotion ? html`<span class="badge motion-badge">Motion</span>` : nothing}
              ${!isRinging && !hasMotion ? html`<span class="idle-text">Idle</span>` : nothing}
            </div>
          </div>
          ${lastEvent ? html`<span class="last-event">${lastEvent}</span>` : nothing}
        </div>

        <div class="feed">
          ${
            cameraImage
              ? html`<img src="${cameraImage}" alt="${name}" class="feed-img" />`
              : html`
              <div class="placeholder">
                <div class="placeholder-icon">${cameraIcon()}</div>
                <span>${this._config.camera_entity ? "No Feed" : "No Camera"}</span>
              </div>
            `
          }
          ${
            isRinging
              ? html`<div class="ring-overlay">
                <div class="ring-pulse"></div>
              </div>`
              : nothing
          }
        </div>

        ${
          isRinging || hasMotion
            ? html`
            <div class="notification-bar">
              ${
                isRinging
                  ? html`<span class="notif-text">Someone is at the door</span>`
                  : html`<span class="notif-text">Motion detected</span>`
              }
            </div>
          `
            : nothing
        }
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
        transition: border-color 0.3s;
      }

      ha-card.ringing {
        border-color: rgba(251, 113, 133, 0.3);
        animation: card-pulse 2s ease-in-out infinite;
      }

      @keyframes card-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(251, 113, 133, 0); }
        50% { box-shadow: 0 0 20px 0 rgba(251, 113, 133, 0.15); }
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
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .icon-circle.alert {
        background: rgba(251, 113, 133, 0.15);
        color: #fb7185;
        animation: bell-ring 0.5s ease-in-out infinite alternate;
      }

      @keyframes bell-ring {
        0% { transform: rotate(-8deg); }
        100% { transform: rotate(8deg); }
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

      .event-row {
        display: flex;
        gap: 6px;
        margin-top: 2px;
      }

      .badge {
        font-size: 10px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      .ring-badge {
        background: rgba(251, 113, 133, 0.15);
        color: #fb7185;
      }

      .motion-badge {
        background: rgba(251, 191, 36, 0.15);
        color: #fbbf24;
      }

      .idle-text {
        font-size: 11px;
        color: var(--text-secondary);
      }

      .last-event {
        font-size: 10px;
        color: var(--text-tertiary);
        flex-shrink: 0;
      }

      .feed {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
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

      .placeholder-icon {
        opacity: 0.3;
      }

      .placeholder-icon svg {
        width: 32px;
        height: 32px;
      }

      .ring-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      .ring-pulse {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 3px solid rgba(251, 113, 133, 0.6);
        animation: ring-expand 1.5s ease-out infinite;
      }

      @keyframes ring-expand {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }

      .notification-bar {
        padding: 10px 16px;
        background: rgba(251, 113, 133, 0.08);
        border-top: 1px solid rgba(251, 113, 133, 0.1);
      }

      .notif-text {
        font-size: 12px;
        font-weight: 500;
        color: #fb7185;
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-doorbell-card",
  name: "Dashboard Doorbell Card",
  description: "Doorbell card with camera feed and event notifications.",
});
