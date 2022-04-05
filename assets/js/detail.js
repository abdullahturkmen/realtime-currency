var socket = io();

const detailsTable = document.querySelector('.details-table');

let firstData = "";
let directionClass = "";

socket.on('getSelectCurrency', function (msg) { // console.log(firstData['AEDTRY'].alis);

firstData = msg

// console.log(firstData['AEDTRY'].alis);

    //console.log(firstData[getUrl]);

});


socket.on('getSelectFilterCurrency', function (msg) { 
    
    detailsTable.innerHTML = "";

    msg.forEach(function (index, arr) {


        let alis = parseFloat(firstData[index['name']].alis) + parseFloat(index['buy_fee']);
        let satis = parseFloat(firstData[index['name']].satis) + parseFloat(index['sell_fee']);

        if (firstData[index['name']].dir.satis_dir == 'up') {
            directionClass = ` direction up `;
        } else if (firstData[index['name']].dir.satis_dir == 'down') {
            directionClass = ` direction down `;
        } else {
            directionClass = ` direction `;
        } 

         if(index['name'] === getUrl){
            //console.log(index)

            detailsTable.innerHTML += `
                <tr><td>Cins</td><td>${index['title']}</td></tr>
                <tr><td>Kod</td><td>${index['name']}<span class="${directionClass}"></span></td></tr>
                <tr><td>Alış Fiyatı (${parseFloat(index['buy_fee'])} TL komisyonlu)</td><td>${alis.toFixed(2)} TL</td></tr>
                <tr><td>Satış Fiyatı (${parseFloat(index['sell_fee'])} TL komisyonlu)</td><td>${satis.toFixed(2)} TL</td></tr>
                <tr><td>Güncelleme Zamanı</td><td>${firstData[index['name']].tarih}</td></tr>
                <tr><td>Düşük</td><td>${parseFloat(firstData[index['name']].dusuk)} TL</td></tr>
                <tr><td>Yüksek</td><td>${parseFloat(firstData[index['name']].yuksek)} TL</td></tr>
                <tr><td>Kapanış</td><td>${parseFloat(firstData[index['name']].satis)} TL</td></tr>
                `;
         }


    })

});


document.addEventListener("DOMContentLoaded", function () {
    socket.emit('getSelectCurrency', getUrl);
});

const params = new URLSearchParams(window.location.search);
const getUrl = params.get('codes');

document.title = getUrl;