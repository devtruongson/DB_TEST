const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const authControllers = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                admin: true,
            });

            console.log(newUser);
            // save to DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(`${err}`);
        }
    },
    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" } //thời gian tồn tại của token
        );
    },
    // GENERATE REFESH TOKEN
    generateRefeshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: "20s" } //thời gian tồn tại của token
        );
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Lỗi username");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json("Lỗi password");
            }
            if (user && validPassword) {
                const accessToken = authControllers.generateAccessToken(user);
                const refreshToken = authControllers.generateRefeshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refeshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json("lỗi 505 r bạn ơi");
        }
    },
    // refesh token
    refreshToken: async (req, res) => {
        //lấy refesh token từ user
        const refreshToken = req.cookies.refeshToken;
        if (!refreshToken)
            return res.status(401).json("you're are not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Resfresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken
            );
            const newAcessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefeshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refeshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAcessToken });
        });
    },
    // LOGOUT
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refeshToken
        );
        res.status(200).json("logout succesfuly");
    },
};
module.exports = authControllers;
