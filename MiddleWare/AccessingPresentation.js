import { presentationModel } from "../Models/Presentation/PresentationModels.js";

export const accessingPresentation = async (req, res, next) => {
    const { userId } = req.body;

    // Ensure userId is provided
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    console.log("User ID:", userId);

    try {
        // Check if user is the owner of the presentation
        const presentation = await presentationModel.find({ user: userId });

        // If the user is the owner of at least one presentation
        if (presentation.length > 0) {
            console.log("User owns a presentation:", presentation);
            return next();
        }

        // Check if user is an admin of any other presentation as a addedAdmin
        const addedAdminPresen = await presentationModel.find({
            "addedAdmin.userId": userId,
        });

        // If the user is an admin of at least one presentation
        if (addedAdminPresen.length > 0) {
            console.log("User is an admin of a presentation:", addedAdminPresen);
            return next();
        }

        // If neither condition is met, deny access
        return res.status(401).json({
            message: "You are not the admin of this presentation, so you can't access it",
        });
    } catch (error) {
        console.error("Error checking presentation access:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
