import { BiCategory, BiLogoProductHunt, BiSlider } from "react-icons/bi";
import { TbBinaryTree2Filled } from "react-icons/tb";
import * as Icons from "../icons";
import { BsTornado } from "react-icons/bs";
import { url } from "inspector";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/admin",
        items: [],
      },
      {
        title: "Category",
        icon: BiCategory,
        items: [
          {
            title: "Categories",
            url: "/admin/category/categories",
          },
          {
            title: "Sub Categories",
            url: "/admin/category/sub-categories",
          },
          {
            title: "Sub Sub Categories",
            url: "/admin/category/sub-sub-categories",
          },
        ],
      },
      {
        title: "Brand",
        icon: BsTornado,
        items: [
          {
            title: "Add New",
            url: "/admin/brand",
          },
          {
            title: "List",
            url: "/admin/brand/list",
          },
        ],
      },
      {
        title: "Product Attribute Setup",
        icon: TbBinaryTree2Filled,
        url: "/admin/product-attribute",
        items: [],
      },
      {
        title: "In House Products",
        icon: BiLogoProductHunt,
        items: [
          {
            title: "Product List",
            url: "/admin/product",
          },
          {
            title: "Add Product",
            url: "/admin/product/add-product",
          },
          {
            title: "Bulk Import",
            url: "/admin/product/bulk-import",
          },
          {
            title: "Request Restock List",
            url: "/admin/product/request-restock-list",
          },
        ],
      },
      {
        title: "Slider Adds",
        url: "/admin/slider",
        icon: BiSlider,
        items: [],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
