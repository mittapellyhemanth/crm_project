const PostModel = require('../../Schemas/Employee/ProjectSubmit/DesignerProject');



const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");
const  { GridFsStorage }  = require("multer-gridfs-storage");
const multer = require("multer");
const router = express.Router();
const Grid = require("gridfs-stream");

const URL = process.env.DB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
let gfs, gridfsBucket;
db.once("open", () => {
  console.log("db connected");
  gridfsBucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: process.env.BUCKET_NAME,
  });

  gfs = Grid(db, mongoose.mongo);
  gfs.collection(process.env.BUCKET_NAME);
});

const storage = new GridFsStorage({
  url: URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: process.env.BUCKET_NAME,
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });



router.post("/proj/submit/:id/:projectName/:Name/:clientName", upload.single("PostImage"),async (req,res)=>{
  
  try {
    const post = new PostModel({
      Name:req.params.Name,
      EmployeeId:req.params.id,
      ProjectTitle:req.params.projectName,
      clientName:req.params.clientName,
      ...req.body,
      
      PostImage: req.file.filename,
    
    });

    await post.save();

    res.status(201).json({
      message: "Data posted successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: "An error occurred",
      mess: err.message,
    });
  }
} );

router.get("/getPosts/:id",async (req,res)=>{
  // console.log("get",req);
  try {
    const posts = await PostModel.find({EmployeeId:req.params.id}).sort({ createdAt: -1 }); // Sort posts by createdAt in descending order
    const postsWithFormattedDate = posts.map((post) => ({
      ...post.toObject(),
      formattedCreatedAt: new Date(post.createdAt).toString(),
    }));

    res.status(200).json({
      message: "Posts fetched successfully",
      result: postsWithFormattedDate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching posts",
      error: error,
    });
  }
});


// project one view
router.get("/proj/view/:id", async (req, res) => {
  try {
    
    await PostModel.findOne({_id:req.params.id}).then((result)=>{
       res.status(200).json({
        data: result,
        message: "got the status",
      });
    })
    
  
  } catch (error) {
    return error
  }
});


//select one designer and delete

router.delete('/delete/one/:id',async (req,res)=>{
  try {
    const id = req.params.id
   const result = await PostModel.findByIdAndDelete({_id:id})
   if(result){
    res.status(200).json({
      mess:"deleted sucessfully"
    })
   }else{
    res.status(400).json({
      err:"unable to delete"
    })
   }
} catch (error) {
  // console.log(error);
    res.status(500).json({
      mess:"internal server Error"
    })
  }
})







// router to download and display images
router.get("/images/:filename", (req, res) => {
  const filename = req.params.filename.toString();
  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: err + "No files exist",
      });
    }
    //  return res.json(file)
    if (file.contentType) {
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      return res.status(404).json({
        err: "No image exists",
      });
    }
  });
});


module.exports = router;














