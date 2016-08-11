import * as express from "express";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as expressJwt from "express-jwt";
import * as methodOverride from "method-override";
import * as errorHandler from "errorhandler";
import * as Types from "../../components/types/Types";
import ModuleNames from "../config/ModuleNames";
import ExpressConfigManager from "./express/ExpressConfigManager";
import { IConfig } from "../config/IConfig";
import { IExpressConfig } from "./express/IExpressConfig";
import { AppDatabase } from "../../components/database/Database";
import { IServerEngine } from "./IServerEngine";

export default class ExpressServer implements IServerEngine {
    name: string = "express";
    application: Types.Application;
    app: express.Express;
    database: Types.AppDatabase;

    destroy() {
        this.app = null;
        this.database = null;
        this.application = null;
    }

    start(application: Types.Application, database: Types.AppDatabase) {
        this.application = application;
        this.database = database.connection;
        this.app = express();

        const config = this.application.config;
        this.configureExpress(config);
        this.configureHttpServers(config);

        this.application.register(ModuleNames.EXPRESS_APP_MODULE, () => {
            return this.app;
        });
        this.application.app = this.app;

        let configs: Array<IExpressConfig> = ExpressConfigManager.getConfigs();
        if (configs && configs.length > 0) {
            configs.forEach((config) => {
                config.configure(this.app);
            });
        }
    }

    afterStartup(cb?: Function) {
        this.app.get(this.application.config.url.framework, (req: express.Request, res: express.Response) => {
            res.status(200).send(this.application.config.framework);
        });

        this.app.route("*").get((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(404).send({
                url: req.originalUrl,
                error: "Not Found"
            });
        });

        if (process.env.NODE_ENV === "development") {
            this.app.use(errorHandler());
        }
        if (cb) { cb(this); }
    }

    private configureHttpServers(config: IConfig) {
        let httpServer: http.Server = http.createServer(this.app);
        this.application.register(ModuleNames.HTTP_MODULE, httpServer);
        httpServer.listen(config.http.port);

        if (config.https && config.https.port
                && config.https.key
                && config.https.ca
                && config.https.cert) {
            const options = {
                key: fs.readFileSync(config.https.key),
                ca: fs.readFileSync(config.https.ca),
                cert: fs.readFileSync(config.https.cert)
            };
            let httpsServer = https.createServer(options, this.app);
            this.application.register(ModuleNames.HTTPS_MODULE, httpsServer);
            httpServer.listen(config.https.port);
        }

        return httpServer;
    }

    private configureExpress(config: IConfig) {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.setHeader("X-Powered-By", config.framework.name);
            next();
        });

        this.app.use(cookieParser());
        this.app.use(methodOverride());
        this.app.use("/api", expressJwt({
            secret: config.secret,
            credentialsRequired: config.credentialsRequired
        }), (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.user) {
                req.user = JSON.parse(decodeURI(req.user));
            }
            next();
        });

        this.addPassportSupport();
    }

    private addPassportSupport() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.application.register(ModuleNames.PASSPORT_MODULE, passport);
    }
}
