import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function CategorySpentCard({ categoryInfo, spent, total }: any) {
  return (
    <>
      <Image source={categoryInfo.icon} style={{ width: 65, height: 65, marginBottom: 6 }} />
      <Text style={styles.text1}>{categoryInfo.name}</Text>
      <Text style={styles.text2}>${spent && Math.round(spent * 100) / 100 || 0}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 12,
  },
  text2: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});
