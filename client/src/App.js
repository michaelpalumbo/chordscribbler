import { setContext } from '@apollo/client/link/context';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import Main from './components/Main';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer';
import Login from './components/Login/LoginForm';


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
          <Header />
          <br />
          <br />
          <br />
          <br />
          {/* <Login /> */}
          <br />
          <br />
          <br />
          <Login />
          <br />
          <Footer />
      </ApolloProvider >

    </div>

  );
}

export default App;