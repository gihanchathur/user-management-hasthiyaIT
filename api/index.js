import express from "express";
// import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import cookieParser from "cookie-parser";

const app = express()
const PORT=8800

app.use(express.json())
app.use(cookieParser())
// app.use("/api/posts",postRoutes)
app.use("/api/auths",authRoutes)
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log("server running on port "+PORT)
})