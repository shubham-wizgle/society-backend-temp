"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
// TODO: make this configuration .env based
const config = {
    name: 'venuedb',
    connector: 'mongodb',
    url: 'mongodb+srv://demouser01:T9AOmDDJAEcruuYo@cluster0.mkiun.mongodb.net/societydb',
    host: 'cluster0.mkiun.mongodb.net',
    port: 27017,
    user: 'demouser01',
    password: 'T9AOmDDJAEcruuYo',
    database: 'venuedb',
    useNewUrlParser: true
};
let DbDataSource = class DbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
DbDataSource.dataSourceName = 'db';
DbDataSource.defaultConfig = config;
DbDataSource = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.config.db', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], DbDataSource);
exports.DbDataSource = DbDataSource;
// host: "krcrm.ccccu5t6vmzn.ap-south-1.rds.amazonaws.com",
// port: 1433,
// username: "admin",
// password: "eRpgNc647sfDi7b",
// database: "krsherpa",
// url: 'mssql://admin:eRpgNc647sfDi7b@krcrm.ccccu5t6vmzn.ap-south-1.rds.amazonaws.com,1433/krsherpa',
//# sourceMappingURL=db.datasource.js.map