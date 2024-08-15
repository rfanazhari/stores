export function calculateStarRating(rating: number): number {
  return Math.round(rating * 2) / 2;
}