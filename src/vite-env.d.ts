/// <reference types="vite/client" />

interface Window {
  api: {
    openFolder: () => Promise<string[]>;
  };
}
