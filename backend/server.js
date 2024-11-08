const { profile } = require("console");
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) =>
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
);

app.post('/uploadPicture', function (req, res) {
	/* console.log(req.files); */
	for (pippo in req.files) {
		/* console.log(pippo); */
	}
	const image = req.files.picture;
	const uploadPath = __dirname + '/data/profile.jpg';
	
	image.mv(uploadPath, function (err) {
		if (err)
			return res.status(500).send(err);

		res.send('File uploaded!')// the uploaded file object
	})
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/profile.jpg", (req, res) =>
	res.sendFile(path.join(`${__dirname}/../backend/data/profile.jpg`))
);

app.post("/uploadInfo", (req, res) => {
	/* console.log(req); */
	const fileData = req.body;

  fs.readFile('data/profile.json', 'utf8', function (err, data){
	if (err){
		/* console.log(err); */
	} else {
	let profile = []; //now it an object
	
	profile.push(req.body); //add some data
	
	json = JSON.stringify(profile); //convert it back to json
  fs.writeFile('data/profile.json', json, 'utf8', function() {
	/* console.log(req.files); */ 
  res.send({answer:"USER ACCEPTED"})
  
  }) // write it back 
}})});

app.post("/", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";

	if (req.files) {
		const uploadedPicture = req.files.picture;
		uploadedPicture.mv(pictureUploadPath, (err) => {
			if (err) {
				/* console.log(err); */
				return res.status(500).send(err);
			}
		});
	}

	const fileData = JSON.parse(JSON.stringify(req.body));
	fileData.picture = "/profile.jpg";
	const fileDataString = JSON.stringify(fileData, null, 2);
	const uploadPath = __dirname + "/../backend/data/" + "profile.json";

	fs.writeFileSync(uploadPath, fileDataString, (err) => {
		if (err) {
			/* console.log(err); */
			return res.status(500).send(err);
		}
	});

	return res.send(fileDataString);
});

app.delete("/profiledelete", (req, res) => {
	
	fs.readFile('data/profile.json', 'utf8', function (err, data){
		if (err){
			/* console.log(err); */
		} else {
		
		let deleted = []; //now it an object		
		deleted = JSON.stringify(deleted); //convert it back to json
	  fs.writeFile('data/profile.json', deleted, 'utf8', function() {
		/* console.log(req.files); */ 
	  fs.copyFileSync('../frontend/public/placeholder.jpg','data/profile.jpg')
		res.send({answer:"USER DELETED"})
	  
	  }) // write it back 
	}})
	/* const picturePath = __dirname + "/../backend/data/" + "profile.jpg";
	const jsonPath = __dirname + "/../backend/data/" + "profile.json";
	fs.rm(picturePath, function () { 
		fs.readFile(jsonPath, function (fileContent) {
			let profile = JSON.parse(fileContent)
			profile.firstName = ""
			profile.surname = ""
			profile.country = ""
			profile.zipCode = ""
			profile.city = ""
			profile.street = ""
			profile.houseNumber = ""
			profile.picture = ""
	fs.writeFile(jsonPath, JSON.stringify(profile), function () {
				res.send("Deleted")
			})
		})
	}) */
})

app.delete("/", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";
	const uploadPath = __dirname + "/../backend/data/" + "profile.json";

	if (fs.existsSync(pictureUploadPath)) {
		fs.unlinkSync(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	if (fs.existsSync(uploadPath)) {
		fs.unlinkSync(uploadPath, (err) => {
			if (err) {
				/* console.log(err); */
				return res.status(500).send(err);
			}
		});
	}

	return res.status(200).send("done");
});

app.listen(9000, (_) => console.log("http://127.0.0.1:9000"));