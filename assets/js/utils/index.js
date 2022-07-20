export function getMembres(searchText = null, page = 1) {
    return new Promise((resolve, reject) => {
        let data = {
            page
        }
        if (searchText) {
            // data.firstName = searchText
            // data.name = searchText
            // data.lastName = searchText
            data["cellule.name"] = searchText
        }
        global.$.ajax({
            type: "GET",
            url: `${location.origin}/api/membres`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${global.apiToken}`
            },
            data: data
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}

export function getCellules(page = 1) {
    return new Promise((resolve, reject) => {
        let data = {
            page
        }
        global.$.ajax({
            type: "GET",
            url: `${location.origin}/api/cellules`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${global.apiToken}`
            },
            data: data
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}


export function getStats(page = 1) {
    return new Promise((resolve, reject) => {
        let data = {
            page
        }
        global.$.ajax({
            type: "GET",
            url: `${location.origin}/api/stats`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${global.apiToken}`
            },
            data: data
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}

/**
 *
 * @param {{firstName: string, name: string, lastName: string, phoneNumber: string, email: string, birthDate: string, subscriptionDate: string, sexe: string, cellule: string, grade: string}} form
 * @return {Promise<unknown>}
 */
export function postMembres(form) {
    return new Promise((resolve, reject) => {
        let data = {
            "firstName": "string",
            "name": "string",
            "lastName": "string",
            "phoneNumber": "string",
            "email": "string",
            "birthDate": "2022-02-26T13:52:41.833Z",
            "subscriptionDate": "2022-02-26T13:52:41.833Z",
            "sexe": "string",
            "cellule": "string",
            "grade": "string"
        }
        global.$.ajax({
            type: "POST",
            url: `${document.location.origin}/api/membres`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + apiCredentials.AdminToken
            },
            data: JSON.stringify(form)
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}

async function login(Username, Password) {
    //await authenticate();
    return new Promise((resolve, reject) => {
        let data = {
            Email: Username,
            Password
        }
        global.$.ajax({
            type: "GET",
            url: `https://canalboxadminapi.azurewebsites.net/admin/api/UserProfile/Login`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${global.apiToken}`
            },
            data: data
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}

export function post(url, data, token) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (token) headers["X-AUTH-TOKEN"] = token

    return new Promise((resolve, reject) => {
        global.$.ajax({
            type: "POST",
            url: `${document.location.origin}${url}`,
            headers,
            data: JSON.stringify(data)
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}

export function postGraphql(url, data, token) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (token) headers["X-AUTH-TOKEN"] = token

    return new Promise((resolve, reject) => {
        global.$.ajax({
            type: "POST",
            url: `${document.location.origin}${url}`,
            headers,
            data: JSON.stringify({query: data})
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}

async function get(url, data, token) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (token) headers["X-AUTH-TOKEN"] = token

    return new Promise((resolve, reject) => {
        global.$.ajax({
            type: "GET",
            url: `${document.location.origin}${url}`,
            headers,
            data: data
        }).done(function (data) {
            resolve(data)
        }).fail(function (response) {
            reject(response)
        })
    })
}
