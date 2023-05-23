"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApplication = exports.PackageKey = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const keys_1 = require("./keys");
const sequence_1 = require("./sequence");
const services_1 = require("./services");
exports.PackageKey = core_1.BindingKey.create('application.package');
const pkg = require('../package.json');
class MainApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options) {
        super(options);
        // Bind authentication component related elements
        this.component(authentication_1.AuthenticationComponent);
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.setUpBindings();
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    setUpBindings() {
        // Bind package.json to the application context
        this.bind(exports.PackageKey).to(pkg);
        // Bind bcrypt hash services
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(services_1.BcryptHasher);
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE).toClass(services_1.JWTService);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(services_1.UserManagementService);
        this.add(core_1.createBindingFromClass(services_1.SecuritySpecEnhancer));
    }
    // Unfortunately, TypeScript does not allow overriding methods inherited
    // from mapped types. https://github.com/microsoft/TypeScript/issues/38496
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async start() {
        // Use `databaseSeeding` flag to control if products/users should be pre
        // populated into the database. Its value is default to `true`.
        if (this.options.databaseSeeding !== false) {
            await this.migrateSchema();
        }
        return super.start();
    }
}
exports.MainApplication = MainApplication;
//# sourceMappingURL=application.js.map