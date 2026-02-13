import { css } from "lit";

export const sharedStyles = css`
  :host {
    --card-bg: rgba(30, 30, 46, 0.95);
    --card-bg-active: rgba(59, 34, 104, 0.4);
    --card-radius: 20px;
    --card-padding: 16px;
    --card-border: 1px solid rgba(255, 255, 255, 0.06);
    --accent: #8b5cf6;
    --accent-light: #a78bfa;
    --accent-glow: rgba(139, 92, 246, 0.3);
    --toggle-on: #8b5cf6;
    --toggle-off: #3f3f5c;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.55);
    --text-tertiary: rgba(255, 255, 255, 0.35);
    --transition-fast: 300ms ease;
    --transition-glow: 500ms ease;
    --font-stack: system-ui, -apple-system, sans-serif;
    --sky: #38bdf8;
    --amber: #fbbf24;
    --emerald: #34d399;
    --purple: #8b5cf6;
    --rose: #fb7185;
    display: block;
    font-family: var(--font-stack);
  }

  .card {
    position: relative;
    overflow: hidden;
    background: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--card-radius);
    padding: var(--card-padding);
    transition: background var(--transition-fast), box-shadow var(--transition-glow);
    color: var(--text-primary);
  }

  .card-active {
    background: var(--card-bg-active);
  }

  .card-inactive {
    background: var(--card-bg);
  }

  .glow-overlay {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    border-radius: 50%;
    transition: opacity var(--transition-glow);
    opacity: 0;
  }

  .glow-overlay.active {
    opacity: 1;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background var(--transition-fast), color var(--transition-fast);
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .state-text {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  .toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    background: var(--toggle-off);
    cursor: pointer;
    transition: background var(--transition-fast);
    border: none;
    padding: 0;
    flex-shrink: 0;
  }

  .toggle-switch[aria-checked="true"] {
    background: var(--toggle-on);
  }

  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    transition: transform var(--transition-fast);
    pointer-events: none;
  }

  .toggle-switch[aria-checked="true"] .toggle-knob {
    transform: translateX(20px);
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: var(--toggle-off);
    outline: none;
    margin: 8px 0;
    position: relative;
    z-index: 1;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color var(--transition-fast), background var(--transition-fast);
    padding: 0;
  }

  .icon-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.1);
  }

  .icon-btn.primary {
    width: 44px;
    height: 44px;
    background: var(--accent);
    color: var(--text-primary);
  }

  .icon-btn.primary:hover {
    background: var(--accent-light);
  }

  .status-dot {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--toggle-off);
    transition: background var(--transition-fast), box-shadow var(--transition-glow);
  }

  @keyframes equaliser {
    0%, 100% { height: 4px; }
    50% { height: var(--bar-height, 16px); }
  }

  .eq-bar {
    width: 4px;
    border-radius: 2px;
    background: var(--accent);
    animation: equaliser 0.8s ease-in-out infinite;
    animation-play-state: paused;
  }

  .eq-bar.playing {
    animation-play-state: running;
  }
`;
