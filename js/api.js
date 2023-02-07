async function getDataArray(urls, onSuccess) {
    const options = {
        method: 'GET'
    };

    const requests = urls.map((url) => fetch(url, options));
    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map((r) => r.json()));

    onSuccess(data);
}

async function sendData(url, onSuccess, onFail, body) {
    const options = {
        method: 'POST',
        body
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        onSuccess(data);
    } else {
        const errors = JSON.parse(response.headers.get('errors'));
        onFail(errors);
    }
}

export {getDataArray, sendData};
