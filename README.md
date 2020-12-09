# Digital Bank

A new reference user interface on Fineract CN for staff of financial institutions such as digital, challenger, and neo-banks that is focused on individual accounts.


Discord: https://gitter.im/openMF/digital-bank-ui

## Getting started

##### Note: You have to run and provision Fineract CN microservices before running this app. Follow [this](https://cwiki.apache.org/confluence/display/FINERACT/Bare+minimum+to+run+Fineract-CN+locally) link to set up a bare minimum of Fineract CN (or use [docker](https://github.com/apache/fineract-cn-docker-compose) version). Or [this](https://github.com/apache/fineract-cn-demo-server) link to set up all the microservices.

1. Ensure you have the following installed in your system:

    [`git`](https://git-scm.com/downloads)

    [`npm`](https://nodejs.org/en/download/)

2. Install [angular-cli](https://github.com/angular/angular-cli) globally.
```
npm install -g @angular/cli
```

3. Clone the project locally into your system.
```
git clone https://github.com/openMF/digital-bank-ui.git
```

4. `cd` into project root directory and make sure you are on the master branch.

5. Install the dependencies.
```
npm install
```

6. To preview the app, run the following command and navigate to `http://localhost:4200/`.
```
npm run dev
```

The application is using the local server of Fineract CN. The credentials for initial login will be created by following the steps mentioned [here](https://cwiki.apache.org/confluence/display/FINERACT/Bare+minimum+to+run+Fineract-CN+locally)


### Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).


## Setting up a local server

Follow the given instructions for your operating system to setup a local server for the Fineract CN platform. There are various ways to setup Fineract CN depending on what you want. See getting started part to setup Fineract CN.

For connecting to server running elsewhere update the target API URLs in the `proxy.conf.json` file.


## Want to help? [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/openMF/digital-bank-ui/issues)

Want to file a bug, request a feature, contribute some code, or improve documentation? Excellent! Read up on our guidelines for contributing and then check out one of our [issues](https://github.com/openMF/digital-bank-ui/issues). Make sure you follow the guidelines before sending a contribution!
