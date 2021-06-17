import Index from "../pages";
import Auth from "../pages/auth";
import { TimePage } from "../pages/time";

export const Routes = [
  {
    path: '/auth',
    main: () =>  <Auth/>
  },
  {
    path: '/',
    main: () => <Index/>
  },
  {
    path: '/time',
    main: () => <TimePage/>
  }
]