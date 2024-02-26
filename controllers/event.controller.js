const Event = require("../models/event.model");

const Events = async (req, res) => {
  const eventsData = new Event({
    id_user: req.auth.userId,
    status: req.body.status,
    title: req.body.title,
    description: req.body.description,
    date_debut: req.body.date_debut,
    medias: req.files.map((file) => file.filename),
    date_fin: req.body.date_fin,
  });

  eventsData
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

/* all event */

  const getAllEvents = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Numéro de la page à récupérer, par défaut 1
      const limit = parseInt(req.query.limit) || 10; // Nombre d'événements par page, par défaut 10
      const category = req.query.category;
      // Calcul de l'indice de départ pour la pagination
      const startIndex = (page - 1) * limit;
      let query = {};
      if (category) {
        query = { category: category };
      }
      // Utilisation de Mongoose pour récupérer une page spécifique d'événements
      const events = await Event.find(query)
        .skip(startIndex)
        .limit(limit);
  
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des événements." });
    }
  };
  
/* find event */
const findEventsByUserId = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const events = await Event.find({ id_user: userId })
      .skip(startIndex)
      .limit(limit);

    const totalCount = await Event.countDocuments({ id_user: userId });

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

/*update event  */
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'événement." });
  }
};
/* delete event */
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Utilisation de Mongoose pour supprimer l'événement par son ID
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    res.json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'événement." });
  }
};
module.exports = {
  Events,
  findEventsByUserId,
  updateEvent,
  deleteEvent,
  getAllEvents
};
