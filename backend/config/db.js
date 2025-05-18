import mongoose from "mongoose"

const configureDB = ()=>{
    const url='mongodb://127.0.0.1:27017/classified'
    try{
        mongoose.connect(url);
        console.log('Connected to db')
    }catch(err){
        console.log('Error While Connecting to Database')
    }
}

export default configureDB