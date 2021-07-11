importScripts("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js")
var secret = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f');

var JsStoreEncrypt = {
    encrypt(message) {
        const data = CryptoJS.AES.encrypt(message, secret, { mode: CryptoJS.mode.ECB }).toString();
        console.log("data", data);
        return data;
    },
    decrypt(message) {
        var decryptedBytes = CryptoJS.AES.decrypt(message, secret, { mode: CryptoJS.mode.ECB });
        return decryptedBytes.toString(CryptoJS.enc.Utf8);
    }
}