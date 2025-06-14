import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { auth } from '../../firebase';
import { useEffect, useState } from "react";

export default function HomeScreen(){
    return(
        <ScrollView style={{backgroundColor:"#242121", height:1000}} >
            <Saludo url={"https://i.pinimg.com/736x/9a/66/cf/9a66cf86fa63421cd8df09f5ac5006b9.jpg"}></Saludo>
            <ComicSection></ComicSection>
            <CharacterSection></CharacterSection>
        </ScrollView>
    )
}

function Saludo({ url }) {
  const email = auth.currentUser?.email;
  const username = email ? email.split("@")[0] : "";

  return (
    <View style={saludo.contenedor}>
      <Text style={saludo.saludo}>Hola <Text style={{color:"#ED1D24"}}>{username} </Text> </Text>
      <Image source={{ uri: url }} style={saludo.imagen} />
    </View>
  );
}


const saludo = StyleSheet.create({
    contenedor:{
        display:"flex",
        flexDirection:"row",
        gap:130,
        justifyContent:"center",
        marginTop:20,
        paddingLeft:50,
        paddingRight:50
    },
    saludo:{
        fontSize:30,
        textAlign:"center",
        color:"white",
        marginTop:33,
        alignSelf:"center",
        justifyContent:"center",
        marginBottom:30
    },
    imagen:{
        height:50, 
        width:50, 
        borderRadius:100,
        alignSelf:"center"
    }
})


// Seccion de comics
function ComicSection(){
    return(
        <View style={comicSection.contenedor}> 
            <Text style={comicSection.titulo}>Comics</Text>
            <ScrollView horizontal={true} style={comicSection.comicContainer}>
                {/* En este View se cargaran las imagenes de los comics de la api */}
                <ComicCard url={"https://i.pinimg.com/736x/77/c3/f2/77c3f264d749fabc98b84cc206b50740.jpg"}></ComicCard>
                <ComicCard url={"https://i.pinimg.com/736x/77/c3/f2/77c3f264d749fabc98b84cc206b50740.jpg"}></ComicCard>
                <ComicCard url={"https://i.pinimg.com/736x/77/c3/f2/77c3f264d749fabc98b84cc206b50740.jpg"}></ComicCard>
                <ComicCard url={"https://i.pinimg.com/736x/77/c3/f2/77c3f264d749fabc98b84cc206b50740.jpg"}></ComicCard>
                <ComicCard url={"https://i.pinimg.com/736x/77/c3/f2/77c3f264d749fabc98b84cc206b50740.jpg"}></ComicCard>
            </ScrollView>
        </View>
    )
}

function ComicCard({url}){
    return(
        <TouchableOpacity style={comicSection.comicCardContainer}>
            <Image style={comicSection.comicCard} source={{uri: url}}></Image>
        </TouchableOpacity>
    )
}

const comicSection = StyleSheet.create({
    contenedor:{
        paddingLeft:20,
        gap:10
    },
    titulo:{
        fontSize:25,
        color:"#ED1D24"
    },
    comicContainer:{
    },
    comicCardContainer:{
        width: 150,
        height: 230,
        marginRight:12
    },
    comicCard:{
        width: "100%",
        height:"100%"
    }
})


// Seccion de personajes
// function CharacterSection(){
//     return(
//         <View style={characterSection.contenedor}> 
//             <Text style={characterSection.titulo}>Personajes</Text>
//             <ScrollView horizontal={true} style={characterSection.characterContainer}>
//                 {/* En este View se cargaran las imagenes de los personajes de la api */}
//                 <CharacterCard url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></CharacterCard>
//                 <CharacterCard url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></CharacterCard>
//                 <CharacterCard url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></CharacterCard>
//                 <CharacterCard url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></CharacterCard>
//                 <CharacterCard url={"https://i.pinimg.com/736x/d4/2f/96/d42f96b80d186a494827447008fca5a4.jpg"}></CharacterCard>
//             </ScrollView>
//         </View>
//     )
// }


function CharacterSection() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const ids = [620, 332, 346, 687, 213]; // IDs de personajes a mostrar
        const accessToken = 'e6fb6589cb6ff09720fe1677c06807e9'; // <-- Cambia esto por tu token real
        const responses = await Promise.all(
          ids.map(id =>
            fetch(`https://superheroapi.com/api/${accessToken}/${id}/image`)
              .then(res => res.json())
              .then(data => data.url)
          )
        );
        setCharacters(responses);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={characterSection.contenedor}>
      <Text style={characterSection.titulo}>Personajes</Text>
      <ScrollView horizontal={true} style={characterSection.characterContainer}>
        {characters.map((url, index) => (
          <CharacterCard key={index} url={url} />
        ))}
      </ScrollView>
    </View>
  );
}

function CharacterCard({url}){
    return(
        <TouchableOpacity style={characterSection.characterCardContainer}>
            <Image style={characterSection.characterCard} source={{uri: url}}></Image>
        </TouchableOpacity>
    )
}

const characterSection = StyleSheet.create({
    contenedor:{
        padding:20,
        gap:10
    },
    titulo:{
        fontSize:25,
        color:"#ED1D24"
    },
    characterContainer:{
    },
    characterCardContainer:{
        width: 250,
        height: 250,
        marginRight:20
    },
    characterCard:{
        width: "100%",
        height: "100%"
    }
})