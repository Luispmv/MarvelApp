import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CharacterScreen(){
    return(
        <View style={{backgroundColor:"#242121", height:1000}}>
            <BtnBack></BtnBack>
            <CharacterCard url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></CharacterCard>
            <Stats></Stats>
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


function CharacterCard({url}){
    return(
        <Image style={characterCardStyles.characterCard} source={{uri: url}}></Image>
    )
}

const characterCardStyles = StyleSheet.create({
    characterCard:{
        width: 250,
        height: 250,
        alignSelf:"center",
        borderRadius:20,
        marginTop:90
    }
})

// Estadisticas de un personaje
function Stats(){
    return(
        <View style={statsStyles.container}>
            <PowerStat stat={"Inteligencia"} valor={100}></PowerStat>
            <PowerStat stat={"Inteligencia"} valor={100}></PowerStat>
            <PowerStat stat={"Inteligencia"} valor={100}></PowerStat>
            <PowerStat stat={"Inteligencia"} valor={100}></PowerStat>
            <PowerStat stat={"Inteligencia"} valor={100}></PowerStat>
            <PowerStat stat={"Inteligencia"} valor={100}></PowerStat>
        </View>
    )
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