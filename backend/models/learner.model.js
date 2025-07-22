import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Learner = sequelize.define('Learner', {
  name: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING },
  nationalId: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  contact: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER, validate: { min: 18 } },
  plan: { type: DataTypes.STRING }, // NEW: Learner plan
  photo: { type: DataTypes.STRING }, // Profile photo
  nationalIdPhoto: { type: DataTypes.STRING }, // NEW: National ID photo
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Learner;
