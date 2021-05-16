import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },

  {
    name: 'Admin-User',
    url: 'admin',
    icon: 'icon-user',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
    children: [
      {
        name: "List Admin User",
        url: "admin",
        icon: 'icon-user',
      },
      {
        name: "Add Admin User ",
        url: "admin/add",
        icon: 'icon-user',
      }


    ]
  },

  {
    name: 'Brand',
    url: 'brand',
    icon: 'icon-screen-tablet',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
    children: [
      {
        name: "List Brand",
        url: "brand",
        icon: 'icon-user',
      },
      {
        name: "Add Brand ",
        url: "brand/add",
        icon: 'icon-user',
      }


    ]
  },

  {
    name: 'Item Category',
    url: 'item-category',
    icon: 'icon-cursor',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
    children: [
      {
        name: "List Item Category",
        url: "item-category",
        icon: 'icon-user',
      },
      {
        name: "Add Item Category",
        url: "item-category/add",
        icon: 'icon-user',
      }
    ]
  },


  {
    name: 'Item',
    url: 'item',
    icon: 'icon-puzzle',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
    children: [
      {
        name: "List Item",
        url: "item",
        icon: 'icon-user',
      },
      {
        name: "Add Item ",
        url: "item/add",
        icon: 'icon-user',
      }
    ]
  },



];
