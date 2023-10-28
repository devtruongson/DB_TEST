const User = require("../models/User");

const userController = {
    // GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE USER
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            if (!user) {
                return res.status(404).json("Người dùng không tồn tại");
            }
            res.status(200).json("Đã xóa thành công");
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;