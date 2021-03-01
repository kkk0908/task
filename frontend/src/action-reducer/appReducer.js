import { authReducer } from "./auth/authReducer";
import { breadCrumbsReducer } from "./breadCrumbs/breadCrumbsReducer";
import { toggleReducer } from "./toggle/toggleReducer";
import { userReducer } from "./user/userReducer";

export default {
 auth: authReducer,
 breadCrumbs: breadCrumbsReducer,
 toggle: toggleReducer,
 user: userReducer
};
