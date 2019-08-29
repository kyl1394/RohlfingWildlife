import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import HomePage from '../Home';
import AboutPage from '../About';
import ContactPage from '../Contact';
import AdminPage from '../Admin';
import SignInPage from '../SignIn';
import ImageOverlay from '../ImageOverlay';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import './App.css';

const App = () => (
  <Router>
    <div style={{minHeight: '100vh'}}>
      <Navigation />
      <div className="mainContent">
        <Route exact path={ROUTES.LANDING} component={HomePage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.CONTACT} component={ContactPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      </div>
      <ImageOverlay />
    </div>
  </Router>
);

export default withAuthentication(App);
