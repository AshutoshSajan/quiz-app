// DB migration script to make changes in all the collections
const mongoose = require('mongoose');

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
        console.log({ err, user });
      },
    );
  });
};

const connectDb = (DB_URI) => {
  const { connection } = mongoose;

  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  migrateDB();
};

module.exports = { connectDb };
