const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: `^${req.query.name}`, $options: "i" };
    }
    if (req.query.village) {
      query.village = { $regex: `^${req.query.village}`, $options: "i" };
    }
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addUser = (req, res) => {
  const { name, village, aadhaar, mobile } = req.body;

  // Validate Aadhaar number
  User.findOne({ aadhaar })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "Aadhaar number already exists",
        });
      }

      // Validate mobile number
      User.findOne({ mobile })
        .then((user) => {
          if (user) {
            return res.status(400).json({
              message: "Mobile number already exists",
            });
          }

          // Create new user
          const new_user = new User({
            name,
            village,
            aadhaar,
            mobile,
          });

          // Save user to database
          new_user
            .save()
            .then(() => {
              res.status(200).json({
                message: "User added successfully",
              });
            })
            .catch((error) => {
              res.status(400).json({
                message: "Error adding user",
                error,
              });
            });
        })
        .catch((error) => {
          res.status(400).json({
            message: "Error checking mobile number",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error checking Aadhaar number",
        error,
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: "User deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting user",
        error,
      });
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const update = req.body;

  User.findByIdAndUpdate(id, update, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating user",
        error,
      });
    });
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, addUser, deleteUser, updateUser, getUserById };
