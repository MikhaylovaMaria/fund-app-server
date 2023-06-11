const categotyMock = require("../mock/category.json");
const Category = require("../models/Category");

module.exports = async () => {
  const categories = await Category.find({ type: "base" });
  if (categories.length !== categotyMock.length) {
    createInitialEntity(Category, categotyMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (i) => {
      try {
        const newItem = new Model(i);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
