import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

let requestRefreshToken: string;

const authController = {
  generateAccessToken: (user: any) => {
    return jwt.sign(
      {
        _id: user._id,
        admin: user.admin,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
  },

  generateRefreshToken: (user: any) => {
    return jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY as string,
      { expiresIn: "365d" }
    );
  },

  requestRefreshToken: async (req: Request, res: Response) => {
    try {
      const cookie = req.headers.cookie as string;

      let refreshToken = cookie.split("=")[1].trim();

      if (!refreshToken) {
        throw new Error("You're not authenticated!");
      }

      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY as string,
        (err: any, user: any) => {
          if (err) {
            return res.status(403).json("Token is not valid!");
          }

          const newAccessToken = authController.generateAccessToken(user);
          const newRefreshToken = authController.generateRefreshToken(user);

          requestRefreshToken = newRefreshToken;

          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });

          res.status(200).json({ accessToken: newAccessToken });
        }
      );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const { password, ...formUser } = req.body;

      const phoneUser = await User.findOne({ phone: formUser.phone });
      if (phoneUser) {
        return res.status(400).json({
          message: "Số điện thoại đã tồn tại!",
        });
      }

      const emailUser = await User.findOne({ email: formUser.email });
      if (emailUser) {
        return res.status(400).json({
          message: "Email đã tồn tại!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new User({
        ...formUser,
        password: hashed,
      });

      const saveUser = await newUser.save();
      const { password: _, ...orther } = saveUser.toObject();

      res.status(201).json(orther);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        throw new Error("User not found!");
      }

      if (!user.password) {
        throw new Error("Password is empty or invalid!");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        throw new Error("Wrong password!");
      }

      const accessToken = authController.generateAccessToken(user as any);
      const refreshToken = authController.generateRefreshToken(user as any);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      requestRefreshToken = refreshToken;

      const { password, ...others } = user.toObject();

      res.status(201).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  loginGoogle: async (req: Request, res: Response) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.sub,
          imageUrl: req.body.picture,
        });
        user = await newUser.save();
      }

      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      requestRefreshToken = refreshToken;

      const { password, ...others } = user.toObject();
      res.status(201).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  logout: async (req: Request, res: Response) => {
    requestRefreshToken = "";

    res.clearCookie("refreshToken");
    res.status(200).json("Logout successfuly!");
  },
};

export default authController;
