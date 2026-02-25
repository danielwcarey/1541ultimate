// client.js


export function c64Client(serverIP, apiPassword){
    return {
        make_binary_get_request: (url, params) => make_binary_get_request(apiPassword, "http://" + serverIP + url, params),
        make_get_request: (url, params) => make_get_request(apiPassword, "http://" + serverIP + url, params),
        make_post_request: (url, params, body) => make_post_request(apiPassword, "http://" + serverIP + url, params, body),
        make_put_request: (url, params) => make_put_request(apiPassword, "http://" + serverIP + url, params)
    };
}

export async function make_binary_get_request(apiPassword, url, params) {
    const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const fullUrl = `${url}?${queryString}`;

    console.log('Requesting URL:', fullUrl);

    try {
        const response = await $.ajax({
            url: fullUrl,
            method: 'GET',
            dataType: 'binary',
            responseType: 'arraybuffer',
            processData: false,
            headers: {"X-Password": apiPassword}
        });

       var data = new Uint8Array(response);

        return [200, data];
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log('Error details:', {
            textStatus: error.statusText,
            status: error.status,
            responseText: error.responseText
        });

        const statusCode = error && error.status ? error.status : 500;
        return [statusCode, new Uint8Array()];
    }
}

export async function make_get_request(apiPassword, url, params) {
    params = params || {};
    const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const fullUrl = `${url}?${queryString}`;

    console.log('Requesting URL:', fullUrl);

    try {
        const response = await $.ajax({
            url: fullUrl,
            method: 'GET',
            processData: false,
            headers: {"X-Password": apiPassword}
        });
        return [200, response];
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log('Error details:', {
            textStatus: error.statusText,
            status: error.status,
            responseText: error.responseText
        });
        return [error.status, error.responseText];
    }
}

export async function make_post_request(apiPassword, url, params, body) {
    const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const fullUrl = `${url}?${queryString}`;

    try {
        const response = await $.ajax({
            url: fullUrl,
            method: 'POST',
            contentType: 'application/octet-stream',
            data: body,
            processData: false,
            headers: {"X-Password": apiPassword}
        });

        return [200, response];
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log('Error details:', {
            textStatus: error.statusText,
            status: error.status,
            responseText: error.responseText
        });
        return [error.status, error.responseText];
        //const statusCode = error && error.status ? error.status : 500;
        //return [statusCode, response];
    }
}

export async function make_put_request(apiPassword, url, params) {
    const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const fullUrl = `${url}?${queryString}`;

    try {
        const response = await $.ajax({
            url: fullUrl,
            method: 'PUT',
            contentType: 'application/octet-stream',
            processData: false,
            headers: {"X-Password": apiPassword}
        });

        return [200, response];
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log('Error details:', {
            textStatus: error.statusText,
            status: error.status,
            responseText: error.responseText
        });
        return [error.status, error.responseText];
        //const statusCode = error && error.status ? error.status : 500;
        //return [statusCode, response];
    }
}
