import Home from "../containers/Home";
import Page404 from "../containers/404";

// CONTEXT
import { SearchProvider } from "../context/search";

const myRoutes = [
  {
    path: "/",
    active: true,
    private: false,
    component: Home,
    context: SearchProvider,
    permissions: [],
    routerProps: {},
  },
  {
    path: "/404",
    active: true,
    private: false,
    component: Page404,
    context: null,
    permissions: [],
    routerProps: {},
  },
];

export default myRoutes;
