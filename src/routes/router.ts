import { ROUTER } from "@commom/constants";
import Forum from "@pages/Forum";
import EventManagement from "@pages/EventManagement";
import PostManagement from "@pages/PostManagement";
import UserManagement from "@pages/UserManagement";
import ViewForum from "@pages/Forum/component/ViewForum";


export const routerAdmin = [
    { path: ROUTER.FORUM, element: Forum },
    { path: ROUTER.VIEW_FORUM, element: ViewForum },
    { path: ROUTER.USERMANAGEMENT, element: UserManagement },
    { path: ROUTER.POSTMANAGEMENT, element: PostManagement },
    { path: ROUTER.EVENTMANAGEMENT, element: EventManagement },
];

