import CategorySpentCard from "@/components/CategorySpentCard";
import { useMemo } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const currentSpent = [
  {
    iconName: "cart",
    name: "Grocery",
    spent: 183,
  },
  {
    iconName: "shirt",
    name: "Clothing",
    spent: 56,
  },
  {
    iconName: "game-controller",
    name: "Entertainment",
    spent: 101,
  },
  {
    iconName: "rose",
    name: "Beauty",
    spent: 42,
  },
  {
    iconName: "book",
    name: "Education",
    spent: 60,
  },
  {
    iconName: "heart",
    name: "Health",
    spent: 129,
  },
];

export default function HomeScreen() {
  const amountSpent = useMemo(() => {
    return currentSpent.reduce((total, category) => total + category.spent, 0);
  }, [currentSpent]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: 800, flexDirection: "row" }}>
        <ScrollView>
          <View style={styles.hero}>
            <Text style={styles.text1}>You have spent</Text>
            <Text style={styles.text2}>${amountSpent}</Text>
          </View>

          <View style={styles.cardContainer}>
            {/* TODO: sort cards by money spent */}
            {currentSpent.map((category, index) => (
              <CategorySpentCard categoryInfo={category} key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 90,
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
