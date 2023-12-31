# Weather App for Interview

Used technologies:
- Vite ( https://vitejs.dev/ )
- React ( https://react.dev/ )
- TypeScript ( https://www.typescriptlang.org/ )
- SASS (SCSS) ( https://sass-lang.com/ )
- Redux ( https://react-redux.js.org/ )
- NodeJS ( https://nodejs.org/en )
- Express ( https://expressjs.com/ )
- MongoDB ( https://www.mongodb.com/ )
- Mongoose ( https://mongoosejs.com/ )
- MomentJS ( https://momentjs.com/ )
- Vitest ( https://vitest.dev/ )
- Cypress ( https://www.cypress.io/ )

I left the .env file in the project on purpose. The API is free and public plus this key is only for this project anyway. 

## Project Requirements
- `NodeJS`: https://nodejs.org/en 
- `TypeScript`: https://www.typescriptlang.org/download

## Project Content
- Frontend
    - Contains the client side React project
- Backend
    - Contains the server side NodeJS/Express project

## How to host the demo
`npm install`
=> Install the required dependencies both in the frontend and backend folder.

`npm run dev`
=> Start the frontend dev server on your local computer. (The default port is 5173).

`npm start`
=> Start the backend NodeJS server on your local computer. (The default port is 3500).

`http://localhost:5173/`
=> You can reach the demo at this address. Make sure you have both the frontend and backend server running.

That's it. Now you have a cool weather app running on your system. Yay!

## How to run the tests

### In the /Frontend/ folder

#### Unit tests
`npm run vitest:run`
=> To run the tests in the `Console`/`Terminal`.

#### E2E tests
`npm run cypress:run`
=> To run the tests in the `Console`/`Terminal`.

`npm run cypress:open`
=> To run the tests in the integrated browser.

### Project TODO:
- Backend tests
- Mobile, tablet view
- Remove option for the saved cities

