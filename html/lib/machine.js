import { c64Client } from './client.js'

export async function doReset() {
    let params = {};
    let [status_code, content] = await c64Client.make_put_request("/v1/machine:reset", params);
};

export async function doReboot() {
        let params = {};
        let [status_code, content] = await c64Client.make_put_request("/v1/machine:reboot", params);
    };

export async function doMenuButton() {
        let params = {};
        let [status_code, content] = await c64Client.make_put_request(serverIP + "/v1/machine:menu_button", params);
    };