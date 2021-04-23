const express = require("express")
let app = express()
let port = process.env.PORT || 3000
let mongoose = require("mongoose")
const MyModel = require("./models/createpost")

app.use(express.json())
app.use(express.static("public"))
app.set("view engine", "hbs")


app.get("/", (req, res) => {
    res.render("fairlyfly")
})

app.get("/remastered", (req, res) => {
    res.render("remastered")
})

app.get("/getposts", (req, res) => {
    
    mongoose.connect("mongodb+srv://shagufa:checoperez@cluster0.qnnuu.mongodb.net/fairlyfly?retryWrites=true&w=majority",
    { useUnifiedTopology: true , useNewUrlParser: true }, function ( err)  {

        if (err) {

            
            console.log("mongo db error")
            return res.json({message : err.message, 
            code : err.code
             })
        
        }
        
        MyModel.find({}, function (error, docs) {
            res.json({data : docs})
        }).limit(12)

    })

    

    
})

app.post("/updatepost", (req, res) => {

    let post = req.body
    console.log(post)
    mongoose.connect("mongodb+srv://shagufa:checoperez@cluster0.qnnuu.mongodb.net/fairlyfly?retryWrites=true&w=majority",
    { useUnifiedTopology: true , useNewUrlParser: true })

    MyModel.findOneAndUpdate({ title : req.body.name}, { postStatus : "cleared" }, function (err, doc) {
        if (err) throw err
        console.log(doc)
        res.json({data: "cleared"})
    })
   
  
})


app.post("/createPost", (req, res) => {
    
    
    let  {postTitle, postExplanation, status, category} = req.body
    console.log(status)
    mongoose.connect("mongodb+srv://shagufa:checoperez@cluster0.qnnuu.mongodb.net/fairlyfly?retryWrites=true&w=majority",
        { useUnifiedTopology: true , useNewUrlParser: true , useCreateIndex: true } 
    )

    const insertPost = new MyModel({ title : postTitle , explanation : postExplanation, postStatus : status, postCategory : category })
    insertPost.save(function (err) {
        if (err) return err
        //saved
        res.send("saved")
    })


})

app.post("/deletepost", (req, res) => {
    console.log(req.body.post)
    
    mongoose.connect("mongodb+srv://shagufa:checoperez@cluster0.qnnuu.mongodb.net/fairlyfly?retryWrites=true&w=majority",
    { useUnifiedTopology: true , useNewUrlParser: true })

    MyModel.findOneAndDelete({ title: req.body.post } , function (err) {
        if (err) throw err
        res.json("deleted")
    })
})



app.listen(port , () => {
    console.log("running from fairlyFly servers")
})