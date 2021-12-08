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
  }).ciphertext.toString()//output hex data
  console.log(enData)
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(enData))
  // return enData
}

export function decrypt(data, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(key)

  let _data = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(data))
  console.log(_data)

  let source = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(_data))
  var decryptedData = CryptoJS.AES.decrypt(source, key, {
    iv,
    ...aesConfig
  }).toString(CryptoJS.enc.Utf8)
  console.log(decryptedData)
  return decryptedData
}


