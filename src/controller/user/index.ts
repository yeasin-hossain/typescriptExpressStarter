import Crud from "../../class/Crud";
import ResponseMessage from "../../class/Response";

const { getReasonPhrase } = require("http-status-codes");

const { genSaltSync, hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

const crud = new Crud(User);
const response = new ResponseMessage();

export default class UserClass {
  async login(req: any, res: any) {
    try {
      const userCredentials = req.body;
      const { email, password } = userCredentials;

      // Get User From Server
      const singUser = await User.findOne({ email });

      if (!singUser) {
        return res.json(response.notFoundResponse("User Not Found"));
      }

      // validate password
      const validatePassword = await compare(password, singUser.password);
      if (!validatePassword) {
        return res.json(response.badRequestResponse("Email Or Pass Not Match"));
      }

      const { name, role, createdAt, _id, ban, branch } = singUser;
      const payload = {
        email,
        name,
        role,
        ban,
        createdAt,
        _id: _id,
        branch,
      };

      // Create Jwt Token
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1day",
      });
      return res.json(response.successResponse({ ...payload, token }));
    } catch (error) {
      console.log({ loginController: error });
      res.json(response.serverErrorResponse);
    }
  }

  async register(req: any, res: any) {
    try {
      const salt = genSaltSync(10);
      const hashedPassword = await hash(req.body.password, salt);

      const savedUser = await crud._saveData({
        ...req.body,
        password: hashedPassword,
      });

      const { email, name, role, createdAt, _id, ban, branch } =
        savedUser.response;
      const payload = {
        email,
        name,
        role,
        ban,
        createdAt,
        _id: _id,
        branch,
      };

      // Create Jwt Token
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1day",
      });

      res.json(response.successResponse({ ...payload, token }));
    } catch (error) {
      console.log({ registerController: error });
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async getAllUser(req: any, res: any) {
    try {
      const users = await crud._getAll("name email ban role branch");

      return res.json(response.successResponse(users));
    } catch (err) {
      console.log({ getAllUser: err });
      return res.json(response.serverErrorResponse);
    }
  }

  async updateUser(req: any, res: any) {
    const { id } = req.params;
    const user: object = req.body;
    try {
      const updateUser = await crud._updateData(id, user);
      const { name, email, ban, role, branch, _id } = updateUser?.response;
      res.json(
        response.successResponse({ name, email, ban, role, branch, _id })
      );
    } catch (error) {
      console.log({ updateUser: error });
      return res.json(response.serverErrorResponse);
    }
  }
}
