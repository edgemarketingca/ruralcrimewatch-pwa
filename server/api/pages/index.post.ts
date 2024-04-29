export default defineCachedEventHandler(async () => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNDY4OGM4OC1kMjk5LTExZWUtYmFkMS1hYzFmNmJiNTgwZTYiLCJqdGkiOiJjZTI3MGQ0MS0wNWU2LTExZWYtYTVmYy0wMGEyM2Q2ZTk4ZmEiLCJpYXQiOjE3MTQzNjc0MjAsIm5iZiI6MTcxNDM2NzQyMCwiZXhwIjoxNzE0MzcxMDIwLCJzdWIiOiIxIiwic2NvcGVzIjpbImFjY291bnQ6cmVhZCIsImJsb2NrczpyZWFkIiwiY2FsZW5kYXJfZXZlbnRzOnJlYWQiLCJjYWxlbmRhcnM6cmVhZCIsImZpbGVzOnJlYWQiLCJncm91cHM6cmVhZCIsInBhZ2VzOnJlYWQiLCJwYWdlczp2ZXJzaW9uczpyZWFkIiwic2l0ZXM6cmVhZCIsInN5c3RlbTppbmZvOnJlYWQiLCJ1c2VyczpyZWFkIl19.izmWGfJRleictvbSUspFpGqh-lYZTC4thP-M7E8UhSpAc-9jdEIJ404ytdn7un6U_CYkV4vYPOH2plqYWVQU4seCMpyyc6prjHDfYOQTL4fxnfSfVw7BO8XYy65Im36kbVdo9aY9nR4bEkAyO59FPS_k16lJcYa5wJbCJGG3scYuSbORuW_7YzcNOizy2pt5klTXWDSxvF6mr3CAZAC633sIV4CYemEnKtdX7YTklozZqEH34Uo9d4nb6gNYFNCnwGrdI-wBj-G0ESK-jab5OAPmxwEC5bCb2eu8LFMnL8RCXtpwwuMZWxWO_hpu8t8aD_r51KKEv-pyMZYPBx-xMg'

  const res =  await $fetch('https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages?limit=99', {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  return res?.data
})
