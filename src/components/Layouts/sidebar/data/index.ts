import { BiCategory, BiLogoProductHunt, BiSlider } from 'react-icons/bi';
import { GiPostOffice } from 'react-icons/gi';
import { IoMdCart } from 'react-icons/io';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import { GrVend } from 'react-icons/gr';
import { PiUserSoundFill } from 'react-icons/pi';
import { TbBinaryTree2Filled } from 'react-icons/tb';
import { IoAnalytics } from 'react-icons/io5';
import { MdOutlineSettings } from 'react-icons/md';
import { BiSolidOffer } from 'react-icons/bi';
import { MdAddModerator } from 'react-icons/md';
import { AiFillMessage } from "react-icons/ai";
import * as Icons from '../icons';
import { BsTornado } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { FaRegListAlt } from 'react-icons/fa';
import { FaHeadphones } from "react-icons/fa6";
export const getSellerNavData = (data: any) => [
  {
    label: 'Seller Dashboard',
    items: [
      {
        title: 'My Products',
        icon: BiLogoProductHunt,
        items: [
          // {
          //   title: "Product List",
          //   url: "/seller/product/product-list",
          //   accessKey: "seller-product-list",
          // },
          {
            title: 'Pending Product List',
            url: '/seller/product/pending-product-list',
            accessKey: 'seller-pending-product-list',
          },
          {
            title: 'Approved Product List',
            url: '/seller/product/approved-product-list',
            accessKey: 'seller-approved-product-list',
          },
          {
            title: 'Rejected Product List',
            url: '/seller/product/rejected-product-list',
            accessKey: 'seller-rejected-product-list',
          },
          {
            title: 'Request Product List',
            url: '/seller/product/request-product-list',
            accessKey: 'seller-request-product-list',
          },
          {
            title: 'Add Product',
            url: '/seller/product/product-add',
            accessKey: 'seller-product-add',
          },
        ],
      },

      {
        title: 'Orders',
        // accessKey: "orders",
        icon: IoMdCart,
        items: [
          {
            title: 'All',
            url: '/seller/orders/all',
            accessKey: 'order-all',
            values: { vive: 'positive', value: data?.totalOrder },
          },
          {
            title: 'Pending',
            url: '/seller/orders/pending',
            accessKey: 'order-pending',
            values: { vive: 'positive', value: data?.ordersCount[0].pending },
          },
          {
            title: 'Confirm',
            url: '/seller/orders/confirmed',
            accessKey: 'order-confirm',
            values: {
              vive: 'neutral-1',
              value: data?.ordersCount[1].confirmed,
            },
          },
          {
            title: 'Packaging',
            url: '/seller/orders/packaging',
            accessKey: 'order-packaging',
            values: {
              vive: 'neutral-2',
              value: data?.ordersCount[2].packaging,
            },
          },
          {
            title: 'Out For Delivery',
            url: '/seller/orders/out-for-delivery',
            accessKey: 'order-out-for-delivery',
            values: {
              vive: 'neutral-2',
              value: data?.ordersCount[3].out_for_delivery,
            },
          },
          {
            title: 'Delivered',
            url: '/seller/orders/delivered',
            accessKey: 'order-delivered',
            values: {
              vive: 'neutral-1',
              value: data?.ordersCount[4].delivered,
            },
          },
          {
            title: 'Returned',
            url: '/seller/orders/returned',
            accessKey: 'order-returned',
            values: {
              vive: 'negetive',
              value: data?.ordersCount[6].returned,
            },
          },
          {
            title: 'Failled To Deliver',
            url: '/seller/orders/failled-to-deliver',
            accessKey: 'order-failed-to-deliver',
            values: {
              vive: 'negetive',
              value: data?.ordersCount[7].failed_to_delivery,
            },
          },
          {
            title: 'Canceled',
            url: '/seller/orders/cancelled',
            accessKey: 'order-cancelled',

            values: {
              vive: 'negetive',
              value: data?.ordersCount[5].cancelled,
            },
          },
        ],
      },
      {
        title: 'Refund Request',
        // accessKey: "refund-request",
        icon: GiTakeMyMoney,
        items: [
          {
            title: 'Pending',
            url: '/seller/refund-request/pending',
            accessKey: 'refund-pending',
          },
          {
            title: 'Approved',
            url: '/seller/refund-request/approved',
            accessKey: 'refund-approved',
          },
          {
            title: 'Under Review',
            url: '/seller/refund-request/under-review',
            accessKey: 'refund-under-review',
          },
          {
            title: 'Refunded',
            url: '/seller/refund-request/refunded',
            accessKey: 'refund-refunded',
          },
          {
            title: 'Rejected',
            url: '/seller/refund-request/rejected',
            accessKey: 'refund-rejected',
          },
        ],
      },
      {
        title: 'Customer Reviews',
        accessKey: 'customer-review',
        icon: FaUsers,
        url: '/seller/customer-reviews',
      },
      {
        title: 'Coupon',
        accessKey: 'coupon',
        icon: BiSolidOffer,
        url: '/seller/cupon',
      },
    ],
  },
];

export const getNavData = (data: any, vendorData: any) => [
  {
    label: 'MAIN MENU',
    items: [
      {
        title: 'Dashboard',
        icon: Icons.HomeIcon,
        // accessKey: "dashboard",
        url: '/admin',
        items: [],
      },
      {
        title: 'POS',
        icon: GiPostOffice,
        accessKey: 'pos',
        url: '/admin/pos',
        items: [],
      },
    ],
  },
  {
    label: 'Order Management',
    items: [
      {
        title: 'Orders',
        // accessKey: "orders",
        icon: IoMdCart,
        items: [
          {
            title: 'All',
            url: '/admin/orders/all',
            accessKey: 'order-all',
            values: { vive: 'positive', value: data?.totalOrder },
          },
          {
            title: 'Pending',
            url: '/admin/orders/pending',
            accessKey: 'order-pending',
            values: { vive: 'positive', value: data?.ordersCount[0].pending },
          },
          {
            title: 'Confirm',
            url: '/admin/orders/confirmed',
            accessKey: 'order-confirm',
            values: {
              vive: 'neutral-1',
              value: data?.ordersCount[1].confirmed,
            },
          },
          {
            title: 'Packaging',
            url: '/admin/orders/packaging',
            accessKey: 'order-packaging',
            values: {
              vive: 'neutral-2',
              value: data?.ordersCount[2].packaging,
            },
          },
          {
            title: 'Out For Delivery',
            url: '/admin/orders/out-for-delivery',
            accessKey: 'order-out-for-delivery',
            values: {
              vive: 'neutral-2',
              value: data?.ordersCount[3].out_for_delivery,
            },
          },
          {
            title: 'Delivered',
            url: '/admin/orders/delivered',
            accessKey: 'order-delivered',
            values: {
              vive: 'neutral-1',
              value: data?.ordersCount[4].delivered,
            },
          },
          {
            title: 'Returned',
            url: '/admin/orders/returned',
            accessKey: 'order-returned',
            values: { vive: 'negetive', value: data?.ordersCount[6].returned },
          },
          {
            title: 'Failled To Deliver',
            url: '/admin/orders/failled-to-deliver',
            accessKey: 'order-failed-to-deliver',
            values: {
              vive: 'negetive',
              value: data?.ordersCount[7].failed_to_delivery,
            },
          },
          {
            title: 'Canceled',
            url: '/admin/orders/cancelled',
            accessKey: 'order-cancelled',

            values: { vive: 'negetive', value: data?.ordersCount[5].cancelled },
          },
        ],
      },
      {
        title: 'Refund Request',
        // accessKey: "refund-request",
        icon: GiTakeMyMoney,
        items: [
          {
            title: 'Pending',
            url: '/admin/refund-request/pending',
            accessKey: 'refund-pending',
          },
          {
            title: 'Approved',
            url: '/admin/refund-request/approved',
            accessKey: 'refund-approved',
          },
          {
            title: 'Under Review',
            url: '/admin/refund-request/under-review',
            accessKey: 'refund-under-review',
          },
          {
            title: 'Refunded',
            url: '/admin/refund-request/refunded',
            accessKey: 'refund-refunded',
          },
          {
            title: 'Rejected',
            url: '/admin/refund-request/rejected',
            accessKey: 'refund-rejected',
          },
        ],
      },
    ],
  },
  {
    label: 'Product Management',
    items: [
      {
        title: 'Category',
        icon: BiCategory,
        items: [
          {
            title: 'Categories',
            accessKey: 'category',
            url: '/admin/category/categories',
          },
          {
            title: 'Sub Categories',
            accessKey: 'sub-category',
            url: '/admin/category/sub-categories',
          },
          {
            title: 'Sub Sub Categories',
            accessKey: 'sub-sub-category',
            url: '/admin/category/sub-sub-categories',
          },
        ],
      },
      {
        title: 'Brand',
        icon: BsTornado,
        items: [
          {
            title: 'Add New',
            accessKey: 'brand',
            url: '/admin/brand/add-brand',
          },
          {
            title: 'List',
            accessKey: 'brand',
            url: '/admin/brand/list',
          },
        ],
      },
      {
        title: 'Product Attribute Setup',
        icon: TbBinaryTree2Filled,
        url: '/admin/product-attributes',
        accessKey: 'attribute',
        items: [],
      },
      {
        title: 'In House Products',
        icon: BiLogoProductHunt,
        items: [
          {
            title: 'Product List',
            accessKey: 'product-list',

            url: '/admin/product/product-list',
          },
          {
            title: 'Add Product',
            accessKey: 'product-add',

            url: '/admin/product/add-product',
          },
          {
            title: 'Bulk Import',
            accessKey: 'bulk-product',
            url: '/admin/product/bulk-import',
          },
          {
            title: 'Request Restock List',
            accessKey: 'restock-product',
            url: '/admin/product/request-restock-list',
          },
        ],
      },
      {
        title: 'Slider Adds',
        url: '/admin/slider',
        accessKey: 'sliders',
        icon: BiSlider,
        items: [],
      },
      // {
      //   title: "Ali Express",
      //   accesskey: "ali-express",
      //   // url: "/admin/ali-express-products",
      //   icon: SiDevexpress,
      //   items: [
      //     {
      //       title: "Add Product",
      //       accessKey: "ali-express-add-product",
      //       url: "/admin/ali-express-products/add-product",
      //     },
      //     {
      //       title: "Product List",
      //       accessKey: "ali-express-product-list",
      //       url: "/admin/ali-express-products/product-list",
      //     },
      //   ],
      // },
    ],
  },
  {
    label: 'Ali Express',
    items: [
      {
        title: 'Add Product',
        icon: IoMdAddCircle,
        accessKey: 'ali-express-add-product',
        url: '/admin/ali-express-products/add-product',
        items: [],
      },
      {
        title: 'Product List',
        icon: FaRegListAlt,
        accessKey: 'ali-express-product-list',
        url: '/admin/ali-express-products/product-list',
        items: [],
      },
      {
        title: 'Orders',
        // accessKey: "orders",
        icon: IoMdCart,
        items: [
          {
            title: 'All',
            url: '/admin/ali-express-products/orders/all',
            accessKey: 'order-all',
            values: { vive: 'positive', value: data?.totalOrder },
          },
          {
            title: 'Pending',
            url: '/admin/ali-express-products/orders/pending',
            accessKey: 'order-pending',
            values: { vive: 'positive', value: data?.ordersCount[0].pending },
          },
          {
            title: 'Confirm',
            url: '/admin/ali-express-products/orders/confirmed',
            accessKey: 'order-confirm',
            values: {
              vive: 'neutral-1',
              value: data?.ordersCount[1].confirmed,
            },
          },
          {
            title: 'Packaging',
            url: '/admin/ali-express-products/orders/packaging',
            accessKey: 'order-packaging',
            values: {
              vive: 'neutral-2',
              value: data?.ordersCount[2].packaging,
            },
          },
          {
            title: 'Out For Delivery',
            url: '/admin/ali-express-products/orders/out-for-delivery',
            accessKey: 'order-out-for-delivery',
            values: {
              vive: 'neutral-2',
              value: data?.ordersCount[3].out_for_delivery,
            },
          },
          {
            title: 'Delivered',
            url: '/admin/ali-express-products/orders/delivered',
            accessKey: 'order-delivered',
            values: {
              vive: 'neutral-1',
              value: data?.ordersCount[4].delivered,
            },
          },
          {
            title: 'Returned',
            url: '/admin/ali-express-products/orders/returned',
            accessKey: 'order-returned',
            values: { vive: 'negetive', value: data?.ordersCount[6].returned },
          },
          {
            title: 'Failled To Deliver',
            url: '/admin/ali-express-products/orders/failled-to-deliver',
            accessKey: 'order-failed-to-deliver',
            values: {
              vive: 'negetive',
              value: data?.ordersCount[7].failed_to_delivery,
            },
          },
          {
            title: 'Canceled',
            url: '/admin/ali-express-products/orders/cancelled',
            accessKey: 'order-cancelled',

            values: { vive: 'negetive', value: data?.ordersCount[5].cancelled },
          },
        ],
      },
    ],
  },
  {
    label: 'User Management',
    items: [
      {
        title: 'Customers',
        icon: FaUsers,
        items: [
          {
            title: 'Customer List',
            accessKey: 'customer-list',
            url: '/admin/customers/customer-list',
          },
          {
            title: 'Customer Reviews',
            accessKey: 'customer-review',
            url: '/admin/customers/customer-reviews',
          },
          // {
          //   title: "Wallet",
          //   url: "/admin/customers/wallet",
          // },
          // {
          //   title: "Wallet Bonus Setup",
          //   url: "/admin/customers/wallet-bonus-setup",
          // },
          // {
          //   title: "Loyality Points",
          //   url: "/admin/customers/loyality-points",
          // },
        ],
      },
      {
        title: 'Vendors',
        icon: GrVend,
        // accessKey: "vendor",
        items: [
          {
            title: 'Add New Vendor',
            accessKey: 'add-vendor',
            url: '/admin/vendors/add-new-vendor',
          },
          {
            title: 'Vendor List',
            accessKey: 'vendor-list',
            url: '/admin/vendors/vendor-list',
          },
          {
            title: 'Requested Products',
            accessKey: 'vendor-requested-products',
            url: '/admin/vendors/requested-products',
            values: { vive: 'neutral-1', value: vendorData?.newRequest },
          },
          {
            title: 'Approved Products',
            accessKey: 'vendor-approved-products',
            url: '/admin/vendors/approved-products',
            values: { vive: 'positive', value: vendorData?.approved },
          },
          {
            title: 'Rejected Products',
            accessKey: 'vendor-rejected-products',
            url: '/admin/vendors/rejected-products',
            values: { vive: 'negetive', value: vendorData?.rejected },
          },
          {
            title: 'Restock Request',
            accessKey: 'vendor-restock-request',
            url: '/admin/vendors/restock-request',
            values: { vive: 'neutral-2', value: vendorData?.updateRequest },
          },
        ],
      },

      {
        title: 'Subscribers',
        icon: PiUserSoundFill,
        accessKey: 'subscriber',
        url: '/admin/subscribers',
        items: [],
      },
      {
        title: 'Moderator',
        icon: MdAddModerator,
        accessKey: 'moderator',
        url: '/admin/moderator',
      },
      {
        title: 'Contact',
        icon: FaHeadphones,
        accessKey: 'contact',
        url: '/admin/contact',
      },
      {
        title: 'Message',
        icon: AiFillMessage,
        accessKey: 'chat',
        url: '/admin/chat',
      },
    ],
  },
  {
    label: 'Promotion Management',
    items: [
      {
        title: 'Coupon',
        accessKey: 'coupon',
        icon: BiSolidOffer,
        url: '/admin/promotion-management/cupon',
      },
    ],
  },
  {
    label: 'OTHERS',
    items: [
      {
        title: 'Settings',
        accessKey: 'settings',
        icon: MdOutlineSettings,
        items: [
          {
            title: 'Delivery Providers',
            url: '/admin/settings/delivery-providers',
          },
          // {
          //   title: "Site Settings",
          //   url: "/admin/settings/site-settings",
          // },
        ],
      },

      {
        title: 'SEO',
        accessKey: 'seo',
        icon: RiseOutlined,
        items: [
          {
            title: 'Home Page',
            url: '/admin/seo/home-page',
            accessKey: 'seo',
          },
          {
            title: 'Category Page',
            url: '/admin/seo/category-page',
            accessKey: 'seo',
          },
          {
            title: 'Explore Page',
            url: '/admin/seo/explore-page',
            accessKey: 'explore',
          },
          {
            title: 'Product Page',
            url: '/admin/seo/product-page',
            accessKey: 'seo',
          },
          {
            title: 'Vendor Page',
            url: '/admin/seo/vendor-page',
            accessKey: 'seo',
          },
          {
            title: 'Contact Us Page',
            url: '/admin/seo/contact-us-page',
            accessKey: 'seo',
          },
          {
            title: 'CheckOut Page',
            url: '/admin/seo/checkout-page',
            accessKey: 'seo',
          },
          {
            title: 'About Us Page',
            url: '/admin/seo/about-us-page',
            accessKey: 'seo',
          },
          {
            title: 'Private Policy Page',
            url: '/admin/seo/private-policy-page',
            accessKey: 'seo',
          },
          {
            title: 'Terms Condition Page',
            url: '/admin/seo/terms-condition-page',
            accessKey: 'seo',
          },
          {
            title: 'FAQ Page',
            url: '/admin/seo/faq-page',
            accessKey: 'seo',
          },
          {
            title: 'SignUp Page',
            url: '/admin/seo/signup-page',
            accessKey: 'seo',
          },
          {
            title: 'LogIn Page',
            url: '/admin/seo/login-page',
            accessKey: 'seo',
          },
          {
            title: 'Forgot Password Page',
            url: '/admin/seo/forgot-password-page',
            accessKey: 'seo',
          },
          {
            title: 'Moderator LonIn Page',
            url: '/admin/seo/moderator-login-page',
            accessKey: 'seo',
          },
          
        ],
      },
      {
        title: 'Analytics',
        accessKey: 'analytics',
        icon: IoAnalytics,
        url: '/admin/analytics',
      },
    ],
  },
];

import { useSelector } from 'react-redux';
import { useDashboardDataQuery } from '@/redux/services/admin/adminDashboard';
import { useGetVendorsProductRequestCountsQuery } from '@/redux/services/admin/adminVendorApis';
import Item from 'antd/es/list/Item';
import { RiseOutlined } from '@ant-design/icons';

export const useFilteredNavData = () => {
  const moderatorAccess = useSelector((state: any) => state.auth.user?.moderator_access || []);

  const accessKeys = moderatorAccess.map((a: any) => a.access);

  // Fetch dashboard data
  const { data: dashboardData } = useDashboardDataQuery({});
  const { data: vendorProductsCount } = useGetVendorsProductRequestCountsQuery({});

  // Get nav data with API data
  const NAV_DATA = getNavData(dashboardData, vendorProductsCount);

  const filterItems = (items: any[]): any[] => {
    return items
      .map((item) => {
        const hasAccess = !item.accessKey || accessKeys.includes(item.accessKey);

        if (item.items && item.items.length > 0) {
          const filteredChildren = filterItems(item.items);

          if (filteredChildren.length === 0) {
            return null;
          }
          return hasAccess ? { ...item, items: filteredChildren } : null;
        }
        return hasAccess ? item : null;
      })
      .filter(Boolean);
  };

  const filteredNav = NAV_DATA.map((section) => {
    const filteredItems = filterItems(section.items);
    return filteredItems.length > 0 ? { ...section, items: filteredItems } : null;
  }).filter(Boolean);

  return filteredNav;
};
