export const generateId = () => {
  if (typeof globalThis !== 'undefined') {
    const cryptoObj = (globalThis as typeof globalThis & { crypto?: Crypto }).crypto;
    if (cryptoObj?.randomUUID) {
      return cryptoObj.randomUUID();
    }
    if (cryptoObj?.getRandomValues) {
      const array = new Uint32Array(4);
      cryptoObj.getRandomValues(array);
      return Array.from(array, (dec) => dec.toString(16).padStart(8, '0')).join('');
    }
  }

  return `id-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
};
