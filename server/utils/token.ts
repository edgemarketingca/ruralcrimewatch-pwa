// const clientId = '350c2c0fc3f638bfbc743f0b9d7efff7484dc77f2f437ab01eb4da600f26a94e'
// const clientSecret = '6ecac40f11955bc5ee3929a826d3aa7483d54ffbf82399de62aa4c738f15543f7de82f502b54fe6696e885cef61a05a1'

// const tokenUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/token'
// const authUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/authorize'
// const callBackUrl = 'https://www.ruralcrimewatch.ab.ca/ccm/system/api/documentation/redirect/a4688c88-d299-11ee-bad1-ac1f6bb580e6'

// const scope = 'account:read blocks:read calendar_events:read calendars:read files:read groups:read pages:read pages:versions:read sites:read system:info:read users:read'

// let _token: string | null = null
// export async function useToken() {
//   if (_token) {
//     return _token
//   }
//   const data = await $fetch(tokenUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${clientId}:${clientSecret}`,
//     },
//     body: {
//       grant_type: 'authorization_code',
//       client_id: clientId,
//       client_secret: clientSecret,
//       callback_url: callBackUrl,
//       scope,
//     },
//   })

//   return data
// }

export const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNDY4OGM4OC1kMjk5LTExZWUtYmFkMS1hYzFmNmJiNTgwZTYiLCJqdGkiOiJkY2JhZmMxNC0yNDNhLTExZWYtODMwZC0wMGEyM2Q2ZTk4ZmEiLCJpYXQiOjE3MTc3MDIwNTksIm5iZiI6MTcxNzcwMjA1OSwiZXhwIjoxNzE3Nzg4NDU5LCJzdWIiOiIxIiwic2NvcGVzIjpbImFjY291bnQ6cmVhZCIsImJsb2NrczpyZWFkIiwiY2FsZW5kYXJfZXZlbnRzOnJlYWQiLCJjYWxlbmRhcnM6cmVhZCIsImZpbGVzOnJlYWQiLCJncm91cHM6cmVhZCIsInBhZ2VzOnJlYWQiLCJwYWdlczp2ZXJzaW9uczpyZWFkIiwic2l0ZXM6cmVhZCIsInN5c3RlbTppbmZvOnJlYWQiLCJ1c2VyczpyZWFkIl19.VM8xUY1yteGjE7aW9yYLw1EjPXSRorq3a_uwJA5jpTL6KHUzvEw-84eGdU-gSD04wKf9WWXc8eW2wTzrvOJgnLUo3iahClsP3ZbrhTDJ1bX0rVvv71cv7jnCRPinmxrMtvPto-JvKbBXQLhQWIaO5DlkmdFgMujR6HuN9PR6wGoVqfeLaUuVcdEmARspko498yB8pZDohGKboGRJ-z8GE0hYdCBI5GJwsfdwtxvCLhv-YNG62-BD4M4DRXBirbBO7Gt6_EyHYqpfkHyIpV3BnNDjnUOSesevGkjzwHzPJ2wLFLj2QiX_hw_RI-h3YZZE-OnPSF3Y2R4df1Sf50lw5A'
