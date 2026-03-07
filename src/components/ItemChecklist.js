import React, { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"

export default function ItemChecklist({ label, onChange }) {

  const [status, setStatus] = useState(null)
  const [observation, setObservation] = useState("")

  function handleStatus(type){
    setStatus(type)

    onChange({
      status: type,
      observation
    })
  }

  return (
    <View style={styles.card}>

      <Text style={styles.label}>{label}</Text>

      <View style={styles.buttons}>

        <TouchableOpacity
          style={[
            styles.button,
            status === "done" && styles.done
          ]}
          onPress={()=>handleStatus("done")}
        >
          <Text style={styles.text}>OK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            status === "problem" && styles.problem
          ]}
          onPress={()=>handleStatus("problem")}
        >
          <Text style={styles.text}>Problema</Text>
        </TouchableOpacity>

      </View>

      {status === "problem" && (
        <TextInput
          style={styles.input}
          placeholder="Descreva o problema..."
          value={observation}
          onChangeText={(text)=>{
            setObservation(text)

            onChange({
              status: "problem",
              observation: text
            })
          }}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    elevation:3
  },

  label:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:10
  },

  buttons:{
    flexDirection:"row",
    gap:10
  },

  button:{
    flex:1,
    padding:10,
    borderRadius:8,
    backgroundColor:"#ddd",
    alignItems:"center"
  },

  done:{
    backgroundColor:"#4CAF50"
  },

  problem:{
    backgroundColor:"#F44336"
  },

  text:{
    color:"#fff",
    fontWeight:"bold"
  },

  input:{
    marginTop:10,
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    padding:8
  }

})