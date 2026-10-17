import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, ShoppingListCardConfig } from "../types";
import { registerCustomCard } from "../utils/helpers";
import { checkIcon, plusIcon, shoppingCartIcon } from "../utils/icons";
import { sharedStyles } from "../utils/styles";

interface ShoppingItem {
  name: string;
  complete: boolean;
  id?: string;
}

@customElement("dashboard-shopping-list-card")
export class ShoppingListCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: ShoppingListCardConfig;
  @state() private _newItem = "";

  public setConfig(config: ShoppingListCardConfig): void {
    if (!config.entity) {
      throw new Error("A shopping list entity is required");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  static getStubConfig(): ShoppingListCardConfig {
    return { entity: "sensor.bring_grocery_list", name: "Grocery List" };
  }

  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _getName(): string {
    if (this._config?.name) return this._config.name;
    return this._entity?.attributes?.friendly_name ?? "Shopping List";
  }

  private _getItems(): ShoppingItem[] {
    const entity = this._entity;
    if (!entity) return [];
    const items = entity.attributes?.items;
    if (Array.isArray(items)) return items as ShoppingItem[];
    // Fallback: parse state as count
    return [];
  }

  private _getPendingCount(): number {
    const items = this._getItems();
    if (items.length > 0) return items.filter((i) => !i.complete).length;
    // If no items array, use state as item count
    const entity = this._entity;
    const num = Number(entity?.state);
    return Number.isNaN(num) ? 0 : num;
  }

  private handleToggleItem = (item: ShoppingItem): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("shopping_list", "complete_item", {
      name: item.name,
      complete: !item.complete,
    });
  };

  private handleAddItem = (): void => {
    if (!this.hass || !this._config || !this._newItem.trim()) return;
    this.hass.callService("shopping_list", "add_item", {
      name: this._newItem.trim(),
    });
    this._newItem = "";
  };

  private handleInputChange = (ev: Event): void => {
    this._newItem = (ev.target as HTMLInputElement).value;
  };

  private handleInputKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.handleAddItem();
    }
  };

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity) return nothing;

    const name = this._getName();
    const items = this._getItems();
    const pendingCount = this._getPendingCount();
    const pending = items.filter((i) => !i.complete);
    const completed = items.filter((i) => i.complete);

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-circle">${shoppingCartIcon()}</div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="count">${pendingCount} item${pendingCount !== 1 ? "s" : ""}</div>
          </div>
        </div>

        <div class="add-row">
          <input
            type="text"
            class="add-input"
            placeholder="Add item..."
            .value=${this._newItem}
            @input=${this.handleInputChange}
            @keydown=${this.handleInputKeyDown}
          />
          <button class="add-btn" @click=${this.handleAddItem}
                  ?disabled=${!this._newItem.trim()}
                  aria-label="Add item">
            ${plusIcon()}
          </button>
        </div>

        ${
          items.length > 0
            ? html`
            <div class="list">
              ${pending.map(
                (item) => html`
                  <div class="item" @click=${() => this.handleToggleItem(item)}>
                    <div class="checkbox"></div>
                    <span class="item-name">${item.name}</span>
                  </div>
                `,
              )}
              ${
                completed.length > 0
                  ? html`
                  <div class="completed-divider">
                    <span>Completed (${completed.length})</span>
                  </div>
                  ${completed.map(
                    (item) => html`
                      <div class="item done" @click=${() => this.handleToggleItem(item)}>
                        <div class="checkbox checked">${checkIcon()}</div>
                        <span class="item-name">${item.name}</span>
                      </div>
                    `,
                  )}
                `
                  : nothing
              }
            </div>
          `
            : html`
            <div class="empty">
              <span>No items yet</span>
            </div>
          `
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
        background: rgba(139, 92, 246, 0.12);
        color: #8b5cf6;
        flex-shrink: 0;
      }

      .icon-circle svg {
        width: 18px;
        height: 18px;
      }

      .info {
        flex: 1;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
      }

      .count {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 1px;
      }

      .add-row {
        display: flex;
        gap: 8px;
        padding: 0 16px 12px;
      }

      .add-input {
        flex: 1;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 8px 12px;
        color: var(--text-primary);
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
      }

      .add-input::placeholder {
        color: var(--text-tertiary);
      }

      .add-input:focus {
        border-color: rgba(139, 92, 246, 0.4);
      }

      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: none;
        background: #8b5cf6;
        color: #fff;
        cursor: pointer;
        transition: opacity 0.2s;
        flex-shrink: 0;
      }

      .add-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .add-btn svg {
        width: 16px;
        height: 16px;
      }

      .list {
        max-height: 280px;
        overflow-y: auto;
        padding: 0 8px;
      }

      .list::-webkit-scrollbar {
        width: 4px;
      }

      .list::-webkit-scrollbar-track {
        background: transparent;
      }

      .list::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.15s;
      }

      .item:hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .checkbox.checked {
        background: #8b5cf6;
        border-color: #8b5cf6;
        color: #fff;
      }

      .checkbox.checked svg {
        width: 12px;
        height: 12px;
      }

      .item-name {
        font-size: 13px;
        flex: 1;
      }

      .item.done .item-name {
        text-decoration: line-through;
        opacity: 0.4;
      }

      .completed-divider {
        padding: 8px;
        font-size: 10px;
        font-weight: 600;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .empty {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
        color: var(--text-tertiary);
        font-size: 13px;
      }
    `,
  ];
}

registerCustomCard({
  type: "dashboard-shopping-list-card",
  name: "Dashboard Shopping List Card",
  description: "Shopping list card with Bring! integration support.",
});
