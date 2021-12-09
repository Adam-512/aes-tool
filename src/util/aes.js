import CryptoJS from 'crypto-js'

const aesConfig = {
  mode: CryptoJS.mode.CBC, // AES加密模式
  padding: CryptoJS.pad.Pkcs7, // 填充:  pkcs7 padding
  blockSize: 128,//数据块
}



export function encrypt(data, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(key)
  var enData = CryptoJS.AES.encrypt(data, key, {
    iv,
    ...aesConfig
  })//output hex data
  console.log(enData.ciphertext)
  return CryptoJS.enc.Base64.stringify(enData.ciphertext)
  // return enData.toString()
}

export function decrypt(data, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(key)

  var decryptedData = CryptoJS.AES.decrypt(data, key, {
    iv,
    ...aesConfig
  }).toString(CryptoJS.enc.Utf8)
  console.log(decryptedData)
  return decryptedData
}


