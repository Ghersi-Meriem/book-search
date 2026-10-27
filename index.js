import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", async (req, res) => {
  res.render("index.ejs", {
    books: [],
  });
});

app.post("/", async (req, res) => {
  const bookName = req.body.bookName;
  try {
    const response = await axios.get("https://openlibrary.org/search.json", {
      params: { q: bookName, limit: 10 },
    });
    const bookDate = response.data.docs;
    res.render("index.ejs", {
      books: bookDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "An error occurred while fetching the book data.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
