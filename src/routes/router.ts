import { ROUTER } from "@commom/constants";
import Forum from "@pages/Forum";
import EventManagement from "@pages/EventManagement";
import PostManagement from "@pages/PostManagement";
import UserManagement from "@pages/UserManagement";


export const routerAdmin = [
    { path: ROUTER.FORUM, element: Forum },
    { path: ROUTER.USERMANAGEMENT, element: UserManagement },
    { path: ROUTER.POSTMANAGEMENT, element: PostManagement },
    { path: ROUTER.EVENTMANAGEMENT, element: EventManagement },
];

