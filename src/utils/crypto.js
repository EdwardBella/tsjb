import cryptoJs from 'crypto-js'
let keyOne = 'youedata12345678'

export default {
  // 加密函数
  encryption (word) {
    let key = cryptoJs.enc.Utf8.parse(keyOne)
    let data = cryptoJs.enc.Utf8.parse(word)
    let enc = cryptoJs.AES.encrypt(data, key, {
        iv: key,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.Pkcs7
    })
    let encResult = cryptoJs.enc.Base64.stringify(enc.ciphertext)
    return encResult
  },
  // 解密函数
  decrypt (word) {
    let key = cryptoJs.enc.Utf8.parse(keyOne)
    let dec = cryptoJs.AES.decrypt(word, key, {
      iv: key,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    })
    let decData = cryptoJs.enc.Utf8.stringify(dec)
    return decData
    }
}