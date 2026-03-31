import 'dotenv/config';
import express from "express";
import path from "path";
import { getAllFeedbacks, addFeedback } from "./feedbackService.js";

const app = express();

// папка с EJS
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// статика (css, js, картинки)
app.use(express.static("public"));
app.use(express.json()); // для POST-запросов JSON

app.use((req, res, next) => {
  res.locals.loggedIn = false;
  next();
});

// API для отзывов
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacks();
    res.json(feedbacks);
  } catch (err) {
    console.error("Ошибка получения отзывов:", err);
    res.status(500).json([]);
  }
});

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const newFeedback = await addFeedback(name, email, message);
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error("Ошибка добавления отзыва:", err);
    res.status(500).json({ error: "Не удалось добавить отзыв" });
  }
});

// страницы
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/gallery", (req, res) => res.render("gallery"));
app.get("/care", (req, res) => res.render("care"));
app.get("/stories", (req, res) => res.render("stories"));
app.get("/contacts", (req, res) => res.render("contacts"));
app.get("/feedback", (req, res) => res.render("feedback"));

// запуск
app.listen(3000, () => console.log("http://localhost:3000"));