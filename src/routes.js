const {Router} = require('express');
const route = Router();

const svg = require('./database/svg');

// Controllers

route.get('/', (req, res) => {
  return res.render('index');
})

route.get('/getSvg/:nome', svg.getSVG);
route.get('/getViewBox/:nome',svg.getViewBox);

module.exports = route;
