import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import './index.css';
import '../i18n';

import { setContext } from '@apollo/client/link/context';
import { serverConfig } from './config/server-config.js';

const httpLink = createHttpLink({
  uri: serverConfig.BACKEND_BASEURL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(_, incoming) {
            return incoming;
          },
        },
        events: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
