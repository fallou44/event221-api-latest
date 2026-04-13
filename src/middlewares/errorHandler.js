const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: `Conflit: la valeur du champ "${err.meta?.target?.join(', ')}" existe déjà.`,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Ressource introuvable.',
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur interne',
  });
};

module.exports = errorHandler;
