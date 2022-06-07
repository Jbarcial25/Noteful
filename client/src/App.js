import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Login from './pages/auths/Login';
import Signup from './pages/auths/Signup';
import Authspage from './pages/auths/Authspage';
import Post from './pages/Post';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Homepage />} className='Homepage' />
          <Route exact path='/authspage' element={<Authspage />} className='Authspage' />
          <Route exact path='/login' element={<Login />} className='Login' />
          <Route exact path='/signup' element={<Signup />} className='Signup' />
          <Route exact path='/profile' element={<Profile />} className='Profile' />
          <Route exact path='/profile/:username' element={<Profile />} className='Profile' />
          <Route exact path='/post/:postId' element={<Post />} className='Post' />
        </Routes>

      </div>
    </ApolloProvider>


  )
}

export default App;
