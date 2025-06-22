import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app=express();
const port =3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/country",async(req,res)=>{
    const country=req.body.country;

 

    try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`);

        const data=response.data[0];
        console.log(JSON.stringify(response.data, null, 2));
        res.render("result",{country: data});
    }catch(error){
        res.render("result",{country:null});
    }
})
app.listen(port,()=>{
    console.log(`Server is running at post${port}`);
})


