import { Switch, Route, HashRouter } from "react-router-dom";
import NotFound from "../pages/not_found";
import {Routes} from '../utils/routes'

const IndexRoute = () => {
  return (
    <HashRouter>
      <Switch>
        {Routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={true}
              children={<route.main/>}
            />
          )
        })}
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default IndexRoute