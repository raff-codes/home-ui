import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PersonCardConfig } from "../types";
import { homeIcon, mapPinIcon, personIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

@customElement("dashboard-person-card")
export class PersonCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: PersonCardConfig;

  public setConfig(config: PersonCardConfig): void {
    if (
      !config.entity ||
      (!config.entity.startsWith("person.") && !config.entity.startsWith("device_tracker."))
    ) {
      throw new Error("A valid person or device_tracker entity is required");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 2;
  }

  static getStubConfig(): PersonCardConfig {
    return { entity: "person.rafael", name: "Rafael" };
  }

  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private get _trackerEntity() {
    if (!this.hass || !this._config?.tracker_entity) return undefined;
    return this.hass.states[this._config.tracker_entity];
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._entity?.attributes?.friendly_name ?? this._config?.entity ?? "Person";
  }

  private _isHome(): boolean {
    const entity = this._entity;
    if (!entity) return false;
    return entity.state === "home";
  }

  private _getZone(): string {
    const entity = this._entity;
    if (!entity) return "Unknown";
    const state = entity.state;
    if (state === "home") return "Home";
    if (state === "not_home") return "Away";
    return state.charAt(0).toUpperCase() + state.slice(1);
  }

  private _getEntityPicture(): string | null {
    return this._entity?.attributes?.entity_picture ?? null;
  }

  private _getLastChanged(): string {
    const entity = this._entity;
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

    const entity = this._entity;
    if (!entity) return nothing;

    const name = this._getName();
    const isHome = this._isHome();
    const zone = this._getZone();
    const picture = this._getEntityPicture();
    const lastChanged = this._getLastChanged();

    // Check tracker for battery
    const tracker = this._trackerEntity;
    const battery = tracker?.attributes?.battery_level ?? entity.attributes?.battery_level;

    return html`
      <div class="card ${isHome ? "home" : "away"}">
        <div class="avatar">
          ${
            picture
              ? html`<img src="${picture}" alt="${name}" class="avatar-img" />`
              : html`<div class="avatar-placeholder">${personIcon()}</div>`
          }
          <div class="status-indicator ${isHome ? "home" : "away"}"></div>
        </div>

        <div class="details">
          <span class="name">${name}</span>
          <div class="location">
            <span class="location-icon">${isHome ? homeIcon() : mapPinIcon()}</span>
            <span class="zone">${zone}</span>
          </div>
          ${lastChanged ? html`<span class="last-seen">${lastChanged}</span>` : nothing}
        </div>

        ${
          battery != null
            ? html`
            <div class="battery">
              <div class="battery-bar">
                <div class="battery-fill" style="width: ${battery}%;
                  background: ${Number(battery) > 20 ? "#34d399" : "#ef4444"};"></div>
              </div>
              <span class="battery-label">${battery}%</span>
            </div>
          `
            : nothing
        }
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
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: var(--text-primary);
        transition: background 0.3s;
      }

      .card.home {
        background: linear-gradient(
          135deg,
          rgba(52, 211, 153, 0.1) 0%,
          rgba(30, 30, 46, 0.95) 100%
        );
      }

      .avatar {
        position: relative;
        width: 52px;
        height: 52px;
        flex-shrink: 0;
      }

      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .avatar-placeholder {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
      }

      .avatar-placeholder svg {
        width: 26px;
        height: 26px;
      }

      .status-indicator {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid rgba(30, 30, 46, 0.95);
      }

      .status-indicator.home {
        background: #34d399;
      }

      .status-indicator.away {
        background: #6b7280;
      }

      .details {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        min-width: 0;
        width: 100%;
      }

      .name {
        font-size: 14px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .location {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--text-secondary);
      }

      .location-icon svg {
        width: 12px;
        height: 12px;
      }

      .zone {
        white-space: nowrap;
      }

      .last-seen {
        font-size: 10px;
        color: var(--text-tertiary);
      }

      .battery {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        max-width: 100px;
      }

      .battery-bar {
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.08);
        overflow: hidden;
      }

      .battery-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s ease;
      }

      .battery-label {
        font-size: 10px;
        color: var(--text-secondary);
        flex-shrink: 0;
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-person-card",
  name: "Dashboard Person Card",
  description: "Person presence tracking card with avatar and zone display.",
});
