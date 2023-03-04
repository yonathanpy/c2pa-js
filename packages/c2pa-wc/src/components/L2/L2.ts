/**
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../../assets/svg/color/info.svg';
import { defaultStyles } from '../../styles';

declare global {
  interface HTMLElementTagNameMap {
    'cai-l2': L2;
  }

  namespace JSX {
    interface IntrinsicElements {
      'cai-l2': any;
    }
  }
}

@customElement('cai-l2')
export class L2 extends LitElement {
  /**
   * Image source - if set to undefined/null it will show a broken image icon
   */
  @property({ type: String })
  static get styles() {
    return [
      defaultStyles,
      css`
        :host {
          display: inline-block;
          width: var(--cai-indicator-size, 24px);
          height: var(--cai-indicator-size, 24px);
        }
        .icon {
          --cai-icon-width: var(--cai-indicator-size, 24px);
          --cai-icon-height: var(--cai-indicator-size, 24px);
        }
      `,
    ];
  }

  render() {
    return html` <div class="wrapper">
      <cai-popover
        interactive
        class="theme-spectrum"
        placement="left-start"
        style:z-index="{placement}"
      >
        <cai-indicator slot="trigger" />
        <cai-manifest-summary
          use:setManifest="{manifest}"
          view-more-url="{viewMoreURL}"
          slot="content"
        />
      </cai-popover>
    </div>`;
  }
}
