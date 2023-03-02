import fileFetch from 'file-fetch'
import Jimp from 'jimp'

async function writeText(text : string){
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

export async function base64toImage(name : string){
    const text = await getText();
    if(text){
        const buffer = Buffer.from(text, 'base64')
        const path = `../assets/whatsapp-imgs/${name}.jpg`;
        Jimp.read(buffer, (err, res) => {
            if(err) throw new Error();
            res.quality(10).write(path);
        })
        return path
        
    }
}


export async function imageToBase64(file : File) {
    let reader = new FileReader(), base64String = "";
    
    reader.onload = function () {
        const result = reader.result;
        if(result && (typeof result == 'string')){
            base64String = result.replace("data:", "")
                .replace(/^.+,/, "");
        }
    }

    reader.readAsDataURL(file);
    return base64String
}