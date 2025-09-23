import { presentationModel } from "../../Models/Presentation/PresentationModels.js"
import { questionModel } from "../../Models/Presentation/Question/QuestionModel.js"
import { userModel } from "../../Models/UserModel.js";




//Creating Presentaion and adding question
//this section contains creation only : 

export async function createPresentation(req, res) {
  let { user, title } = req.body;

  if (!user) return res.status(404).json({ Message: "user is not valid" });

  if (!title) title = "Sample"//just implemented for now

  const userDetail = await userModel.findById(user);

  if (!userDetail) return res.status(400).json({ Message: "User not Found!" });

  try {
    const response = await presentationModel.create({
      user: user,
      title: title,
    })

    return res.status(200).json({ Message: "Presentation Created Successfully!", presentationId: response._id, response });
  } catch (e) {
    console.log("Error : ", e);
    return res.status(500).json({ Message: "Internal Server Error!" });
  }
}


//create intial questions : 
export async function addQuestion(req, res) {
  const {
    presentationId,
    designType,
    designTemplate,
    question,
    options = []
  } = req.body;

  console.log(presentationId, designTemplate, designType, question, options)

  if (!presentationId || !designType || !designTemplate || !question) {
    return res.status(400).json({ Message: "All fields are required!" });
  }

  try {
    const presentation = await presentationModel.findById(presentationId);
    if (!presentation) {
      return res.status(404).json({ Message: "Presentation not found!" });
    }

    const order = await questionModel.countDocuments({ presentation: presentationId }) + 1;

    const newQuestion = await questionModel.create({
      presentation: presentationId,
      designType,
      designTemplate,
      question,
      options: options.length ? options : undefined,
      order
    });

    return res.status(200).json({
      Message: "Question added successfully!",
      question: newQuestion,
      id: newQuestion._id
    });

  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ Message: "Internal Server Error!" });
  }
}



//this section is for searching question and presentation

//search presentations :
  export async function GetPresentation(req, res) {
    const { userId } = req.body;
    const { page = 1, limit = 10 } = req.query; // default page=1, limit=10
    console.log(userId);

    if (!userId) {
      return res.status(404).json({ Message: "Please provide user id!" });
    }

    try {
      const user = await userModel.findById(userId);
      console.log(user);
      if (!user) {
        return res.status(404).json({ Message: "User id is not correct!" });
      }

      const skip = (page - 1) * limit;  

      const totalPresentations = await presentationModel.countDocuments({ user: userId });
      const presentations = await presentationModel
        .find({ user: userId })
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }); // latest first

      if (!presentations || presentations.length === 0) {
        return res.status(404).json({ Message: "Presentation not created yet please create first" });
      }

      return res.status(200).json({
        Message: "Presentation found",
        presentations,
        totalPages: Math.ceil(totalPresentations / limit),
        currentPage: parseInt(page),
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Message: "Internal server Error" });
    }
  }




//for searching questions : 
export async function searchQuestion(req, res) {
  const { presentationId } = req.body;

  if (!presentationId ) return res.status(400).json({ Message: "Provide all Details!" });

  try {
    const presentation = await presentationModel.findById(presentationId);

    if (!presentation) return res.status(404).json({ Message: "Presentation not Found!" });

    const question = await questionModel.find({presentation : presentationId});

    if (!question) return res.status(404).json({ Message: "Question not found" });

    return res.status(200).json({
      presentation,
      question,
    })
  } catch (e) {
    console.log("Error : ", e);
    return res.status(500).json({ Message: "Internal Server Error!" });
  }

}


//this section is for updating things : 

export async function updateQuestion(req, res) {
  // console.log("mil gya!")
  const { questionId } = req.params;
  const { question } = req.body;
  console.log(question, questionId);

  if (question == undefined || question == null) return res.status(400).json({ Message: "Question Not Provided" });

  try {
    const detail = await questionModel.findById(questionId);

    if (!detail) return res.status(404).json({ Message: "Question not found!" });

    detail.question = question;
    await detail.save();

    return res.status(200).json({ Message: "Successfully updated", question: detail.question });

  } catch (e) {
    console.log("error : ", e);
    return res.status(500).json({ Message: "Internal Server Error!" });
  }
}


export async function updateOptionColor(req, res) {
  const { questionId, optionIndex } = req.params;
  const { color } = req.body;

  if (!color) {
    return res.status(400).json({ Message: "Color is required" });
  }

  try {
    const question = await questionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ Message: "Question not found" });
    }

    if (!question.options || !question.options[optionIndex]) {
      return res.status(400).json({ Message: "Invalid option index" });
    }

    // Update color
    question.options[optionIndex].color = color;
    await question.save();

    return res.status(200).json({
      Message: "Color updated successfully",
      options: question.options
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
}

export async function updateOptionText(req, res) {
  const { questionId } = req.params;
  const { options } = req.body;

  if (!options) return res.status(404).json({ Message: "options not provided" });

  try {
    const question = await questionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ Message: "Question not found!" });
    }

    // Merge only text into existing options
    question.options = options;
    await question.save();

    return res.status(200).json({
      Message: "Options updated successfully!",
      options: question.options
    });
  } catch (err) {
    console.error("Error updating options:", err);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
}

export const updatePresentationName = async(req, res)=>{
  const {presentationId, presentationName} = req.body;

  if(!presentationId || !presentationName) return res.status(404).json({Message : "Please provide all thing"});

  try{
    const presentation = await presentationModel.findById(presentationId);
    if(!presentation) return res.status(404).json({Message : "Presentation not found!"});

    presentation.title = presentationName;
    await presentation.save();

    return res.status(200).json({Message : "Updated Successfully", presentation})
  }
  catch(e){
    return res.status(500).json({Message : "Internal Server Error"});
  }
}


//This is for deleting presentation and question related to presentation 

export const deletePresenation = async(req, res)=>{
  const {presentationId} = req.body;

  if(!presentationId) return res.status(404).json({Message : "Please Provide Presenation Id !"});

  try{

    const presentation = await presentationModel.findByIdAndDelete(presentationId);
    if (presentation)
      await questionModel.deleteMany({ presentation: presentationId });
    
    return res.status(200).json({Message : "Deleted Successfully!"})
    

  }
  catch(e){
    console.log("error : ", e);
  }
}