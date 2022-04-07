# Realtime Currency

>**Demo** : [realtime-currency](https://realtime-currency.herokuapp.com/)


Selamlar herkese. Projemde RestAPI'ler üzerine çalışırken canlı şekilde veri listeleme olayını ele aldım. Bu projede [haremaltin.com/ajax/all_prices](https://www.haremaltin.com/ajax/all_prices) adresinden JSON formatında dönen döviz kurlarını Socket.Io teknolojisini kullanarak anlık olarak Axios kütüphanesi ile sayfama ekliyorum. Projenin temel amacı ise kullanıcının sayfasında herhangi bir yenileme olmadan sadece ilgili alanları yeni veriler ile güncelleyerek çok daha hızlı ve çok daha az veri kullanımını sağlamak.

## Özelleştirme

Proje [haremaltin.com/ajax/all_prices](https://www.haremaltin.com/ajax/all_prices) adresinden verileri çekmekte fakat öncelikle kendi hazırlamış olduğum [currency-data.json](https://github.com/abdullahturkmen/realtime-currency/blob/master/currency-data.json) dosyasından bazı filtrelemeler ile birleşerek kendi istediğimiz bir biçimde listeleme yapabilme imkanımız oluşuyor. 


### - Neler Yapılabilir
- Gelen verideki döviz cins koduna göre kendi belirlediğimiz başlığı ekleme
- Alış ve satış için ayrı ayrı belirlediğimiz miktarda komisyon ekleme
- Verilerin display özelliğine göre sınıflandırıp tabloda veya swiper tarafında gösterimi sağlanabilir

```
{
"name": "ONS", // Gelen döviz cins kodunu seçme
"title": "Ons", // Döviz cins koduna göre yeni başlık belirleme
"sell_fee": 1, // Gelen döviz cinsine satış sırasında bizim belirlediğimiz komisyon tutarı
"buy_fee": 1, // Gelen döviz cinsine alış sırasında bizim belirlediğimiz komisyon tutarı
"display": "swiper" // Verimizin nerede listeleneceğini belirleme
},
```


## Kurulum


```
npm install
```

Bu komut ile öncelikle 'node_modules' gerekli dosyaları getirir ve projemiz çalıştırmaya hazır hale gelir.


```
npm start
```

Bu komut ile projemiz çalıştırılır ve [localhost:3000](http://localhost:3000) portunda çalışmaya başlar.

