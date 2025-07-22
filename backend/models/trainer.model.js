import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Trainer = sequelize.define('Trainer', {
  name: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING },
  nationalId: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  contact: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  experience: { type: DataTypes.INTEGER },
  age: { type: DataTypes.INTEGER, validate: { min: 18 } },
  licenseNumber: { type: DataTypes.STRING },             // ✅ Newly added
  nationalIdPhoto: { type: DataTypes.STRING },           // ✅ Newly added
  licensePhoto: { type: DataTypes.STRING },
  selfPhoto: { type: DataTypes.STRING },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Trainer;
