import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { auth } from '../../firebase';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen(){
    return(
        <ScrollView style={{backgroundColor:"#242121", height:1000}} >
            <Saludo url={"https://i.pinimg.com/736x/9a/66/cf/9a66cf86fa63421cd8df09f5ac5006b9.jpg"}></Saludo>
            <ComicSection></ComicSection>
            <CharacterSection></CharacterSection>
            <BotonNavigate></BotonNavigate>
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

// Comic Section con consumo de API

const API_KEY = 'e88d1f0be16d839cffa552ea78250fd210536f27'; // Pon tu API Key aquí

const iconicComics = [
  'The Amazing Spider-Man',
  'Uncanny X-Men',
  'Fantastic Four',
  'Iron Man',
  'The Incredible Hulk',
];

function ComicSection() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    async function fetchComics() {
      const results = [];
      for (const name of iconicComics) {
        try {
          const res = await fetch(
            `https://comicvine.gamespot.com/api/issues/?api_key=${API_KEY}&format=json&filter=name:${encodeURIComponent(
              name
            )}&limit=1`,
            {
              headers: {
                'User-Agent': 'ReactNativeApp',
              },
            }
          );
          const json = await res.json();
          if (json.results && json.results.length > 0) {
            results.push(json.results[0]);
          }
        } catch (error) {
          console.error('Error fetching comic:', error);
        }
      }
      setComics(results);
    }
    fetchComics();
  }, []);

  return (
    <View style={comicSection.contenedor}>
      <Text style={comicSection.titulo}>Comics</Text>
      <ScrollView horizontal={true} style={comicSection.comicContainer}>
        {comics.length === 0 && <Text>Cargando comics...</Text>}
        {comics.map((comic) => (
          <ComicCard
            key={comic.id}
            url={comic.image?.medium_url || 'https://via.placeholder.com/150'}
            name={comic.name}
            issueNumber={comic.issue_number}
          />
        ))}
      </ScrollView>
    </View>
  );
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


// Character Section con consumo de API

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

// boton provisional que lleva a una nueva pantalla (este boton sera borrado despues)
function BotonNavigate(){
  const navegacion = useNavigation()
  return(
    <TouchableOpacity onPress={()=>{
      navegacion.navigate("ComicScreen")
    }}>
      <Text style={{color:"white"}}>Ir a ComicScreen</Text>
    </TouchableOpacity>
  )
}