const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const { Team } = require("./models/team");
const e = require("express");

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

app.post("/createteam", async (req, res) => {
  const team = new Team({
    name: req.body.name,
    admin1: false,
    admin2: false,
    admin3: false,
    admin4: false,
    admin5: false,
  });

  const created = await team.save();
  if (!created) return res.status(400).send("Team cannot be created");

  res
    .status(200)
    .send({ team: team, message: "Team was created successfully !" });
});

app.get("/findfreeadmin", async (req, res) => {
  const filter = {
    name: "team1",
  };

  const team = await Team.find(filter);

  let peerid = "notavailable";

  if (team[0].admin1 === false) {
    peerid = "japancallteam1admin1";
  } else if (team[0].admin2 === false) {
    peerid = "japancallteam1admin2";
  } else if (team[0].admin3 === false) {
    peerid = "japancallteam1admin3";
  } else if (team[0].admin4 === false) {
    peerid = "japancallteam1admin4";
  } else if (team[0].admin5 === false) {
    peerid = "japancallteam1admin5";
  }

  res.status(200).send({ peerid: peerid, message: "Successful !" });
});

app.put("/markoncall", async (req, res) => {
  let team;
  if (req.body.adminnumber === "1") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin1: true,
      },
      {
        new: true,
      }
    );
  } else if (req.body.adminnumber === "2") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin2: true,
      },
      {
        new: true,
      }
    );
  } else if (req.body.adminnumber === "3") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin3: true,
      },
      {
        new: true,
      }
    );
  } else if (req.body.adminnumber === "4") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin4: true,
      },
      {
        new: true,
      }
    );
  } else {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin5: true,
      },
      {
        new: true,
      }
    );
  }
  if (!team) return res.status(400).send("Cannot be updated!");

  res.status(200).send({ team: team, message: "Successful !" });
});

app.put("/removefromcall", async (req, res) => {
  let team;
  if (req.body.adminnumber === "1") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin1: false,
      },
      {
        new: true,
      }
    );
  } else if (req.body.adminnumber === "2") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin2: false,
      },
      {
        new: true,
      }
    );
  } else if (req.body.adminnumber === "3") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin3: false,
      },
      {
        new: true,
      }
    );
  } else if (req.body.adminnumber === "4") {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin4: false,
      },
      {
        new: true,
      }
    );
  } else {
    team = await Team.findByIdAndUpdate(
      "6167bfa8511a344134d81c97",
      {
        admin5: false,
      },
      {
        new: true,
      }
    );
  }
  if (!team) return res.status(400).send("Cannot be updated!");

  res.status(200).send({ team: team, message: "Successful !" });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening`);
});
