import { Sequelize, Model, ModelStatic } from "sequelize";
import { DataTypes as SequelizeDataTypes } from "sequelize";
import {Db} from './index';

interface SupermercadoAttributes{
  supermercados_name: string;
  id?: Number;
}

interface SupermercadoCreationAttributes extends SupermercadoAttributes {}

interface SupermercadoInstance extends Model<SupermercadoAttributes, SupermercadoCreationAttributes>, SupermercadoAttributes {}

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  const Supermercados: ModelStatic<SupermercadoInstance> = sequelize.define<SupermercadoInstance> ('Supermercados', {
    supermercados_name: DataTypes.STRING,
  });
  (Supermercados as any).associate = (db: Db) => {
  db.Supermercados.hasMany(db.Items);
  };

  return Supermercados;
};