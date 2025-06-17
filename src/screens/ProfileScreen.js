import { useNavigation } from "@react-navigation/native";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, deleteField, updateDoc} from "firebase/firestore";
import { db } from "../../firebase";

export default function ProfileScreen(){
    const email = auth.currentUser?.email;
    const username = email ? email.split("@")[0] : "";
    return(
        <ScrollView style={mainContainerStyles.mainContainer}>
            <BtnBack></BtnBack>
            <ProfileInfo 
            fondo={"https://i.pinimg.com/736x/30/a2/34/30a2349d8085cfe2dd1904c340823f36.jpg"} 
            foto={"https://i.pinimg.com/736x/0d/79/8f/0d798fe2210f0fba0764e577cb45fed0.jpg"}
            usuario={username}
            correo={email}></ProfileInfo>
            <BtnCerrarSesion></BtnCerrarSesion>
        </ScrollView>
    )
}

const mainContainerStyles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#242121",
    }
})



function ProfileInfo({ fondo, foto, usuario, correo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingType, setEditingType] = useState(null); // "foto" | "fondo"
  const [tempUrl, setTempUrl] = useState("");
  const [profileImage, setProfileImage] = useState(foto);
  const [backgroundImage, setBackgroundImage] = useState(fondo);

  const userId = auth.currentUser?.uid;

  /* ---------- READ: cargar datos guardados ---------- */
  useEffect(() => {
    const fetchUserImages = async () => {
      if (!userId) return;
      try {
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.foto) setProfileImage(data.foto);
          if (data.fondo) setBackgroundImage(data.fondo);
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };
    fetchUserImages();
  }, []);

  /* ---------- CREATE / UPDATE ---------- */
  const saveImageToFirestore = async (type, url) => {
    if (!userId) return;
    try {
      await setDoc(
        doc(db, "users", userId),
        { [type]: url },
        { merge: true } // no pisa otros campos
      );
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  /* ---------- DELETE ---------- */
  const deleteImageFromFirestore = async (type) => {
    if (!userId) return;
  
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
  
      if (!docSnap.exists()) {
        alert("Primero necesitas agregar una imagen antes de poder eliminarla.");
        return;
      }
  
      const data = docSnap.data();
  
      if (!data[type]) {
        // alert(No hay ${type === "foto" ? "foto de perfil" : "imagen de fondo"} para eliminar.);
          alert(`No hay ${type === "foto" ? "foto de perfil" : "imagen de fondo"} para eliminar.`);
        return;
      }
  
      await updateDoc(userRef, { [type]: deleteField() });
  
      // Limpia UI
      if (type === "foto") setProfileImage("");
      if (type === "fondo") setBackgroundImage("");
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Ocurrió un error al intentar eliminar la imagen.");
    }
  }; 

  const openModal = (type) => {
    setEditingType(type);
    setModalVisible(true);
    setTempUrl(type === "foto" ? profileImage : backgroundImage);
  };

  const saveImage = () => {
    if (editingType === "foto") {
      setProfileImage(tempUrl);
      saveImageToFirestore("foto", tempUrl);
    } else if (editingType === "fondo") {
      setBackgroundImage(tempUrl);
      saveImageToFirestore("fondo", tempUrl);
    }
    setModalVisible(false);
    setTempUrl("");
  };

  return (
    <View style={profileInfoStyles.contenedor}>
      {/* Header con imágenes */}
      <View style={profileInfoStyles.header}>
        <View style={profileInfoStyles.fotosContainer}>
          <Image
            style={profileInfoStyles.fondo}
            source={{
              uri:
                backgroundImage ||
                "https://via.placeholder.com/600x250/242121/FFFFFF?text=Sin+fondo",
            }}
          />
          <Image
            style={profileInfoStyles.foto}
            source={{
              uri:
                profileImage ||
                "https://via.placeholder.com/100/242121/FFFFFF?text=No+Foto",
            }}
          />
        </View>
        <View style={profileInfoStyles.userInfoContainer}>
          <Text style={profileInfoStyles.usuario}>{usuario}</Text>
          <Text style={profileInfoStyles.email}>{correo}</Text>
        </View>
      </View>

      {/* Footer con botones CRUD */}
      <View style={profileInfoStyles.footer}>
        {/* EDITAR */}
        <TouchableOpacity
          style={profileInfoStyles.btnEditar}
          onPress={() => openModal("foto")}
        >
          <Text style={profileInfoStyles.txtbtn}>Editar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={profileInfoStyles.btnEditar}
          onPress={() => openModal("fondo")}
        >
          <Text style={profileInfoStyles.txtbtn}>Editar Fondo</Text>
        </TouchableOpacity>

        {/* ELIMINAR */}
        <TouchableOpacity
          style={profileInfoStyles.btnEditar}
          onPress={() => deleteImageFromFirestore("foto")}
        >
          <Text style={profileInfoStyles.txtbtn}>Eliminar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={profileInfoStyles.btnEditar}
          onPress={() => deleteImageFromFirestore("fondo")}
        >
          <Text style={profileInfoStyles.txtbtn}>Eliminar Fondo</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Ingresa la URL de la{" "}
              {editingType === "foto" ? "foto" : "imagen de fondo"}
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
              placeholder="https://..."
              value={tempUrl}
              onChangeText={setTempUrl}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#ED1D24",
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
              }}
              onPress={saveImage}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#ccc",
                padding: 12,
                borderRadius: 8,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ textAlign: "center" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const profileInfoStyles = StyleSheet.create({
  contenedor: { gap: 20},
  header: {},
  footer: { gap: 20, alignSelf: "center", marginTop:-50},
  fotosContainer: {},
  userInfoContainer: {
    bottom: 40,
    width: 340,
    alignSelf: "center",
  },
  usuario: { fontSize: 45, fontWeight: "bold", color: "#ED1D24" },
  email: { fontSize: 25, fontWeight: "bold", color: "white" },
  fondo: { width: "100%", height: 250 },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 100,
    bottom: 50,
    left: 10,
  },
  btnEditar: {
    width: 340,
    height: 60,
    borderWidth: 1,
    borderColor: "#929090",
    justifyContent: "center",
    borderRadius: 20,
  },
  txtbtn: { color: "#929090", textAlign: "center", fontSize: 20 },
});



function BtnCerrarSesion(){
    const navigation = useNavigation()
    const handleSignOut = ()=>{
        auth.signOut()
        .then(()=>{
            navigation.replace("LoginScreen")
        })
        .catch(error => alert(error.message))
    }
    return(
        <TouchableOpacity style={btnLogout.contenedor} onPress={handleSignOut}>
            <Text style={btnLogout.texto}>Cerrar Sesion</Text>
        </TouchableOpacity>
    )
}

const btnLogout = StyleSheet.create({
    contenedor:{
        backgroundColor:"red",
        height:60,
        width:340,
        justifyContent:"center",
        borderRadius:20,
        alignSelf:"center",
        marginTop:10
    },
    texto:{
        fontSize:20,
        textAlign:"center",
        color:"white"
    }
})


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