import express from "express"
import {createPresentation, addQuestion, searchQuestion, GetPresentation, updatePresentationName, deletePresenation, updateOptionColor, updateOptionText, updateQuestion, deleteOptions, addOption, changeTemplate, AddAdmin, deleteAddedAdmin} from "../Controller/handleRouteController/handleController.js"
import {checkRole} from "../MiddleWare/requiredRole.js"

const handleRouter = express.Router();

//handles presentation and question tasks :

handleRouter.post("/createPresentation",createPresentation);
handleRouter.post("/addQuestion" ,addQuestion);

handleRouter.patch("/questions/:questionId/editQuestion", updateQuestion); //updating questions
handleRouter.patch("/questions/:questionId/options/:optionIndex/color" ,updateOptionColor); //for updating options color
handleRouter.patch("/questions/:questionId/options",updateOptionText); // for updating options text
handleRouter.post("/question/:questionId/deleteOption", deleteOptions);
handleRouter.post("/question/:questionId/addOption", addOption);

handleRouter.patch("/presentation/editTitle" , updatePresentationName);

handleRouter.post("/searchQuestion",searchQuestion); // for searching question
handleRouter.post("/GetPresentations", GetPresentation);
handleRouter.post("/editDesignTemplate", changeTemplate);

handleRouter.delete("/DeletePresenation", deletePresenation);

handleRouter.post("/AddAdmin", AddAdmin);
handleRouter.post("/DeleteAddedAdmin", deleteAddedAdmin);


export {handleRouter}