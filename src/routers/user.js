const express = require("express");
const router = new express.Router();
const UserList = require("../db/users");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.render("login");
})
router.get("/registration", (req, res) => {
    res.render("registration");
})
router.get("*", (req, res) => {
    res.render("404error", { error: "Oops... Page couldn't be found" });
})

router.post("/", async(req, res) => {
    console.log(req.body);
    try {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
    console.log(data);

        const checkEmail= await UserList.findOne({email:data.email});
        console.log("checkemail"+checkEmail);
        // console.log("checkp "+checkEmail.password);
        // console.log("dap "+data.password);
        if(checkEmail != null  && checkEmail.password === data.password){
            res.render("login", {
                msg:"Login successfully..."
            }); 
        }
        else{
            res.render("login", {
                val: req.body.email,
                errMsg: "Invalid Login Details"
            });            
        }     

    }
    catch(err) {
        console.log(err);
        res.send(err);
    }
});
router.post("/registration", async (req, res) => {
    // console.log(req.body.username);
    try {
        console.log(req.body);
        let password = req.body.password;
        let cPassword = req.body.cPassword;

        if (cPassword == password) {
            let data = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            const userData = new UserList(data);
            let createUser = await userData.save();
            console.log(createUser);
            res.status(201).send(`${createUser} REGISTERED SUCCESSFULLY...`);

        }
        else {
            res.render("registration", {
                val: req.body.username,
                val2: req.body.email,
                val3: req.body.password,
                err: "Those passwords didn’t match. Try again."
            });
        }
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;