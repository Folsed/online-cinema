export enum EAllowedMediaSort {
    Popularity = 'popularity',
    NewlyAdded = 'newly_added',
    Rating = 'rating',
}

export type TSortBy = typeof EAllowedMediaSort[keyof typeof EAllowedMediaSort];
