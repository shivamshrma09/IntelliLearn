const express = require("express");
const router = express.Router();
const Batch = require("../models/batch.models");

// Create new batch
router.post("/", async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json({ message: "Batch saved successfully", batch });
  } catch (error) {
    console.error("Error saving batch:", error.message);
    res.status(500).json({ message: "Error saving batch", error: error.message });
  }
});

// Get all batches
router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find({});
    res.json(batches);
  } catch (error) {
    console.error("Error fetching batches:", error.message);
    res.status(500).json({ message: "Error fetching batches", error: error.message });
  }
});

module.exports = router;
