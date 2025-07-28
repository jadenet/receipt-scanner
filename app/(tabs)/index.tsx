import categories from "@/assets/categories";
import CategorySpentCard from "@/components/CategorySpentCard";
import { getReceiptList } from "@/components/ReceiptList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedCategoryInfo, setSelectedCategoryInfo]: any = useState(null);
  const [receipts, setReceipts] = useState(getReceiptList());

  const totalSpent = receipts.reduce((total: number, receipt: any) => {
    return (
      total +
      (receipt.items.reduce((sum: number, item: any) => sum + item.price, 0) ||
        0)
    );
  }, 0);

  const categorySpent: any = {};

  const itemsOfReceipt = selectedCategoryInfo
    ? receipts.flatMap((receipt: any) =>
        receipt.items.filter(
          (item: any) => item.category === selectedCategoryInfo.name
        )
      )
    : [];

  categories().forEach((category) => {
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

  categories().sort((a, b) => {
    return (categorySpent[b.name] || 0) - (categorySpent[a.name] || 0);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedCategoryInfo !== null}
          onRequestClose={() => {
            setSelectedCategoryInfo(null);
          }}
        >
          <ScrollView>
            <View style={styles.modal}>
              {selectedCategoryInfo && (
                <View style={styles.topInfoModal}>
                  <Pressable
                    style={{ width: 80 }}
                    onPress={() => setSelectedCategoryInfo(null)}
                  >
                    <Ionicons size={40} name="arrow-back" color="#323232" />
                  </Pressable>
                </View>
              )}

              {selectedCategoryInfo && (
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 50,
                    marginBottom: 50,
                  }}
                >
                  <Image
                    source={selectedCategoryInfo.icon}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {selectedCategoryInfo.name} Total: ${categorySpent[selectedCategoryInfo.name].toFixed(2)}
                  </Text>
                </View>
              )}

              <View style={{ width: "100%", flexDirection: "column" }}>
                {selectedCategoryInfo &&
                  itemsOfReceipt.map((item: any, itemIndex: number) => (
                    <View
                      key={itemIndex}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#eaf2f4ff",
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text>${item.price.toFixed(2)}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>
        </Modal>
        <View style={styles.hero}>
          <Text style={styles.text1}>You have spent</Text>
          <Text style={styles.text2}>
            ${Math.round(totalSpent * 100) / 100}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          {categories().map((category, index) => (
            <Pressable
              style={styles.container}
              onPress={() => setSelectedCategoryInfo(category)}
              key={index}
            >
              <CategorySpentCard
                categoryInfo={category}
                spent={categorySpent[category.name]}
                total={totalSpent}
                key={index}
              />
            </Pressable>
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
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingTop: 40,
    paddingHorizontal: 35,
  },
  topInfoModal: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1: {
    color: "#123D46",
  },
  text2: {
    color: "#123D46",
    fontSize: 70,
    fontWeight: "bold",
  },
  container: {
    width: "47%",
    height: 180,
    flexDirection: "column",
    backgroundColor: "#e4e9ebff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    gap: 2,
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
