import { getData } from './db.js';
import { DataTypes } from 'sequelize';
//import { getUsers } from './Users.js';

const Local = getData.sequelizeClient.define('cat_local', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true

    },
    namelocal:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'cat_local',
    freezeTableName: true,
    timestamps: false,
});

//Local.belongsTo(getUsers, { foreignKey: 'userId' });

export const getLocal = Local;