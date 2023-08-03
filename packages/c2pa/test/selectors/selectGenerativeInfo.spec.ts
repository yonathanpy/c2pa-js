import type {
  Action,
  Assertion,
  C2paActionsAssertion,
  ManifestAssertion,
} from '@contentauth/toolkit';
import { C2pa, createC2pa, selectGenerativeInfo } from '../../';
import { GenerativeInfo } from '../../dist/src/selectors/selectGenerativeInfo';
import { genFillResults } from './genFillResult';

interface TestContext {
  c2pa: C2pa;
}

describe('selectGenerativeInfo', function () {
  describe('#selectGenerativeInfo', function () {
    beforeAll(async function (this: TestContext) {
      this.c2pa = await createC2pa({
        wasmSrc: './dist/assets/wasm/toolkit_bg.wasm',
        workerSrc: './dist/c2pa.worker.js',
      });
    });

    fit('should find gen AI assertions using v1 actions', async function (this: TestContext) {
      const result = await this.c2pa.read(
        './node_modules/@contentauth/testing/fixtures/images/gen-fill.jpg',
      );
      const manifest = result.manifestStore?.activeManifest;
      expect(manifest).not.toBeNull();
      if (manifest) {
        const genAssertions = selectGenerativeInfo(manifest);
        console.log('genAssertions', genAssertions);
        expect(genAssertions).toEqual([
          {
            assertion: { label: 'c2pa.actions', data: jasmine.any(Object) },
            action: {
              action: 'c2pa.placed',
              digitalSourceType:
                'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
              parameters: jasmine.any(Object),
              softwareAgent: 'Adobe Firefly',
            },
            type: 'trainedAlgorithmicMedia',
            softwareAgent: 'Adobe Firefly',
          },
          {
            assertion: { label: 'c2pa.actions', data: jasmine.any(Object) },
            action: {
              action: 'c2pa.placed',
              digitalSourceType:
                'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
              parameters: jasmine.any(Object),
              softwareAgent: 'Adobe Firefly',
            },
            type: 'trainedAlgorithmicMedia',
            softwareAgent: 'Adobe Firefly',
          },
          {
            assertion: {
              label: 'c2pa.actions',
              data: jasmine.any(Object),
            },
            action: {
              action: 'c2pa.placed',
              digitalSourceType:
                'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
              parameters: jasmine.any(Object),
              softwareAgent: 'Adobe Firefly',
            },
            type: 'trainedAlgorithmicMedia',
            softwareAgent: 'Adobe Firefly',
          },
        ]);
      }
    });
    //use toEuqal
    // test('should detect if a file has a gen AI assertion using v1 actions (trained)', async () => {
    //   const asset: FileAsset = {
    //     path: resolve('tests/fixtures/gen-fill'),
    //     mimeType: 'image/jpeg',
    //   };
    //   const result = await c2pa.readFileWithoutExtension(asset);
    //   expect(result).not.toBeNull();
    //   if (result) {
    //     const hasGenAi = c2pa.hasGenAiAssertion(result);
    //     expect(hasGenAi).toEqual(true);
    //   }
    // });

    // test('should detect if a file has a gen AI assertion using v1 actions (composite)', async () => {
    //   const asset: FileAsset = {
    //     path: resolve('tests/fixtures/composite-dst.jpg'),
    //     mimeType: 'image/jpeg',
    //   };
    //   const result = await c2pa.read(asset);
    //   expect(result).not.toBeNull();
    //   if (result) {
    //     const hasGenAi = c2pa.hasGenAiAssertion(result);
    //     expect(hasGenAi).toEqual(true);
    //   }
    // });

    // test('should detect if a file has a gen AI assertion using a legacy assertion', async () => {
    //   const asset: FileAsset = {
    //     path: resolve('tests/fixtures/firefly.jpg'),
    //   };
    //   const result = await c2pa.read(asset);
    //   expect(result).not.toBeNull();
    //   if (result) {
    //     const hasGenAi = c2pa.hasGenAiAssertion(result);
    //     expect(hasGenAi).toEqual(true);
    //   }
    // });

    // test('should detect if a file does not have a gen AI assertion', async () => {
    //   const asset: FileAsset = {
    //     path: resolve('tests/fixtures/CAICAI.jpg'),
    //   };
    //   const result = await c2pa.read(asset);
    //   expect(result).not.toBeNull();
    //   if (result) {
    //     const hasGenAi = c2pa.hasGenAiAssertion(result);
    //     expect(hasGenAi).toEqual(false);
    //   }
    // });
  });
});
