const Router = require('express').Router;
const router = new Router();

router.get('/', (req, res, next) => {
  next();
});

module.exports = router;
