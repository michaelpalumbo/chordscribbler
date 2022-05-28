import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';

import Navbar from '../components/Nav/Index';
import Header from '../components/Header/Header';
import Main from '../components/Main';
import Footer from '../components/Footer/Footer';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="site-container">

      <ApolloProvider client={client}>

          <Navbar />
          <Header />
          <Main />
          <Footer />
   
      </ApolloProvider >

    </div>

  );
}

export default App;