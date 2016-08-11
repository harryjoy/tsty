import * as express from "express";

export interface IExpressConfig {
    configure: (app: express.Express) => void;
}
