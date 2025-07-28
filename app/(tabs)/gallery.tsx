import categories from "@/assets/categories";
import {
  getReceiptList,
  removeFromReceiptList,
} from "@/components/ReceiptList";
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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// TODO: auto upate the list when a new receipt is added

export default function Gallery() {
  const [selectedReceiptInfo, setSelectedReceiptInfo]: any = useState(null);
  const [receipts, setReceipts] = useState(getReceiptList());

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
                      {new Date(selectedReceiptInfo.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Text>
                    <Pressable
                      onPress={() => {
                        removeFromReceiptList(
                          receipts.indexOf(selectedReceiptInfo)
                        );
                        setSelectedReceiptInfo(null);
                      }}
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
                      uri: selectedReceiptInfo.uri,
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
                      .reduce(
                        (total: number, item: any) => total + item.price,
                        0
                      )
                      .toFixed(2)}
                  </Text>
                )}
                <View
                  style={{ width: "100%", flexDirection: "column", gap: 10 }}
                >
                  {selectedReceiptInfo &&
                    categories().map((category, index) => (
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
                              .filter(
                                (item: any) => item.category === category.name
                              )
                              .reduce(
                                (total: number, item: any) =>
                                  total + item.price,
                                0
                              )
                              .toFixed(2)}
                          </Text>
                        </View>
                        {selectedReceiptInfo.items
                          .filter(
                            (item: any) => item.category === category.name
                          )
                          .map((item: any, itemIndex: number) => (
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
            {receipts.length > 0 ?receipts.map((receipt, index) => (
              <Pressable
                style={styles.container}
                onPress={() => setSelectedReceiptInfo(receipt)}
                key={index}
              >
                <Image
                  source={{ width: 170, height: 170, uri: receipt.uri }}
                  style={styles.image}
                />
                <Text style={styles.text1}>
                  {new Date(receipt.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} 
                </Text>
              </Pressable>
            )) : <Text style={styles.text2}>There are no receipts scanned... yet</Text>}
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
  text2: {
    fontSize: 16,
    color: "#123D46",
    textAlign: "center",
    width: "100%",
    marginTop: 60,
  }
});
