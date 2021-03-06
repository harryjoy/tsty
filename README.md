tsty
===================
Configurable and modular Node backend framework built in TypeScript.

You should read "tsty" as "Tasty". (You know, Just for FUN!)

### Purpose
To create a backend framework that is easy to configure and parts of it are also easy to replace or modify.

### Installation
```
npm install tsty
```

### Why not include "Angular" to become MEAN?
I wanted it to be only backend framework without any front end dependencies, so it can be used with any frontend frameworks like Angular, Backbone or even mobile apps.

Those who love Angular and want to tighly bind it in system, there's always a choice to go back to MEAN.io. For others, who wants to keep frontend and backend separate, this is the choice.

### Usage
In TypeScript:
```
import * as App from "tsty";
App.application.serve({}, () => {
    console.log("Application Started");
});
```

In JavaScript:
```
var App = require("tsty");
App.application.serve({}, () => {
    console.log("Application Started");
});
```
When `serve` method is called, it does following operations:
- Check if application is already running, if yes then return otherwise move forward.
- Build application configuration by going through all registered config builders.
- Connect to database. (by default MongoDB)
- Start server engine. (by default ExpressJS)
- Run all registered application initializers.

For more details about creating Modules and confiuration of  application, please check [Wiki](https://github.com/harryjoy/tsty/wiki).

### Configurable / replaceable
Almost all items in stack are configurable and replaceable. Wiki pages for specific items:
- [HTTP Framework](https://github.com/harryjoy/tsty/wiki/API-%5C-HTTP-engine)
- [Database](https://github.com/harryjoy/tsty/wiki/Database-engine)
- [Configuration](https://github.com/harryjoy/tsty/wiki/Configuration)
- [Application initializers](https://github.com/harryjoy/tsty/wiki/Application-Initializer)

### Influencers
- [MEAN.io](http://mean.io/)
- [Design patterns in TypeScript](https://github.com/torokmark/design_patterns_in_typescript)

### Indirect Authors
- **[Francis Wertz](https://github.com/fwertz)** -- [mongoose-decorator](https://github.com/fwertz/mongoose-decorator)
  - Used mongoose-decorator code to build custom decorators for DB Modules for default MongoDB.

### Next steps
Integrate Messaging Queues and make it work like micro-services and able to deploy modules separately and on different spaces.

------

## Development
You will need following dependencies installed on your machine before starting to contribute on this project:
- [NodeJS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Gulp](http://gulpjs.com/)
- [Typings](https://github.com/typings/typings)
- [Mongo DB](https://www.mongodb.com/)

### Key Libraries
- [Express](https://expressjs.com/)
- [Mongoose](http://mongoosejs.com/)
- [Bluebird](http://bluebirdjs.com/docs/getting-started.html)
- [Dependable](https://www.npmjs.com/package/dependable)
- [Dependale List](https://github.com/andrija-hers/dependable-list)
- [Lazy Dependable](https://www.npmjs.com/package/lazy-dependable)
- [Lodash](https://lodash.com/)
- [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/)
- [SuperTest](https://github.com/visionmedia/supertest)

### Building project
For building project Gulp is used. Run following command to build this project:
```
gulp
```

### Unit tests
Unit tests for this project are written under src/tests folder and are wrtten in Mocha+Chai+SuperTest. To run unit tests run following command:
```
gulp test
```

### Useful links
- [Guidelines for creating pull requests](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
- [Guideline for reporting issues](https://github.com/necolas/issue-guidelines)