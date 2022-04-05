var socket = io();

const currencyTable = document.querySelector('.currency-table');
const currencySwiper = document.querySelector('.currency-swiper');

let firstData = "";
let isCurrencySwiperEmpty = true;

let currencyTableItem = "";
let currencySwiperItem = "";
let currencySwiperItemContent = "";

let swiperAttrItemData = "";

socket.on('getAllCurrency', function (msg) { // console.log(msg);

    firstData = msg;

    // console.log(firstData['AEDTRY'].alis);
    // console.log(firstData);

});

socket.on('getCurrencyFilter', function (msg) {


    currencyTable.innerHTML = "";

    let alis = "";
    let satis = "";
    let directionClass = "";


    msg.forEach(function (index, arr) { // console.log(msg);


        currencyTableItem = '';

        if (firstData[index['name']].dir.satis_dir == 'up') {
            directionClass = ` direction up `;
        } else if (firstData[index['name']].dir.satis_dir == 'down') {
            directionClass = ` direction down `;
        } else {
            directionClass = ` direction `;
        } 
        
        alis = parseFloat(firstData[index['name']].alis) + parseFloat(index['buy_fee']);
        satis = parseFloat(firstData[index['name']].satis) + parseFloat(index['sell_fee']);

        // swiper ekleme
        if (index['display'] === "swiper") {

            currencySwiperItemContent = "";

            currencySwiperItemContent += `<div class="${directionClass}"><a href="/detail/${
                index['name']
            }">${
                index['name']
            } (${
                index['title']
            })
<br>${
                alis.toFixed(2)
            } TL <small>(+${
                parseFloat(index['buy_fee'])
            } TL)</small>
<br>${
                satis.toFixed(2)
            } TL <small>(+${
                parseFloat(index['sell_fee'])
            } TL)</small></a></div>`;

            if (isCurrencySwiperEmpty) {

                currencySwiperItem = "";

                currencySwiperItem += `<div class="swiper-slide">${currencySwiperItemContent}</div>`;

                currencySwiper.innerHTML += currencySwiperItem;


            } else {

                swiperAttrItemData = document.querySelectorAll(`[data-swiper-slide-index="${arr}"]`);

                for (var i = 0; i < swiperAttrItemData.length; i++) {
                    swiperAttrItemData[i].innerHTML = currencySwiperItemContent
                }

            }
        }


        // table ekleme
        if (index['display'] === "table") {


            currencyTableItem += `<tr class="${directionClass}">  
            <td scope="row">${
                index['title']
            }</td>
            <td>${alis.toFixed(2)} TL <small>(${
                parseFloat(index['buy_fee'])
            } TL komisyonlu)</small></td>
            <td>${
                satis.toFixed(2)
            } TL <small>(${
                parseFloat(index['sell_fee'])
            } TL komisyonlu)</small></td>
            <td>
                <a href="/detail/${
                index['name']
            }" class="btn btn-sm">⚡</a></td></tr>`;

        }

        currencyTable.innerHTML += currencyTableItem;

    })


    if (isCurrencySwiperEmpty) {

        let swiper = new Swiper('.swiper', { // Optional parameters
            direction: 'horizontal',
            loop: true,
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50
                }
            }
        });

    }

});


document.addEventListener("DOMContentLoaded", function () {
    socket.emit('getAllCurrency', "start");

    setTimeout(function myfunc() {
        isCurrencySwiperEmpty = false
    }, 3000);
});