const Ticket = require("../models/ticket.model");
const QRCode = require("qrcode");
const addTicket = async (req, res) => {
  try {
    const {
      id_event,
      status,
      name,
      quantity,
      price,
      sale_start,
      start_time,
      sale_end,
      end_time,
      description,
      min_qte,
      max_qte,
    } = req.body; // Je suppose que les données du ticket sont envoyées dans le corps de la requête

    // Création d'une instance de Ticket avec les données reçues
    const newTicket = new Ticket({
      id_event,
      id_user: req.auth.userId,
      status,
      name,
      quantity,
      price,
      sale_start,
      start_time,
      sale_end,
      end_time,
      description,
      min_qte,
      max_qte,
    });

    // Sauvegarde du nouveau ticket dans la base de données
    await newTicket.save();

    // Générer le contenu du QR code (en utilisant l'ID du ticket)
    const qrContent = {
      ticketId: newTicket._id,
      id_event,
      id_user: req.auth.userId,
    }; // Inclure l'ID du ticket dans le contenu du QR code
    const qrImage = await QRCode.toDataURL(JSON.stringify(qrContent));

    // Mettre à jour le ticket avec le QR code généré
    newTicket.qrcode = qrImage;
    await newTicket.save();

    res.json({ message: "Ticket ajouté avec succès.", ticket: newTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout du ticket." });
  }
};

const getTicketsByUserId = async (req, res) => {
  try {
    const userId = req.auth.userId;
    let page = parseInt(req.query.page) || 1; // Page à récupérer (par défaut : 1)
    const limit = 10; // Nombre de tickets par page
    const skip = (page - 1) * limit;
    const tickets = await Ticket.find({ id_user: userId })
      .populate("id_event")
      .limit(limit)
      .skip(skip);
    // Compter le nombre total de tickets de l'utilisateur
    const totalCount = await Ticket.countDocuments({ id_user: userId });
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalCount / limit);
    // Si la page demandée est supérieure au nombre total de pages, réglez la page sur la dernière page
    if (page > totalPages) {
      page = totalPages;
    }

    res.json({ tickets, page, totalPages, limit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des tickets de l'utilisateur.",
      });
  }
};
const updateTicket = async (req, res) => {
  try {
      const { id } = req.params; // Récupérer l'ID du ticket à modifier depuis les paramètres de la requête
      const updates = req.body; // Les mises à jour du ticket sont envoyées dans le corps de la requête

      // Mettre à jour le ticket dans la base de données
      const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, { new: true });

      // Vérifier si le ticket existe
      if (!updatedTicket) {
          return res.status(404).json({ error: "Ticket non trouvé." });
      }

      res.json({ message: "Ticket mis à jour avec succès.", ticket: updatedTicket });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du ticket." });
  }
};
const getTicketById = async (req, res) => {
  try {
      const { id } = req.params; // Récupérer l'ID du ticket depuis les paramètres de la requête

      // Rechercher le ticket par son ID dans la base de données
      const ticket = await Ticket.findById(id).populate("id_event").populate("id_user");

      // Vérifier si le ticket existe
      if (!ticket) {
          return res.status(404).json({ error: "Ticket non trouvé." });
      }

      res.json({ ticket });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération du ticket." });
  }
};
/* ticket valid */
const getTicketsUpComingByUserId = async (req, res) => {
  try {
    const userId = req.auth.userId;
    let page = parseInt(req.query.page) || 1; // Page à récupérer (par défaut : 1)
    const limit = 10; // Nombre de tickets par page
    const skip = (page - 1) * limit;
    
    // Modification de la requête pour inclure le filtre du statut
    const tickets = await Ticket.find({ id_user: userId, status: true })
      .populate("id_event")
      .limit(limit)
      .skip(skip);
      
    // Compter le nombre total de tickets de l'utilisateur avec le statut true
    const totalCount = await Ticket.countDocuments({ id_user: userId, status: true });
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalCount / limit);
    // Si la page demandée est supérieure au nombre total de pages, réglez la page sur la dernière page
    if (page > totalPages) {
      page = totalPages;
    }

    res.json({ tickets, page, totalPages, limit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des tickets de l'utilisateur.",
      });
  }
};
/* terminé */
const getTicketsPastTicketByUserId = async (req, res) => {
  try {
    const userId = req.auth.userId;
    let page = parseInt(req.query.page) || 1; // Page à récupérer (par défaut : 1)
    const limit = 10; // Nombre de tickets par page
    const skip = (page - 1) * limit;
    
    // Modification de la requête pour inclure le filtre du statut
    const tickets = await Ticket.find({ id_user: userId, status: false })
      .populate("id_event")
      .limit(limit)
      .skip(skip);
      
    // Compter le nombre total de tickets de l'utilisateur avec le statut true
    const totalCount = await Ticket.countDocuments({ id_user: userId, status: false });
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalCount / limit);
    // Si la page demandée est supérieure au nombre total de pages, réglez la page sur la dernière page
    if (page > totalPages) {
      page = totalPages;
    }

    res.json({ tickets, page, totalPages, limit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des tickets de l'utilisateur.",
      });
  }
};
module.exports = {
  addTicket,
  getTicketsByUserId,
  updateTicket,
  getTicketById,
  getTicketsUpComingByUserId,
  getTicketsPastTicketByUserId
};
