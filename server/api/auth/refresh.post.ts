
export default defineEventHandler(async () => {
  
  const token = 'def50200e61c3c125c3ffefb2c9ed9be81c19839a7531112103d10af48e7b458ad93b33dd5c6169cb15bf3e0f3e447de94baad3d664eafc074c4454d314784d8698b47365c55365634eaf92dfe08ab8442884435b8b25ad086be24498ffac6f74ce514b93c71ee7bcb13b5cbcfba59e9b1b6750fcc3c64393523e67802f59a94c140689deb672f6a251a62ca1e4a5e6ebee885d6b1fad977b5b1253a5d6198bacf71784c3203a258f65e36e992b45d455044da76f24c5122f0683fc534ea011fcab629503fbd95fdf9d2056f43380fab9e8223c9680c99eb83e151027eee7154d02d0186b14ce3b7392be74fa04d89db6b7aa955f011ddae5c40393ead503bca655b2f1aa39f95d5c79e09accf855923bc05db269b0099c053ca6a9b54419bceb892633deceeac8b6adf554445c3f0b689b19b4f0f0ec11c83862880d5697ce430f430da050e3feca3ac90ddf4f34b77267f2566b5dc283e81245690b58ceec975a5133c710aac57a0fe5719055633367180cf6532f2788eb85539d7b4d9aec2b7ebaefc7cf13fdc4b18edd4e7b13871b89e85f819f4963d3f4abb31a5c2b90240534b4798755c213a2a8483ff6e6d1657b1b9cd3b17e6e7f903009bf23ac510d9ef6531511fdb04550daf24ec5d4e12c1897efd068a6c1e6524d8'
  const accessTokenUrl = 'https://www.ruralcrimewatch.ab.ca/oauth/2.0/token'
  const redirect_uri = 'https://www.ruralcrimewatch.ab.ca/ccm/system/api/documentation/redirect/a4688c88-d299-11ee-bad1-ac1f6bb580e6'

  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'refresh_token')
  requestBody.append('refresh_token', token)

  const data = await $fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic MzUwYzJjMGZjM2Y2MzhiZmJjNzQzZjBiOWQ3ZWZmZjc0ODRkYzc3ZjJmNDM3YWIwMWViNGRhNjAwZjI2YTk0ZTo2ZWNhYzQwZjExOTU1YmM1ZWUzOTI5YTgyNmQzYWE3NDgzZDU0ZmZiZjgyMzk5ZGU2MmFhNGM3MzhmMTU1NDNmN2RlODJmNTAyYjU0ZmU2Njk2ZTg4NWNlZjYxYTA1YTE=`,
    },
    body: requestBody,
  })

  return data
})