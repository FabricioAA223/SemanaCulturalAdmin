// MainView.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

// const addActivitiesToFirebase = async (activities: { id: string; puntos: number[]; }[]) => {
//   try {
//     const gamesCollectionRef = collection(db, 'Games');

//     for (const activity of activities) {
//       const activityDocRef = doc(gamesCollectionRef, activity.id);
      
//       // Crear el array de calificación basado en los puntos proporcionados
//       const calificacion = activity.puntos.map(puntos => ({
//         equipo: [],
//         puntos: puntos
//       }));

//       // Estructura del documento
//       const activityData = {
//         jugado: false,
//         calificacion: calificacion
//       };

//       // Agregar el documento a Firestore
//       await setDoc(activityDocRef, activityData);
//       console.log(`Actividad ${activity.id} añadida con éxito.`);
//     }
//   } catch (error) {
//     console.error("Error al añadir actividades: ", error);
//   }
// };

// // // Ejemplo de uso
// const activities2 = [
//   { id: 'Cuchara y limon', puntos: [200, 175, 150, 125, 100] },
//   { id: 'Salto largo Hombres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Salto largo Mujeres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Basquetbol Hombres', puntos: [250, 200, 150, 100] },
//   { id: 'Basquetbol Mujeres', puntos: [250, 200, 150, 100] },
//   { id: 'Dibujo', puntos: [180, 160, 140, 120, 100, 80, 60, 40] },
//   { id: 'Quemado Hombres', puntos: [250, 200, 150, 100] },
//   { id: 'Quemado Mujeres', puntos: [250, 200, 150, 100] },
//   { id: 'Reinado', puntos: [300] },
//   { id: 'Canto', puntos: [200, 180, 160, 140, 120, 100, 80, 60] },
//   { id: 'Baile', puntos: [250, 200, 175, 150, 125, 100, 75, 50] },
//   { id: 'Prueba multiple', puntos: [200, 175, 150, 125, 100] },
//   { id: 'Futbol sala Hombres', puntos: [250, 200, 150, 100] },
//   { id: 'Futbol sala Mujeres', puntos: [250, 200, 150, 100] },
//   { id: 'Zancos', puntos: [200, 180, 160, 140, 120, 100, 80, 60] },
//   { id: 'Carrera de sacos', puntos: [200, 175, 150, 125, 100] },
//   { id: 'Concurso de tortillas mujeres', puntos: [200, 180, 160, 140, 120, 100, 80, 60] },
//   { id: 'Concurso de tortillas hombres', puntos: [200, 180, 160, 140, 120, 100, 80, 60] },
//   { id: 'Carretones', puntos: [250, 200, 150, 100, 50] },
//   { id: 'El leñador', puntos: [180, 160, 140, 120, 100, 80, 60, 40] },
//   { id: 'Baile en pareja', puntos: [180, 160, 140, 120, 100, 80, 60, 40] }
// ];

// const activities2 = [
//   { id: 'Predeportivos', puntos: [300, 250, 200, 150, 125, 100, 75, 50] },
//   { id: 'Desfile', puntos: [200, 180, 160, 140, 120, 100, 80, 60] },
//   { id: '60 metros mujeres 11-25', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: '60 metros mujeres 26-39', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: '60 metros mujeres 40+', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: '60 metros hombres 11-25', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: '60 metros hombres 26-49', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: '60 metros hombres 50+', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Relevos mujeres', puntos: [200, 175, 150, 125, 100] },
//   { id: 'Relevos hombres', puntos: [200, 175, 150, 125, 100] },
//   { id: 'Equilibrio en bicicleta mujeres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Equilibrio en bicicleta hombres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Futbol', puntos: [250, 200, 150, 100] },
//   { id: 'Bola negra', puntos: [200, 150, 125, 100] },
//   { id: 'Jalon de mecate mujeres', puntos: [250, 200, 150, 100] },
//   { id: 'Jalon de mecate hombres', puntos: [250, 200, 150, 100] },
//   { id: 'Apañar el huevo', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Lanzamiento de bala mujeres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Lanzamiento de bala hombres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Lanzamiento de javalina mujeres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Lanzamiento de javalina hombres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Penales mujeres', puntos: [200, 175, 125, 100] },
//   { id: 'Penales hombres', puntos: [200, 175, 125, 100] },
//   { id: 'Tablero', puntos: [200, 175, 125, 100] },
//   { id: 'Tresillo', puntos: [180, 150, 125, 100] },
//   { id: 'Prueba atletismo', puntos: [180, 160, 140, 120, 100, 80, 60, 40] },
//   { id: 'Salto alto mujeres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Salto alto hombres', puntos: [100, 90, 80, 70, 60, 50, 40, 30] },
//   { id: 'Carrera bicicleta', puntos: [200, 175, 150, 125, 100] },
//   { id: 'Voleibol mujeres', puntos: [250, 200, 150, 100] },
//   { id: 'Voleibol hombres', puntos: [250, 200, 150, 100] }
// ];



interface Calificacion {
  puntos: number;
  equipo: string[]
}

function translateColor(color:string){
  switch (color) {
    case 'Red':
      return 'Rojo';
    case 'Green':
      return 'Verde'
    case 'Yellow':
      return 'Amarillo'
    case 'Black':
      return 'Negro'
    case 'White':
      return 'Blanco'
    case 'Purple':
      return 'Morado'
    case 'Lightblue':
      return 'Celeste'
    case 'Orange':
      return 'Naranja'
    default:
      return ''
  }
}

const HomeScreen = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [positions, setPositions] = useState<Calificacion[]>([]);
  const [jugado, setJugado] = useState(false);
  const [teams, setTeams] = useState(['Red', 'Green', 'Yellow', 'Purple', 'Orange', 'Lightblue', 'White', 'Black']); // Equipos disponibles

  useEffect(() => {
    const fetchActivities = async () => {
      const querySnapshot = await getDocs(collection(db, "Games"));
      const activitiesList = querySnapshot.docs.map(doc => doc.id);
      setActivities(activitiesList);
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (selectedActivity) {
      const fetchPositions = async () => {
        const docRef = doc(db, "Games", selectedActivity);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPositions(data.calificacion);
          setJugado(data.jugado);
        }
      };

      fetchPositions();
    }
  }, [selectedActivity]);

  const handleTeamChange = (team: null | string, index: number) => {
    if (typeof team == 'string'){
      const newPositions = [...positions];

      if(newPositions[index].equipo.length == 0){
        newPositions[index].equipo.push(team);
        setPositions(newPositions);
      }
      else{
        const teamIndex = newPositions[index].equipo.indexOf(team);

        if (teamIndex === -1) {
          newPositions[index].equipo.push(team); // Agregar equipo
        } else {
          newPositions[index].equipo.splice(teamIndex, 1); // Quitar equipo
        }
  
        setPositions(newPositions);
      }
    }
  };

  const saveData = async () => {
    if (selectedActivity) {
      const docRef = doc(db, "Games", selectedActivity);
      await updateDoc(docRef, {
        calificacion: positions,
        jugado: jugado
      });

      // addActivitiesToFirebase(activities2)
      await updateTeamScores();
    }
  };

  const updateTeamScores = async () => {
    const teamsRef = collection(db, "Teams");
    const batch = writeBatch(db);

    const teamScores:{ [key: string]: number } = {};
    teams.forEach(team => {
      teamScores[team] = 0;
    });

    const querySnapshot = await getDocs(collection(db, "Games"));
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.jugado) {
        data.calificacion.forEach((pos:Calificacion) => {
          pos.equipo?.forEach(team => {
            if (teamScores[team] !== undefined) {
              if (team === 'White'){
                console.log(teamScores[team], " + ", pos.puntos)
              }
              teamScores[team] += pos.puntos;
            }
          });
        });
      }
    });

    Object.keys(teamScores).forEach(team => {
      const teamDocRef = doc(teamsRef, team);
      batch.update(teamDocRef, { score: teamScores[team] });
    });

    await batch.commit();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
    <SafeAreaView>
      <Picker
        style ={{backgroundColor:'#aaa', color:'white', width:200, marginHorizontal:'auto'}}
        selectedValue={selectedActivity}
        onValueChange={(itemValue) => setSelectedActivity(itemValue)}
      >
        {activities.map((activity, index) => (
          <Picker.Item key={index} label={activity} value={activity} />
        ))}
      </Picker>
      {selectedActivity && (
        <View>
          <View style={styles.radioContainer}>
            <Text style={{marginRight:15}}>¿Juego calificado?</Text>
            <RadioButton.Group
              onValueChange={newValue => setJugado(newValue === 'true')}
              value={jugado.toString()}
            >
              <View style={styles.radioButton}>
                <Text>Si</Text>
                <RadioButton value="true" />
              </View>
              <View style={styles.radioButton}>
                <Text>No</Text>
                <RadioButton value="false" />
              </View>
            </RadioButton.Group>
          </View>
          <View>
            {positions.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={{width:'10%', textAlign:'center'}}>{index + 1}°</Text>
                <View style={{width:'20%', flexDirection:'column'}}>
                  <Text style={{textAlign:'center'}}>Puntos:</Text>
                  <Text style={{textAlign:'center'}}>{item.puntos}</Text>
                </View>
                <View style={{width:'23%'}}>
                  <Text style={{textAlign:'center'}}>Equipos:</Text>
                  {item.equipo?.map((team, teamIndex) => (
                    <Text style={{textAlign:'center'}} key={teamIndex}>{translateColor(team)}</Text>
                  ))}
                </View>
                <Picker
                  style={{flex:1, marginRight:15, backgroundColor:'white'}}
                  selectedValue={null} // Valor inicial vacío para permitir la selección
                  onValueChange={(team) => handleTeamChange(team, index)}
                >
                  <Picker.Item label="Equipo" value={null} />
                  {teams.map((team, teamIndex) => (
                    <Picker.Item key={teamIndex} label={translateColor(team)} value={team} />
                  ))}
                </Picker>
              </View>
            ))}
          </View>
          <View style={{paddingVertical:20}}>
            <Button title="Guardar" onPress={saveData} />
          </View>
        </View>
      )}
    </SafeAreaView>
    </ScrollView>
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 15,
    paddingBottom:138,
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'#aaa'
  }
});

export default HomeScreen;