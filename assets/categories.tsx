export default function categories() {
  return ([
    { name: "Fruits", icon: require("../assets/categoryImages/apple.png") },
    {
      name: "Vegetables",
      icon: require("../assets/categoryImages/broccoli.png"),
    },
    { name: "Grains", icon: require("../assets/categoryImages/wheat-plant.png") },
    { name: "Legumes", icon: require("../assets/categoryImages/red-beans.png") },
    { name: "Meat", icon: require("../assets/categoryImages/meat.png") },
    { name: "Dairy", icon: require("../assets/categoryImages/milk.png") },
    {
      name: "Seasonings",
      icon: require("../assets/categoryImages/seasoning.png"),
    },
    { name: "Snacks", icon: require("../assets/categoryImages/snack.png") },
    { name: "Drinks", icon: require("../assets/categoryImages/mezcal.png") },
    { name: "Other", icon: require("../assets/categoryImages/fast-food.png") },
  ] as const);
}
