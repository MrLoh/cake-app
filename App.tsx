import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { formatQuantity } from 'format-quantity';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const roundToNearest = (value: number, nearest: number) => Math.round(value / nearest) * nearest;

export default function App() {
  const [cups, setCups] = useState(1);
  const grams = cups * 125;
  const setGrams = (g: number) => setCups(g / 125);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Flour</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.content}>
        <View style={styles.column}>
          <Text style={styles.label}>Cups</Text>
          <Text style={styles.value}>({cups})</Text>
          <Picker
            selectedValue={roundToNearest(cups, 1 / 8)}
            onValueChange={setCups}
            style={styles.picker}
            itemStyle={{}}
          >
            {Array.from({ length: 20 }, (_, i) => i / 8).map((c) => (
              <Picker.Item key={c} label={formatQuantity(c, true)!} value={c} />
            ))}
          </Picker>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Grams</Text>
          <Text style={styles.value}>({grams})</Text>
          <Picker
            style={styles.picker}
            selectedValue={roundToNearest(grams, 5)}
            onValueChange={setGrams}
          >
            {Array.from({ length: 100 }, (_, i) => i * 5).map((g) => (
              <Picker.Item key={g} label={g.toString()} value={g} />
            ))}
          </Picker>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C13D3D',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#C13D3D',
    width: '100%',
    textAlign: 'center',
  },
  value: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
});
