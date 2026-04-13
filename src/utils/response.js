/**
 * Utilitaire pour formater les réponses HTTP de manière uniforme
 */

const sendSuccess = (res, data, message = 'Opération réussie', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendCreated = (res, data, message = 'Ressource créée avec succès') => {
  return sendSuccess(res, data, message, 201);
};

const sendError = (res, message = 'Erreur serveur', statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
  });
};

const sendNotFound = (res, message = 'Ressource introuvable') => {
  return sendError(res, message, 404);
};

const sendBadRequest = (res, message = 'Données invalides', errors = []) => {
  return sendError(res, message, 400, errors);
};

const sendConflict = (res, message = 'Conflit de données') => {
  return sendError(res, message, 409);
};

module.exports = {
  sendSuccess,
  sendCreated,
  sendError,
  sendNotFound,
  sendBadRequest,
  sendConflict,
};
