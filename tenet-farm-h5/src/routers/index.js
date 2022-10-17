import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HeadComponent from '../components/header';
import PoolTip from '../components/pool/Tip';

export function slowImport(value, ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
const Home = React.lazy(() => slowImport(import('../pages/home/Home')));
const PoolList = React.lazy(() => slowImport(import('../pages/pool/List')));
const PoolCreate = React.lazy(() => slowImport(import('../pages/pool/Create')));
const PoolDetail = React.lazy(() => slowImport(import('../pages/pool/Detail')));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div className="loading-wrap"></div>}>
        <div className="page">
          <HeadComponent></HeadComponent>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pool/create" exact component={PoolCreate} />
            <Route path="/pool/detail" exact component={PoolDetail} />
            <Route path="/pool/list" exact component={PoolList} />
          </Switch>
        </div>
        <PoolTip></PoolTip>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
