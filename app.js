const express = require('express');
const app = express();
const { connectDb } = require('./src/services/mongoose');
const userRoutes = require('./src/routes/user');
const port = process.env.PORT || 3000; // 80

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/views'));
app.use(express.static(__dirname + '/src/public'));
app.use(userRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/views/login.html');
});

connectDb().catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`App is now listening on port ${port}!`);
});