import multer from "multer";

const storge = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storge });

export default upload;
