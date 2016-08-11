/// <reference path="../typings/tsd.d.ts" />
/// <reference path="typings/dependable.d.ts" />
/// <reference path="typings/dependableList.d.ts" />
/// <reference path="typings/lazyDependable.d.ts" />
/// <reference path="typings/array.d.ts" />

// classes
import AwtsEvents from "./components/events/Events";
import AwtsLogger from "./components/logs/Logger";
import AwtsModule from "./lib/module/Module";
import ExpressServer from "./lib/server/ExpressServer";
import { AppDatabase } from "./components/database/Database";
import MongoDatabase from "./components/database/mongo/MongoDatabase";
export var Module = AwtsModule;
export var Events = AwtsEvents;
export var Logger = AwtsLogger;
export var Database = AppDatabase;
export var Server = ExpressServer;
export var MongoDB = MongoDatabase;

// builders & factories
import AppInitializer from "./components/intializer/ApplicationInitializer";
import ConfigBuilder from "./lib/config/ConfigBuilder";
import ModuleInitializer from "./lib/app/ModuleInitializer";
export var configBuilder: ConfigBuilder = new ConfigBuilder();
export var initializer: AppInitializer = new AppInitializer();
initializer.addInitializer(new ModuleInitializer());

import DbFactory from "./components/database/DbFactory";
import ServerEngineFactory from "./lib/server/ServerEngineFactory";
import ExpressConfigManager from "./lib/server/express/ExpressConfigManager";
export var DatabaseFactory = DbFactory;
export var ServerFactory = ServerEngineFactory;
export var ExpressManager = ExpressConfigManager;

// application
import Application from "./lib/awts";
export var application: Application = new Application(initializer, configBuilder);

// types
export type Configuration = typeof application.config;

// interfaces
export * from "./components/intializer/IAppInitializer";
export * from "./components/database/IDbModel";
export * from "./components/database/mongo/MongoModel";
export * from "./lib/config/IConfigBuilder";
export * from "./lib/server/IServerEngine";
export * from "./lib/server/express/IExpressConfig";

// decorators
import * as MongoDbDecorators from "./components/database/mongo/decorators/MongoDecorators";
export var MongoDecorators = MongoDbDecorators;
