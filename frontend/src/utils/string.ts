export function convertAllUnderscoresToHyphens(string: string) {
  return string.replaceAll(/_/g, "-");
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}
