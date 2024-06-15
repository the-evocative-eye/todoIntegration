const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.json());
// to ensure that middleware parses only json requests
let todos=[{id : "1",
title : "code",
action : "true"},
{
    id : "2",
title : "eat",
action : "true"
},
{
    id : "3",
title : "sleep",
action : "true"
}, 
{ id : "4",
title : "repeat",
action : "false"}];
// to display the contents in todolist on home page
app.get('/', (req,res) => {
res.json(todos);
});
app.post('/addtodos',(req,res) => {
    const todo={
        id : todos.length+1,
        title : req.body.title,
        action : req.body.action || false
    };
    todos.add(todo);
    req.status(201).json(todo);
});
app.post('/addtodos/:id',(req,res) => {
    const id=req.params.id;
    const stat=todos.find((t) => t.id == id);
    if(!stat){
        req.status(400).json({err:"not found"});
    }
    todos.title=req.body.title || stat.title;
    todos.action=req.body.action || stat.action;
    res.json(todos);
});
app.post('/deletetodos/:id', (req,res) => {
const id=req.params.id;
const index=todos.find((t) => t.id == id);
if(index == -1){
req.status(400).json({err:"not found"});
}
todos.splice(index,1);
res.status(204).send();
});
const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`running on ${port}`);
});