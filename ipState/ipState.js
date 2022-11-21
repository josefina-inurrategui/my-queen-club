import axios from "axios";

 const URL=process.env.NEXT_PUBLIC_IP;

export const getState= async()=>{
  
    try{
         const get= await axios.get(URL)
         const data= get.data;
         return data;
    }
    catch(err){
      return err
    }

}