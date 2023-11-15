// DB migration script to make changes in all the collections
const mongoose = require('mongoose');

const migrateDB = () => {
  const { collections } = mongoose.connections[0];

  Object.keys(collections).forEach((collection) => {
    collections[collection].updateMany(
      {},
      {
        $rename: {
          // userName: 'name',
          created_at: 'createdAt',
          updated_at: 'updatedAt',
        },
      },
      {
        // multi: true,
        // upsert: true,
      },
      (err, user) => {
        console.info({ err, user });
      },
    );
  });
};

const connectDB = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`mongodb connection error, ${err.message}`, err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = { migrateDB, connectDB };
