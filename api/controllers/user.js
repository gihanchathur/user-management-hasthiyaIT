import { db } from "../db.js";

export const getUsers = (req, res) => {
  //CHECK FOR EXISTING USER
  const q = "SELECT * FROM user";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  //CHECK FOR EXISTING USER
  const q = "SELECT * FROM user where username=?";

  db.query(q,[req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(200).json(data);
  });
};



