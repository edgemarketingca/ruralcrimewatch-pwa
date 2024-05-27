export default defineEventHandler(async () => {

  const client_id = '350c2c0fc3f638bfbc743f0b9d7efff7484dc77f2f437ab01eb4da600f26a94e'
  const clientSecret = '6ecac40f11955bc5ee3929a826d3aa7483d54ffbf82399de62aa4c738f15543f7de82f502b54fe6696e885cef61a05a1'
  // const credentials = btoa(`${clientId}:${clientSecret}`)

  const scope = 'account:read blocks:read calendar_events:read calendars:read files:read groups:read pages:read pages:versions:read sites:read system:info:read users:read'
  
  const authURL = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/authorize'
  const accessTokenUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/token'
  const redirect_uri = 'https://www.ruralcrimewatch.ab.ca/ccm/system/api/documentation/redirect/a4688c88-d299-11ee-bad1-ac1f6bb580e6'

  

  // const auth = await $fetch(authURL, {
  //   method: 'POST',
  //   query: {
  //     response_type: 'code',
  //     client_id,
  //     redirect_uri,
  //     scope,
  //   },
  // })

  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'client_credentials');
  requestBody.append('scope', scope)

  const token = await $fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic MzUwYzJjMGZjM2Y2MzhiZmJjNzQzZjBiOWQ3ZWZmZjc0ODRkYzc3ZjJmNDM3YWIwMWViNGRhNjAwZjI2YTk0ZTo2ZWNhYzQwZjExOTU1YmM1ZWUzOTI5YTgyNmQzYWE3NDgzZDU0ZmZiZjgyMzk5ZGU2MmFhNGM3MzhmMTU1NDNmN2RlODJmNTAyYjU0ZmU2Njk2ZTg4NWNlZjYxYTA1YTE=`,
    },
    body: requestBody,
  })

  return {
    token,
  }
})
