import { usersStorage } from "../storages/usersStorage.js";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 15 characters";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`First Name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Last Name ${lengthErr}`),
];

export const usersController = () => {};

const usersListGet = (req, res) => {
  res.render("index", { title: "User List", users: usersStorage.getUsers() });
};

const usersCreateGet = (req, res) => {
  res.render("createUser", { title: "Create User" });
};

const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];

const usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", { title: "Update user", user: user });
};

const usersUpdatePost = [
  validateUser,
  (req, res) =>{
    const user = usersStorage.getUser(req.params.id)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array()
      })
    }
    const {firstName, lastName} = req.body;
    usersStorage.updateUser(req.params.id, {firstName, lastName})
    res.redirect("/")
  }
]

const usersDeletePost = (req, res) =>{
  usersStorage.deleteUser(req.params.id);
  res.redirect("/")
}

usersController.usersListGet = usersListGet;
usersController.usersCreateGet = usersCreateGet;
usersController.usersCreatePost = usersCreatePost;
usersController.usersUpdateGet = usersUpdateGet;
usersController.usersUpdatePost = usersUpdatePost;
usersController.usersDeletePost = usersDeletePost;
