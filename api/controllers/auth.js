import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK FOR EXISTING USER
  const q = "SELECT * FROM user WHERE email=? OR username=?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exists");

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

     const q = "INSERT INTO user(`username`,`password`,`email`,`name`,`age`,`dob`) VALUES (?)";

    //Query for insert an admin
    //const q = "INSERT INTO admin(`username`,`password`,`email`,`name`,`age`,`dob`) VALUES (?)";

    const values = [req.body.username,hash,req.body.email,req.body.name,req.body.age,req.body.dob];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("user has been registered");
    });
  });
};


export const login = (req, res) => {
  // CHECK USER EXISTS
  const q =req.body.username==="admin"?  "SELECT * FROM admin WHERE username=?":
 "SELECT * FROM user WHERE username=?"
  ;
  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.json(err);
    }
    
    if (data.length === 0) {
      return res.status(404).json("user not found!");
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) {
      return res.status(400).json("username or password did not match");
    }

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
  });
};


export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out")
};

