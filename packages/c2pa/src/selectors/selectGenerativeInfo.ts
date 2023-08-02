/**
 * Copyright 2023 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

import type {
  Assertion,
  C2paActionsAssertion,
  ManifestAssertion,
} from '@contentauth/toolkit';
import endsWith from 'lodash/endsWith';
import type { Manifest } from '../manifest';

const genAiDigitalSourceTypes = [
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
  'https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
  'http://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia',
  'https://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia',
];

export type LegacyAssertion = Assertion<
  'com.adobe.generative-ai',
  {
    description: string;
    version: string;
    prompt?: string;
  }
>;

export type GenAiAssertion = ManifestAssertion | LegacyAssertion;

export interface GenerativeInfo {
  assertion: GenAiAssertion;
  type:
    | 'legacy'
    | 'trainedAlgorithmicMedia'
    | 'compositeWithTrainedAlgorithmicMedia';
  softwareAgent: {
    raw: string;
    formatted: string;
  };
}

/**
 * Gets any generative AI information from the manifest.
 *
 * @param manifest - Manifest to derive data from
 */
export function selectGenerativeInfo(manifest: Manifest): GenerativeInfo[] {
  return manifest.assertions.data
    .filter((assertion: GenAiAssertion) => {
      return (
        // Check for legacy assertion
        assertion.label === 'com.adobe.generative-ai' ||
        // Check for actions v1 assertion
        (assertion.label === 'c2pa.actions' &&
          assertion.data.actions.some((action: any) =>
            genAiDigitalSourceTypes.includes(action.digitalSourceType),
          ))
      );
    })
    .map((assertion: GenAiAssertion) => {
      if (assertion.label === 'com.adobe.generative-ai') {
        const { description, version } = (assertion as LegacyAssertion).data;
        const softwareAgent = [description, version]
          .map((x) => x.trim())
          .join(' ');
        return {
          assertion,
          type: 'legacy',
          softwareAgent: {
            raw: softwareAgent,
            formatted: softwareAgent,
          },
        };
      }

      // Not generative AI, this is an Actions V1 assertion
      const { actions } = (assertion as C2paActionsAssertion).data;
      const genAiActions = actions.filter((action: any) =>
        genAiDigitalSourceTypes.includes(action.digitalSourceType),
      );
      console.log('genAiActions', genAiActions);
      // const type =
    });
}
