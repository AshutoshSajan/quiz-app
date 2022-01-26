// DB migration script to make changes in all the collections
const mongoose = require('mongoose');

const { NODE_ENV, MONGO_URI_DEV, MONGO_URI_PROD, MONGO_URI_TEST } = process.env;
const mongoURI =
  NODE_ENV === 'development'
    ? MONGO_URI_DEV
    : NODE_ENV === 'production'
    ? MONGO_URI_PROD
    : MONGO_URI_TEST;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

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

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, options);

    // migrateDB();
    console.log('mongodb Connected...');
  } catch (err) {
    console.error('mongodb connection error', err);
    // Exit process with failure
    process.exit(1);
  }
};

const mongoDB = {
  mongoose,
  connect: async () => {
    try {
      mongoose.Promise = Promise;
      await mongoose.connect(mongoURI, options);

      console.log('mongodb connected...');
    } catch (err) {
      console.error('mongodb connection error', err);
      // Exit process with failure
      process.exit(1);
    }
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};

module.exports = { migrateDB, connectDB, mongoDB };
