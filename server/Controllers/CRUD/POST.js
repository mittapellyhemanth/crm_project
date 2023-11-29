const bcrypt = require("bcrypt");

const Post = async (req, res, UserModel, type, AddedAdminId) => {
  let newUserID;
  let previousUserID = 0; // it will store the digit of the last inserted of ppd_id

  // Would give the last registered user
  const lastUserID = await UserModel.findOne({}, {}, { sort: { _id: -1 } });

  if (lastUserID != null) {
    for (let i = 5; i < lastUserID.unique_id.length; i++) {
      previousUserID += lastUserID.unique_id[i];
    }

    newUserID =
      type.substring(0, 2) +
      new Date().getFullYear() +
      (parseInt(previousUserID) + 1);
  } else {
    newUserID = type.substring(0, 2) + new Date().getFullYear() + "01";
  }

  const { Name, phoneNumber, email, password, aadhaar } = req.body;

  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    return res.json({ error: "User already exists" });
  }

  const minLength = 8; // Minimum password length requirement
  const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/; // Regular expression for special characters

  if (!password || password.length < minLength) {
    return res.json({ error: "Password must be at least eight characters long" });
  }

  if (!specialCharacters.test(password)) {
    return res.json({
      error: "Password must contain at least one special character",
    });
  }

  if (
    phoneNumber.toString().length !== 10
  ) {
    return res.json({ error: "Phone number must be 10 digits" });
  }

  if (aadhaar.toString().length !== 12) {
    return res.json({ error: "Aadhaar number must be 12 digits" });
  }

  if (req.body.Name) {
    req.body.Name = req.body.Name.toUpperCase();
  }

  bcrypt
    .hash(password, 10)
    .then((hashPass) => {
      const employeeData = new UserModel({
        addedAdminId: AddedAdminId,
        ...req.body,
        password: hashPass,
        designation: type,
        unique_id: newUserID,
      });

      employeeData
        .save()
        .then((result) => {
          res.status(200).json({
            message: "User created successfully!!",
            data: result,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Email already exists!!",
            errDesc: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error!!",
      });
    });
};

module.exports = Post;
