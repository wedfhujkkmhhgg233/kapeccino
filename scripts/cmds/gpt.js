const axios = require('axios');

const apiEndpoint = 'https://gpt4withcustommodel.onrender.com/gpt';

module.exports = {
  config: {
    name: "gpt",
    version: 1.0,
    author: "coffee",
    longDescription:"AI",
     category:"ai", 
     guide:{en:"{p}questions"}
   },
   onStart:async()=>{},
   onChat:async({event,message})=>{
      try{
         const {body} = event;
         if (!(body && body.toLowerCase().startsWith("gpt"))) return;

        const prompt= body.substring(2).trim();
        if (!prompt) {
          return await message.reply(
            "𝙼𝚘𝚌𝚑າ | 🧋✨\n━━━━━━━━━\nHi! Ask me anything!\n"
          );
       }

       const response=await axios.get(`${apiEndpoint}?query=${encodeURIComponent(prompt)}&model=gpt-4`);
       
       if (response.status === 200) {
           await message.reply(`Response from AI:\n${response.data.response}`);
        } else {
             throw new Error(`Failed to fetch data. Status:${response.status}`);
         }
      } catch(error){
              console.error("Error:",error.message);
      }
}};
