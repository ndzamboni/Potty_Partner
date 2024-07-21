const { Favorite, Restroom, Users } = require('../models');

exports.addFavorite = async (req, res) => {
  try {
    const { restroomId } = req.body;
    const userId = req.user.id;

    await Favorite.create({ user_id: userId, restroom_id: restroomId });

    res.redirect('back'); // Redirect to the previous page
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { restroomId } = req.params;
    const userId = req.user.id;

    const favorite = await Favorite.findOne({
      where: { user_id: userId, restroom_id: restroomId }
    });

    if (favorite) {
      await favorite.destroy();
    }

    res.redirect('back'); // Redirect to the previous page
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [{ model: Restroom }]
    });

    res.render('profile', { user: req.user, favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Favorite,
          include: [Restroom]
        }
      ]
    });

    res.render('profile', { user, favorites: user.Favorites });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
