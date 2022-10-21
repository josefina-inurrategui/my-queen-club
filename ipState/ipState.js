 const URL=process.env.NEXT_PUBLIC_IP;

export const getState= async()=>{
  
    try{
         const get= await fetch(URL)
         const data= get.json();
         return data;
    }
    catch(err){
      return err
    }

}