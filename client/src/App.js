import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SearchBooks, SavedBooks, NotFound } from './pages';
import Navbar from './components/Navbar';
import { Loading } from './components/Loading';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    client.query({ query: getCurrentUser }).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route path='/saved' component={SavedBooks} />
          <Route path='*' component={NotFound} />
        </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
