const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios').default;
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/:userId', (req, res) => {
  res.sendFile(__dirname + '/detail.html')
})


io.on('connection', (socket) => {

  socket.on('getAllCurrency', msg => {

    setInterval(function () {
        
        axios({
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          url: 'https://www.haremaltin.com/ajax/all_prices'
        })
        .then(function (response) {
            //console.log(response);

            axios.post('https://cizrekuyumculardernegi.org/Kurapi/curency-data.json', {})
            .then(function (secondResponse){
              //console.log(secondResponse.data.currency);
              io.emit('getAllCurrency', response.data.data);
              io.emit('getCurrencyFilter', secondResponse.data.currency);
            });

        });

      }, 1000);

  });


  socket.on('getSelectCurrency', msg => {

    setInterval(function () {
        
        axios({
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          url: 'https://www.haremaltin.com/ajax/all_prices'
        })
        .then(function (response) {
            //console.log(response);

            axios.post('https://cizrekuyumculardernegi.org/Kurapi/curency-data.json', {})
            .then(function (secondResponse){
              console.log(response);
              io.emit('getSelectCurrency', response.data.data);
              io.emit('getSelectCurrency', secondResponse.data.currency);
            });

        });

      }, 1000);

  });

});




http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});