const express = require("express");
const router = express.Router();
const Subscriber = require("../models/user");

// Getting all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One subscriber
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Creating one subscriber
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One subscriber
router.patch("/:id", getSubscriber, async (req, res) => {
  try {
    res.subscriber.username = req.body.username || res.subscriber.username;
    res.subscriber.password = req.body.password || res.subscriber.password;
    res.subscriber.role = req.body.role || res.subscriber.role;

    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One subscriber
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const subscriber = await Subscriber.findOne({ username });
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    if (password !== subscriber.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
