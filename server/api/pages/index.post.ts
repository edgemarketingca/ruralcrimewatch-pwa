export default defineCachedEventHandler(async () => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNDY4OGM4OC1kMjk5LTExZWUtYmFkMS1hYzFmNmJiNTgwZTYiLCJqdGkiOiI2MzMwNDllNi0wYjRiLTExZWYtYTVmYy0wMGEyM2Q2ZTk4ZmEiLCJpYXQiOjE3MTQ5NjAzNzMsIm5iZiI6MTcxNDk2MDM3MywiZXhwIjoxNzE1MDQ2NzczLCJzdWIiOiIxIiwic2NvcGVzIjpbImFjY291bnQ6cmVhZCIsImJsb2NrczpyZWFkIiwiY2FsZW5kYXJfZXZlbnRzOnJlYWQiLCJjYWxlbmRhcnM6cmVhZCIsImZpbGVzOnJlYWQiLCJncm91cHM6cmVhZCIsInBhZ2VzOnJlYWQiLCJwYWdlczp2ZXJzaW9uczpyZWFkIiwic2l0ZXM6cmVhZCIsInN5c3RlbTppbmZvOnJlYWQiLCJ1c2VyczpyZWFkIl19.dTn_ehq2xcwEgAs2OIhtsPETUrcNBfiErFP2UMKj12p2IDPRljfS-NmPhsUIKb-Zut97OwBguB_tgS1Y2t-MC3yH4fLTyddP3dNLaoS2zHBDqdKbzGQL7PLOxRVYFyaYwMivqpRY1D5oHuAg0IHlid9RmPDPj7kMCf4fqEtz7fP6XCkKlsk5J6v7gInMC5QSLHXLG3Pe_JQzSaYz3Y8Iu3z8DkdJOucFQuRZmjRDRSUd5B8xO2Z_TvOgcQpgGeGih5FkgcHhWuqj-NRbqPS7OeqZAPy2-TjyVu0e61H_P4lbwe1yCCm0cofdub05dwhNZQw5jVjAR-LY3yKLgJsq8Q'

  const res =  await $fetch('https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages?limit=99&includes=custom_attributes', {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  return res?.data
}, {
  maxAge: 60 * 60 * 24 * 30,
})
