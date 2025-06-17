import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const marvelAuthors = [
    {
        name: "Stan Lee",
        image: "https://i.pinimg.com/736x/d9/b4/0f/d9b40f83f360271d6342e2f39b9795ef.jpg"
    },
    {
        name: "Jack Kirby",
        image: "https://i.pinimg.com/736x/c7/8d/bc/c78dbca4cde2bb60643beef2f31a5164.jpg"
    }
];


const marvelCharacters = [
    {
        name: "Spider-Man",
        image: "https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"
    },
    {
        name: "Iron Man",
        image: "https://i.pinimg.com/736x/d7/b7/ac/d7b7ac5970e78b7a12f8ad51ece24e89.jpg"
    }
];

export default function ComicScreen(){
    const route = useRoute();
    const { imageUrl, comicTitle, description, staff } = route.params;
    return(
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


function Staff({ autores = [], personajes = [] }) {
    const navigation = useNavigation();

    return (
        <View style={staffStyles.contenedor}>
            {/* <Text style={staffStyles.titulo}>Autores</Text> */}
            <ScrollView horizontal style={staffStyles.scrollContainer}>
                <View style={staffStyles.contenedorItems}>
                    {marvelAuthors.map((autor, index) => (
                        <Autores 
                            key={index} 
                            url={autor.image} 
                            nombreAutor={autor.name} 
                        />
                    ))}
                </View>
            </ScrollView>

            {/* <Text style={staffStyles.titulo}>Personajes</Text> */}
            <ScrollView horizontal style={staffStyles.scrollContainer}>
                <View style={staffStyles.contenedorItems}>
                    {marvelCharacters.map((personaje, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => {
                                navigation.navigate('CharacterScreen', {
                                    characterUrl: personaje.image,
                                    characterName: personaje.name,
                                    powerstats: {
                                        intelligence: 85,
                                        strength: 90,
                                        speed: 80,
                                        durability: 85,
                                        power: 85,
                                        combat: 90
                                    }
                                });
                            }}
                        >
                            <Personajes 
                                url={personaje.image}
                                nombre={personaje.name}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const staffStyles = StyleSheet.create({
    contenedor:{
        width:340,
        alignSelf:"center",
        gap:15,
        marginBottom: 30
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ED1D24",
        marginBottom: 10
    },
    scrollContainer: {
        flexGrow: 0
    },
    contenedorItems:{
        display:"flex",
        flexDirection:"row",
        gap:15,
        paddingHorizontal: 5
    }
})

function Autores({url, nombreAutor}){
    return(
        <View style={autoresStyle.contenedor}>
            <Image style={autoresStyle.imagen} source={{uri: url}}></Image>
            <Text style={autoresStyle.texto} numberOfLines={1}>{nombreAutor}</Text>
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
        width:150,
        justifyContent:"space-around",
        alignItems: "center",
        borderRadius:100,
        backgroundColor: "rgba(255,255,255,0.1)"
    },
    imagen:{
        width:35,
        height:35,
        borderRadius:100
    },
    texto:{
        fontSize:14,
        color:"white",
        flex: 1,
        marginLeft: 8
    }
})

function Personajes({url, nombre}){
    return(
        <View style={personajesStyles.contenedor}>
            <Image style={personajesStyles.imagen} source={{uri: url}}></Image>
            <Text style={personajesStyles.nombre} numberOfLines={1}>{nombre}</Text>
        </View>
    )
}

const personajesStyles = StyleSheet.create({
    contenedor: {
        alignItems: "center",
        width: 80
    },
    imagen:{
        width:60,
        height:60,
        borderRadius:100,
        borderWidth: 2,
        borderColor: "#ED1D24"
    },
    nombre: {
        color: "white",
        fontSize: 12,
        marginTop: 5,
        textAlign: "center"
    }
})

// boton de regreso
function BtnBack(){
    const navegacion = useNavigation()
    return(
        <TouchableOpacity style={btnbackStyles.contenedor} onPress={()=>{
            // navegacion.navigate("HomeScreen")
            navegacion.replace("TabNavigator")
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