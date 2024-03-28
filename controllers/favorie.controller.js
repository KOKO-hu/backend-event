const Favorite = require("../models/favorite.model");

const createFavorie = async (req, res) => {
  const eventsData = new Favorite({
    id_event: req.body.id_event,
    id_user: req.auth.userId,
  });

  eventsData
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error }));
};
/* get */
const favories = async (req, res, next) => {
    try {
      const userId = req.auth.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const events = await Favorite.find({ id_user: userId })
        .skip(startIndex)
        .limit(limit);
  
      const totalCount = await Favorite.countDocuments({ id_user: userId });
  
      const response = {
        total: totalCount,
        page: page,
        pageSize: limit,
        totalPages: Math.ceil(totalCount / limit),
        data: events,
      };
  
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des événements." });
    }
  };
  /* get favorie d'un utilisateur */
  const getFavoritesByUserId = async (req, res) => {
    try {
      const userId = req.auth.userId; 
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
  
      const favoritesCount = await Favorite.countDocuments({ id_user: userId });
      const favorites = await Favorite.find({ id_user: userId })
        .skip(startIndex)
        .limit(limit)
        .populate('id_event');
  
      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(favoritesCount / limit),
        totalFavorites: favoritesCount,
        perPage: limit
      };
  
      res.json({ favorites: favorites, pagination: pagination });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des favoris de l'utilisateur." });
    }
  };
  /* delete favorie  */
  const deleteFavorite = async (req, res) => {
    try {
      const favoriteId = req.params.favoriteId; // L'ID du favori à supprimer
  console.log(favoriteId)
      // Utilisez Mongoose pour supprimer le favori correspondant
      await Favorite.findByIdAndDelete(favoriteId);
  
      res.json({ message: "Favorie supprimé avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la suppression du favori." });
    }
  };
module.exports = {
  createFavorie,
  favories,
  getFavoritesByUserId,
  deleteFavorite
};
