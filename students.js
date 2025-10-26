import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Student = sequelize.define("Student", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  estado: { 
    type: DataTypes.ENUM("presente", "tarde", "retiro"), 
    defaultValue: "presente" 
  },
  horaRegistro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Student;
