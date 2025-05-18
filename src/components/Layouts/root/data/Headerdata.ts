type MenuItem = {
  name: string;
  path: string;
};

type MenuSection = {
  category: string;
  items: MenuItem[];
};

export const hoverInfo: MenuSection[] = [
  {
    category: "Top Wear",
    items: [
      { name: "T-Shirts", path: "/t-shirts" },
      { name: "Casual Shirts", path: "/casual-shirts" },
      { name: "Formal Shirts", path: "/formal-shirts" },
      { name: "Blazers & Coats", path: "/blazers-coats" },
      { name: "Suits", path: "/suits" },
      { name: "Jackets", path: "/jackets" },
    ],
  },
  {
    category: "Bottom Wear",
    items: [
      { name: "Jeans", path: "/jeans" },
      { name: "Trousers", path: "/trousers" },
      { name: "Shorts", path: "/shorts" },
      { name: "Track Pants", path: "/track-pants" },
      { name: "Chinos", path: "/chinos" },
      { name: "Cargo Pants", path: "/cargo-pants" },
    ],
  },
  {
    category: "Footwear",
    items: [
      { name: "Casual Shoes", path: "/casual-shoes" },
      { name: "Formal Shoes", path: "/formal-shoes" },
      { name: "Sneakers", path: "/sneakers" },
      { name: "Sandals", path: "/sandals" },
      { name: "Loafers", path: "/loafers" },
      { name: "Boots", path: "/boots" },
    ],
  },
];
