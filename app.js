const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.set("view engine","ejs");
let todos=[{id : "1",
todotitle : "code",
todoaction : "true"},
{
    todoid : "2",
todotitle : "eat",
todoaction : "true"
},
{
    todoid : "3",
todotitle : "sleep",
todoaction : "true"
}, 
{ todoid : "4",
todotitle : "repeat",
todoaction : "false"}];
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// to display the contents in todolist on home page
app.get('/', (req,res) => {
res.render("index" ,{
    data : todos,
});
})
app.post('/addtodos',(req,res) => {
       const id = todos.length+1;
        const title = req.body.title;
        const action = req.body.action;
todos.push({
    todoid : id,
    todotitle:title,
todoaction : action
});
    res.render("index",{
        data : todos,
    });
});
// to update the contents of some id
// app.post('/addtodos/:id',(req,res) => {
//     const id=req.params.id;
//     const stat=todos.find((t) => t.id == id);
//     if(!stat){
//         req.status(400).json({err:"not found"});
//     }
//     todos.title=req.body.title || stat.title;
//     todos.action=req.body.action || stat.action;
//     res.json(todos);
// });
app.post('/deletetodos', (req,res) => {
const id=req.params.id;
var j=1;
todos.forEach(element => {
j=j+1;
if(element.todoid == id){
    todos.splice(j-1,1);
}
});
res.redirect("/");
});
const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`running on ${port}`);
});