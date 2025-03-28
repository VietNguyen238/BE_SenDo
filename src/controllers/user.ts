import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import Store from "../models/store";
import Address from "../models/address";

const userControllers = {
  getAllUser: async (req: Request, res: Response) => {
    try {
      const user = await User.find();

      if (!user) {
        throw new Error("User not found!");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = new User(req.body);

      const saveUser = await newUser.save();

      res.status(201).send(saveUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("User not found!");
      }

      if (!user.password) {
        throw new Error("Password is required!");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        res.status(201).json("Wrong password!");
      }

      if (user && validPassword) {
        const { password, ...others } = user.toObject();
        res.status(201).json(others);
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        throw new Error("User not found!");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const updateData = req.body;

      if (!req.body.password) {
        await User.findByIdAndUpdate(req.params.id, updateData);
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(req.params.id, {
          ...updateData,
          password: hashed,
        });
      }

      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Store.deleteMany({ userId: req.params.id });
      await Address.deleteMany({ userId: req.params.id });

      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default userControllers;
