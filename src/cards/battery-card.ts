import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { BatteryCardConfig, HomeAssistant } from "../types";
import { batteryChargingIcon, batteryFullIcon, batteryLowIcon, getIconByKey } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

interface BatteryEntry {
  entityId: string;
  name: string;
  level: number;
  charging: boolean;
  icon?: string;
}

@customElement("dashboard-battery-card")
export class BatteryCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: BatteryCardConfig;

  public setConfig(config: BatteryCardConfig): void {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error("At least one entity is required in the entities array");
    }
    this._config = { low_threshold: 20, ...config };
  }

  public getCardSize(): number {
    return Math.max(2, Math.ceil(this._config?.entities?.length / 2) + 1);
  }

  static getStubConfig(): BatteryCardConfig {
    return {
      entities: [{ entity: "sensor.phone_battery", name: "Phone" }],
      name: "Batteries",
    };
  }

  private _getBatteries(): BatteryEntry[] {
    if (!this.hass || !this._config) return [];

    const results: BatteryEntry[] = [];

    for (const entry of this._config.entities) {
      const stateObj = this.hass.states[entry.entity];
      if (!stateObj) continue;

      // Try to read battery level from multiple common attributes
      let level: number | null = null;
      const attrs = stateObj.attributes;

      if (attrs.battery_level != null) {
        level = Number(attrs.battery_level);
      } else if (attrs.battery != null) {
        level = Number(attrs.battery);
      } else if (attrs.device_class === "battery") {
        level = Number(stateObj.state);
      } else {
        const parsed = Number(stateObj.state);
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          level = parsed;
        }
      }

      if (level == null || Number.isNaN(level)) continue;

      const charging =
        (attrs.is_charging as boolean) === true ||
        (attrs.charging as boolean) === true ||
        stateObj.state === "charging";

      results.push({
        entityId: entry.entity,
        name: entry.name || attrs.friendly_name || entry.entity,
        level: Math.round(Math.min(100, Math.max(0, level))),
        charging,
        icon: entry.icon,
      });
    }

    return results.sort((a, b) => a.level - b.level);
  }

  private _getBarColour(level: number): string {
    const threshold = this._config?.low_threshold ?? 20;
    if (level <= threshold) return "#ef4444";
    if (level <= 40) return "#fbbf24";
    return "#34d399";
  }

  private _getBatteryIcon(level: number, charging: boolean) {
    if (charging) return batteryChargingIcon();
    if (level <= (this._config?.low_threshold ?? 20)) return batteryLowIcon();
    return batteryFullIcon();
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const batteries = this._getBatteries();
    const title = this._config.name ?? "Batteries";
    const threshold = this._config.low_threshold ?? 20;
    const lowCount = batteries.filter((b) => b.level <= threshold).length;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-circle">${batteryFullIcon()}</div>
          <div class="info">
            <div class="title">${title}</div>
            <div class="subtitle">
              ${batteries.length} device${batteries.length !== 1 ? "s" : ""}${
                lowCount > 0 ? html` · <span class="low-warn">${lowCount} low</span>` : nothing
              }
            </div>
          </div>
        </div>

        ${
          batteries.length > 0
            ? html`
          <div class="list">
            ${batteries.map(
              (b) => html`
                <div class="row">
                  <div class="row-icon" style="color: ${this._getBarColour(b.level)}">
                    ${b.icon ? getIconByKey(b.icon) : this._getBatteryIcon(b.level, b.charging)}
                  </div>
                  <div class="row-info">
                    <div class="row-top">
                      <span class="row-name">${b.name}</span>
                      <span class="row-pct" style="color: ${this._getBarColour(b.level)}">
                        ${b.level}%${b.charging ? html` <span class="charging-badge">⚡</span>` : nothing}
                      </span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill"
                        style="width: ${b.level}%; background: ${this._getBarColour(b.level)};"></div>
                    </div>
                  </div>
                </div>
              `,
            )}
          </div>
        `
            : html`<div class="empty">No battery data available</div>`
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
        padding-bottom: 8px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 16px 12px;
      }

      .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(52, 211, 153, 0.12);
        color: #34d399;
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: 14px;
        font-weight: 600;
      }

      .subtitle {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 1px;
      }

      .low-warn {
        color: #ef4444;
        font-weight: 600;
      }

      .list {
        padding: 0 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        border-radius: 8px;
        transition: background 0.15s;
      }

      .row:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      .row-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
      }

      .row-icon svg {
        width: 18px;
        height: 18px;
      }

      .row-info {
        flex: 1;
        min-width: 0;
      }

      .row-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }

      .row-name {
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .row-pct {
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
        margin-left: 8px;
      }

      .charging-badge {
        font-size: 10px;
      }

      .bar-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.06);
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s ease;
      }

      .empty {
        padding: 20px 16px;
        text-align: center;
        font-size: 13px;
        color: var(--text-tertiary);
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dashboard-battery-card",
  name: "Dashboard Battery Card",
  description: "Battery tracker for cameras, phones, and other battery-powered devices.",
});
