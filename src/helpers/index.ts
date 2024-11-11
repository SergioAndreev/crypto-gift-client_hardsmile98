export function hexToRGB(hex: string, alpha: number) {
  if (!hex) {
    return undefined;
  }

  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function getLS(key: string) {
  return window.localStorage.getItem(key);
}

export function setLS(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function deleteLS(key: string) {
  window.localStorage.removeItem(key);
}
