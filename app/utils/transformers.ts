export function transformToThreeDigits(number: number): string {
  return number.toString().padStart(3, '0');
}

export function hectogramsToPounds(hectograms: number): number {
  // 1 hectogram is equal to 0.220462 pounds
  return Math.round(hectograms * 0.220462 * 10) / 10;
}

export function decimetersToFeet(decimeters: number): number {
  // 1 decimeter is equal to 0.328084 feet
  return Math.round(decimeters * 0.328084 * 10) / 10;
}
