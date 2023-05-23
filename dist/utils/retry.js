"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.retry = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = debug_1.default('loopback:example:shopping');
/**
 * Retry a task for number of times with the given interval in ms
 * @param task Task object {run, description}
 * @param maxTries Maximum number of tries (including the first run),
 * default to 10
 * @param interval Milliseconds to wait after each try, default to 100ms
 */
async function retry(task, { maxTries = 10, interval = 100 } = {}) {
    if (maxTries < 1)
        maxTries = 1;
    let triesLeft = maxTries;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        debug('Try %s (%d/%d)', task.description, maxTries - triesLeft + 1, maxTries);
        const status = await task.run();
        if (status.done)
            return status.value;
        if (--triesLeft > 0) {
            debug('Wait for %d ms', interval);
            await exports.sleep(interval);
        }
        else {
            // No more retries, timeout
            const msg = `Failed to ${task.description} after ${maxTries * interval} ms`;
            debug('%s', msg);
            throw new rest_1.HttpErrors.RequestTimeout(msg);
        }
    }
}
exports.retry = retry;
/**
 * Sleep for the given milliseconds
 * @param ms Number of milliseconds to wait
 */
exports.sleep = util_1.promisify(setTimeout); // (ms: number) => Promise<void>
//# sourceMappingURL=retry.js.map