export default defineEventHandler(async () => {

  const clientId = '383ec9b637c8bedc01ec5e399f2a94addc90241924f24cdeced2231b628d213d'
  const clientSecret = 'f5f0c2c580abfb555190674d9c9d61cb6ab465a2e7d75758217074118082b66a7e6b1a5c7826ca83388fbcf39dd2a0cc'
  const credentials = btoa(`${clientId}:${clientSecret}`)

  const scopes = 'openid pages:read files:read sites:read account:read blocks:read'

  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'client_credentials');
  requestBody.append('scope', scopes);


  const data = await $fetch('https://ruralcrimewatch.ab.ca/oauth/2.0/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  })

  return data
})
