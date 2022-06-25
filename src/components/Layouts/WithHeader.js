import React from 'react';
import { Outlet } from 'react-router';
import MobileHeader from '../MobileHeader/MobileHeader';

const WithHeader = ({ user }) => {
  return (
    <>
      <MobileHeader user={user} />
      <Outlet />
    </>
  );
};

export default WithHeader;