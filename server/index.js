const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Employee");


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await EmployeeModel.findOne({ email });

        if (!user) {
            return res.status(404).json("No record found");
        }
        if (user.password !== password) {
            return res.status(401).json("The password is incorrect");
        }
        res.json("Success");
    } catch (err) {
        res.status(500).json(err);
    }
});


app.post('/register', (req,res) => {
EmployeeModel.create(req.body)
.then(Employees => res.json(Employees))
.catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})