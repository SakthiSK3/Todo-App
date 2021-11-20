const express =require ("express");
const app=express();
const mongoose =require('mongoose');
const UsersRoute=require('./UsersRoute');
const morgan =require('morgan')
const cors =require('cors'); 
const PORT =Number(process.env.PORT || 8000)

app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors());  
app.use('/api',UsersRoute);     

app.listen(PORT,()=>{
    console.log("server connected sucessfully")
})  


mongoose.connect('mongodb+srv://pinky_pig:shit4Everyone@cluster0.4zfjv.mongodb.net/sakthi?retryWrites=true&w=majority',{ useNewUrlParser: true  , useUnifiedTopology: true },()=>{
    console.log("Data base server connected sucessfully")
})