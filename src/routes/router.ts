import { ROUTER } from "@commom/constants";
import Forum from "@pages/Forum";
import EventManagement from "@pages/EventManagement";
import PostManagement from "@pages/PostManagement";
import UserManagement from "@pages/UserManagement";
import ViewForum from "@pages/Forum/components/ViewForum";
import ViewUser from "@pages/UserManagement/components/ViewUser";


export const routerAdmin = [
    { path: ROUTER.FORUM, element: Forum, index: true },
    { path: ROUTER.VIEW_FORUM, element: ViewForum },
    { path: ROUTER.USER_MANAGEMENT, element: UserManagement },
    { path: ROUTER.VIEW_USER, element: ViewUser },
    { path: ROUTER.POST_MANAGEMENT, element: PostManagement },
    { path: ROUTER.EVENT_MANAGEMENT, element: EventManagement },
];

