import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CharacterScreen(){
    const route = useRoute()
    const {characterUrl, characterName, powerstats} = route.params;
    return(
        <View style={{backgroundColor:"#242121", height:1000}}>
            <BtnBack></BtnBack>
            <CharacterCard url={characterUrl} nombreSuperheroe={characterName} />
            <Stats stats={powerstats}></Stats>
        </View>
    )
}

// Boton de regreso a HomeScreen
function BtnBack(){
    const navegacion = useNavigation()
    return(
        <TouchableOpacity style={btnbackStyles.contenedor} onPress={()=>{
            navegacion.navigate("HomeScreen")
        }}>
            <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
    )
}
const btnbackStyles =  StyleSheet.create({
    contenedor:{
        width:50,
        height:50,
        backgroundColor:"#ED1D24",
        justifyContent:"center",
        borderRadius:100,
        position:"absolute",
        zIndex:1,
        left:12,
        top:20,
        padding:12
    }
})


function CharacterCard({url, nombreSuperheroe}){
    return(
        <View>
            <Image style={characterCardStyles.characterCard} source={{uri: url}}></Image>
            <Text style={characterCardStyles.texto}>{nombreSuperheroe}</Text>
        </View>
    )
}

const characterCardStyles = StyleSheet.create({
    characterCard:{
        width: 250,
        height: 250,
        alignSelf:"center",
        borderRadius:20,
        marginTop:90
    },
    texto:{
        fontSize:40,
        fontWeight:"bold",
        textAlign:"center",
        color:"white"
    }
})

// Estadisticas de un personaje
function Stats({stats}){
    const labels = {
    intelligence: 'Inteligencia',
    strength:     'Fuerza',
    speed:        'Velocidad',
    durability:   'Durabilidad',
    power:        'Poder',
    combat:       'Combate',
  };

  return (
    <View style={statsStyles.container}>
      {Object.entries(labels).map(([key, label]) => (
        <PowerStat
          key={key}
          stat={label}
          valor={stats?.[key] ?? '—'}   // muestra guion si viene null / "unknown"
        />
      ))}
    </View>
  );
}

const statsStyles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"row",
        flexWrap:"wrap",
        marginTop:40,
        gap:10,
        alignSelf:"center",
        width:340
    }
})

function PowerStat({stat, valor}){
    return(
        <View style={powerStatStyle.contenedor}> 
            <Text style={powerStatStyle.stat}>{stat}</Text>
            <Text style={powerStatStyle.value}>{valor}</Text>
        </View>
    )
}

const powerStatStyle = StyleSheet.create({
    contenedor:{
        width: 160,
        height: 110,
        borderStyle:"solid",
        borderWidth: 1,
        borderColor:"#ED1D24",
        gap:5,
        justifyContent:"center",
        padding:15,
        borderRadius:20
    },
    stat:{
        color:"#ED1D24",
        fontSize:20
    },
    value:{
        color:"#ED1D24",
        fontWeight:"bold",
        fontSize:40
    }
})