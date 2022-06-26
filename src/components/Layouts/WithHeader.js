import React from 'react';
import { Outlet } from 'react-router';
import MobileHeader from '../MobileHeader/MobileHeader';

const WithHeader = () => {


  return (
    <>
      <MobileHeader />
      <Outlet />
    </>
  );
};

export default WithHeader;