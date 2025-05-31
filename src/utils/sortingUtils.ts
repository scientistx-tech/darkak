export interface SortItem {
  value: string;
  name: string;
}

// Common sorting options that can be reused across different components
export const DEFAULT_SORTING_OPTIONS: SortItem[] = [
  {
    value: "newer",
    name: "Newer",
  },
  {
    value: "popular",
    name: "Popular",
  },
  {
    value: "older",
    name: "Older",
  },
  {
    value: "low-to-high",
    name: "Low to High Price",
  },
  {
    value: "high-to-low",
    name: "High to Low Price",
  },
];

// Product sorting options
export const PRODUCT_SORTING_OPTIONS: SortItem[] = [
  ...DEFAULT_SORTING_OPTIONS,
  {
    value: "rating-high-to-low",
    name: "Highest Rated",
  },
  {
    value: "rating-low-to-high",
    name: "Lowest Rated",
  },
];

// Article/Blog sorting options
export const ARTICLE_SORTING_OPTIONS: SortItem[] = [
  {
    value: "newer",
    name: "Latest",
  },
  {
    value: "older",
    name: "Oldest",
  },
  {
    value: "popular",
    name: "Most Popular",
  },
  {
    value: "alphabetical",
    name: "A-Z",
  },
];

/**
 * Generic sorting function that can handle different data types
 * @param items - Array of items to sort
 * @param sortType - Type of sorting to apply
 * @param customFields - Custom field mappings for specific data structures
 */
export function sortItems<T = any>(
  items: T[], 
  sortType: string, 
  customFields?: {
    dateField?: keyof T | string[];
    priceField?: keyof T | string[];
    popularityField?: keyof T | string[];
    ratingField?: keyof T | string[];
    nameField?: keyof T | string[];
  }
): T[] {
  const sortedItems = [...items];
  
  // Helper function to get field value with fallback options
  const getFieldValue = (item: any, fieldOptions: keyof T | string[] | undefined, defaultFields: string[]) => {
    if (!fieldOptions) fieldOptions = defaultFields;
    
    const fields = Array.isArray(fieldOptions) ? fieldOptions : [fieldOptions as string];
    
    for (const field of fields) {
      if (item[field] !== undefined && item[field] !== null) {
        return item[field];
      }
    }
    return 0;
  };

  switch (sortType) {
    case "newer":
      return sortedItems.sort((a, b) => {
        const dateA = new Date(getFieldValue(a, customFields?.dateField, ['createdAt', 'created_at', 'publishedAt', 'date'])).getTime();
        const dateB = new Date(getFieldValue(b, customFields?.dateField, ['createdAt', 'created_at', 'publishedAt', 'date'])).getTime();
        return dateB - dateA; // Newest first
      });
    
    case "older":
      return sortedItems.sort((a, b) => {
        const dateA = new Date(getFieldValue(a, customFields?.dateField, ['createdAt', 'created_at', 'publishedAt', 'date'])).getTime();
        const dateB = new Date(getFieldValue(b, customFields?.dateField, ['createdAt', 'created_at', 'publishedAt', 'date'])).getTime();
        return dateA - dateB; // Oldest first
      });
    
    case "popular":
      return sortedItems.sort((a, b) => {
        const popularityA = getFieldValue(a, customFields?.popularityField, ['popularity', 'views', 'sales', 'viewCount']);
        const popularityB = getFieldValue(b, customFields?.popularityField, ['popularity', 'views', 'sales', 'viewCount']);
        return popularityB - popularityA; // Most popular first
      });
    
    case "low-to-high":
      return sortedItems.sort((a, b) => {
        const priceA = parseFloat(getFieldValue(a, customFields?.priceField, ['price', 'salePrice', 'regularPrice', 'cost']));
        const priceB = parseFloat(getFieldValue(b, customFields?.priceField, ['price', 'salePrice', 'regularPrice', 'cost']));
        return priceA - priceB; // Lowest price first
      });
    
    case "high-to-low":
      return sortedItems.sort((a, b) => {
        const priceA = parseFloat(getFieldValue(a, customFields?.priceField, ['price', 'salePrice', 'regularPrice', 'cost']));
        const priceB = parseFloat(getFieldValue(b, customFields?.priceField, ['price', 'salePrice', 'regularPrice', 'cost']));
        return priceB - priceA; // Highest price first
      });
    
    case "rating-high-to-low":
      return sortedItems.sort((a, b) => {
        const ratingA = parseFloat(getFieldValue(a, customFields?.ratingField, ['rating', 'averageRating', 'score']));
        const ratingB = parseFloat(getFieldValue(b, customFields?.ratingField, ['rating', 'averageRating', 'score']));
        return ratingB - ratingA; // Highest rating first
      });
    
    case "rating-low-to-high":
      return sortedItems.sort((a, b) => {
        const ratingA = parseFloat(getFieldValue(a, customFields?.ratingField, ['rating', 'averageRating', 'score']));
        const ratingB = parseFloat(getFieldValue(b, customFields?.ratingField, ['rating', 'averageRating', 'score']));
        return ratingA - ratingB; // Lowest rating first
      });
    
    case "alphabetical":
      return sortedItems.sort((a, b) => {
        const nameA = String(getFieldValue(a, customFields?.nameField, ['name', 'title', 'label'])).toLowerCase();
        const nameB = String(getFieldValue(b, customFields?.nameField, ['name', 'title', 'label'])).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    
    case "alphabetical-desc":
      return sortedItems.sort((a, b) => {
        const nameA = String(getFieldValue(a, customFields?.nameField, ['name', 'title', 'label'])).toLowerCase();
        const nameB = String(getFieldValue(b, customFields?.nameField, ['name', 'title', 'label'])).toLowerCase();
        return nameB.localeCompare(nameA);
      });
    
    default:
      return sortedItems;
  }
}

/**
 * Hook for managing sort state with URL synchronization
 */
export function useSortingState(
  searchParams: URLSearchParams,
  router: any,
  defaultSort: string = "newer"
) {
  const sortParam = searchParams.get("sort") || defaultSort;
  
  const updateSortInURL = (sortValue: string, resetPage: boolean = true) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", sortValue);
    
    if (resetPage) {
      newParams.set("page", "1");
    }
    
    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };
  
  return {
    currentSort: sortParam,
    updateSort: updateSortInURL
  };
}