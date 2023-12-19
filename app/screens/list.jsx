import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { FIREBASE_DB } from "../../fireBaseConfiguration";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const List = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "todos"));
      const fetchedTodos = [];
      querySnapshot.forEach((doc) => {
        fetchedTodos.push({ id: doc.id, ...doc.data() });
      });
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (todo !== "") {
      const docRef = await addDoc(collection(FIREBASE_DB, "todos"), {
        title: todo,
        done: false,
      });
      setTodo("");
      fetchAndUpdateTodos();
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(FIREBASE_DB, "todos", id));
    fetchAndUpdateTodos();
  };

  const updateTodo = async (id, updatedTodo) => {
    await updateDoc(doc(FIREBASE_DB, "todos", id), updatedTodo);
    fetchAndUpdateTodos();
  };

  const fetchAndUpdateTodos = async () => {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "todos"));
    const fetchedTodos = [];
    querySnapshot.forEach((doc) => {
      fetchedTodos.push({ id: doc.id, ...doc.data() });
    });
    setTodos(fetchedTodos);
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
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} color={"red"} />
            <Button
              title="Mark Done"
              onPress={() => updateTodo(item.id, { done: !item.done })}
            />
          </View>
        )}
      />
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
    marginVertical: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 8,
  },
});
