'use client'
import React from 'react';

import withAuth from "../../hooks/withAuth";

const Home = () => {
  return (
    <div>
      This is dashboard page
    </div>
  );
}

export default withAuth(Home)