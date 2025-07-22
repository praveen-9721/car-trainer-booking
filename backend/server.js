import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import learnerRoutes from './routes/learner.routes.js';
import trainerRoutes from './routes/trainer.routes.js';
import { Learner, Trainer } from './models/index.js'; // Models
import sequelize from './config/db.js'; // DB connection

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from /uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/learners', learnerRoutes);
app.use('/api/trainers', trainerRoutes);

// ✅ Root Route
app.get('/', (req, res) => res.send('🚗 Car Trainer Booking Server is Running'));

// ✅ Sync Sequelize Models (Auto alter tables)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ All models synchronized with database');
    
    // ✅ Start server after successful sync
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error syncing models with database:', err);
  });
