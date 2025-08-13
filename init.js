const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("connection success");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from: "jishan",
        to: "yash",
        msg: "Kya Haal Hai Bhai!!",
        created_at: new Date()
    },
     {
        from: "jishan",
        to: "yaman",
        msg: "Kaise Ho Bhai!",
        created_at: new Date()
    },
     {
        from: "yash",
        to: "jishan",
        msg: "sab bdiya bhai tum btao ?",
        created_at: new Date()
    },
     {
        from: "jishan",
        to: "adnan",
        msg: "kakrala is in america?",
        created_at: new Date()
    },
];

Chat.insertMany(allChats);