import {
  StyleSheet,
  ScrollView,
  View,
  Modal,
  Pressable,
  Text,
  Button,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import receipts from "@/assets/receipts.json";
import categories from "@/assets/categories.json";
import { useState } from "react";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Gallery() {
  const [selectedReceiptInfo, setSelectedReceiptInfo]: any = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "row" }}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={selectedReceiptInfo !== null}
            onRequestClose={() => {
              setSelectedReceiptInfo(null);
            }}
          >
            <ScrollView>
              <View style={styles.modal}>
                {selectedReceiptInfo && (
                  <View style={styles.topInfoModal}>
                    <Pressable
                      style={{ width: 80 }}
                      onPress={() => setSelectedReceiptInfo(null)}
                    >
                      <Ionicons size={40} name="arrow-back" color="#323232" />
                    </Pressable>
                    <Text style={{ fontSize: 16, fontWeight: "semibold" }}>
                      {new Date(Date.now()).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Pressable
                      onPress={() => console.log("Delete photo")}
                      style={{
                        backgroundColor: "#FF5C5C",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        width: 80,
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                )}

                {selectedReceiptInfo && (
                  <Image
                    source={{
                      width: 300,
                      height: 400,
                      uri: selectedReceiptInfo.src,
                    }}
                    style={{
                      width: "100%",
                      height: 400,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                )}

                {selectedReceiptInfo && (
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      marginBottom: 20,
                    }}
                  >
                    Total Spent: $
                    {selectedReceiptInfo.items
                      .reduce((total, item) => total + item.price, 0)
                      .toFixed(2)}
                  </Text>
                )}

                <View
                  style={{ width: "100%", flexDirection: "column", gap: 10 }}
                >
                  {selectedReceiptInfo &&
                    categories.map((category, index) => (
                      <View
                        style={{
                          width: "100%",
                          backgroundColor: "#ECECEC",
                          padding: 20,
                          borderRadius: 10,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{ fontWeight: "semibold", fontSize: 20 }}
                          >
                            {category.name}
                          </Text>
                          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            $
                            {selectedReceiptInfo.items
                              .filter((item) => item.category === category.name)
                              .reduce((total, item) => total + item.price, 0)
                              .toFixed(2)}
                          </Text>
                        </View>
                        {selectedReceiptInfo.items
                          .filter((item) => item.category === category.name)
                          .map((item, itemIndex) => (
                            <View
                              key={itemIndex}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text>{item.name}</Text>
                              <Text>${item.price.toFixed(2)}</Text>
                            </View>
                          ))}
                      </View>
                    ))}
                </View>
              </View>
            </ScrollView>
          </Modal>
          <View style={styles.cardsContainer}>
            {receipts.map((receipt, index) => (
              <Pressable
                style={styles.container}
                onPress={() => setSelectedReceiptInfo(receipt)}
                key={index}
              >
                <Image
                  source={{ width: 170, height: 170, uri: receipt.src }}
                  style={styles.image}
                />
                <Text style={styles.text1}>
                  {new Date(Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 90,
    rowGap: 30,
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
  container: {
    width: "47%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    paddingBottom: 12,
    gap: 10,
  },
  text1: {
    fontSize: 12,
    fontWeight: "semibold",
  },
  image: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
