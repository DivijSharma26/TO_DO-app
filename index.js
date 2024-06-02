 const express = require('express');
 const app = express();
 const path = require('path');
 const fs = require('fs');

app.set('views', path.join(__dirname, 'views')) 
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));


 app.get('/',(req,res)=>{
    const files = fs.readdirSync('./files','utf-8');
    res.render("index", {files: files});
 })

 app.get('/file/:filename',(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`, "utf-8" , (err,filedata)=>{
   res.render('show' , {filename: req.params.filename , filedata: JSON.parse(filedata)});
  })
})

app.get('/edit/:filename',(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`, "utf-8" , (err,filedata)=>{
    res.render('edit', {filename: req.params.filename, filedata: JSON.parse(filedata)});
   })
   
 })
 

 app.post('/edit',(req,res)=>{
  const filepath = req.body.new ? `./files/${req.body.new}` : `./files/${req.body.previous}`;
  fs.renameSync(`./files/${req.body.previous}` , filepath);
  fs.writeFileSync(filepath,`{"title":"${req.body.new}","details":"${req.body.details}"}`);
  console.log(req.body);
  return res.redirect('/');
})

 app.post('/create',(req,res)=>{
    fs.writeFileSync(`./files/${req.body.title.split(' ').join('')}.txt`, JSON.stringify(req.body))
    return res.redirect('/');
 })

//  app.use((err,req,res,next)=>{
//     console.error(err.stack);
//     res.status(500),sens("NOO!");
//  })
 app.listen(8080);