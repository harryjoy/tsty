tsty
===================
Configurable and modular Node backend framework built in TypeScript.

You should read "tsty" as "Tasty". (Just for FUN!)

### Purpose

### Installation

### Why not include "Angular" to become MEAN?

### Usage
In TypeScript:
```
import * as App from "tsty";
App.application.serve({}, () => {
    console.log("finished");
});
```

In JavaScript:
```
var App = require("tsty");
App.application.serve({}, () => {
    console.log("finished");
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

## Some Libraries
- Express
- Mongoose
- Bluebird
- Dependable
- Dependale List
- Lazy Dependable
- Lodash