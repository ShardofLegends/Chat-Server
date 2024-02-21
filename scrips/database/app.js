const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB-Verbindung herstellen
mongoose.connect('mongodb://localhost:27017/deineDatenbank', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware für das Parsen von Anforderungskörpern
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB-Schema für Benutzerregistrierungen
const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
});

// MongoDB-Modell für Benutzer
const User = mongoose.model('User', userSchema);

// Endpunkt für Benutzerregistrierung
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
