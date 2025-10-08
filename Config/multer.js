import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "QuizApp_Images",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
