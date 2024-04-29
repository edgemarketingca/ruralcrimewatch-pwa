const clientId = '350c2c0fc3f638bfbc743f0b9d7efff7484dc77f2f437ab01eb4da600f26a94e'
const clientSecret = '6ecac40f11955bc5ee3929a826d3aa7483d54ffbf82399de62aa4c738f15543f7de82f502b54fe6696e885cef61a05a1'

const tokenUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/token'
const authUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/authorize'
const callBackUrl = 'https://www.ruralcrimewatch.ab.ca/ccm/system/api/documentation/redirect/a4688c88-d299-11ee-bad1-ac1f6bb580e6'

const scope = 'account:read blocks:read calendar_events:read calendars:read files:read groups:read pages:read pages:versions:read sites:read system:info:read users:read'

let _token: string | null = null
export async function useToken() {
  if (_token) {
    return _token
  }
  const data = await $fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${clientId}:${clientSecret}`,
    },
    body: {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      callback_url: callBackUrl,
      scope,
    },
  })

  return data
}
