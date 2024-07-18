const clientId = '350c2c0fc3f638bfbc743f0b9d7efff7484dc77f2f437ab01eb4da600f26a94e';
const clientSecret = '6ecac40f11955bc5ee3929a826d3aa7483d54ffbf82399de62aa4c738f15543f7de82f502b54fe6696e885cef61a05a1';
const username = 'admin';
const password = '!ABrcwAdmin!23';
const tokenUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/token';
const scope = 'account:read blocks:read calendar_events:read calendars:read files:read groups:read pages:read pages:versions:read sites:read system:info:read users:read'

export async function getToken() {
    const authKey = `${clientId}:${clientSecret}`;
    const credentials = btoa(authKey);
    const data = await $fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`,
        },
        body: new URLSearchParams({
            grant_type: 'password',
            client_id: clientId,
            client_secret: clientSecret,
            username: username,
            password: password,
            scope,
        }),
    });

    return data.access_token;
}

