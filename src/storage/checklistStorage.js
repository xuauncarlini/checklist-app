
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = "@checklists"

export async function getCheckLists() {
    const data = await AsyncStorage.getItem(KEY)

    if (!data) return []

    return JSON.parse(data)
}

export async function saveCheckList(checklist) {
    const checklists = await getCheckLists()

    const newCheckList = {
        id: Date.now().toString(),
        date: new Date().toString(),
        ...checklist
    }

    const updated = [newCheckList, ...checklists]

    await AsyncStorage.setItem(KEY, JSON.stringify(updated))
}