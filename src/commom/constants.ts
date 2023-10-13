export const ROUTER = Object.freeze({
  LOGIN: '/login',
  FORUM: '/forum-management',
  VIEW_FORUM: '/forum-management/:id',
  USER_MANAGEMENT: '/user-management',
  VIEW_USER: '/user-management/:id',
  POST_MANAGEMENT: '/post-management',
  EVENT_MANAGEMENT: '/event-management',
});

export const DATA_SIDEBAR = [
  {
    id: 0,
    name: 'Forum',
    pathName: "/forum-management",
    icon: "dashboard",
    children: [],
  },
  {
    id: 1,
    name: 'Users',
    pathName: "/user-management",
    icon: "user",
    children: [],
  },
  {
    id: 2,
    name: 'Post',
    pathName: "/post-management",
    icon: "post",
    children: [],
  }, {
    id: 3,
    name: 'Event',
    pathName: "/event-management",
    icon: "event",
    children: [],
  },
  //   {
  //     id: 2,
  //     name: i18n.t("sidebar.contact_management"),
  //     pathName: "/contact/facility",
  //     icon: "contact",
  //     children: [
  //       {
  //         id: 3,
  //         name: i18n.t("sidebar.facility_contact_management"),
  //         pathName: "/contact/facility",
  //         children: [],
  //       },
  //       {
  //         id: 4,
  //         name: i18n.t("sidebar.service_contact_management"),
  //         pathName: "/contact/service",
  //         children: [],
  //       },
  //       {
  //         id: 20,
  //         name: i18n.t("sidebar.user_contact_management"),
  //         pathName: "/contact/user",
  //         children: [],
  //       },
  //     ],
  //   },
];
