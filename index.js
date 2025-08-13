const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
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

// let chat1 = new Chat({
//     from: "sumit",
//     to: "rahul",
//     msg: "Send me your exam notes!",
//     created_at: new Date()
// });
// chat1.save().then((res) =>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//INDEX ROUTE 
app.get("/chats", async(req, res) =>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
});

//NEW ROUTE
app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
});
//CREATE ROUTE
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from,
        to,
        msg,
        created_at: new Date()
    });

    newChat.save()
        .then(() => {
            console.log("Chat saved");
            res.redirect("/chats");
        })
        .catch((err) => {
            console.error("Error details:", err); 
            res.status(500).send("Error saving chat");
        });
});

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// EDIT  ROUTE
app.get("/chats/:id/edit", async(req, res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//UPDATE ROUTE
app.put("/chats/:id", async(req, res) =>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//DELETE ROUTE
app.delete("/chats/:id", async(req, res) =>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("Working");
});

app.listen(8080, () => {
    console.log("Sun Rha Hu Me....");
});
