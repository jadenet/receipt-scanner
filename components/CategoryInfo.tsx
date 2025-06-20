import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ReceiptImageCard from "@/components/ReceiptImageCard";
import receipts from "@/assets/receipts.json";

export default function CategoryInfo() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: 800, flexDirection: "row" }}>
        <ScrollView>
          <View style={styles.cardContainer}>
            {receipts.map((receipt, index) => (
              <ReceiptImageCard receiptInfo={receipt} key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 90,
    rowGap: 40,
  },
});
