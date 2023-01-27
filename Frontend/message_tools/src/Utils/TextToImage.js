import fileFetch from 'file-fetch'
import Jimp from 'jimp'

async function writeText(text){
    try {
        const res = await fileFetch('./text.txt', {
            method: 'POST',
            body: text
        })
    } catch (error) {
        console.log(error)
    }
}

writeText('hola')

async function getText(){
    try {
        const res = await (await fileFetch('./text.txt')).text();
        return res;
    } catch (error) {
        console.log('error abriendo el archivo... ', error)
        return;
    }
}

export async function base64toImage(name){
    const text = await getText();
    const buffer = Buffer.from(text, 'base64')
    const path = `../assets/whatsapp-imgs/${name}.jpg`;
    Jimp.read(buffer, (err, res) => {
        if(err) throw new Error(err);
        res.quality(10).write(path);
    })
    return path
}
