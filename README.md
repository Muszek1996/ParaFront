# ParaFront

Angular frontend for **Para**, a web app for managing users, groups, games and items. The backend lives in [Para](https://github.com/Muszek1996/Para) (Node.js, Express, MongoDB).

## Features
- Login, registration and logout with token auth (HTTP interceptor)
- Route guards for logged-in users and admins
- CRUD views for users, groups, games and items
- Search and ID-to-name pipes, form validation (password match)

## Setup
Requires Node.js and the Angular CLI.

```bash
npm install
npm start          # dev server at http://localhost:4200
npm run build      # production build in dist/
```

Set the backend URL in `src/environments/environment.ts` (`apiUrl`).

## Structure
```
src/app/Users/      login, register, logout
src/app/navbar/     games, groups, items, users (list/add/edit), home
src/app/_services/  API clients
src/app/_guards/    auth and admin guards
src/app/_helpers/   interceptors, pipes, validators
src/app/_models/    data models
```
