import {
  default as initToolkit,
  getManifestStoreFromArrayBuffer,
} from '../pkg/toolkit';

describe('@contentauth/toolkit', function () {
  beforeAll(async function () {
    await initToolkit('pkg/toolkit_bg.wasm');
  });

  describe('getManifestStoreFromArrayBuffer()', function () {
    it('should work', async function () {
      const image = await fetch(
        `./node_modules/@contentauth/testing/fixtures/images/cloud.jpg`,
      );
      const blob = await image.blob();
      const buffer = await blob.arrayBuffer();
      try {
        const data = await getManifestStoreFromArrayBuffer(buffer, blob.type);
      } catch (err) {
        console.log('Rust Err name', err.name);
        console.log('Rust URL', err.url);
      }
    });
  });
});
