import React from 'react'
import { Route, Routes } from 'react-router-dom';
import router from './routes/privateRouter'
import routerPublic from './routes/publicRouter'
import PublicLayout from './layouts/PublicLayout';


interface RouteItem {
  path: string;
  component: React.ReactNode;
  routes?: RouteItem[];
}

const renderRoutes = (routes: Array<RouteItem>) => {
  return (
    <Route>
      {routes.map((r, index) => (
        <Route key={index} path={r?.path} element={r?.component}>
          {r.routes && renderRoutes(r.routes)}
        </Route>
      ))}
    </Route>
  );
}
const App = () => {
  return (
    <Routes>
      <Route path='' element={<PublicLayout />}>
        {routerPublic.route.map((r, index) => <Route index={r.index} key={index} path={r.index?undefined:r.path} element={r.component} />)}
      </Route>
      <Route>
        {renderRoutes([router.route])}
      </Route>
    </Routes>
  )
}

export default App