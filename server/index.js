// =============================================IMPORTS=============================================
import express from "express"
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'






// =========================================CONFIGARATIONS=========================================
dotenv.config()
const app = express()
const port = 4000
const uri = "mongodb+srv://ashutoshsidhya69:Ex5G8HsvmbNqSeH1@cluster0.he3pvtp.mongodb.net/todo?retryWrites=true&w=majority";




// =====================================MIDDLEWARE=====================================
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))




// =================================CONNECTIONS=================================

// mongoose.connect(uri,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log(`Connected to database`)
// }).catch((err)=>{
//     console.log(err)
// })


mongoose.connect(uri, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));




// ==========================USER SCHEMA==========================

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{ timestamps:true })

const User = mongoose.model('User',userSchema)





// =======================================CONTROLLERS=======================================

app.post('/register',async(req,res)=>{
    try{
        const { name , password } = req.body

        const existUser = await User.findOne({name})
        if(existUser){
            return res.status(400).json({message:"User Already Exist"})
        }

        const newUser = new User({
            name,
            password
        })
        await newUser.save()

        res.status(201).json({message:"User Registered succesfully"})

    }catch(error){
        console.error("Error registering user ",error)
        res.status(500).json({message:"Something went wrong"})
    }
})

app.post("/login",async(req,res)=>{
    try {
        const { name,password} = req.body
        const user = await User.findOne({name})
        if(!user){
            res.status(400).json({message:"User dose not exist"})
        }else{
            if(password !== user.password ){
                res.status(400).json({message:"Invalid password"})
            }else{
                res.status(200).json({message:"User Logged in succesfully"})
            }
        }
    } catch (error) {
        console.error("Error Login user ",error)
        res.status(500).json({message:"Something went wrong"}) 
    }
})


app.get("/users",async(req,res)=>{
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
       console.log("Error getting Users",error) 
       res.status(500).json({message:"Something went wrong"})
    }
})



// Start the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})