const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const vitalRoutes = require("./routes/vitals");
const diagnosisRoutes = require("./routes/diagnosis");
const journalRoutes = require("./routes/journal");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/vitals", vitalRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/journal", journalRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
