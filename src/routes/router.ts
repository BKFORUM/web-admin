import { ROUTER } from "@commom/constants";
import ClassManagement from "@pages/ClassManagement";
import EventManagement from "@pages/EventManagement";
import PostManagement from "@pages/PostManagement";
import UserManagement from "@pages/UserManagement";


export const routerAdmin = [
    { path: ROUTER.CLASSMANAGEMENT, element: ClassManagement },
    { path: ROUTER.USERMANAGEMENT, element: UserManagement },
    { path: ROUTER.POSTMANAGEMENT, element: PostManagement },
    { path: ROUTER.EVENTMANAGEMENT, element: EventManagement },
];

