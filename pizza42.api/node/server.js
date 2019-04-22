const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const app = express();

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Invalid AUTH0_DOMAIN or AUTH0_AUDIENCE in .env file'
}
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});
const checkScope = jwtAuthz([ 'read:menu' ]);
const checkOrderScope = jwtAuthz([ 'create:orders' ]);

app.get('/api/menu',checkJwt,checkScope, function(req, res) {
  res.json({ menu: ['Margherita','Americano','Hawaiian', 'Pepperoni']});
});

app.post('/api/placeOrder', checkJwt,checkOrderScope, function(req, res) {
  console.log(req);
  res.json(
    { orderId: Math.floor(Math.random()*89999+10000),
      order: req.body }    
    );
});

app.listen(4201);
console.log('Pizza42 server listening on http://localhost:4201');
