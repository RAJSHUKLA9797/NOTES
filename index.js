const express = require('express')
const app = express();
const bodyParser = require('body-parser')//middleware use to tell that req.bosy has what sort of text html or json or binary etc
const { v4: uuid } = require('uuid');///for uuid package (generated unique id's)
app.use(bodyParser.urlencoded({ extended: true }))// for parsing (form data) i.e. application/x-www-form-urlencoded//this is the middleware we talked about using req.body
app.use(bodyParser.json()) // for parsing application/json
//note app.use works for all types of request
const  methodOverride = require('method-override')//
app.use((methodOverride('_method')))//_method is a string we will send in form which will telll what type of request is it and it should not be conflicting
app.set('view engine','ejs');
const path = require('path');
app.set('views',path.join(__dirname,'views'))
let comments = [
        {   
            id:uuid(),//1
            username:'TODD',
            comment:'lol what bsdk'
        },
        {   
            id:uuid(),//2
            username:'GOD',
            comment:'bless you babes!!'

        },
        {
            id:uuid(),//3
            username:'dog',
            comment:'woof woof woof'

        },
        {
            id:uuid(),//4
            username:'cat',
            comment:'billa hu bsdk!!'

        }
]
//******************read********************** */
//setting up get/comments route
app.get('/comments',(req,res)=>{
    res.render('comments/index.ejs',{comments})
})
//**********************create************* */
//new get route for adding comments (this will take us to the form where we can add the comments)
app.get('/comments/new',(req,res)=>{
    res.render('comments/new.ejs');
})
// our comments adding form will make a post request to the following route
   //we will install package called uuid for unique id
app.post('/comments',(req,res)=>{
//    console.log(req.body)//befoere using req.body dont forget to use body parser
   const {username ,comment}=req.body
   comments.push({username, comment,id:uuid()})
//    res.send("it worked") //ye send krne pr hme it worked dikhega pr refresh click krne pr same post request baar baar hogi ,to avoid this hm res.send ki bjai res.redirect se koi aur link khulwaa dete h
res.redirect('/comments');//deafault ye get request rehne wala h to whi apna comments ka list khul jaiga
})
//**********************read********************** */
//below route is to get comments for a particular id
app.get('/comments/:id',(req,res)=>{//hm apne comments list wale page se(index.ejs se) ispr request krng,iske lie ek link de denge har comment ke baad
    //we can get the comments id from req.params.id
    const {id}=req.params;//note:req.params se nikli id ek string hogi to usko number me convert kro by parseInt(id)
   const comment = comments.find(c=>c.id==(id))
//    console.log(comment)
   res.render('comments/show.ejs',{comment})
})
///******************update************************ */
//*********************UPDATE ****************************************/
   //new route for updating (this will take you to the form)
   app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment = comments.find(c=>c.id==(id))
    res.render('comments/edit.ejs',{comment})
   })
   //just like post request ,patch request also has req.body
   ///NOTE:browser forms only support get and post request ,but for making patch and put reqeust through forms we install a package called method-override
    app.patch('/comments/:id',(req,res)=>{
    // res.send("UPDATING SOMETHING")//you cant see this with browser ,as it will not do patch requst,see it with postman
    const{id}=req.params;
    const foundComment = comments.find(c=>c.id===id);//this is comment obj with username,id,comment as parameter
    const newComment = req.body.comment
    foundComment.comment=newComment;
    //after udpdating we redirect 
    res.redirect('/comments');
})
/*********************************delete*************************** */
app.delete('/comments/:id',(req,res)=>{
    const{id}=req.params;
    // const foundComment = comments.find(c=>c.id===id);///this is the comment object(including username ,id ,comment)
    //what we will do is except for this id we will move all the comments in the new comment array
    // we will do this by commnent.filter,and we will make this request on show.ejs
   comments= comments.filter(c=>c.id!==id);
   res.redirect('/comments');
})




app.listen(3000,()=>{
    console.log("on port 3000!!!")
})