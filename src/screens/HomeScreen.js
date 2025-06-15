import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { auth, db } from '../../firebase';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

import { decode } from 'html-entities';   

function cleanHtml(html = '') {
  // quita etiquetas y decodifica entidades (&amp; → &)
  return decode(html.replace(/<\/?[^>]+(>|$)/g, '').trim());
}

export default function HomeScreen(){
  const [fotoUrl, setFotoUrl] = useState("");

  useEffect(() => {
    const fetchFoto = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.foto) {
            setFotoUrl(data.foto);
          }
        }
      } catch (error) {
        console.error("Error obteniendo foto:", error);
      }
    };

    fetchFoto();
  }, []);

    return(
        <ScrollView style={{backgroundColor:"#242121", height:1000}} >
            <Saludo url={fotoUrl}></Saludo>
            <ComicSection></ComicSection>
            <CharacterSection></CharacterSection>
        </ScrollView>
    )
}


function Saludo({ url }) {
  const email = auth.currentUser?.email;
  const username = email ? email.split("@")[0] : "";

  const navegacion = useNavigation();

  const uriFinal = url || "https://i.pinimg.com/736x/0d/79/8f/0d798fe2210f0fba0764e577cb45fed0.jpg";

  return (
    <View style={saludo.contenedor}>
      <Text style={saludo.saludo}>
        Hola <Text style={{ color: "#ED1D24", fontWeight: "bold" }}>{username}</Text>
      </Text>
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
        navegacion.navigate("ProfileScreen");
      }}>
        <Image source={{ uri: uriFinal }} style={saludo.imagen} />
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
            `https://comicvine.gamespot.com/api/issues/?api_key=${API_KEY}` +
              `&format=json` +
              `&filter=name:${encodeURIComponent(name)}` +
              `&limit=1` +
              `&field_list=id,name,issue_number,image,deck,description,person_credits,character_credits`,
            { headers: { 'User-Agent': 'ReactNativeApp' } }
          );

          const { results: apiResults } = await res.json();
          if (!apiResults?.length) continue;

          const issue = apiResults[0];

          results.push({
            id: issue.id,
            name: issue.name,
            issueNumber: issue.issue_number,
            imageUrl: issue.image?.medium_url,
            description: cleanHtml(issue.deck || issue.description),
            staff: {
              authors: issue.person_credits ?? [],
              characters: issue.character_credits ?? [],
            },
          });
        } catch (err) {
          console.error('Error fetching comic:', err);
        }
      }

      setComics(results);
    }

    fetchComics();
  }, []);

  return (
    <View style={comicSection.contenedor}>
      <Text style={comicSection.titulo}>Comics</Text>

      <ScrollView horizontal style={comicSection.comicContainer}>
        {comics.length === 0 && <Text style={{ color: 'white' }}>Cargando comics…</Text>}

        {comics.map(comic => (
          <ComicCard
            key={comic.id}
            url={comic.imageUrl || 'https://via.placeholder.com/150'}
            name={comic.name}
            description={comic.description}
            staff={comic.staff}
            issueNumber={comic.issueNumber}
          />
        ))}
      </ScrollView>
    </View>
  );
}



function ComicCard({ url, name, description, staff }) {
  const navegacion = useNavigation();
  
  return (
    <TouchableOpacity
      style={comicSection.comicCardContainer}
      onPress={() => {
        navegacion.navigate("ComicScreen", {
          imageUrl: url,
          comicTitle: name,
          description: description,
          staff: staff
        });
      }}
    >
      <Image style={comicSection.comicCard} source={{ uri: url }} />
    </TouchableOpacity>
  );
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







//Character Section


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