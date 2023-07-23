/**
 * Configuration options
 */

const baseURL = `http://${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}/graphql`;

export const serverConfig = {
  BACKEND_BASEURL: baseURL,
};
