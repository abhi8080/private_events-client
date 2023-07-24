# PrivateEvents-client

This project contains the frontend code for the Private Events application, which is built using React + Vite. The frontend communicates with the backend GraphQL API using Apollo Client. Apollo Client is a powerful and flexible GraphQL client that makes it easy to interact with the GraphQL endpoints. The frontend is styled using Bootstrap.

Website: https://private-events-6134f.web.app/

## Prerequisites

Node and npm must be installed on the local system.

## Install dependencies

Run `npm install` to install the dependencies.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:5173/`. The application will automatically reload if you change any of the source files.

## Testing

The app is tested using Playwright for acceptance tests. The tests are performed with an actual backend and database instance in the CI pipeline.

Run the tests using `npx playwright test`.

## Internationalization and localization

The user interface and content can be displayed in different languages based on the user's preference or the selected language.

## License

This project is licensed under the [MIT License](LICENSE).
