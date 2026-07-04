/**
 * RatingStars
 *
 * @deprecated Use `Rating` from `'../Rating/Rating'` instead. `RatingStars`
 * was a duplicate implementation of the same interactive star rating
 * (identical types, labels, and behavior). This module is now a thin
 * re-export that forwards to `Rating` so existing imports keep working;
 * delete the import path in a future major release.
 */
export {Rating as RatingStars} from '../Rating/Rating';
export type {RatingProps as RatingStarsProps, RatingSize as RatingStarsSize} from '../Rating/Rating';
