// categoryTypes.ts

export interface SubSubCategory {
  id: number;
  title: string;
  subCategoryId: number;
  categoryId: number;
}

export interface SubCategory {
  id: number;
  title: string;
  categoryId: number;
  sub_sub_category: SubSubCategory[];
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  serial: number;
  isActive: boolean;
  sub_category: SubCategory[];
}

// Export all together if needed
