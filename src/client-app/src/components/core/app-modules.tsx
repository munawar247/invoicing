import { Route, Routes } from 'react-router';
import LazyLoader from './lazy-loader';
import IProps from './app-modules.interface';

export default function AppModules({ routes }: IProps) {
  return (
    <>
      <div className="menu"></div>
      <div className="container">
        <Routes>
          {routes?.map((route, index) => (
            <Route
              key={index}
              path={`/${route.name}/*`}
              element={<LazyLoader path={route.path} />}
            />
          ))}
        </Routes>
      </div>
    </>
  );
}
