export default (type, slug, link = null) => {
  const links = [
    {
      routePath: "/product-list",
      routerSlug: false,

      linkable_type: "product-list",
    },
    {
      routePath: "/product/",
      routerSlug: true,
      linkable_type: "product-item",
    },
    {
      routePath: "/weblog-list",
      routerSlug: false,
      linkable_type: "post-list",
    },
    {
      routePath: "/weblog-detail/",
      routerSlug: true,
      linkable_type: "post-item",
    },

    {
      routePath: "/",
      routerSlug: true,
      linkable_type: "category-item",
    },
    {
      routePath: "/about-us",
      routerSlug: false,
      linkable_type: "about-us",
    },
    {
      routePath: "/contact",
      routerSlug: false,
      linkable_type: "contact-us",
    },
    {
      routePath: "/page/",
      routerSlug: true,
      linkable_type: "page-item",
    },
    {
      routePath: "/flashes/",
      routerSlug: true,
      linkable_type: "flash-item",
    },
    // {
    //   routePath: "",

    //   routerSlug: "",
    //   linkable_type: "self-link",
    // },
  ];

  if (link !== null) {
    return link;
  }
  let routerPath = "/";
  let findeIndex = links.findIndex((item) => item.linkable_type == type);
  if (findeIndex != -1) {
    routerPath = links[findeIndex].routePath;
    if (links[findeIndex].routerSlug == true) {
      routerPath += slug ? slug : "";
    }
  }

  // مسیر درست شده را برمیگرداند
  return routerPath;
};
