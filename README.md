tsty
===================
Configurable and modular Node backend framework built in TypeScript.

You should read "tsty" as "Tasty". (You know, Just for FUN!)

### Purpose

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

For more details about creating Modules and making an application, please check Wiki.

### Configurable / replacable
Almost all items in stack are configurable and replacable. Wiki pages for specific items:
- HTTP Framework
- Database
- Logger

### Influencers
- [MEAN.io](http://mean.io/)
- [Design patterns in TypeScript](https://github.com/torokmark/design_patterns_in_typescript)

### Indirect Authors
- **[Francis Wertz](https://github.com/fwertz)** -- [mongoose-decorator](https://github.com/fwertz/mongoose-decorator)
  - Used mongoose-decorator code to build custom decorators for DB Modules for default MongoDB.

### Key Libraries
- Express
- Mongoose
- Bluebird
- Dependable
- Dependale List
- Lazy Dependable
- Lodash
- Mocha & Chai
- Gulp

### Next steps
Integrate Messaging Queues and make it work like micor-services and able to deploy modules separately and on different spaces.

### Development
You will need following dependencies installed on your machine before starting to contribute on this project:
- [NodeJS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Gulp](http://gulpjs.com/)
- [Typings](https://github.com/typings/typings)
- [Mongo DB](https://www.mongodb.com/)

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