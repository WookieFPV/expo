import { vol } from 'memfs';

import rnFixture from '../../../prebuild/__tests__/fixtures/react-native-project';
import { resolveOptionsAsync } from '../resolveOptions';

jest.mock('../../../utils/port');

jest.mock('../resolveDevice', () => ({
  resolveDeviceAsync: jest.fn(async () => ({
    device: {
      name: 'mock',
      pid: '123',
    },
  })),
}));

const fixture = {
  ...rnFixture,
  'package.json': JSON.stringify({}),
  'node_modules/expo/package.json': JSON.stringify({
    version: '53.0.0',
  }),
};

describe(resolveOptionsAsync, () => {
  afterEach(() => vol.reset());

  it(`resolves default options`, async () => {
    vol.fromJSON(fixture, '/');

    expect(await resolveOptionsAsync('/', {})).toEqual({
      apkVariantDirectory: '/android/app/build/outputs/apk/debug',
      appName: 'app',
      buildCache: false,
      buildType: 'debug',
      architectures: '',
      device: {
        device: {
          name: 'mock',
          pid: '123',
        },
      },
      flavors: [],
      install: false,
      launchActivity: 'com.bacon.mydevicefamilyproject/.MainActivity',
      mainActivity: '.MainActivity',
      packageName: 'com.bacon.mydevicefamilyproject',
      port: 8081,
      shouldStartBundler: true,
      variant: 'debug',
    });
  });
  it(`resolves complex options`, async () => {
    vol.fromJSON(fixture, '/');

    expect(
      await resolveOptionsAsync('/', {
        buildCache: true,
        bundler: true,
        device: 'search',
        install: true,
        port: 8081,
        variant: 'firstSecondThird',
        appId: 'dev.expo.test',
      })
    ).toEqual({
      apkVariantDirectory: '/android/app/build/outputs/apk/first/second/third',
      appName: 'app',
      buildCache: true,
      buildType: 'third',
      architectures: '',
      device: {
        device: {
          name: 'mock',
          pid: '123',
        },
      },
      flavors: ['first', 'second'],
      install: true,
      launchActivity: 'dev.expo.test/com.bacon.mydevicefamilyproject.MainActivity',
      mainActivity: '.MainActivity',
      packageName: 'com.bacon.mydevicefamilyproject',
      customAppId: 'dev.expo.test',
      port: 8081,
      shouldStartBundler: true,
      variant: 'firstSecondThird',
    });
  });
});
