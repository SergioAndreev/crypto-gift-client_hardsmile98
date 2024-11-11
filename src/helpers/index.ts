function hexToRGB(hex: string, alpha: number) {
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

function getLS(key: string) {
  return window.localStorage.getItem(key);
}

function setLS(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

function deleteLS(key: string) {
  window.localStorage.removeItem(key);
}

export { hexToRGB, getLS, setLS, deleteLS };
