/**
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

import { L2ManifestStore } from 'c2pa';
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
        #popover {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      `,
    ];
  }

  manifestStore: L2ManifestStore | undefined;

  viewMoreURL: string | undefined;

  render() {
    if (!this.manifestStore) {
      return null;
    }
    return html` <div class="wrapper">
      <cai-popover
        id="popover"
        interactive
        class="theme-spectrum"
        placement="left-start"
      >
        <cai-indicator slot="trigger" />
        <cai-manifest-summary
          .manifestStore=${this.manifestStore}
          .viewMoreUrl=${this.viewMoreURL}
          slot="content"
        />
      </cai-popover>
    </div>`;
  }
}
