import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CategorySpentCard({ categoryInfo, spent, total }: any) {
  return (
    <View style={styles.container}>
      <Ionicons size={65} name={categoryInfo.icon} color="#323232" />
      <Text style={styles.text1}>{categoryInfo.name}</Text>
      <Text style={styles.text2}>${spent || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "47%",
    height: 180,
    flexDirection: "column",
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    gap: 2,
  },
  text1: {
    fontSize: 12,
  },
  text2: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});
