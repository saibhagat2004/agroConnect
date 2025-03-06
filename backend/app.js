import express from "express"; 
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import DBConnection from "./Config/DBConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from "./Routes/authRoutes.js" 
dotenv.config(); //use to read .env content 

const app = express();

// use middleware below
app.use(cors({credentials: true, origin: "http://localhost:3000"})) //this allow us to make req from 3000
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));  // parses cookies attached to the client request object, making them accessible via req.cookies. 
app.use(bodyParser.json());
app.use(express.json({ limit: "5mb" }));  //for parse req.body also make sure limit limit should not me to large as it can be missuse  and can be attack.
app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)


// declare all routes below 
app.use("/api/auth", authRoute); 

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server.. on ${PORT}`);
    DBConnection();
});