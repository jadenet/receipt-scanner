import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function ReceiptImageCard({ receiptInfo }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={{ width: 170, height: 170, uri: receiptInfo.src }}
        style={styles.image}
      />
      <Text style={styles.text1}>
        {new Date(Date.now()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
