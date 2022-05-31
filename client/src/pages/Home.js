import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>

    </main>
  );
};

export default Home;
