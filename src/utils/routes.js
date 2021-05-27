import Index from "../pages";
import Auth from "../pages/auth";

export const Routes = [
  {
    path: '/auth',
    main: () =>  <Auth/>
  },
  {
    path: '/',
    main: () => <Index/>
  }
]