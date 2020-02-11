const express = require('express');
const request = require('request');
const app = express();
const fetch = require('node-fetch');
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(JSON.parse(customers));
});

app.get('/api/pilots', (req, res) => {
  const pilots = [
    {id: 4, firstName: 'John', lastName: 'Doe', years:10},
    {id: 6, firstName: 'Brad', lastName: 'Traversy', years:20},
    {id: 8, firstName: 'Mary', lastName: 'Swanson', years:30},
  ];

  res.json(pilots);
});

app.get('/jokes/random', (req, res) => {
    request({url: 'https://joke-api-strict-cors.appspot.com/jokes/random'},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
        res.json(JSON.parse(body));
      }
    )
  });

app.get('/weather/lat/:latval/long/:long', (req, res, next) => {
  const url = `https://api.darksky.net/forecast/30e2008420c9a9199fe93fdc8f7ad223/`
  console.log('kos', req.params)
  // fetch('http://ip-api.com/json').then(res=>res.json()).then(data=>request(`${url}${data.lat},${data.lon}`, (error, response, body)=>{
  //   if (error || response.statusCode !== 200) {
  //     return res.status(500).json({ type: 'error', message: err.message });
  //   }
  //   res.send(JSON.parse(body));
  // }))
  fetch('http://ip-api.com/json').then(res=>res.json()).then(data=>request(`${url}${data.lat},${data.lon}`, (error, response, body)=>{
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: err.message });
    }
    res.send(JSON.parse(body));
  }))
});

app.get('/weather/street/:street/city/:city/state/:state', (req, res, next) => {
  const url = `https://api.darksky.net/forecast/30e2008420c9a9199fe93fdc8f7ad223/`
  console.log('kos', req.params)
  // fetch('http://ip-api.com/json').then(res=>res.json()).then(data=>request(`${url}${data.lat},${data.lon}`, (error, response, body)=>{
  //   if (error || response.statusCode !== 200) {
  //     return res.status(500).json({ type: 'error', message: err.message });
  //   }
  //   res.send(JSON.parse(body));
  // }))
  let query = req.params.street.concat('%20'+req.params.city+'%20').concat('%20'+req.params.state+'%20');

  let uri =`https://us1.locationiq.com/v1/search.php?key=a5250f755c1a6e&q=${query}&format=json`
  console.log(req,query,uri, 'kiiirkos');
  fetch(uri).then(res=>res.json()).then(data=>{
    console.log('kuluch', data, 'kuluch')
    request(`${url}${data[0].lat},${data[0].lon}`, (error, response, body)=>{
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: err.message });
    }
    res.send(JSON.parse(body));
  })
})
});


app.post('/posts/',(req, res, next)=>{
  console.log('kos');
  res.send(req.query);
})
app.post('/login/',function(req,res){
  var user_name=req.query.user;
  var password=req.query.password;
  console.log('kos');
  console.log(req);
  console.log("User name = "+user_name+", password is "+password);
  res.end("User name = "+user_name+", password is "+password);
});

const tmp = ()=>{
  return new Promise((resolve, reject)=>{
    resolve(
      request('http://ip-api.com/json',
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
        JSON.stringify(body);
      })
    )
  })
}