export function getDescription(generated?: string, provided?: string): string {
  if (provided) {
    return provided;
  } else if (generated) {
    return generated;
  } else {
    return "";
  }
}
