import { useLocalStorage } from '@vueuse/core';

export const usePrivateKey = () => useLocalStorage<string>('private-key', null);
