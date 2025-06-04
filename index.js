
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article");
// mongodb+srv://ahmed:<db_password>@cluster0.c1z2qtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose
.connect("mongodb+srv://ahmed:ahmed123@cluster0.c1z2qtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected Succsesfuly (:");
}).catch((err)=>{
    console.log("Error Connection Error Is: ", err);
})
const app = express();
app.use(express.json());
// ------------ Response -------------
app.get("/hello" , (req , res)=>{
    res.send("Hellooooo(:")     
})
app.get("/hi" , (req , res)=>{
    res.send("Thes Wep hi (;")
})
            
app.post("/send",(req, res)=>{
    res.send("Send Complate");
})
                                  
app.put("/put",(req,res)=>{      
    res.send("Put")           
})
                                  
app.delete("/deleting",(req,res)=>{
    res.send("Deleting Bro")       
})


// ---------- Creat Parameters in Get -----------
app.get("/parameters/:num1/:num2" , (req,res)=>{
    const num1 = req.params.num1;
    const num2 = req.params.num2;
    const total = Number(num1) + Number(num2); 
    console.log(req.params , total);
    res.send(`The Numbers Parameters Is: ${num1} | ${num2} +> ${total}`)
})


// ---------- get Json From Postman -----------
app.get("/json",(req,res)=>{
    console.log(req.body);
    res.send(`Hello: ${req.body.name}`);
})

// ---------- Creat Json From here -----------

app.get("/Creat_json",(req,res)=>{
    res.json({
        name: req.body.name,
        age:18
    })
})


// ---------- get Query Parameters -----------

app.get("/query",(req,res)=>{
    console.log(req.query);
    res.send(`Query id = ${req.query.id}`)
    
})


// ---------- get Code file only -----------
app.get("/file_only",(req,res)=>{
    res.sendFile(__dirname + "/views/file.html")
})


// ---------- get/Send Parameters For File.ejs -----------
app.get("/file_send" ,(req,res)=>{
    // here file.ejs is on Because Forlder Name is (/views)
    // if folder name is not (/views) > "/name_folder/file.ejs" 
    res.render("file.ejs", {
        name:"Mohammed",
        age:18
    })
})



// ---------- Add/Creat Values For DB -----------
app.post("/newArticle", async (req,res)=>{
    // This From Json (PostMan)
    const arttit = req.body.tit;

    const newArticle = new Article();
    newArticle.title = arttit;
    newArticle.discription = "This is Description Article Is Toooooal";
    newArticle.likes = 20;
    await newArticle.save();
    res.json(newArticle);
})
// ------------- get Data From DB ------------
app.get("/getarticles/:id" , async(req,res)=>{
    const id = req.params.id;
    try{
        // const artecles = await Article.find();
        const artecle1 = await Article.findById(id);
        res.send(artecle1)
        return;
    }
    catch(error){
        res.send("Error in Get Id")
    }
})

// ------------- Delete Data From DB ------------
app.delete("/delete_articles/:id", async(req,res)=>{
    const id = req.params.id;
    try{
        const atricle = await Article.findByIdAndDelete(id)
        res.send(atricle);
        return;
    }
    catch(error){
        res.send("Error Delete Article!");
    }
})

// ---------- Show All Artecles In Page ---------
app.get("/showArtecles" , async(req , res)=>{
    const allArticles = await Article.find();
    res.render("articles.ejs" , {
        articlesAll: allArticles
    })
})





// Listening (Default)
app.listen("3000",()=>{
    console.log("Listening in port 3000")
})