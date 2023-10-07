export const ROUTER = Object.freeze({
    LOGIN: '/login',
    // HOME: '/',
    FORUM: '/',
    VIEW_FORUM: '/forum-management/:id',
    USERMANAGEMENT: '/user-management',
    POSTMANAGEMENT: '/post-management',
    EVENTMANAGEMENT: '/event-management',
});

export const DATA_SIDEBAR = [
    {
        id: 0,
        name: 'Forum',
        pathName: "/",
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
