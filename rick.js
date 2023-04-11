import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
} from "react-native";

export default function App() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [characterList, setCharacters] = useState([]);

  const handleGetCharacters = async () => {
    setIsLoading(true);
    await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (characterList.length > 0) {
          setCharacters((oldData) => [...oldData, ...data.results]);
        } else {
          setCharacters(data.results);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetCharacters();
  }, [page]);

  const renderCharacter = ({ item }) => {
    const { name, image } = item;
    return (
      <View style={styles.chracter}>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FlatList
          data={characterList}
          keyExtractor={(item) => item.name}
          renderItem={renderCharacter}
        />
      </View>
      {isLoading && (
        <View style={styles.row}>
          <Text style={styles.name}>Carregando...</Text>
        </View>
      )}
      <Button
        disabled={isLoading}
        title="Carregar mais"
        onPress={() => setPage(page + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#18181b",
  },
  chracter: {
    flexDirection: "row",
    alignItems: "start",
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#27272a",
    borderRadius: 5,
    padding: 10,
    gap: 15,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 0,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    color: "white",
  },
});
