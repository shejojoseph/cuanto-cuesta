import { Sequelize, Model, ModelStatic } from "sequelize";
import { DataTypes as SequelizeDataTypes } from "sequelize";
import {Db} from './index'

interface ItemAttributes {
  item_name: string,
  item_name_toLowerCase: string,
  item_id: number,
  price: number;
  SupermecadoId?: number;
}

interface ItemCreationAttributes extends ItemAttributes {}

interface ItemInstance extends Model<ItemAttributes, ItemCreationAttributes>, ItemAttributes {}

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  const Items: ModelStatic<ItemInstance> = sequelize.define<ItemInstance>('Items', {
    item_name: DataTypes.STRING,
    item_name_toLowerCase: DataTypes.STRING,
    item_id: { type: DataTypes.INTEGER, allowNull: false },
    price: DataTypes.FLOAT,
  });
(Items as any).associate = (db: Db) => {
  db.Items.belongsTo(db.Supermercados, {foreignKey: { allowNull: false }});
};

  return Items;
};