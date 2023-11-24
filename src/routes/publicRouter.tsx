import Introduction from "../pages/introduction";
import Login from "../pages/user/Login";

export default {
  route:  [{
    path: '/login',
    component: <Login />
  },
  {
    path: 'introduction',
    component: <Introduction />
  }],
};