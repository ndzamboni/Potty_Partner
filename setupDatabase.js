const { sequelize } = require('./config/connection');
const { User, Restroom, Review } = require('./models'); // Import all your models here

async function setupDatabase() {
  try {
    // Drop existing tables and sequences if they exist
    await sequelize.query('DROP TABLE IF EXISTS "users" CASCADE');
    await sequelize.query('DROP SEQUENCE IF EXISTS users_id_seq CASCADE');

    // Sync models (force: true drops tables if they already exist)
    await sequelize.sync({ force: true });

    console.log('Database setup complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  }
}

setupDatabase();