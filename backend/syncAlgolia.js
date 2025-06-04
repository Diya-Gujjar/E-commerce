const algoliasearch = require("algoliasearch");
const Product = require("./models/Product");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

const client = algoliasearch(
  process.env.Application_ID,
  process.env.Admin_API_Key
);
const index = client.initIndex("products");

const syncToAlgolia = async () => {
  try {
    const products = await Product.find();

    const algoliaRecords = products.map((product) => ({
      objectID: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      highlights: product.highlights,
      image: product.image,
    }));

    const result = await index.saveObjects(algoliaRecords);
    console.log("Products synced to Algolia:", result.objectIDs);
  } catch (error) {
    console.error("Sync error:", error);
  } finally {
    mongoose.disconnect();
  }
};

syncToAlgolia();
