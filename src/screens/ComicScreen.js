import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ComicScreen(){
    const route = useRoute();
    const { imageUrl, comicTitle, description, staff } = route.params;
    return(
        // <ScrollView style={comicScreenStyles.mainContainer}>
        //     <BtnBack></BtnBack>
        //     <Header url="https://i.pinimg.com/736x/a6/2e/76/a62e76f9048a44a18b0a5a8eb39ef1e0.jpg" titulo="Amazing Fantasy"></Header>
        //     {/* <Reacciones></Reacciones> */}
        //     <Descripcion descripcion={"Amazing Fantasy #1 presenta una colección de historias cortas de ciencia ficción y fantasía, con giros sorprendentes y moralejas al estilo clásico. En este número, conocerás a inventores ambiciosos, robots conscientes, cámaras que predicen el futuro y animales con pensamientos humanos. Cada relato plantea preguntas sobre la moralidad, el destino y las consecuencias de desafiar lo desconocido, envolviendo al lector en mundos extraños donde nada es lo que parece."}></Descripcion>
        //     <Staff></Staff>
        // </ScrollView>
        <ScrollView style={comicScreenStyles.mainContainer}>
            <BtnBack />
            <Header url={imageUrl} titulo={comicTitle} />
            <Descripcion descripcion={description} />
            <Staff autores={staff.authors} personajes={staff.characters} />
        </ScrollView>
    )
}

const comicScreenStyles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#242121",
        paddingTop:30,
    }
})

// Encabezado con la imagen del comic y el titulo
function Header({url, titulo}){
    return(
        <View style={headerStyles.contenedor}>
            <Image style={headerStyles.imagen} source={{uri: url}}></Image>
            <Text style={headerStyles.texto}>{titulo}</Text>
        </View>
    )
}

const headerStyles = StyleSheet.create({
    contenedor:{
        marginBottom:15
    },
    imagen: {
        width: 130,
        height: 210,
        alignSelf:"center"
    },
    texto:{
        fontSize:40,
        fontWeight:"bold",
        color:"#ED1D24",
        textAlign:"center",
        width:340,
        alignSelf:"center"
    }
})
function Descripcion({descripcion}){
    return(
        <ScrollView style={descripcionStyles.contenedor}>
            <Text style={descripcionStyles.texto}>{descripcion}</Text>
        </ScrollView>
    )
}

const descripcionStyles = StyleSheet.create({
    contenedor:{
        height:250,
        marginBottom:15
    },
    texto:{
        color:"white",
        fontSize:20,
        width:340,
        alignSelf:"center",
        textAlign:"justify"
    }
})

// Contenedor con los autores y personajes que aparecen en el comic
// function Staff(){
//     return(
//         <View style={staffStyles.contenedor}>
//             <View style={staffStyles.contenedorItems}>
//                 <Autores url={"https://i.pinimg.com/736x/d9/b4/0f/d9b40f83f360271d6342e2f39b9795ef.jpg"} nombreAutor={"Stan Lee"}></Autores>
//                 <Autores url={"https://i.pinimg.com/736x/d9/b4/0f/d9b40f83f360271d6342e2f39b9795ef.jpg"} nombreAutor={"Stan Lee"}></Autores>
//             </View>
//             <View style={staffStyles.contenedorItems}> 
//                 <Personajes url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></Personajes>
//                 <Personajes url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></Personajes>
//             </View>
//         </View>
//     )
// }
function Staff({ autores = [], personajes = [] }) {
    const defaultImage = "https://via.placeholder.com/50";
    return (
        <View style={staffStyles.contenedor}>
        <View style={staffStyles.contenedorItems}>
            {autores.map((autor, index) => (
            <Autores key={index} url={autor.image?.icon_url || defaultImage} nombreAutor={autor.name} />
            ))}
        </View>
        <View style={staffStyles.contenedorItems}>
            {personajes.map((personaje, index) => (
            <Personajes key={index} url={personaje.image?.icon_url || defaultImage} />
            ))}
        </View>
        </View>
    );
}

const staffStyles = StyleSheet.create({
    contenedor:{
        width:340,
        alignSelf:"center",
        gap:10
    } , 
    contenedorItems:{
        display:"flex",
        flexDirection:"row",
        gap:10
    }
})

function Autores({url, nombreAutor}){
    return(
        <View style={autoresStyle.contenedor}>
            <Image style={autoresStyle.imagen} source={{uri: url}}></Image>
            <Text style={autoresStyle.texto}>{nombreAutor}</Text>
        </View>
    )
}

const autoresStyle = StyleSheet.create({
    contenedor:{
        display:"flex",
        flexDirection:"row",
        padding: 10,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"#929090",
        width:120,
        justifyContent:"space-around",
        borderRadius:100
    },
    imagen:{
        width:30,
        height:30,
        borderRadius:100
    },
    texto:{
        fontSize:15,
        color:"#929090",
        marginTop:5
    }
})

function Personajes({url}){
    return(
        <Image style={personajesStyles.imagen} source={{uri: url}}></Image>
    )
}
const personajesStyles = StyleSheet.create({
    imagen:{
        width:50,
        height:50,
        borderRadius:100
    }
})

// boton de regreso
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
        padding:12,
        marginLeft:20,
    }
})