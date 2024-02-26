const Favorite = require("../models/favorite.model");

const createFavorie = async (req, res) => {
  const eventsData = new Favorite({
    id_event: req.body.id_event,
    id_user: req.body.id_user,
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
module.exports = {
  createFavorie,
  favories
};
