const express = require("express");
const router = express.Router();
const { Dish,User } = require("../Models/Model");

async function createDish(
  name,
  isTrending,
  isSuggested,
  description,
  Recipe,
  Category,
  ImageLink,
  RecipeVideoLink,
  Price
) {
  var dish = await new Dish({
    name,
    isTrending,
    isSuggested,
    description,
    Recipe,
    Category,
    ImageLink,
    RecipeVideoLink,
    Price,
  });
  const dishRef = await dish.save();
  console.log(dishRef);
  return dishRef;
}


async function bookMarkDish(id, dish) {
  const user = await User.findOne({ _id: id });
  user.bookMarks.push(dish);
  console.log(user);
  user.save();
  return user;
}

router.get("/", (req, res) => {
  res.json({ VALUE: "NILLLLL" });
});

router.get("/dish/:id", async (req, res) => {
  var dish = await Dish.find({ _id: req.params.id });
  console.log(dish);
  res.json({ Value: dish });
});

router.get("/trending", async (req, res) => {
  var trending = await Dish.find({ isTrending: true });
  console.log(trending)
  res.json({ Value: trending });
});

router.get("/suggestions", async (req, res) => {
  var suggestions = await Dish.find({ isSuggested: true });
  res.json({ Value: suggestions });
});

router.delete("/dish", async (req, res) => {
  var dishId = req.body.dishId;
  var result = await Dish.findOneAndDelete({ _id: dishId });
  res.json({ Value: result });
});

router.patch("/changePrice", async (req, res) => {
  var dishId = req.body.dishId;
  var newPrice = req.body.newPrice;
  var result = await Dish.findOneAndUpdate(
    { _id: dishId },
    { Price: newPrice }
  );
  res.json({ value: result });
});

router.patch("/setTrends/:id", async (req, res) => {
  var isTrending = req.body.isTrending;
  var isSuggested = req.body.isSuggested;

  var result = await Dish.findOneAndUpdate({ _id: req.params.id }, {
    isTrending,
    isSuggested
  });

  res.json({"Value":result})
});

router.post("/createDish", async (req, res) => {
  var name = req.body.name;
  var isTrending = req.body.isTrending;
  var isSuggested = req.body.isSuggested;
  var description = req.body.description;
  var Recipe = req.body.Recipe;
  var Category = req.body.Category;
  var ImageLink = req.body.ImageLink;
  var RecipeVideoLink = req.body.RecipeVideoLink;
  var Price = req.body.Price;

  var result = await createDish(
    name,
    isTrending,
    isSuggested,
    description,
    Recipe,
    Category,
    ImageLink,
    RecipeVideoLink,
    Price
  );
  console.log(result);
  res.json({ val: result });
});

router.post("/bookMark",async (req,res)=>{
  var Id = req.body.Id;
  var dishId = req.body.dishId;
  var dish = await Dish.findOne({ _id: dishId })
  console.log(dish);
  var result = await bookMarkDish(Id,dish);
  res.json({"value":result})
})

module.exports = { router };
