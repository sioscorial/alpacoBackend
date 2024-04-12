const { userService } = require("../services");
const { catchAsync } = require("../utils/error");
const jwt = require("jsonwebtoken");

const updateUserInfo = catchAsync(async (req, res) => {
  const { userSpots, userActivities, phoneNumber, socialPlatform } = req.body;

  const userId = req.user.id;

  const result = await userService.updateUserInfo(userId, userSpots, userActivities, { phoneNumber, socialPlatform });

  res.status(200).json(result);
});

const signIn = catchAsync(async (req, res) => {
  const kakaoCode = req.query.code;

  const accessToken = await userService.signIn(kakaoCode);

  return res.status(200).json({ accessToken: accessToken });
});

const getUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await userService.getUserInfo(userId);
  res.status(200).json(result);
});



const signUp = catchAsync(async (req, res) => {
  try {
    const { name ,password} = req.body;

    if (!name || !password) {
      const error = new Error(
        'KEY_ERROR: Missing required fields: name, email, password.'
      );
      error.statusCode = 400;
      throw error;
    }
    await userService.signUp(name, password);

    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});



module.exports = {
  signIn,
  signUp,
  updateUserInfo,
  getUserInfo,
};
