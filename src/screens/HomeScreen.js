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
        </ScrollView>
    )
}

function Saludo({ url }) {
  const email = auth.currentUser?.email;
  const username = email ? email.split("@")[0] : "";

  const navegacion = useNavigation()

  return (
    <View style={saludo.contenedor}>
      <Text style={saludo.saludo}>Hola <Text style={{color:"#ED1D24", fontWeight:"bold"}}>{username} </Text> </Text>
      <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>{
          navegacion.navigate("ProfileScreen")
      }}>
        <Image source={{ uri: url }} style={saludo.imagen} />
      </TouchableOpacity>
    </View>
  );
}


const saludo = StyleSheet.create({
    contenedor:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:20,
        width:340,
        alignSelf:"center"
    },
    saludo:{
        fontSize:30,
        textAlign:"center",
        color:"white",
        marginTop:33,
        alignSelf:"center",
        justifyContent:"center",
        marginBottom:30,
        fontWeight:"bold"
    },
    imagen:{
        height:50, 
        width:50, 
        borderRadius:100,
        alignSelf:"center"
    }
})

// Comic Section con consumo de API

const API_KEY = 'e88d1f0be16d839cffa552ea78250fd210536f27';

const iconicComics = [
  'The Amazing Spider-Man',
  "Amazing Fantasy",
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
        {comics.length === 0 && <Text style={{color:"white"}}>Cargando comics...</Text>}
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
    const navegacion = useNavigation()
    return(
        <TouchableOpacity style={comicSection.comicCardContainer} onPress={()=>{
          navegacion.navigate("ComicScreen")
        }}>
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
        color:"#ED1D24",
        fontWeight:"bold"
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
        height:"100%",
    }
})


function CharacterSection() {
  const [characters, setCharacters] = useState([]);    

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const ids = [620, 332, 346, 687, 213];        
        const accessToken = 'e6fb6589cb6ff09720fe1677c06807e9';
        const responses = await Promise.all(
          ids.map(async id => {
            const res  = await fetch(`https://superheroapi.com/api/${accessToken}/${id}`);
            const data = await res.json();
            return {
              id:   data.id,
              name: data.name,
              imageUrl: data.image.url,
              stats: data.powerstats // añadido recien
            };
          })
        );
        setCharacters(responses);
      } catch (error) {
        console.error('Error al cargar los personajes:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={characterSection.contenedor}>
      <Text style={characterSection.titulo}>Personajes</Text>

      <ScrollView horizontal style={characterSection.characterContainer}>
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            id={character.id}
            url={character.imageUrl}
            name={character.name}
            stats={character.stats} 
          />
        ))}
      </ScrollView>
    </View>
  );
}


function CharacterCard({ id, url, name, stats }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={characterSection.characterCardContainer}
      onPress={() =>
        navigation.navigate('CharacterScreen', {
          id,
          characterUrl: url,
          characterName: name,
          powerstats: stats
        })
      }>
      <Image source={{ uri: url }} style={characterSection.characterCard} />
      {/* Muestra el nombre debajo de la imagen (opcional) */}
      <Text style={{ color: '#fff', textAlign: 'center', marginTop: 4 }}>{name}</Text>
    </TouchableOpacity>
  );
}





const characterSection = StyleSheet.create({
    contenedor:{
        padding:20,
        gap:10
    },
    titulo:{
        fontSize:25,
        color:"#ED1D24",
        fontWeight:"bold"
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
        height: "100%",
        borderRadius:20
    }
})