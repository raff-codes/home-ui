import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, MediaPlayerCardConfig } from "../types";
import { debounce, registerCustomCard } from "../utils/helpers";
import {
  pauseIcon,
  playIcon,
  skipBackIcon,
  skipForwardIcon,
  volumeIcon,
  volumeMutedIcon,
} from "../utils/icons";
import { sharedStyles } from "../utils/styles";

@customElement("dashboard-media-player-card")
export class MediaPlayerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: MediaPlayerCardConfig;
  @state() private _localVolume: number | null = null;

  private _debouncedVolumeSet = debounce((volumeLevel: number) => {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", "volume_set", {
      entity_id: this._config.entity,
      volume_level: volumeLevel,
    });
  }, 100);

  private _clearLocalVolume = debounce(() => {
    this._localVolume = null;
  }, 500);

  public setConfig(config: MediaPlayerCardConfig): void {
    if (!config.entity || !config.entity.startsWith("media_player.")) {
      throw new Error("A valid media_player entity is required");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 2;
  }

  static getStubConfig(): MediaPlayerCardConfig {
    return {
      entity: "media_player.living_room",
    };
  }

  // Retrieve the entity state object from hass
  private get _entity() {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private get _isPlaying(): boolean {
    return this._entity?.state === "playing";
  }

  private get _isVolumeMuted(): boolean {
    return !!this._entity?.attributes?.is_volume_muted;
  }

  // Handler for play/pause toggle
  private _handlePlayPause = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", "media_play_pause", {
      entity_id: this._config.entity,
    });
  };

  // Handler for previous track
  private _handlePrevious = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", "media_previous_track", {
      entity_id: this._config.entity,
    });
  };

  // Handler for next track
  private _handleNext = (): void => {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", "media_next_track", {
      entity_id: this._config.entity,
    });
  };

  // Handler for volume change via slider input
  private _handleVolumeChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    if (!target) return;
    const volumeLevel = parseFloat(target.value);
    this._localVolume = volumeLevel;
    this._debouncedVolumeSet(volumeLevel);
    this._clearLocalVolume();
  };

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity) return nothing;

    const attrs = entity.attributes || {};
    const mediaTitle = attrs.media_title || "";
    const mediaArtist = attrs.media_artist || "";
    const source = attrs.source || "";
    const volumeLevel = this._localVolume ?? attrs.volume_level ?? 0.5;
    const volumePct = `${volumeLevel * 100}%`;
    const name = this._config.name || attrs.friendly_name || "Media Player";

    return html`
      <ha-card>
        ${this._isPlaying ? html`<div class="radial-glow"></div>` : nothing}
        <div class="content">
          <div class="header">
            <div class="info">
              <div class="name">${name}</div>
              ${mediaTitle ? html`<div class="media-title">${mediaTitle}</div>` : nothing}
              ${mediaArtist ? html`<div class="media-artist">${mediaArtist}</div>` : nothing}
              ${source ? html`<div class="source">${source.toUpperCase()}</div>` : nothing}
            </div>
            <div class="equaliser" ?data-playing=${this._isPlaying}>
              <div class="bar" style="--bar-height: 16px; animation-delay: 0s;"></div>
              <div class="bar" style="--bar-height: 24px; animation-delay: 0.2s;"></div>
              <div class="bar" style="--bar-height: 12px; animation-delay: 0.4s;"></div>
              <div class="bar" style="--bar-height: 20px; animation-delay: 0.1s;"></div>
            </div>
          </div>

          <div class="controls">
            <button class="transport-btn" @click=${this._handlePrevious}>
              ${skipBackIcon()}
            </button>
            <button class="transport-btn primary" @click=${this._handlePlayPause}>
              ${this._isPlaying ? pauseIcon() : playIcon()}
            </button>
            <button class="transport-btn" @click=${this._handleNext}>
              ${skipForwardIcon()}
            </button>
          </div>

          <div class="volume">
            <div class="volume-icon">
              ${this._isVolumeMuted ? volumeMutedIcon() : volumeIcon()}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              .value=${String(volumeLevel)}
              style="--volume-pct: ${volumePct}"
              @input=${this._handleVolumeChange}
            />
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          grid-column: span 2;
        }

        ha-card {
          position: relative;
          overflow: hidden;
          padding: 16px;
          background: var(--card-bg);
          border: var(--card-border);
          border-radius: var(--card-radius);
        }

        .radial-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(168, 85, 247, 0.15) 0%,
            rgba(168, 85, 247, 0.05) 30%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .info {
          flex: 1;
          min-width: 0;
        }

        .name {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .media-title {
          font-size: 18px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .media-artist {
          font-size: 14px;
          opacity: 0.7;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .source {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #8b5cf6;
          opacity: 0.8;
          margin-top: 6px;
        }

        /* Equaliser bars */
        .equaliser {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 32px;
          padding-left: 12px;
          flex-shrink: 0;
        }

        .equaliser .bar {
          width: 4px;
          border-radius: 2px;
          background: #8b5cf6;
          height: 6px;
          transition: height 0.3s ease;
        }

        .equaliser[data-playing] .bar {
          animation: equalise 0.8s ease-in-out infinite alternate;
        }

        @keyframes equalise {
          0% {
            height: 6px;
          }
          100% {
            height: var(--bar-height, 16px);
          }
        }

        /* Transport controls */
        .controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .transport-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          opacity: 0.8;
          transition: opacity 0.2s ease, background 0.2s ease;
        }

        .transport-btn:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.08);
        }

        .transport-btn.primary {
          background: #8b5cf6;
          color: #fff;
          width: 48px;
          height: 48px;
          opacity: 1;
        }

        .transport-btn.primary:hover {
          background: #7c3aed;
        }

        .transport-btn svg {
          width: 20px;
          height: 20px;
        }

        .transport-btn.primary svg {
          width: 24px;
          height: 24px;
        }

        /* Volume slider */
        .volume {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .volume-icon {
          display: flex;
          align-items: center;
          opacity: 0.6;
        }

        .volume-icon svg {
          width: 18px;
          height: 18px;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          flex: 1;
          height: 4px;
          border-radius: 2px;
          background: transparent;
          outline: none;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          margin-top: -5px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          background: linear-gradient(
            to right,
            #8b5cf6 0%,
            #8b5cf6 var(--volume-pct, 50%),
            rgba(255, 255, 255, 0.15) var(--volume-pct, 50%),
            rgba(255, 255, 255, 0.15) 100%
          );
          height: 4px;
          border-radius: 2px;
        }

        input[type="range"]::-moz-range-track {
          background: linear-gradient(
            to right,
            #8b5cf6 0%,
            #8b5cf6 var(--volume-pct, 50%),
            rgba(255, 255, 255, 0.15) var(--volume-pct, 50%),
            rgba(255, 255, 255, 0.15) 100%
          );
          height: 4px;
          border-radius: 2px;
        }
      `,
    ];
  }
}

// Register with Home Assistant custom cards registry
registerCustomCard({
  type: "dashboard-media-player-card",
  name: "Dashboard Media Player Card",
  description: "A media player card with equaliser visualisation and transport controls.",
});
