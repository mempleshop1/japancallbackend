const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const { Superadmin } = require("./models/superadmins");
const { Admin } = require("./models/admins");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "japaneseroutes",
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/findfreeadmin", async (req, res) => {
    const admins = await Admin.find();
    let peerid = "notavailable";
    admins.forEach((admin) => {
        if (admin.callactive === false) {
            peerid = `japancallteam1` + admin.username;
            return false;
        } else {
            return true;
        }
    });

    res.status(200).send({ peerid: peerid, message: "Successful !" });
});

app.put("/markoncall", async (req, res) => {
    const admin = await Admin.findByIdAndUpdate(
        req.body.adminid,
        { callactive: true },
        { new: true }
    );

    if (!admin) return res.status(400).send("Cannot update the call status");

    res.status(200).send({ message: "Marked on call !", admin: admin });
});

app.put("/removefromcall", async (req, res) => {
    const admin = await Admin.findByIdAndUpdate(
        req.body.adminid,
        { callactive: false },
        { new: true }
    );

    if (!admin) return res.status(400).send("Cannot update the call status");

    res.status(200).send({ message: "Removed on call !", admin: admin });
});

app.post("/createsuperadmin", async (req, res) => {
    const superadmin = new Superadmin({
        username: req.body.username,
        password: req.body.password,
    });

    const superadmincreated = await superadmin.save();

    if (!superadmincreated)
        return res.status(400).send("Superadmin cannot be created");

    res.status(200).send({
        superadmin: superadmin,
        message: "Superadmin was created successfully !",
    });
});

app.post("/createadmin", async (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password,
    });

    const admincreated = await admin.save();

    if (!admincreated) return res.status(400).send("Admin cannot be created");

    res.status(200).send({
        admin: admin,
        message: "Admin was created successfully !",
    });
});

app.post("/superadminlogin", async (req, res) => {
    const filter = {
        username: req.body.username,
        password: req.body.password,
    };

    const superadmin = await Superadmin.find(filter);

    if (superadmin.length === 0) {
        res.status(403).send({
            message: "Username or Password is incorrect !",
        });
    }

    res.status(200).send({
        user: superadmin,
        message: "Superadmin login successful !",
    });
});

app.post("/adminlogin", async (req, res) => {
    const filter = {
        username: req.body.username,
        password: req.body.password,
    };

    const admin = await Admin.find(filter);

    if (admin.length === 0) {
        res.status(403).send({
            message: "Username or Password is incorrect !",
        });
    }

    res.status(200).send({
        user: admin,
        message: "Admin login successful !",
    });
});

app.get("/getadmins", async (req, res) => {
    const admins = await Admin.find();
    res.status(200).send({
        admins: admins,
        message: "Successful !",
    });
});

app.put("/changeadmin", async (req, res) => {
    const admin = await Admin.findByIdAndUpdate(
        req.body.adminid,
        {
            username: req.body.username,
            password: req.body.password,
        },
        {
            new: true,
        }
    );

    if (!admin)
        return res.status(400).send({ message: "Cannot update the admin !" });

    return res.status(200).send({ message: "Admin updated !", admin: admin });
});

app.post("/removeadmin", async (req, res) => {
    const admin = await Admin.findByIdAndDelete(req.body.adminid);

    if (!admin)
        return res.status(400).send({ message: "Cannot delete admin !" });

    return res
        .status(200)
        .send({ admin: admin, message: "Admin deleted successfully !" });
});

app.put("/changecallstatus", async (req, res) => {
    const admin = await Admin.findByIdAndUpdate(
        req.body.adminid,
        {
            callactive: req.body.callstatus,
        },
        { new: true }
    );

    if (!admin)
        return res
            .status(400)
            .send({ message: "Cannot update the call status !" });

    return res
        .status(200)
        .send({ message: "Call status updated !", admin: admin });
});

app.listen(process.env.PORT, () => {
    console.log(`App listening`);
});
