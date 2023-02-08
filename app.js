const express = require("express")
const bodyParser = require("body-parser")
const request = require("request" )
const https = require("https")
const app = express()


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    
})

app.post("/",function(req,res){
   const name =req.body.fName;
   const last= req.body.lName;
   const email=req.body.email;

  //  const data ={
  //    members:[
  //     {
  //        email_address:email,
  //        status:'subscribed',
  //        merge_fields:{
  //         FNAME:name,
  //         LNAME:last
  //        }
  //     }
  //    ]
  //  }

  //  const postData = JSON.stringify(data);

  //  const options ={
  //   url: 'https://us11.api.mailchimp.com/3.0/lists/ecfdea84d2',
  //   method:'POST',
  //   headers:{
  //     authorization:'auth af4ee7b6f5e3b6bafc7d31b140f719c6-us11'

  //   },
  //   body:postData
  //  }  

  //  request(options,(err,response,body)=>{
  //     if(response.statusCode ===200){
  //       console.log('success');
  //     }else{
  //       console.log('fail');
  //     }
  //  });
  // 4df9f2407af31aa37f8a96981846a90f-us11
  // client.setConfig({
    //     apiKey: "af4ee7b6f5e3b6bafc7d31b140f719c6-us11",
//     server: "us11",
//   });


//   const run = async () => {
//     const response = await client.lists.batchListMembers("ecfdea84d2", {
//       members: [{email_address:email,
//         status:"subscribed",
//         merge_fields:{
//             FNAME:name,
//             LNAME:last
//         }
//     }
//         ]
//     });
//     console.log(response);
//   };

//   run();


   const data ={
         members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:name,
                    LNAME:last
                }
            }
         ]
   };
   const   jsonData = JSON.stringify(data);
   const url ="https://us11.api.mailchimp.com/3.0/lists/ecfdea84d2";
   const option ={
    method :"POST",
    auth:"mukesh:af4ee7b6f5e3b6bafc7d31b140f719c6-us11"
     
   }
   const request= https.request(url,option,function(response){
    
    if(response.statusCode==200){
       res.sendFile(__dirname +"/success.html");
       }else{
        res.sendFile(__dirname +"/failure.html");
       }
    
    response.on("data",function(data){
       
        console.log(JSON.parse(data));
    }
    
    )
})


request.write(jsonData);  
request.end();

 
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.post("/success",function(req,res){
    res.redirect("/");
});

//const
// API key
// af4ee7b6f5e3b6bafc7d31b140f719c6-us11
//list Id
//ecfdea84d2
//hello 
 





app.listen(process.env.PORT ||3000,function(req,res){
    console.log("server is running on port 3000");
})