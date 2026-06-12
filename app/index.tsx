import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "../src/service/api";

export default function Home() {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    api.get("/search.php?s=").then((response) => {
      setMeals(response.data.meals);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas</Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detalhes",
                params: { nome: item.strMeal },
              })
            }
          >
            <Text style={styles.cardText}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
  },
});