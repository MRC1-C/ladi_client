import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import router from './routes/privateRouter'
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
    <BrowserRouter>
        <Routes>
          {renderRoutes([router.route])}
      </Routes>
    </BrowserRouter>
  )
}

export default App