import CryptoJS from 'crypto-js';

const clave = 'AYD1G2VD2023';

export const Encriptar = (texto) => {
    const textoEncriptado = CryptoJS.AES.encrypt(texto, clave).toString();
    const textoEncriptadoBase64 = btoa(textoEncriptado);
    return textoEncriptadoBase64;
}

export const Desencriptar = (texto) => {
    const textoEncriptado = atob(texto);
    const textoDesencriptado = CryptoJS.AES.decrypt(textoEncriptado, clave).toString(CryptoJS.enc.Utf8);
    return textoDesencriptado;
}