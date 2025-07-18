import CategorySpentCard from "@/components/CategorySpentCard";
import { use, useMemo, useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import categories from "@/assets/categories.json";
import { getReceiptList } from "@/components/ReceiptList";

export default function HomeScreen() {
  const [changeDebounce, setChangeDebounce] = useState(true);
  const receipts = useMemo(() => getReceiptList(setChangeDebounce, "index"), [changeDebounce]);
  

  const totalSpent = receipts.reduce((total: number, receipt: any) => {
    return (
      total +
      (receipt.items.reduce((sum: number, item: any) => sum + item.price, 0) ||
        0)
    );
  }, 0);

  const categorySpent: any = {};

  categories.forEach((category) => {
    categorySpent[category.name] = receipts.reduce(
      (total: number, receipt: any) => {
        return (
          total +
          (receipt.items.reduce((sum: number, item: any) => {
            return sum + (item.category === category.name ? item.price : 0);
          }, 0) || 0)
        );
      },
      0
    );
  });

  categories.sort((a, b) => {
    return (categorySpent[b.name] || 0) - (categorySpent[a.name] || 0);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.hero}>
          <Text style={styles.text1}>You have spent</Text>
          <Text style={styles.text2}>${totalSpent}</Text>
        </View>

        <View style={styles.cardContainer}>
          {categories.map((category, index) => (
            <CategorySpentCard
              categoryInfo={category}
              spent={categorySpent[category.name]}
              total={totalSpent}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 100,
    paddingBottom: 50,
    gap: 5,
  },
  text1: {
    color: "#123D46",
  },
  text2: {
    color: "#123D46",
    fontSize: 70,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    rowGap: 20,
  },
});
