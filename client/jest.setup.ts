import "@testing-library/jest-native/extend-expect";

jest.mock(
  "expo-file-system/legacy",
  () => ({
    cacheDirectory: "/tmp/",
    FileSystemSessionType: { BACKGROUND: 0 },
    uploadAsync: jest.fn(),
    downloadAsync: jest.fn(),
    readAsStringAsync: jest.fn(),
    deleteAsync: jest.fn(),
  }),
  { virtual: true },
);
