const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var path = require('path');
const https=require("https");
const mongoose = require("mongoose");  //require mongoose
mongoose.set('strictQuery', true); //related to mongoose idk

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set('views', path.join(__dirname, 'views'));

const bcrypt=require("bcrypt");
const { fchown } = require("fs");
const saltRounds=10;


////////////////////////////////////////////////////////////// For users////////////////////////////////////////////////////////////////
mongoose.connect("mongodb+srv://suraj-fusion:surajraj@cluster0.z5cqkyz.mongodb.net/BlogDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema= new mongoose.Schema({    //have to create proper mongoose schema to encrypt it 
    email:String,
    password:String
});




const users = new mongoose.model("User",userSchema);



////////////////////////////////////////////////////////////// For Businesses////////////////////////////////////////////////////////////////


const businessSchema= new mongoose.Schema({    //have to create proper mongoose schema to encrypt it 
    email:String,
    password:String
});


const businesses = new mongoose.model("Business",businessSchema);


///Demands schema 
const demandSchema= new mongoose.Schema({    
    email:String,
    description:String,
    name:String,
    location:String,
    status:String,
    category:String

});


const demands = new mongoose.model("Demand",demandSchema);




const feedbackSchema= new mongoose.Schema({    
    email:String,
    name:String,
    feedback:String,
    rating:Number

});


const feedbacks = new mongoose.model("Feedback",feedbackSchema);



//////////////////////////////////chat///////////////////////

app.get("/chat",function(req,res){

    res.render("chat");

});


app.get("/",function(req,res){


    res.render("home");

});

app.get("/userlogin",function(req,res){

    res.render("userlogin");
});

app.get("/userregister",function(req,res){

    res.render("userregister");
});




app.post("/userregister",function(req,res){


    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser=new users({
            email:req.body.email,
            password:hash
        });
    
        newUser.save(function(err){
            if(err)
            {
                console.log(err);
            }
            else{
                res.render("userhome");
            }
        });
    });


    

});





app.post("/userlogin",function(req,res){

    const username=req.body.email;
    const password=req.body.password;

    users.findOne({email:username},function(err,userfound){
     
        if(err)
        {
            res.render("loginfailure");
        }
        else if(userfound==null)
        {
            res.render("loginfailure");
        }
        else
        {
            if(userfound){
              
                bcrypt.compare(password, userfound.password, function(err, result) {
                    if(result==true)
                    {
                        res.render("userhome");
                    }
                    else
                    {
                        res.render("loginfailure");
                    }
                });
            }
        }
    });
});



app.get("/userdemand",function(req,res){

    res.render("userdemand");
})


app.post("/userdemand",function(req,res){

    const newDemand=new demands({
        email:req.body.email,
        description:req.body.description,
        name:req.body.name,
        location:req.body.location,
        category:req.body.category,
        status:"submitted"

       
    });
    newDemand.save(function(err){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("demandsuccess");
        }
    });
    
    


});

app.get("/searchuserdemand",function(req,res){


    res.render("searchuserdemand");

});



app.post("/searchuserdemand",function(req,res){


   demands.find({email:req.body.email},function(err,founddemands){
    if(!err){
        res.render("user_search_demands_res",{found:founddemands});
    }

   });
    
});


app.get("/submit_feedback",function(req,res){

    res.render("userfeedback");

});

app.post("/submit_feedback",function(req,res){

    const newFeedback=new feedbacks({
        email:req.body.email,
        name:req.body.name,
        feedback:req.body.feedback,
        rating:req.body.rating

       
    });
    newFeedback.save(function(err){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("feedbacksuccess");
        }
    });

});

///////////////////////////////////////////////////////////////////////For businesses//////////////////////////////////////////////////////////





app.get("/businesslogin",function(req,res){

    res.render("businesslogin");
});

app.get("/businessregister",function(req,res){

    res.render("businessregister");
});

app.get("/businessdemand",function(req,res){
      demands.find(function(err,founddemands){
        if(!err){
          res.render("businessdemands",{found:founddemands});
        }
      });
})


app.post("/businessregister",function(req,res){


    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newBusiness=new businesses({
            email:req.body.email,
            password:hash
        });
    
        newBusiness.save(function(err){
            if(err)
            {
                console.log(err);
            }
            else{
                res.render("businesshome");
            }
        });
    });


    

});





app.post("/businesslogin",function(req,res){

    const username=req.body.email;
    const password=req.body.password;

    businesses.findOne({email:username},function(err,businessfound){
        if(err)
        {
            res.render("loginfailure");
        }
        else if(businessfound==null)
        {
            res.render("loginfailure");
        }
        else
        {
            if(businessfound){
              
                bcrypt.compare(password,businessfound.password, function(err, result) {
                    if(result==true)
                    {
                        res.render("businesshome");
                    }
                    else
                    {
                        res.render("loginfailure");
                    }
                });
            }
        }
    });
});



app.post("/change_status",function(req,res){

   res.render("change_status",{id:req.body.id});

});


app.post("/publish_status_change",function(req,res){


   demands.findOneAndUpdate({_id:req.body.id},{status:req.body.updatedstatus},function(err){
    if(!err)
    {
        console.log("successfully updated");
        res.redirect("/businessdemand")
    }
   });
   
 });
 
app.get("/feedbacks",function(req,res){

    feedbacks.find(function(err,foundfeedbacks){
        if(!err){
            res.render("businessfeedbacks",{found:foundfeedbacks});
        }
    
       });

});


app.listen(3000,function(){
    console.log("App running on port 3000");
});