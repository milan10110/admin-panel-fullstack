import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "5h" }
    );

    user.token = token;

    res
      .status(201)
      .cookie("accessToken", token, {
        maxAge: 86400000, // Cookie expiration time (in milliseconds)
        httpOnly: true, // Cookie accessible only by the server
        secure: true, // Cookie sent over HTTPS only
        sameSite: "Strict", // Restrict cookie to same-site requests
      })
      .json({
        _id: user._id,
        name: user.name,
        role: user.role,
        transactions: user.transactions,
        email: user.email,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function logInUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (
      user &&
      ((await bcrypt.compare(password, user.password)) ||
        password === user.password)
    ) {
      if (password === user.password) {
        //Update the data
        const encryptedUserPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
          { email: email },
          { password: encryptedUserPassword }
        );
      }

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "5h" }
      );

      user.token = token;
      return res
        .cookie("accessToken", token, {
          maxAge: 86400000,
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .status(200)
        .json({
          _id: user._id,
          name: user.name,
          role: user.role,
          transactions: user.transactions,
          email: user.email,
        });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function reLogInUser(req, res) {
  try {
    const user = await User.findOne({ email: req.user.email });

    //CREATING COOKIE
    let token = "";

    if (user) {
      token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
    }

    res
      .cookie("accessToken", token, {
        maxAge: 86400000,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        role: user.role,
        transactions: user.transactions,
        email: user.email,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function logOutUser(req, res) {
  try {
    res
      .status(200)
      .cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createUser, logInUser, reLogInUser, logOutUser };
