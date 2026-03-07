import React, { useState } from "react"
import { View, Alert, Button, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native"
import ItemChecklist from "../components/ItemChecklist"
import { saveCheckList } from "../storage/checklistStorage"
import { SafeAreaView } from "react-native-safe-area-context"

const ITEMS = [
  "Nível do óleo",
  'Pressão dos pneus',
  'Funcionamento das luzes',
  'Nível de água do radiador',
  'Estado dos freios'
]

export default function DetailsScreen({ navigation }) {

  const [itemsData, setItemsData] = useState({})

  function setItem(item, data) {
    setItemsData(prev => ({
      ...prev,
      [item]: data
    }))
  }

  async function handleSave() {

    const done = []
    const problem = []

    Object.entries(itemsData).forEach(([item, value]) => {

      if (value.status === "done") done.push(item)

      if (value.status === "problem") problem.push(
        `${item} (${value.observation || "sem obs"})`
      )

    })

    await saveCheckList({
      items: itemsData,
      done,
      problem
    })

    Alert.alert(
      "Salvo com sucesso!",
      `Realizados: ${done.join(", ") || "Nenhum"}
Problemas: ${problem.join(", ") || "Nenhum"}`
    )

    navigation.goBack()
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={styles.container}>

        {ITEMS.map(item => (
          <ItemChecklist
            key={item}
            label={item}
            onChange={(data) => setItem(item, data)}
          />
        ))}

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Checklist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  footer: {
    padding: 20
  },

  saveButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10
  },

  cancelButton: {
    backgroundColor: "#9E9E9E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
})
