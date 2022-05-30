import { setContext } from '@apollo/client/link/context';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import Navbar from './components/Navbar.js';
// import Main from './components/Main';
import Header from './components/Header.js';
import Footer from './components/Footer.js';


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
          {/* <Main /> */}
          <Footer />
      </ApolloProvider >

    </div>

  );
}

export default App;