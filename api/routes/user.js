import express from "express"
import { getUsers,getUser } from "../controllers/user.js"

const router=express.Router()

router.get("/getusers",getUsers)
router.get("/getuser",getUser)
export default router