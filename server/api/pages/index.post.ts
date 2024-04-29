export default defineCachedEventHandler(async () => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNDY4OGM4OC1kMjk5LTExZWUtYmFkMS1hYzFmNmJiNTgwZTYiLCJqdGkiOiJmY2RlMjAyZS0wNjNhLTExZWYtYTVmYy0wMGEyM2Q2ZTk4ZmEiLCJpYXQiOjE3MTQ0MDM1NzUsIm5iZiI6MTcxNDQwMzU3NSwiZXhwIjoxNzE0NDA3MTc1LCJzdWIiOiIxIiwic2NvcGVzIjpbImFjY291bnQ6cmVhZCIsImJsb2NrczpyZWFkIiwiY2FsZW5kYXJfZXZlbnRzOnJlYWQiLCJjYWxlbmRhcnM6cmVhZCIsImZpbGVzOnJlYWQiLCJncm91cHM6cmVhZCIsInBhZ2VzOnJlYWQiLCJwYWdlczp2ZXJzaW9uczpyZWFkIiwic2l0ZXM6cmVhZCIsInN5c3RlbTppbmZvOnJlYWQiLCJ1c2VyczpyZWFkIl19.Dr26iOcQNBxmH48pqtuY1-OxJQlNr4ZDxPh6Hs9Y6KBSspdJt1kmzv-m6bwtHwGTXEmFqpvEbpQt1OxEydav3t2kdTASlDqBDAUs1WW2ILyytK3Pw6vRUAm8xS1rtog5itODrxhse-Kgr_YKAhiT-9jUywHZUXtU9AixnLA-Bi5_vltt0OugSoJsIqyVqUEPd1zKnJtWo7eWx7hRNyhyL6n4_n6shWt-hyNqzFopwVbz_EyW0CgdQ9NEYBoVafpH7eGt0JzI56XCRtl0X4uZbnskMilWsfoD_wsGGKoGfgrQQpdPUK7o1q1feuSKfYlzo69zP87yzCbivSWR-1U5dg'

  const res =  await $fetch('https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages?limit=99', {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  return res?.data
}, {
  maxAge: 60 * 60 * 24 * 30,
})
