// DB migration script to make changes in all the collections
const mongoose = require('mongoose');
const { NODE_ENV, ME_CONFIG_MONGODB_URL } = process.env;
const mongoURI = NODE_ENV === 'production' ? ME_CONFIG_MONGODB_URL : '';

const migrateDB = () => {
  const { collections } = mongoose.connections[0];

  Object.keys(collections).forEach((collection) => {
    collections[collection].updateMany(
      {},
      {
        $rename: {
          //   userName: 'name',
          created_at: 'createdAt',
          updated_at: 'updatedAt',
        },
      },
      {
        // multi: true,
        // upsert: true,
      },
      (err, user) => {
        // console.log({ err, user });
      },
    );
  });
};

const connectDB = async (DB_URI) => {
  try {
    await mongoose.connect(mongoURI || DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected at ${mongoURI}...`);
  } catch (err) {
    console.error(`mongodb connection error', ${err.message}`, err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = { migrateDB, connectDB };
