import express from "express";

import Task from "../model/task.js";

const router = express.Router();

// Get all tasks
// GET /tasks

router.get("/", async (req, res) => {
    try {
        const filter = {};
        
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }
        
        if (req.query.type) {
            filter.type = req.query.type;
        }

        const tasks = await Task.find(filter);
        
        if(tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add a task
// POST /tasks

router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update a task
// PATCH /tasks/:id

router.patch("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete a task
// DELETE /tasks/:id

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


export default router;