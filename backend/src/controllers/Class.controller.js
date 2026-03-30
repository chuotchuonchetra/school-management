const { Class } = require("../models");

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createClass = async (req, res) => {
    try {
        const classes = await Class.create(req.body);
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateClass = async (req, res) => {
    try {
        const classes = await Class.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteClass = async (req, res) => {
    try {
        const classes = await Class.destroy({ where: { id: req.params.id } });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllClasses, createClass, updateClass, deleteClass };  