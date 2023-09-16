// Sahifadagi .box_on va #javoblar nomli elementlarni tanlash va ularni o'zgaruvchilarga bog'lash
const elBox = document.querySelector('.box_on');
const elJavob = document.getElementById('javoblar');
// Barcha mamlakat ma'lumotlarini saqlash uchun bo'sh massiv
let allData = [];
let son =0
// Test natijalari uchun o'zgaruvchilar
let elSavol = 0;
let elTureJavob = 0;

// Tanlangan variantlar soni va boshqa o'zgaruvchilar
let limit = 4;
let count, elCorrect, cities;

// Mamlakat ma'lumotlarini yuklab olish
fetch("https://restcountries.com/v2/all")
    .then(response => {
        if (!response.ok) {
            throw new Error("Server bilan muammo yuz berdi: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Olingan ma'lumotlarni allData massiviga saqlash
        allData = data;
        console.log(allData[0].capital);
    })
    .catch(error => {
        // Xatoni ekranga chiqarish
        elJavob.innerHTML = error + " <br> Iltimos, keyinroq qayta urinib ko'ring";
        console.log(error);
    });

// Sahifadagi ma'lumotlarni tozalash uchun funksiya
function ochirish() {
    elBox.innerHTML = "";
}

// Yangi savolni tayyorlash uchun funksiya
function capitals() {
    // Sahifani tozalash
    ochirish();

    // Savol raqamini o'zgartirish
    elSavol++;

    // Tasodifiy mamlakatni tanlash
    count = Math.floor(Math.random() * allData.length);

    // Tanlangan mamlakatning poytaxtini va to'g'ri javobni aniqlash
    if (allData[count].capital === "") {
        cities = ["N/A"];
        elCorrect = "N/A";
    } else {
        cities = [allData[count].capital];
        elCorrect = allData[count].capital;
    }

    // Tanlangan variantlar soniga yetishgacha boshqa poytaxtlarni qo'shish
    while (cities.length < limit) {
        let choice = allData[Math.floor(Math.random() * allData.length)].capital;
        if (!cities.includes(choice) || !cities.includes("N/A")) {
            cities.push(choice);
        }
    }

    // Savolni sahifaga chiqarish
    elBox.innerHTML += `
    <h1>Question number: ${elSavol}</h1>
    <h2>What is the capital of <b>${allData[count].name}?</b></h2>
    <div id="buttons"></div>
    <p> Mumumiy to'g'ri javoblar soni: ${son}</p>`;

    // Variantlar uchun tugmalar qo'shish
    cities.map(city => {
        document.getElementById("buttons").innerHTML += `
            <button onclick="testcapital('${city}')">${city}</button>`;
    });
}



// Foydalanuvchi tanlagan javobni tekshirish uchun funksiya
function testcapital(el) {
    // Sahifani tozalash
    ochirish();

    // Foydalanuvchi javobi to'g'ri bo'lsa
    if (el == elCorrect) {
        son++
        // To'g'ri javobni chiqarish
        elJavob.innerHTML = `
        <h2 class="correct"> PREVIOUS QUESTION : <br>
                        YES! the Capital of <b>${allData[count].name}</b> is <b>${elCorrect}</b>!</h2>`;

        // To'g'ri javobni san'atga oshirish
        elTureJavob++;
        // son = son + 1
        // Agar savollar soni 10 ga yetmasa, yangi savolni tayyorlash
        if (elSavol % 10 != 0) {
            capitals();
        } else {
            // Aks holda testni yakunlash
            finish();
        }
    } else {
        
        // Foydalanuvchi javobi noto'g'ri bo'lsa
        elJavob.innerHTML = `<h2 class="wrong"> Oldingi savol: <br>
                        NO, the Capital of <b>${allData[count].name}</b> is <b>${elCorrect}</b></h2>`;

        // Agar savollar soni 10 ga yetmasa, yangi savolni tayyorlash
        if (elSavol % 10 != 0) {
            capitals();
        } else {
            // Aks holda testni yakunlash
            finish();
        }
    }
}




// Testni yakunlash va natijalarni chiqarish uchun funksiya
function finish() {
    elBox.innerHTML += `
    <h1>Bravo!<br>
    Siz o'yinni tugatdingiz!</h1>
    <h2>Siz to'plagan ball = <b>${elTureJavob}/${elSavol}</b></h2>
    <h3>Siz hoxlaysizmi o'yinni davom ettirishni ?</h3>
    <h4>Bismillah qani ketdik</h4>
    <button id="capitals" onclick="capitals()">Capitals</button>`;
    elJavob.innerHTML = ``;
    // Savol va to'g'ri javobni nolga qaytarish
    elSavol = 0;
    elTureJavob = 0;
}





