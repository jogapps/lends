require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const routes = require("./src/api/routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});

module.exports = app;