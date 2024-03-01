const Event = require("../models/event.model");
const axios = require('axios');
var cron = require('node-cron');
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
  /* event by id */
  const getEventById = async (req, res) => {
    try {
      const eventId = req.params.id; // Récupère l'ID de l'événement à partir des paramètres de la requête
      
      // Utilisation de Mongoose pour trouver l'événement par son ID
      const event = await Event.findById(eventId);
      
      // Vérifie si l'événement existe
      if (!event) {
        return res.status(404).json({ error: "L'événement spécifié n'a pas été trouvé." });
      }
  
      res.json(event); // Retourne l'événement trouvé
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'événement." });
    }
  };
/* event create in user */
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
  next();
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
  next();
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
  next();
};

/* task event */
const eventTask = (req, res) => {
  console.log("Tâche démarrée");
   cron.schedule('* * * * *', () => {
    console.log('Exécution d\'une tâche toutes les minutes')
    res.send('Exécution d\'une tâche toutes les minutes');
  }); 
  res.send('Tâche planifiée avec succès');
}
/* list ville */
const getCityList= async (req, res) => {
  const countryCode = req.query.countryCode; 
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&username=koko`
    );

    const totalCities = response.data.totalResultsCount;
    const totalPages = Math.ceil(totalCities / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCities);

    const cities = response.data.geonames.slice(startIndex, endIndex).map(city => {
      return {
        name: city.name,
        latitude: city.lat,
        longitude: city.lng,
        population: city.population 
      };
    });

    res.status(200).json({
      cities,
      page,
      totalPages,
      pageSize,
      totalCities
    }); // Répond avec la liste des villes paginées et leurs informations
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error.response.data);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des villes.' });
  }
};
/* liste des quartiers */
const getDistrictList= async (req, res) => {
  const city = req.query.city; 
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=[out:json];area[name="${city}"];(node["place"="neighbourhood"](area);way["place"="neighbourhood"](area););out;`
    );

    const totalCities = response.data.totalResultsCount;
    const totalPages = Math.ceil(totalCities / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCities);

    const cities = response.elements.slice(startIndex, endIndex).map(city => {
      return {
        name: city.tags.name,
        latitude: city.lat,
        longitude: city.lon,
      };
    });

    res.status(200).json({
      quartiers : cities,
      page,
      totalPages,
      pageSize,
      totalCities
    }); // Répond avec la liste des villes paginées et leurs informations
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error.response.data);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des villes.' });
  }
};
module.exports = {
  Events,
  findEventsByUserId,
  getDistrictList,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  eventTask,
  getCityList
};
