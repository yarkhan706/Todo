import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { FIREBASE_DB } from "../../fireBaseConfiguration";
import { addDoc, collection } from "firebase/firestore";
const List = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {}, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIREBASE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.forum}>
        <TextInput
          style={styles.input}
          placeholder="Add new Todo"
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <Button
          onPress={() => addTodo()}
          title="Add Todo"
          disabled={todo === ""}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  forum: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical:20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding:10,
    backgroundColor: "white",
  },
});
