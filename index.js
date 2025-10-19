// import dependencies
//
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

//import dan langsung panggil functionnya
import 'dotenv/config';

// inisialisasi aplikasi

// deklarasi variabel di javascript
// [const|let] [namaVariabek] = [value]
// [var] -> nggak boleh dipake lagi(fungsinya udah digantikan oleh const/let di ES2015)
// [var] -> global declaration [var namaOrang]

// [const] -> 1x declare, ngga bisa diubah-ubah lagi
// [let] -> 1x declare, tapi bisa diubah-ubah (re-assignment)

// tipe data: number, string, boolean, undefined
// special: null (tipe-nya object, tapi nilainya falsy)

const app = express();
const upload = multer(); //akan digunakan di dalam recording

const ai = new GoogleGenAI({}); //insstantiation menjadi object instan (oop)

// inisialisasi middleware
// ex: app.use(namaMiddleware());
app.use(cors()); //middleware menggunakan cors (cross-origin resource sharing)
app.use(express.json());
//inisialisasi routing
//ex: app.get(), app.post(), app.put(), dll -> get, post, put itu bagian dari standar http
// HTTP Methods: GET, PUT, POST, PATCH, DELETE, OPTIONS, HEAD

//function

//secara penulisannya
//function biasa -> function namaFunction( ){}
//arrow function -> [const namaFuntion =] () => {}

// secara alurnya    
// synchronus --> () => {}
// [*] asynchronus --> async () => {}    
app.post('/generate-text', async (req, res) => {
    // terima jeroannya, lalu cek di sini
    const {prompt} = req.body; //object destructuring

    // guard clause (satpam)
    if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({
            success: false,
            message: 'Prompt harus berupa string!',
            data: null
        });
     }
     //jeroannya 
     try {
        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {text: prompt}
            ],
            //ini untuk config AI nya lebih jauh lagi
            config:{
                systemInstruction: 'harus pakai bahasa sunda'
            }
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil dijawab sama Gemini nihh',
            data: aiResponse.text
        });
     } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Gagal bre, lagi ada masalah!',
            data: null
        });
     }
});

// fitur chat
//endpoint: POST /api/chat

//servernya harus diserve dulu!
app.listen(3000, () => {
    console.log('I LOVE YOU 3000');
});