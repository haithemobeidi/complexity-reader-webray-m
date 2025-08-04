import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Base overlay component using Lit Web Components
 * Provides foundation for all overlay types with Material Design 3 styling
 */
@customElement('base-overlay')
export class BaseOverlay extends LitElement {
  @property({ type: String }) position = 'absolute';
  @property({ type: Number }) left = 0;
  @property({ type: Number }) top = 0;
  @property({ type: Number }) zIndex = 9999;
  @property({ type: Boolean }) visible = true;
  @property({ type: Boolean }) draggable = false;
  @property({ type: String }) variant = 'elevated'; // elevated, filled, outlined
  
  @state() private isDragging = false;
  @state() private dragOffset = { x: 0, y: 0 };

  static styles = css`
    :host {
      --md-sys-color-surface: #fef7ff;
      --md-sys-color-on-surface: #1d1b20;
      --md-sys-color-surface-variant: #e7e0ec;
      --md-sys-color-on-surface-variant: #49454f;
      --md-sys-color-outline: #79747e;
      --md-sys-color-shadow: #000000;
      
      position: absolute;
      display: block;
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      border-radius: 12px;
      user-select: none;
      transition: all 0.2s cubic-bezier(0.2, 0.0, 0, 1.0);
    }

    :host([hidden]) {
      display: none !important;
    }

    .overlay-container {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      overflow: hidden;
    }

    /* Material Design 3 Variants */
    .overlay-container.elevated {
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      box-shadow: 
        0px 1px 2px rgba(0, 0, 0, 0.3),
        0px 2px 6px 2px rgba(0, 0, 0, 0.15);
    }

    .overlay-container.filled {
      background: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
    }

    .overlay-container.outlined {
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      border: 1px solid var(--md-sys-color-outline);
    }

    .overlay-content {
      padding: 16px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    /* Dragging states */
    :host(.dragging) {
      cursor: grabbing !important;
      transform: scale(1.02);
      box-shadow: 
        0px 4px 8px rgba(0, 0, 0, 0.3),
        0px 8px 16px 4px rgba(0, 0, 0, 0.15);
    }

    :host(.draggable) {
      cursor: grab;
    }

    :host(.draggable):hover {
      transform: scale(1.01);
    }

    /* Animation classes */
    :host(.fade-in) {
      animation: fadeIn 0.2s cubic-bezier(0.2, 0.0, 0, 1.0);
    }

    :host(.fade-out) {
      animation: fadeOut 0.2s cubic-bezier(0.2, 0.0, 0, 1.0);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updatePosition();
    
    if (this.draggable) {
      this.setupDragging();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupDragging();
  }

  private updatePosition() {
    this.style.position = this.position;
    this.style.left = `${this.left}px`;
    this.style.top = `${this.top}px`;
    this.style.zIndex = this.zIndex.toString();
    this.style.display = this.visible ? 'block' : 'none';
  }

  private setupDragging() {
    this.classList.add('draggable');
    this.addEventListener('mousedown', this.handleMouseDown);
  }

  private cleanupDragging() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseDown = (e: MouseEvent) => {
    if (!this.draggable) return;
    
    e.preventDefault();
    this.isDragging = true;
    this.classList.add('dragging');
    
    const rect = this.getBoundingClientRect();
    this.dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    
    this.dispatchEvent(new CustomEvent('overlay-drag-start', {
      detail: { x: this.left, y: this.top }
    }));
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    
    this.left = e.clientX - this.dragOffset.x;
    this.top = e.clientY - this.dragOffset.y;
    this.updatePosition();
    
    this.dispatchEvent(new CustomEvent('overlay-drag', {
      detail: { x: this.left, y: this.top }
    }));
  };

  private handleMouseUp = () => {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.classList.remove('dragging');
    
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    
    this.dispatchEvent(new CustomEvent('overlay-drag-end', {
      detail: { x: this.left, y: this.top }
    }));
  };

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('left') || 
        changedProperties.has('top') || 
        changedProperties.has('position') ||
        changedProperties.has('zIndex') ||
        changedProperties.has('visible')) {
      this.updatePosition();
    }
  }

  show(animate = true) {
    this.visible = true;
    if (animate) {
      this.classList.add('fade-in');
      setTimeout(() => this.classList.remove('fade-in'), 200);
    }
  }

  hide(animate = true) {
    if (animate) {
      this.classList.add('fade-out');
      setTimeout(() => {
        this.visible = false;
        this.classList.remove('fade-out');
      }, 200);
    } else {
      this.visible = false;
    }
  }

  render() {
    return html`
      <div class="overlay-container ${this.variant}">
        <div class="overlay-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'base-overlay': BaseOverlay;
  }
}