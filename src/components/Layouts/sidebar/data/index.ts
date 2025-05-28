import { BiCategory, BiLogoProductHunt, BiSlider } from "react-icons/bi";
import { GiPostOffice } from "react-icons/gi";
import { IoMdCart } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { GrVend } from "react-icons/gr";
import { PiUserSoundFill } from "react-icons/pi";
import { TbBinaryTree2Filled } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
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
        title: "POS",
        icon: GiPostOffice,
        url: "/admin/POS",
        items: [],
      },
    ],
  },
  {
    label: "Order Management",
    items: [
      {
        title: "Orders",
        icon: IoMdCart,
        items: [
          {
            title: "All",
            url: "/admin/orders/all",
            values: { vive: "positive", value: 111 },
          },
          {
            title: "Pending",
            url: "/admin/orders/pending",
            values: { vive: "positive", value: 55 },
          },
          {
            title: "Confirm",
            url: "/admin/orders/confirmed",
            values: { vive: "neutral-1", value: 12 },
          },
          {
            title: "Packaging",
            url: "/admin/orders/packaging",
            values: { vive: "neutral-2", value: 5 },
          },
          {
            title: "Out For Delivery",
            url: "/admin/orders/out-for-delivery",
            values: { vive: "neutral-2", value: 20 },
          },
          {
            title: "Delivered",
            url: "/admin/orders/delivered",
            values: { vive: "neutral-1", value: 65 },
          },
          {
            title: "Returned",
            url: "/admin/orders/returned",
            values: { vive: "negetive", value: 31 },
          },
          {
            title: "Failled To Deliver",
            url: "/admin/orders/failled-to-deliver",
            values: { vive: "negetive", value: 23 },
          },
          {
            title: "Canceled",
            url: "/admin/orders/cancelled",
            values: { vive: "negetive", value: 19 },
          },
        ],
      },
      {
        title: "Refund Request",
        icon: GiTakeMyMoney,
        items: [
          {
            title: "Pending",
            url: "/admin/refund-request/pending",
            values: { vive: "positive", value: 111 },
          },
          {
            title: "Approved",
            url: "/admin/refund-request/approved",
            values: { vive: "positive", value: 55 },
          },
          {
            title: "Refunded",
            url: "/admin/refund-request/refunded",
            values: { vive: "neutral-1", value: 12 },
          },
          {
            title: "Rejected",
            url: "/admin/refund-request/rejected",
            values: { vive: "neutral-2", value: 5 },
          },
        ],
      },
    ],
  },
  {
    label: "Product Management",
    items: [
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
            url: "/admin/brand/add-brand",
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
        url: "/admin/product-attributes",
        items: [],
      },
      {
        title: "In House Products",
        icon: BiLogoProductHunt,
        items: [
          {
            title: "Product List",
            url: "/admin/product/product-list",
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
    label: "User Management",
    items: [
      {
        title: "Customers",
        icon: FaUsers,
        items: [
          {
            title: "Customer List",
            url: "/admin/customers/customer-list",
          },
          {
            title: "Customer Reviews",
            url: "/admin/customers/customer-reviews",
          },
          {
            title: "Wallet",
            url: "/admin/customers/wallet",
          },
          {
            title: "Wallet Bonus Setup",
            url: "/admin/customers/wallet-bonus-setup",
          },
          {
            title: "Loyality Points",
            url: "/admin/customers/loyality-points",
          },
        ],
      },
      {
        title: "Vendors",
        icon: GrVend,
        items: [
          {
            title: "Add New Vendor",
            url: "/admin/vendors/add-new-vendor",
          },
          {
            title: "Vendor List",
            url: "/admin/vendors/vendor-list",
          },
          {
            title: "Withdraws",
            url: "/admin/vendors/withdraws",
          },
          {
            title: "Withdrawal Methods",
            url: "/admin/vendors/withdrawal-methods",
          },
        ],
      },
      {
        title: "Subscribers",
        icon: PiUserSoundFill,
        items: [
          {
            title: "View Subscriber",
            url: "/admin/subscribers/subscribers-list",
          },
        ],
      },
    ],
  },

  {
    label: "OTHERS",
    items: [
      {
        title: "Settings",
        icon: MdOutlineSettings,
        items: [
          {
            title: "Delivery Providers",
            url: "/admin/settings/delivery-providers",
          },
        ],
      },
      {
        title: "Analytics",
        icon: IoAnalytics,
        url: "/admin/analytics",
      },
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
