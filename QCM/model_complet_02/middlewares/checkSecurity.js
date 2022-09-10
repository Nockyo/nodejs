export default (req, res, next) => {
    if (req.session.auth) {
      return next();
    }

    let message = "T'es pas authentifié gros";
    res.render("login", { message });
  };