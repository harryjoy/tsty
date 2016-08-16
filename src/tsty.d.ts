// Type definitions for tsty
// Project: tsty
// Definitions by: Harsh Raval <https://github.com/harryjoy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../typings/bluebird/bluebird.d.ts" />
/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/eventemitter2/eventemitter2.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="./typings/dependableList.d.ts" />

declare module "tsty" {
    import * as Promise from "bluebird";
    import * as mongoose from "mongoose";
    import * as EventsEmitter from "eventemitter2";
    import * as express from "express";
    import * as DependableList from "dependable-list";

    namespace tsty {
        interface TstyStatic {
            configBuilder: configuration.ConfigBuilder;
            initializer: application.AppInitializer;
            application: application.Application;
            ExpressManager: eapp.ExpressConfigManager;
            MongoDecorators: database.MongoDecorators;

            Module: typeof modules.Module;
            Events: typeof events.Events;
            StaticLogger: typeof utils.StaticLogger;
            Database: typeof database.AppDatabase;
            Server: typeof eapp.ExpressServer;
            MongoDB: typeof database.MongoDatabase;
            DatabaseFactory: typeof database.DbFactory;
            ServerFactory: typeof eapp.ServerEngineFactory;
            Configuration: typeof configuration.AppConfig;

            IAppInitializer: application.IAppInitializer;
            IDbModel: database.IDbModel;
            MongoModel: database.MongoModel;
            IConfigBuilder: configuration.IConfigBuilder;
            IServerEngine: eapp.IServerEngine;
            IExpressConfig: eapp.IExpressConfig;
        }

        namespace database {
            interface DatabaseConnectionOptions {
                url: string,
                prefix: string,
                options?: Object
            }

            interface IDbModel {
                name: string;
                schema: any;
                collection?: any;
                listeners?: Array<TListener>;
                dbs?: Array<string>;
                db?: string;
                prototype?: any;
            }

            interface MongoModel extends IDbModel {
                schema: mongoose.Schema;
                fields?: Array<any>;
                methods?: any;
                statics?: any;
            }

            interface IConnectionResolver {
                uri: string;
                connection: mongoose.Connection;
                alias?: string;
            }

            interface IConnectionPoolEntity {
                state: string;
                value: IConnectionResolver
            }

            interface MongoDecorators {
                /**
                 * Add new method to schema.
                 * @type {TDecorator}
                 */
                method: TDecorator;

                /**
                 * Builds scema definition for mongoose model.
                 * @type {TDecorator}
                 */
                schema: TDecorator;

                /**
                 * Adds new static method to schema.
                 * @type {TDecorator}
                 */
                static: TDecorator;

                /**
                 * Define new mongoose model
                 * @param {any} clazz Class/Function definition of model.
                 */
                model(clazz?);

                /**
                 * Add new pre listener to scehma.
                 * @param {[any]} ...args Name and callback for listener with any other options required.
                 */
                pre(...args): void;

                /**
                 * Add new pre listener to scehma.
                 * @param {[any]} ...args Name and callback for listener with any other options required.
                 */
                post(...args): void;

                /**
                 * Adds new index to mongoose schema.
                 * @param {(clazz} indexingObject)
                 */
                index(indexingObject): (clazz) => void;

                /**
                 * Applies plugin to mongoose schema.
                 * @param {Function} fn     Plugin function.
                 * @param {any}   opts? Options for plugin.
                 */
                plugin(fn: Function, opts?): (clazz) => void;

                /**
                 * Adds new validate method to mongoose schema.
                 * @param  {string}     path    Path on which validation needs to be applied.
                 * @param  {string}     message Message to be used when validation fails. Optional.
                 * @return {TDecorator}
                 */
                validate(path: string, message?: string): TDecorator;

                /**
                 * Adds new virtual field to schema.
                 * @param  {string}     path   Path for new virtual field.
                 * @param  {string}     action Either "get" or "set". Default is "get".
                 * @return {TDecorator}
                 */
                virtual(path: string, action?: string): TDecorator;
            }

            abstract class AppDatabase<T, U extends IDbModel, Z> {
                protected models: TMap;
                protected options: any;
                protected url: string;
                protected prefix: string;
                connection: T;

                /**
                 * Creating new instance for database engine.
                 * @param {string} url     Url for database.
                 * @param {string} prefix  Prefix to be used while creating collections/tables for database.
                 * @param {any} options Any other database options.
                 */
                constructor(url: string, prefix: string, options?);

                /**
                 * Reseting database engine.
                 * Closes database engine and clears out all models.
                 */
                reset(): void;

                /**
                 * Promisifies database model and adds to list.
                 * @param {string} key   name of model.
                 * @param {Z}      model model instance.
                 */
                registerModelPostSteps(key: string, model: Z): void;

                /**
                 * Check if model with specified name exists in list.
                 * @param  {string}  key Name of model.
                 * @return {boolean}     True if model exists in list, otherwise false.
                 */
                isModelExistInModels(key: string): boolean

                /**
                 * Get database model identified by key.
                 * @param  {string} key Name of model.
                 * @return {Z}          Database model instance.
                 */
                getModel(key: string): Z;

                /**
                 * Connect to mongo database.
                 * @return {Promise}
                 */
                abstract connect(): Promise<{}>;

                /**
                 * Disconnect all open connections to mongo database.
                 * @return {Promise}
                 */
                abstract disconnect(): Promise<{}>;

                /**
                 * Returns true if mongo db connection is open.
                 * @return {boolean}
                 */
                abstract isConnected(): boolean;

                /** 
                 * Add any listener to mongo database with callback function.
                 * @param {string}   name Name of listener.
                 * @param {Function} cb   Callback function to be called when event is fired.
                 */
                abstract listen(name: string, cb: Function): void | any;

                /** 
                 * Add missing fields to mongo model and make it proper for processing.
                 * @param {MongoModel} model
                 */
                abstract updateModelStructure(model: MongoModel);

                /** 
                 * Bind listeners to mongo model.
                 * @param {MongoModel}       modelData
                 * @param {Array<TListener>} listeners
                 */
                abstract bindModelListeners(modelData: MongoModel, listeners: Array<TListener>);

                /**
                 * Register new mongo model; creates new mongoose model and adds to array.
                 * It creates mongoose model for all open connections.
                 * @param  {MongoModel} modelData
                 * @return {Array}               
                 */
                abstract registerModel(modelData: U): Array<Z>;
            }

            class DbFactory {
                /**
                 * Registers new database engine to facroty.
                 * @param {string}       name     Name of the engine.
                 * @param {TAppDatabase} dbEngine Definition of new database engine.
                 */
                static registerDbEngine(name: string, dbEngine: TAppDatabase): void;

                /** 
                 * Produces new database engine identified by dbName.
                 * @param  {string}                    dbName              Name of engine.
                 * @param  {DatabaseConnectionOptions} dbConnectionOptions Options to be used while producing db engine.
                 *                                                         This will contain url, credentials, and other db options.
                 * @return {TAppDatabase}
                 */
                static produceDatabaseEngine(dbName: string, dbConnectionOptions: DatabaseConnectionOptions): TAppDatabase;
            }

            class MongoDatabase extends AppDatabase<mongoose.Connection, MongoModel, mongoose.Model<any>> {
                /**
                 * Creates new Monog Database connection instance.
                 * @param {string} url     Database url.
                 * @param {string} prefix  Prefix to be used while creating collections for database.
                 * @param {any} options Any other database specific options.
                 */
                constructor(url: string, prefix: string, options?);

                /**
                 * Connect to mongo database.
                 * @return {Promise}
                 */
                connect(): Promise<{}>;

                /**
                 * Disconnect all open connections to mongo database.
                 * @return {Promise}
                 */
                disconnect(): Promise<{}>;

                /**
                 * Returns true if mongo db connection is open.
                 * @return {boolean}
                 */
                isConnected(): boolean;

                /** 
                 * Add any listener to mongo database with callback function.
                 * @param {string}   name Name of listener.
                 * @param {Function} cb   Callback function to be called when event is fired.
                 */
                listen(name: string, cb: Function): void | any;

                /** 
                 * Add missing fields to mongo model and make it proper for processing.
                 * @param {MongoModel} model
                 */
                updateModelStructure(model: MongoModel);

                /** 
                 * Bind listeners to mongo model.
                 * @param {MongoModel}       modelData
                 * @param {Array<TListener>} listeners
                 */
                bindModelListeners(modelData: MongoModel, listeners: Array<TListener>);

                /**
                 * Register new mongo model; creates new mongoose model and adds to array.
                 * It creates mongoose model for all open connections.
                 * @param  {MongoModel} modelData
                 * @return {Array}               
                 */
                registerModel(modelData: MongoModel): Array<mongoose.Model<any>>;
            }
        }

        namespace modules {
            class DependantModule extends DependableList.dependableConstructor() {
                name: string;
                version: string;
                source: any;
                appFileName: string;
                path: string;

                /** 
                 * Create new dependent module.
                 * Dependent modules are modules that requires their dependencies to be resolved first before they can be loaded.
                 * @param {string} name        Name of module.
                 * @param {string} version     Version of module.
                 * @param {[type]} source      Source of module.
                 * @param {string} appFileName Main file of module.
                 */
                constructor(name: string, version: string, source, appFileName?: string);

                clear(): void;
                destroy(): void;
                buildPathWith(additionalPath: string): string;
                load(): void
            }

            class Module {
                events: events.Events;
                dependantModule: DependantModule;
                name: string;
                config: configuration.IConfig;

                /** 
                 * Initiate new application module.
                 * @param {string} name Name of the module.
                 */
                constructor(name: string);

                /** 
                 * Registers module with dependencies to main application.
                 * @param {Function} cb Callback whose arguments will be used as dependencies to this module.
                 */
                register(cb: Function);

                /** 
                 * Add new database model to this module.
                 * @param  {database.IDbModel} model Database model instance.
                 * @return {Module}
                 */
                addDbModel(model: database.IDbModel): Module;

                /**
                 * Build database models for this module.
                 * @param {database.AppDatabase<any, database.IDbModel, any>}        database Application database instance.
                 * @param {boolean}                      override           Whether to override existing models or not.
                 */
                buildDbModels(database: database.AppDatabase<any, database.IDbModel, any>, override?: boolean);

                /** 
                 * Add new routes for this module.
                 * Route file needs to compulsory export either default or routes function.
                 * @param  {string}     routePath Path on which route file could be found.
                 * @param  {Array<any>} args      Dependencies that will be passed to route function.
                 * @return {Module}
                 */
                addRoute(routePath: string, args: Array<any>): Module;

                /**
                 * Add new routes for this module.
                 * Route file needs to compulsory export either default or routes function.
                 * @param  {Array<string>} routePaths Array of route file paths.
                 * @param  {Array<any>}    args       Dependencies that will be passed to route function.
                 * @return {Module}
                 */
                addRoutes(routePaths: Array<string>, args: Array<any>): Module;

                /** 
                 * Add new routes for this module with route function definition.
                 * @param  {Function}   routeFunc Definition of route function.
                 * @param  {Array<any>} args      Dependencies that will be passed to route function.
                 * @return {Module}
                 */
                addRouteFunc(routeFunc: Function, args: Array<any>): Module;
            }

            class ModuleList {
                constructor();
                findOne: (func: Function) => any;
                dumpToConsole: () => void;
                traverse: (func: Function) => void;
                unresolved: any;
                add: (dependable: DependantModule, afterTime?) => void;
                listOfUnresolved: () => any;

                /**
                 * Creates a new module in list.
                 * @param  {string}          name        Name of module.
                 * @param  {string}          version     Version of module.
                 * @param  {[type]}          source      Source of module.
                 * @param  {string}          appFileName Main app file for module.
                 * @return {DependantModule}
                 */
                createModule(name: string, version: string, source, appFileName?: string): DependantModule;

                /** 
                 * Find a specific module by name.
                 * @param  {string}          name Name of the module.
                 * @return {DependantModule}
                 */
                findModule(name: string): DependantModule;
                dependencyConstruct(): typeof DependantModule;
            }

            class ModulesLoader {
                /**
                 * Creates a new module loader.
                 * @param {string} packageJson                     Name of package.json file.
                 * @param {string} moduleNameInPackageJson         Field to look for in packageJson to mark current folder as application module.
                 * @param {string} moduleAppFileNameInPackageJson  Field to look for while findinf application file for the module.
                 * @param {string} moduleDependenciesInPackageJson Field to look for to identify dependencies of module.
                 */
                constructor(packageJson: string, moduleNameInPackageJson: string, moduleAppFileNameInPackageJson: string,
                    moduleDependenciesInPackageJson: string);

                /** 
                 * Load modules by traversing through a specific folder and finding all modules.
                 * If a module is found, it is being loaded and registered to main application instance.
                 * @param {ModuleList}    list            Main application modules list.
                 * @param {Array<string>} disabledModules List of modules that are marked as disabled.
                 *                                        Disabled modules are not registered to application even
                 *                                        if they are found while traversing through folder.
                 * @param {string}        moduleBase      Base folder path.
                 */
                loadModule(list: ModuleList, disabledModules: Array<string>, moduleBase: string): void;
            }
        }

        namespace application {
            interface IAppStatus {
                version: string;
                name: string;
                active: boolean;
            }

            interface IExportableModule {
                name: string;
                version?: string;
            }

            interface IAppInitializer {
                /** 
                 * Method that will be called when application initialization is about to complete.
                 * @param  {Application} application Main application instance.
                 * @return {Promise}
                 */
                initialize<T>(app?: Application): Promise<T>;
            }

            class AppInitializer {
                /** 
                 * Add new application initializer that will be executed when application is initiated.
                 * @param {IAppInitializer} handler Application initializer instance.
                 */
                addInitializer(handler: IAppInitializer): void;

                /**
                 * Walk through all application initializers and call their initialize method
                 *     with application as optional argument.
                 */
                initialize(app: Application): Promise<any>;
            }

            class ModuleInitializer implements IAppInitializer {
                /** 
                 * Method that will be called when application initialization is about to complete.
                 * @param  {Application} application Main application instance.
                 * @return {Promise}
                 */
                initialize(application: Application): Promise<{}>;
            }

            class Handler {
                /**
                 * Starts serving application.
                 * Accepts options and a callback that will be called when application start up is completed.
                 * 1. Build application configuration by going through all config builders.
                 * 2. Connect to database.
                 * 3. Start server engine
                 * 4. Run all application initializers.
                 * @type {TServeFunc}
                 */
                startServer: TServeFunc;
            }
            var ServerHandler: Handler;

            class Application {
                /** @type {boolean} indicates whether application is running or not. */
                active: boolean;
                options: any;
                app: express.Express;
                config: configuration.IConfig;
                modules: modules.ModuleList;

                /**
                 * List of all eternal modules with their name and version.
                 * @type {Array<IExportableModule>}
                 */
                exportableModules: Array<IExportableModule>;

                /**
                 * Registers a dependency by name.
                 * @param {string} name    Name of dependency to be registered.
                 * @param {Function | any} function  This can be a function that takes dependencies and returns anything, or an object itself with no dependencies.
                 * @type {TStringFuncObject}
                 */
                register: (name: TStringFuncObject, cb?: Function | any) => void;

                /**
                 * calls cb like a dependency function, injecting any dependencies found in the signature
                 * @type {TStringFuncObject}
                 */
                resolve: (name: TStringFuncObject, cb?: Function) => void;

                /** 
                 * returns a module by name, with all dependencies injected.
                 * If you specify overrides, the dependency will be given those overrides instead of those registerd.
                 * @type {TListener}
                 */
                get: TListener;

                /**
                 * Stop and destroy application instance.
                 * @type {Function}
                 */
                destroy: () => void;

                /** @type {TMap} Map of resolved dependencies */
                resolved: TMap;

                /**
                 * Start main application.
                 * Accepts options and a callback that will be called when application start up is completed.
                 * 1. Build application configuration by going through all config builders.
                 * 2. Connect to database.
                 * 3. Start server engine
                 * 4. Run all application initializers.
                 * @type {TServeFunc}
                 */
                serve: TServeFunc;
            }
        }

        type TMap = { [key: string]: number | string | any };
        type TListener = (name: string, cb: Function) => void;
        type TResolver = Promise.Resolver<{}>;
        type TStringFuncObject = string | Function | Object
        type TDecorator = (clazz, method: string, descriptor: PropertyDescriptor) => void;
        type TServeFunc = (options: any, cb?: (application: application.Application) => void) => void;
        type TAppDatabase = database.AppDatabase<any, any, any>;

        namespace configuration {
            interface IFramework {
                name: string,
                version: string
            }

            interface IHttpConfig {
                port: number;
            }

            interface IHttpsConfig {
                port: number;
                key?: string;
                cert?: string;
                ca?: string;
            }

            interface IDbConfig {
                url: string,
                prefix: string,
                options: {
                    debug: boolean
                },
                dbOption: Object,
                dbs: Array<string>
            }

            interface IUrlMappings {
                modules: string,
                allModules: string;
                framework: string
            }

            interface IConfig {
                [key: string]: any;
                putExtra(key: string, value: any, override?: boolean): boolean;
                getExtra(key: string): any;

                name?: string;
                secret?: string;

                credentialsRequired?: boolean;
                serverEngine?: string;
                framework: IFramework;

                http?: IHttpConfig;
                https?: IHttpsConfig;

                db?: string;
                dbOptions?: IDbConfig;

                url?: IUrlMappings;

                disabledModules?: Array<string>;
                modulePaths?: Array<string>;

                packageJson?: string;
                moduleNameInPackageJson?: string;
                moduleAppFileNameInPackageJson?: string;
                moduleDependenciesInPackageJson?: string;
            }

            interface IConfigBuilder {
                configure(config: AppConfig): Promise<any>;
            }

            class AppConfig implements IConfig {
                framework: IFramework;
                additionalConfigs: TMap;

                /**
                 * Creates new applicatio configuration instance.
                 * First it reads default configuration from "config.json" located inside package.
                 * Then checks if configFilePath is provided, then read it and override default configuration with it.
                 * @param {string} configFilePath Optional configuration path.
                 */
                constructor(configFilePath?: string);

                /**
                 * Put an extra field to configuration.
                 * @param  {string}  key      Key for extra field.
                 * @param  {any}     value    Value for extra field.
                 * @param  {boolean} override Whether or not to override old value, if it already exists.
                 * @return {boolean}          True if new key is added to configuration extras.
                 */
                putExtra(key: string, value: any, override?: boolean): boolean;

                /**
                 * Get any extra field added to configuration.
                 * @param  {string} key Key of extra field.
                 * @return {any}        Value of field if found or undefined.
                 */
                getExtra(key: string): any;
            }

            class ConfigBuilder {
                /**
                 * Creates new configuratoin builder.
                 * If no configurationPath is provided then it will check if "config.json" exists at root of application,
                 *     and if it exists uses it to merge with default configuration.
                 * @param {string} configFilePath Optional file path to consider as configuration json.
                 */
                constructor(configFilePath?: string);

                /**
                 * Add new configuration option in existing configuration.
                 * @param  {string}        key   Key for new configuration option.
                 * @param  {any}           value Value of new configuration option.
                 * @return {ConfigBuilder}
                 */
                addConfigOption(key: string, value: any): ConfigBuilder;

                /**
                 * Add new congiguration options to existing options.
                 * @param  {Object}        configJson JSON for new configuration setting.
                 * @return {ConfigBuilder}
                 */
                addConfigOptions(configJson?: Object): ConfigBuilder;

                /**
                 * Register new configuration builder.
                 * @param  {IConfigBuilder} builder Configuration builder instance.
                 * @return {ConfigBuilder}
                 */
                addConfigBuilder(builder: IConfigBuilder): ConfigBuilder;

                /**
                 * Walk though all configuration builder and execute their configure method.
                 * Makes sure all registered builder gets executed before coming out of this method.
                 * @return {Promise<any>}
                 */
                build(): Promise<any>;
            }

        }

        namespace eapp {
            interface IServerEngine {
                name: string;

                /**
                 * Destroy server instance and close all connections.
                 */
                destroy();

                /**
                 * Start server engine instance.
                 * @param {application.Application} application Main Applicaion instance.
                 * @param {TAppDatabase}            database    Application database reference.
                 */
                start(application: application.Application, database: TAppDatabase);

                /**
                 * Executed when engine start up is complete, to do some finishing work.
                 * @param {Function} cb Optional callback.
                 */
                afterStartup(cb?: Function);
            }

            interface IExpressConfig {
                configure: (app: express.Express) => void;
            }

            class ExpressConfigManager {
                /**
                 * Get all configuration managers registered to this entity.
                 * @return {Array<IExpressConfig>} All configuration manager instances.
                 */
                static getConfigs(): Array<IExpressConfig>;

                /**
                 * Add new configuration manager instance to this entity.
                 * This instance will be used later by engine to execute its configure method.
                 * @param {IExpressConfig} constuct
                 */
                static addConfig(constuct: IExpressConfig);
            }

            class ExpressServer implements IServerEngine {
                name: string;
                application: application.Application;
                app: express.Express;
                database: TAppDatabase;

                /**
                 * Destroy server instance and close all connections.
                 */
                destroy();

                /**
                 * Start server engine instance.
                 * Configure express app and add default api routes required for it.
                 * @param {application.Application} application Main Applicaion instance.
                 * @param {TAppDatabase}            database    Application database reference.
                 */
                start(application: application.Application, database: TAppDatabase);

                /**
                 * Executed when engine start up is complete, to do some finishing work.
                 * @param {Function} cb Optional callback.
                 */
                afterStartup(cb?: Function);
            }

            class ServerEngineFactory {
                /**
                 * Register new server engine with factory,
                 *     so next time it could be picked up by application on start up if configured.
                 * @param {string}        name         Name of engine.
                 * @param {IServerEngine} serverEngine Engine definition.
                 */
                static registerServerEngine(name: string, serverEngine: IServerEngine);

                /**
                 * Produce a new server engine identified by specified name.
                 * @param  {string}        engineName Name of the engine.
                 * @return {IServerEngine}            New engine isntance.
                 */
                static produceServerEngine(engineName: string): IServerEngine;
            }
        }

        namespace events {
            class Events {
                name: string;
                constructor(name: string);
                setDefaults(data): void;

                /**
                 * Execute each of the listeners that may be listening for the specified event name in order with the list of arguments.
                 * @param event
                 * @param args
                 */
                emit(event: string | string[], cb?: Function | Object): boolean;

                /**
                 * Adds a listener to the end of the listeners array for the specified event.
                 * @param event
                 * @param listener
                 */
                on(name: string | string[], cb: Function): void;

                /**
                 * Adds a listener to the end of the listeners array for the specified event.
                 * @param event
                 * @param listener
                 */
                addListener();

                /**
                 * Adds a listener to the end of the listeners array for the specified event.
                 * @param event
                 * @param listener
                 */
                onAny(listener: Function): EventEmitter2;

                /**
                 * Removes the listener that will be fired when any event is emitted.
                 * @param listener
                 */
                offAny(listener?: Function): EventEmitter2;

                /**
                 * Adds a one time listener for the event.
                 * The listener is invoked only the first time the event is fired, after which it is removed.
                 * @param event
                 * @param listener
                 */
                once(event: string, listener: Function): EventEmitter2;

                /**
                 * Adds a listener that will execute n times for the event before being removed.
                 * The listener is invoked only the first n times the event is fired, after which it is removed.
                 * @param event
                 * @param timesToListen
                 * @param listener
                 */
                many(event: string, timesToListen: number, listener: Function): EventEmitter2;

                /**
                 * Remove a listener from the listener array for the specified event.
                 * Caution: changes array indices in the listener array behind the listener.
                 * @param event
                 * @param listener
                 */
                removeListener(event: string, listener: Function): EventEmitter2;

                /**
                 * Remove a listener from the listener array for the specified event.
                 * Caution: changes array indices in the listener array behind the listener.
                 * @param event
                 * @param listener
                 */
                off(event: string, listener: Function): EventEmitter2;

                /**
                 * Removes all listeners, or those of the specified event.
                 * @param event
                 */
                removeAllListeners(event?: string): EventEmitter2;

                /**
                 * Removes all listeners, or those of the specified event.
                 * @param events
                 */
                removeAllListeners(events: string[]): EventEmitter2;

                /**
                 * By default EventEmitters will print a warning if more than 10 listeners are added to it.
                 * This is a useful default which helps finding memory leaks.
                 * Obviously not all Emitters should be limited to 10. This function allows that to be increased.
                 * Set to zero for unlimited.
                 * @param n
                 */
                setMaxListeners(n: number): void;

                /**
                 * Returns an array of listeners for the specified event. This array can be manipulated, e.g. to remove listeners.
                 * @param event
                 */
                listeners(event: string): Function[];

                /**
                 * Returns an array of listeners that are listening for any event that is specified.
                 * This array can be manipulated, e.g. to remove listeners.
                 */
                listenersAny(): Function[];
            }
        }

        namespace utils {
            interface Helpers {
                /**
                 * Convert array of documents to a array of ids from that documents.
                 */
                mapIds(documents: any, idProp?: string): Array<any>;

                /**
                 * Merge two objects, simply overrides all source properties into destination.
                 */
                mergeObjects(source: any, dest: any): any;

                /**
                 * Lower case first letter of string
                 */
                lowerCaseFirstLetter(text: string): string;

                /**
                 * Recursively traverse path and execute callbacks for each file found.
                 * Callback will have file path with basePath included in it as argument.
                 */
                traverseDirectory(basePath: string, excludeDirs: string, cb: Function);

                /**
                 * Find different between 2 documents.
                 * @param {any} last    
                 * @param {any} current 
                 * @param {string}     idProp  Poperty name holding ID/key to identify document.
                 */
                diffDocs(last: any, current: any, idProp?: string);

                /**
                 * diffObj - similar to _.difference, except uses _.isEqual to deep compare objects in arrays
                 * @param array - Array: array of objects
                 * @param values - Array: array of objects to subtract
                 * @param callback - Function | String: optional isEqual comparison callback.
                 *                   For sorted arrays, sort property is implictly compared first.
                 * @param sortProp - String: optional parameter specifies items are sorted by corresponding
                 *                   primitive property (must be sorted in ascending order)
                 */
                diffObj(array: any, values: any, cb: any, sortProp?: any);
            }

            /**
             * Logger to be used to log information, warning and error messages.
             * @author harsh.r
             */
            class StaticLogger {
                /**
                 * log information on console.
                 * @param {Array<any>} ...args
                 */
                static info(...args);
                /**
                 * log warning messages on console.
                 * @param {Array<any>} ...args
                 */
                static warn(...args);
                /**
                 * log error messages on console.
                 * @param {Array<any>} ...args
                 */
                static error(...args);
            }
        }
    }

    var tasty: tsty.TstyStatic;
    export = tasty;
}
