## Auth0 Code Challenge
<p>
  This demo app demonstrates:
</p>
<ul>
  <li>
    Use of Auth0 Single Page Application scenario, OAuth2 Implicit flow
  </li>
  <li>
     Sign in with either an email/password or Google
  </li>
  <li>
      Use of scopes for authorization (read:menu , create:orders)
  </li>
  <li>
     Use of Auth0 rules to enrich user profile and id token.
  </li>
  <li>
    Use of Google People API to fetch the total number of Google connections a
    user has and store the count in user profile.
  </li>
  <li>
    Tech Stack : Angular6, Asp.Net Core WebApi backend.  A node.js backend is also added in source code.
    Hosted on AWS and S3.
  </li>    
</ul>

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Backend

There are two backend implementations for demo purposes: One for Asp.Net Core and one for Node.js

For Node.js implementation navigate to pizza42.api -> node folder and run  `npm run start`

For .Net Core implementation navigate to pizza42.api->netcore->Pizza42api folder and rum `dotnet run`