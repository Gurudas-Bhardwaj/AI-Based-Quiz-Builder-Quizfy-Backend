import express from "express"
import {createPresentation, addQuestion, searchQuestion, GetPresentation, updatePresentationName, deletePresenation, updateOptionColor, updateOptionText, updateQuestion} from "../Controller/handleRouteController/handleController.js"
import {checkRole} from "../MiddleWare/requiredRole.js"

const handleRouter = express.Router();

//handles presentation and question tasks :

handleRouter.post("/createPresentation",createPresentation);
handleRouter.post("/addQuestion" ,addQuestion);

handleRouter.patch("/questions/:questionId/editQuestion", updateQuestion); //updating questions
handleRouter.patch("/questions/:questionId/options/:optionIndex/color" ,updateOptionColor); //for updating options color
handleRouter.patch("/questions/:questionId/options",updateOptionText); // for updating options text

handleRouter.patch("/presentation/editTitle" , updatePresentationName);

handleRouter.post("/searchQuestion",searchQuestion); // for searching question
handleRouter.post("/GetPresentations", GetPresentation);

handleRouter.delete("/DeletePresenation", deletePresenation);

export {handleRouter}