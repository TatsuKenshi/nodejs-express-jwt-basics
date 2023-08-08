const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongoose validation
  // Joi validation
  // check in the controlloer

  if (!username || !password) {
    throw new CustomAPIError("please provide username and password", 400);
  }

  // demo method, id is regularly provided by the DB
  const id = new Date().getDate();

  // payloads should be small
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  console.log(req.headers);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
