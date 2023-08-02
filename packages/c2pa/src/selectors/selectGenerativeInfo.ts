/**
 * Copyright 2023 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

import type { ManifestAssertion } from '@contentauth/toolkit';
import type { Manifest } from '../manifest';

const genAiDigitalSourceTypes = [
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
  'https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
  'http://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia',
  'https://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia',
];

declare module '../assertions' {
  interface ExtendedAssertions {
    'com.adobe.generative-ai': {
      description: string;
      version: string;
      prompt?: string;
    };
  }
}

export interface GenerativeInfo {
  assertion: ManifestAssertion;
}

/**
 * Gets any generative AI information from the manifest.
 *
 * @param manifest - Manifest to derive data from
 */
export function selectGenerativeInfo(manifest: Manifest): GenerativeInfo[] {
  const genAiAssertions = manifest.assertions.data.filter(
    (assertion: ManifestAssertion) => {
      return (
        // Check for legacy assertion
        // @ts-ignore FIXME: Update extended assertions: https://github.com/contentauth/c2pa-js/issues/109
        assertion.label === 'com.adobe.generative-ai' ||
        // Check for actions v1 assertion
        (assertion.label === 'c2pa.actions' &&
          assertion.data.actions.some((action: any) =>
            genAiDigitalSourceTypes.includes(action.digitalSourceType),
          ))
      );
    },
  );
}
