import express from 'express';
import { Learner } from '../models/index.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

/**
 * @route   POST /api/learners
 * @desc    Register a new learner (with profile photo and national ID photo)
 */
router.post('/', uploadMultiple, async (req, res) => {
  try {
    const {
      name,
      gender,
      nationalId,
      email,
      contact,
      location,
      age,
      plan,
    } = req.body;

    if (parseInt(age) < 18) {
      return res.status(400).json({ error: "Age must be 18 or above." });
    }

    const learner = await Learner.create({
      name,
      gender,
      nationalId,
      email,
      contact,
      location,
      age,
      plan,
      photo: req.files?.photo?.[0]?.filename || null,
      nationalIdPhoto: req.files?.nationalIdPhoto?.[0]?.filename || null,
      approved: false,
      completed: false,
    });

    res.status(201).json(learner);
  } catch (err) {
    console.error("🔥 [POST /api/learners] Registration failed:", err);

    if (
      err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError'
    ) {
      const errorMessages = err.errors.map((e) => e.message);
      return res.status(400).json({ error: errorMessages.join(', ') });
    }

    res.status(500).json({ error: "Something went wrong!" });
  }
});

/**
 * @route   GET /api/learners/pending
 * @desc    Get all pending learner requests
 */
router.get('/pending', async (req, res) => {
  try {
    const pendingLearners = await Learner.findAll({
      where: { approved: false },
    });
    res.json(pendingLearners);
  } catch (err) {
    console.error("🔥 [GET /api/learners/pending] Fetch failed:", err);
    res.status(500).json({ error: "Server error while fetching pending learners" });
  }
});

/**
 * @route   GET /api/learners/approved
 * @desc    Get all approved learners
 */
router.get('/approved', async (req, res) => {
  try {
    const approvedLearners = await Learner.findAll({
      where: { approved: true },
    });
    res.json(approvedLearners);
  } catch (err) {
    console.error("🔥 [GET /api/learners/approved] Fetch failed:", err);
    res.status(500).json({ error: "Server error while fetching approved learners" });
  }
});

/**
 * @route   PATCH /api/learners/approve/:id
 * @desc    Approve a learner
 */
router.patch('/approve/:id', async (req, res) => {
  try {
    const learner = await Learner.findByPk(req.params.id);
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    learner.approved = true;
    await learner.save();

    res.json({ message: "Learner approved successfully" });
  } catch (err) {
    console.error("🔥 [PATCH /api/learners/approve/:id] Approval failed:", err);
    res.status(500).json({ error: "Server error while approving learner" });
  }
});

/**
 * @route   PATCH /api/learners/:id/complete
 * @desc    Mark learner as completed
 */
router.patch('/:id/complete', async (req, res) => {
  try {
    const learner = await Learner.findByPk(req.params.id);
    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }

    learner.completed = true;
    await learner.save();

    res.json({ message: 'Learner marked as completed' });
  } catch (err) {
    console.error("🔥 [PATCH /api/learners/:id/complete] Completion failed:", err);
    res.status(500).json({ error: "Server error while marking learner as completed" });
  }
});

/**
 * @route   DELETE /api/learners/:id
 * @desc    Delete a learner by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const learner = await Learner.findByPk(req.params.id);
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    await learner.destroy();
    res.json({ message: "Learner deleted successfully" });
  } catch (err) {
    console.error("🔥 [DELETE /api/learners/:id] Deletion failed:", err);
    res.status(500).json({ error: "Server error while deleting learner" });
  }
});

export default router;
