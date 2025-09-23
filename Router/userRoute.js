import express from "express"
import {HandleSignUp, handleLogin, handleLogout, handleReGenerationAccessToken, handleDeleteUser, handleUpdateName, updatePassword} from "../Controller/userController.js"
import { autenticate } from "../MiddleWare/autenticate.js";

const userRouter = express.Router();

//handling login, signup and logout : 
userRouter.post("/SignUp",HandleSignUp);
userRouter.post("/Login",handleLogin);
userRouter.post("/Logout",handleLogout);

//updation and deletion handeling : 
userRouter.patch("/UpdateName",autenticate,handleUpdateName);
userRouter.patch("/UpdatePassword",autenticate,updatePassword);
userRouter.delete("/DeleteUser",autenticate,handleDeleteUser);


//handling generation of access token :
userRouter.get("/token/RefreshAccessToken",handleReGenerationAccessToken);

export {userRouter};