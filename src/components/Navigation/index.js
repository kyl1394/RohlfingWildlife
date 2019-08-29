import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import './Navigation.css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      <div className="navigation">
        <div className="logo"><Link to={ROUTES.HOME}><img src="logo-horiz.png" alt="Rohlfing Wildlife Logo" /></Link></div>
        <ul>
          {authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )}
        </ul>
      </div>
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <span>
    <NavigationNonAuth />
    <li className="adminLink">
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </span>
)

const NavigationNonAuth = () => (
  <span>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ABOUT}>About</Link>
    </li>
    <li>
      <Link to={ROUTES.CONTACT}>Contact</Link>
    </li>
  </span>
);

export default Navigation;
