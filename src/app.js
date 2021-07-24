const express=require("express");
const app= express();
const hbs = require("hbs");
const path=require("path");
const router=require("./routers/user");

const port= process.env.PORT||8000;
// console.log(__dirname);
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");

app.set('view engine', 'hbs');
app.set('views',templatePath);
hbs.registerPartials(partialPath);

app.use(express.static(staticPath));
app.use(router);

app.listen(port, ()=>{
    console.log(`Listening to the port ${port}`);
})
