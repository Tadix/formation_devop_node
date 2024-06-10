
module.exports=(sequelize,DataTypes)=>{

    const Commande = sequelize.define('Commande', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        client: {
          type: DataTypes.STRING,
          allowNull: false
        },
        items: {
          type: DataTypes.JSON,
          allowNull: false
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          
        }
      }, {
        tableName: 'commandes', 
        timestamps: true 
      });

      return Commande;
     
}



