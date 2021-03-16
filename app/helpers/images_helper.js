const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
  	} else {
		cb("Please upload only images.", false);
  	}
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("images", 10); // limit to 10 images

const uploadImages = (req, res, next) => {
	uploadFiles(req, res, err => {
		if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
			if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
				// ...
			}
		} else if (err) {
	  		// handle other errors
		}
		// Everything is ok.
		next();
  	});
};

const sharp = require("sharp");

const resizeImages = async (req, res, next) => {
	if (!req.files) return next();

  	req.body.images = [];
  	await Promise.all(
    	req.files.map(async file => {
			const newFilename = "NAME FILE";

		await sharp(file.buffer)
			.resize(640, 320)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toFile(`upload/${newFilename}`);

		req.body.images.push(newFilename);
    	})
  	);

  	next();
};

module.exports = {
	multerFilter,
	uploadImages,
	resizeImages
};