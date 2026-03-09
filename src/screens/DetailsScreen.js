import React, { useState } from "react"
import { View, Alert, Button, StyleSheet, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import ItemChecklist from "../components/ItemChecklist"
import { saveCheckList } from "../storage/checklistStorage"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

const ITEMS = [
  'Nível do óleo',
  'Pressão dos pneus',
  'Funcionamento das luzes',
  'Nível de água do radiador',
  'Estado dos freios'
]


export default function DetailsScreen({ navigation }) {


  const insets = useSafeAreaInsets()

  const [itemsData, setItemsData] = useState({})

  function setItem(item, data) {
    setItemsData(prev => ({
      ...prev,
      [item]: data
    }))
  }

  async function handleSave() {
    if (Object.keys(itemsData).length < ITEMS.length) {
      Alert.alert(
        "Checklist incompleto",
        "Por favor, marque todos os itens antes de salvar."
      )
      return
    }

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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 120 }]}
          keyboardShouldPersistTaps="handled"
        >
          {ITEMS.map(item => (
            <ItemChecklist
              key={item}
              label={item}
              onChange={(data) => setItem(item, data)}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff"
  },

  wrapper: {
    flex: 1,
  },

  saveButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10
  },

  cancelButton: {
    backgroundColor: "#af0000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
})
