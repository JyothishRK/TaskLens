import express from "express";

import Task from "../model/task.js";

const router = express.Router();

// Get all tasks

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        if(tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add a task

router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


export default router;