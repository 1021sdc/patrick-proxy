require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const proxy = require('http-proxy-middleware');
var rp = require('request-promise');

const app = express();

const port = 8080;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

const photos = 'http://54.200.99.206/photos';
const listings = 'http://35.166.168.110/listings';
const reviews = 'http://34.217.147.152/reviews';
const homes = 'http://54.203.108.98:3005/MoreHomes';
const booking = 'http://52.34.93.128/booking';
const room = 'http://52.34.93.128/room';

const routesOne = [photos, listings, reviews];
const routesTwo = [homes, booking, room]

app.get('/getAll/:id', (req, res) => {
  const { id } = req.params;
  let jsonData = [];

  Promise.all([
    Promise.all(routesOne.map(url =>
    rp(`${url}/${id}`)
    .then(data => jsonData.push(data))
    .catch(err => jsonData.push({err}))
    )),
     Promise.all(routesTwo.map(url =>
      rp(`${url}/?id=${id}`)
      .then(data => jsonData.push(data))
      .catch(err => jsonData.push({err}))
      ))
     ])
    .then(() => res.send(jsonData));
})


app.get('/photos/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`${photos}/${id}`);
})

app.get('/listings/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`${listings}/${id}`);
})

app.get('/reviews/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`${reviews}/${id}`);
})

app.use('/MoreHomes',
  proxy({
    target: homes,
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/');
      }
    })
);

app.use('/booking',
  proxy({
    target: booking,
    pathRewrite: (path, req) => {

      var querystring = '?';

      for (key in req.query) {
        if (querystring !== '?') {
          querystring += '&';
        }

        querystring += `${ key }=${ req.query[key] }`;
      }

      return querystring;
    }
  })
);

app.use('/room',
  proxy({
    target: room,
    pathRewrite: (path, req) => {

      var querystring = '?';

      for (key in req.query) {
        if (querystring !== '?') {
          querystring += '&';
        }

        querystring += `${ key }=${ req.query[key] }`;
      }

      return querystring;
    }
  })
);

app.listen(port, () => {
    console.log('Server is listening on port 8080')
});