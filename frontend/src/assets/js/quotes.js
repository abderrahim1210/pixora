const quote_item = document.getElementById('quote');
const quote_item1 = document.getElementById('quote_1');
const quotes = [];
quotes[0] = "Every photo tells a story. What’s yours?";
quotes[1] = "See the world through the eyes of creators.";
quotes[2] = "Photography is the art of frozen time.";
quotes[3] = "Where your moments become masterpieces.";
quotes[4] = "Pixora — Where pixels speak.";
setInterval(() => {
    const quote = Math.floor(Math.random() * quotes.length);
    quote_item.innerHTML = quotes[quote];
    quote_item1.innerHTML = quotes[quote];
}, 3000);