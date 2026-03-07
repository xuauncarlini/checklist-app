import React, { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { getCheckLists } from "../storage/checklistStorage"

export default function HomeScreen({ navigation }) {

  const [checklists, setChecklists] = useState([])

  async function loadChecklists() {
    const data = await getCheckLists()
    setChecklists(data)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadChecklists)
    return unsubscribe
  }, [])

  function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Details")}
      >
        <Text style={styles.buttonText}>+ Nova Checklist</Text>
      </TouchableOpacity>

      {checklists.length === 0 ? (
        <Text style={styles.empty}>
          Você ainda não têm nenhum checklist
        </Text>
      ) : (
        <FlatList
          data={checklists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <View style={styles.card}>

              <Text style={styles.date}>
                {formatDate(item.date)}
              </Text>

              <Text style={styles.done}>
                ✅ Realizados: {item.done.join(", ") || "Nenhum"}
              </Text>

              <Text style={styles.problem}>
                ⚠️ Problemas: {item.problem.join(", ") || "Nenhum"}
              </Text>

            </View>

          )}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    padding:20,
    backgroundColor:"#f2f2f2"
  },

  button:{
    backgroundColor:"#4CAF50",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginBottom:20
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  },

  empty:{
    textAlign:"center",
    marginTop:40,
    color:"#777"
  },

  card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:12,
    elevation:2
  },

  date:{
    fontWeight:"bold",
    marginBottom:5
  },

  done:{
    color:"#2e7d32"
  },

  problem:{
    color:"#c62828"
  }

})
