const { Users } = require('../models/Users');

const updateUserPrivacy = async (req, res) => {
  const { userId, isPublic } = req.body;
  try {
    if (isPublic) {
      const user = await PrivateUser.findByPk(userId);
      if (user) {
        await Users.create(user.toJSON());
        await user.destroy();
      }
    } else {
      const user = await Users.findByPk(userId);
      if (user) {
        await PrivateUser.create(user.toJSON());
        await user.destroy();
      }
    }
    res.status(200).json({ message: 'Privacy setting updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating privacy setting' });
  }
};

module.exports = { updateUserPrivacy };
