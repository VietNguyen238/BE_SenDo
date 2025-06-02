import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const userMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;

    if (token) {
      const accessToken = token.split(" ")[1];

      jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY as string,
        (err, user) => {
          if (err) {
            res.status(403).json("Token is not valid!");
          }

          (req as any).user = user;

          next();
        }
      );
    } else {
      res.status(401).json({ message: "You're not authenticated!" });
    }
  },

  verifyUserAndAdmin: (req: Request, res: Response, next: NextFunction) => {
    userMiddleware.verifyToken(req, res, () => {
      if ((req as any).user._id === req.params.id || (req as any).user.admin) {
        next();
      } else {
        res
          .status(403)
          .json({ message: "You're not authorized to perform this action!" });
      }
    });
  },
};

export default userMiddleware;
