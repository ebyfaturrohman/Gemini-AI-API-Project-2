#yang akan kita kerjakan...

1. sedia static directory
2. implementasi endpoint chatbot (POST api/chat)
    - mulai bikin endpoint baru POST /api/chat
    - kita buat handler untuk menghandle request POST /api/chat yang dari browser
    - buat beberapa "satpam" (guard clause):
        1. hadnle payload 'conversation' dari 'req.body' apakah conversationnya berupa array atau tidak
        2. handle setiap message yang ada pada payload 'conversation', untuk cek apakah messagenya berupa 'object' dengan isi '{ role: 'user' | 'model', message: string }'. Tandai sebagai invalid jika:
            - ada elemen yang tidak sesuai (tipe datanya lain dari 'object' atau nilainya 'null')
            - setiap elemen tidak memiliki 2 property persis, dan tidak memiliki 'role' dan 'model' pada objectnya
            - 'role' tidak berupa 'user' atau 'model', atau 'message' tidak bertipe data 'string' atau berisi string kosong ( ' "" ' atau ' '' ')
    - lakukan mapping agar bisa dikirim ke google Gemini API dengan function/method generateContent()
    - message yang diterima oleh Google Gemini API nanti akan dikirimkan kembali ke user dengan format {success:boolean, message:string, data:string}        
