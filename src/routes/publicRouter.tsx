import Introduction from "../pages/introduction";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/Signup";

export default {
  route: [{
    path: 'login',
    component: <Login />,
    index: false
  },
  {
    path: 'signup',
    component: <SignUp />,
    index: false
  },
  {
    path: '',
    component: <Introduction />,
    index: true
  }],
};