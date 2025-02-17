import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Button, ButtonClickEvent, ButtonProps } from './Button';


export default function generateWebComponent(store: any) {
  class ReactButtonElement extends HTMLElement {
    private mountPoint: HTMLDivElement | null = null;
    private root: ReactDOM.Root | null = null;
    private props: ButtonProps = {};

    static get observedAttributes(): string[] {
      return ['label', 'variant'];
    }

    constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(event: React.MouseEvent): void {
      const customEvent: ButtonClickEvent = new CustomEvent('button-click', {
        detail: { event },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(customEvent);
    }

    connectedCallback(): void {
      this.mountPoint = document.createElement('div');
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);

      if (this.mountPoint) {
        this.root = ReactDOM.createRoot(this.mountPoint);
        this.updateProps();
        this.render();
      }
    }

    disconnectedCallback(): void {
      if (this.root) {
        this.root.unmount();
      }
    }

    attributeChangedCallback(
      oldValue: string,
      newValue: string
    ): void {
      if (oldValue !== newValue) {
        this.updateProps();
        this.render();
      }
    }

    private updateProps(): void {
      this.props = {
        label: this.getAttribute('label') || '',
        variant: this.getAttribute('variant') as ButtonProps['variant'] || 'primary',
      };
    }

    private render(): void {
      if (!this.root) return;

      this.root.render(
        <React.StrictMode>
          <Button {...this.props} store={store} />
        </React.StrictMode>
      );
    }
  }

  // Register the web component
  customElements.define('react-button', ReactButtonElement);
}

// export default ReactButtonElement;