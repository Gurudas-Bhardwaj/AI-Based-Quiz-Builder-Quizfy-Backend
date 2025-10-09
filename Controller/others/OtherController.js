import reportBugModel from "../../Models/other/reportBug.js";


export const reportBug = async (req, res) => {
    const { details, userId } = req.body;

    if (!details || !userId)
        return res.status(404).json({ message: "Provide all things!" });

    try{
        const newReport = new reportBugModel({ details, userId });
        await newReport.save();
        return res.status(200).json({ message: "Bug submitted successfully!" });
    } 
    catch (error) {
        console.log("Error in reporting bug:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}