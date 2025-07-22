import express from 'express';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { Trainer } from '../models/index.js';
import { uploadTrainerFiles } from '../middleware/upload.js'; // updated middleware import

const router = express.Router();

// ✅ POST /api/trainers - Create Trainer
router.post('/', uploadTrainerFiles, async (req, res) => {
  try {
    const {
      name,
      gender,
      nationalId,
      email,
      contact,
      location,
      experience,
      age,
    } = req.body;

    if (parseInt(age) < 18) {
      return res.status(400).json({ error: 'Age must be 18 or above' });
    }

    const selfPhoto = req.files?.selfPhoto?.[0]?.filename || null;
    const licensePhoto = req.files?.licensePhoto?.[0]?.filename || null;
    const nationalIdPhoto = req.files?.nationalIdPhoto?.[0]?.filename || null;

    const trainer = await Trainer.create({
      name,
      gender,
      nationalId,
      email,
      contact,
      location,
      experience,
      age,
      selfPhoto,
      licensePhoto,
      nationalIdPhoto,
    });

    res.status(201).json(trainer);
  } catch (err) {
    console.error('🔥 Trainer POST Error:', err);
    if (
      err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError'
    ) {
      const errorMessages = err.errors.map(e => e.message);
      return res.status(400).json({ error: errorMessages.join(', ') });
    }
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// ✅ GET /api/trainers - Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.findAll({ order: [['createdAt', 'DESC']] });
    res.json(trainers);
  } catch (err) {
    console.error("🔥 Error fetching trainers:", err);
    res.status(500).json({ error: 'Failed to load trainers' });
  }
});

// ✅ PATCH /api/trainers/:id/approve - Approve trainer
router.patch('/:id/approve', async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });

    trainer.approved = true;
    await trainer.save();

    res.json({ message: 'Trainer approved successfully' });
  } catch (err) {
    console.error("🔥 Error approving trainer:", err);
    res.status(500).json({ error: 'Failed to approve trainer' });
  }
});

// ✅ DELETE /api/trainers/:id - Delete trainer
router.delete('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });

    await trainer.destroy();
    res.json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ✅ GET /api/trainers/:id/pdf - Generate trainer PDF
router.get('/:id/pdf', async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });

    const doc = new PDFDocument();
    const pdfPath = path.join('uploads', `trainer-${trainer.id}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const uploadsDir = path.join(process.cwd(), 'uploads');
    const logoPath = path.join(uploadsDir, 'logo.png');

    // ✅ Header
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 20, { width: 60 });
    }
    doc.fontSize(20).fillColor('#333').text('Trainer Details Report', 120, 30);
    doc.moveTo(50, 70).lineTo(550, 70).stroke();

    // ✅ Info Box
    doc.roundedRect(50, 80, 500, 200, 8).stroke();
    doc.fontSize(12).fillColor('#000').text(`Name: ${trainer.name}`, 60, 90);
    doc.text(`Gender: ${trainer.gender}`, 60, 110);
    doc.text(`Email: ${trainer.email}`, 60, 130);
    doc.text(`Contact: ${trainer.contact}`, 60, 150);
    doc.text(`National ID: ${trainer.nationalId}`, 60, 170);
    doc.text(`Location: ${trainer.location}`, 60, 190);
    doc.text(`Experience: ${trainer.experience} years`, 60, 210);
    doc.text(`Age: ${trainer.age}`, 60, 230);
    doc.text(`Status: ${trainer.approved ? 'Approved' : 'Pending'}`, 60, 250);

    // ✅ Self Photo
    const selfPhotoPath = path.join(uploadsDir, trainer.selfPhoto || '');
    if (fs.existsSync(selfPhotoPath)) {
      doc.fontSize(12).text('Self Photo:', 60, 290);
      doc.image(selfPhotoPath, 60, 310, { width: 200, height: 150 });
    }

    // ✅ License Photo
    const licensePhotoPath = path.join(uploadsDir, trainer.licensePhoto || '');
    if (fs.existsSync(licensePhotoPath)) {
      doc.fontSize(12).text('License Photo:', 300, 290);
      doc.image(licensePhotoPath, 300, 310, { width: 200, height: 150 });
    }

    // ✅ National ID Photo
    const nationalIdPhotoPath = path.join(uploadsDir, trainer.nationalIdPhoto || '');
    if (fs.existsSync(nationalIdPhotoPath)) {
      doc.fontSize(12).text('National ID Photo:', 60, 480);
      doc.image(nationalIdPhotoPath, 60, 500, { width: 200, height: 150 });
    }

    // ✅ Footer
    doc.moveTo(50, 670).lineTo(550, 670).stroke();
    doc.fontSize(10).fillColor('gray').text(`Generated on ${new Date().toLocaleString()}`, 50, 680, {
      align: 'center',
      width: 500,
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(pdfPath, `trainer-${trainer.id}.pdf`, (err) => {
        if (err) console.error('📄 PDF Download Error:', err);
        fs.unlinkSync(pdfPath); // cleanup
      });
    });
  } catch (err) {
    console.error("🔥 PDF Generation Error:", err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

export default router;
