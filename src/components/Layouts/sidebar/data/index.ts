import { BiCategory, BiLogoProductHunt, BiSlider } from "react-icons/bi";
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
        url: "/admin/category",
        icon: BiCategory,
        items: [],
      },
      {
        title: "Brand",
        icon: BsTornado,
        url: "/admin/brand",
        items: [],
      },
      {
        title: "Product",
        icon: BiLogoProductHunt,
        items: [
          {
            title: "Product",
            url: "/admin/product",
          },
          {
            title: "Add Product",
            url: "/admin/product/add-product",
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
