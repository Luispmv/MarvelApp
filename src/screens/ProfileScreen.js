import { useNavigation } from "@react-navigation/native";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ProfileScreen(){
    const email = auth.currentUser?.email;
    const username = email ? email.split("@")[0] : "";
    return(
        <ScrollView style={mainContainerStyles.mainContainer}>
            <BtnBack></BtnBack>
            <ProfileInfo 
            fondo={"https://images.pexels.com/photos/26797335/pexels-photo-26797335.jpeg"} 
            foto={"https://i.pinimg.com/736x/9a/66/cf/9a66cf86fa63421cd8df09f5ac5006b9.jpg"}
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

// function ProfileInfo({ fondo, foto, usuario, correo }) {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [editingType, setEditingType] = useState(null); // "foto" o "fondo"
//     const [tempUrl, setTempUrl] = useState("");
//     const [profileImage, setProfileImage] = useState(foto);
//     const [backgroundImage, setBackgroundImage] = useState(fondo);

//     const openModal = (type) => {
//         setEditingType(type);
//         setModalVisible(true);
//         setTempUrl(type === "foto" ? profileImage : backgroundImage);
//     };

//     const saveImage = () => {
//         if (editingType === "foto") {
//             setProfileImage(tempUrl);
//         } else if (editingType === "fondo") {
//             setBackgroundImage(tempUrl);
//         }
//         setModalVisible(false);
//         setTempUrl("");
//     };

//     return (
//         <View style={profileInfoStyles.contenedor}>
//             <View style={profileInfoStyles.header}>
//                 <View style={profileInfoStyles.fotosContainer}>
//                     <Image style={profileInfoStyles.fondo} source={{ uri: backgroundImage }} />
//                     <Image style={profileInfoStyles.foto} source={{ uri: profileImage }} />
//                 </View>
//                 <View style={profileInfoStyles.userInfoContainer}>
//                     <Text style={profileInfoStyles.usuario}>{usuario}</Text>
//                     <Text style={profileInfoStyles.email}>{correo}</Text>
//                 </View>
//             </View>

//             {/* Botones para editar */}
//             <View style={profileInfoStyles.footer}>
//                 <TouchableOpacity style={profileInfoStyles.btnEditar} onPress={() => openModal("foto")}>
//                     <Text style={profileInfoStyles.txtbtn}>Editar Foto</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={profileInfoStyles.btnEditar} onPress={() => openModal("fondo")}>
//                     <Text style={profileInfoStyles.txtbtn}>Editar Fondo</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Modal para ingresar URL */}
//             <Modal visible={modalVisible} transparent={true} animationType="slide">
//                 <View style={{
//                     flex: 1,
//                     backgroundColor: "rgba(0,0,0,0.6)",
//                     justifyContent: "center",
//                     alignItems: "center"
//                 }}>
//                     <View style={{
//                         width: 300,
//                         padding: 20,
//                         backgroundColor: "white",
//                         borderRadius: 10
//                     }}>
//                         <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 18 }}>
//                             Ingresa la URL de la {editingType === "foto" ? "foto" : "imagen de fondo"}
//                         </Text>
//                         <TextInput
//                             style={{
//                                 borderWidth: 1,
//                                 borderColor: "#ccc",
//                                 borderRadius: 8,
//                                 padding: 10,
//                                 marginBottom: 15
//                             }}
//                             placeholder="https://..."
//                             value={tempUrl}
//                             onChangeText={setTempUrl}
//                         />
//                         <TouchableOpacity
//                             onPress={saveImage}
//                             style={{
//                                 backgroundColor: "#ED1D24",
//                                 padding: 10,
//                                 borderRadius: 8,
//                                 marginBottom: 10
//                             }}
//                         >
//                             <Text style={{ color: "white", textAlign: "center" }}>Guardar</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             onPress={() => setModalVisible(false)}
//                             style={{
//                                 backgroundColor: "#ccc",
//                                 padding: 10,
//                                 borderRadius: 8
//                             }}
//                         >
//                             <Text style={{ textAlign: "center" }}>Cancelar</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }


function ProfileInfo({ fondo, foto, usuario, correo }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingType, setEditingType] = useState(null); // "foto" o "fondo"
    const [tempUrl, setTempUrl] = useState("");
    const [profileImage, setProfileImage] = useState(foto);
    const [backgroundImage, setBackgroundImage] = useState(fondo);

    const userId = auth.currentUser?.uid;

    // 🔸 Obtener URLs guardadas en Firestore
    useEffect(() => {
        const fetchUserImages = async () => {
            if (!userId) return;
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.foto) setProfileImage(data.foto);
                    if (data.fondo) setBackgroundImage(data.fondo);
                }
            } catch (error) {
                console.error("Error al obtener datos de Firestore:", error);
            }
        };

        fetchUserImages();
    }, []);

    // 🔸 Guardar en Firestore
    const saveImageToFirestore = async (type, url) => {
        if (!userId) return;
        try {
            const userRef = doc(db, "users", userId);
            const snapshot = await getDoc(userRef);
            const existingData = snapshot.exists() ? snapshot.data() : {};
            await setDoc(userRef, {
                ...existingData,
                [type]: url
            });
        } catch (error) {
            console.error("Error al guardar en Firestore:", error);
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
            <View style={profileInfoStyles.header}>
                <View style={profileInfoStyles.fotosContainer}>
                    <Image style={profileInfoStyles.fondo} source={{ uri: backgroundImage }} />
                    <Image style={profileInfoStyles.foto} source={{ uri: profileImage }} />
                </View>
                <View style={profileInfoStyles.userInfoContainer}>
                    <Text style={profileInfoStyles.usuario}>{usuario}</Text>
                    <Text style={profileInfoStyles.email}>{correo}</Text>
                </View>
            </View>

            {/* Botones para editar */}
            <View style={profileInfoStyles.footer}>
                <TouchableOpacity style={profileInfoStyles.btnEditar} onPress={() => openModal("foto")}>
                    <Text style={profileInfoStyles.txtbtn}>Editar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={profileInfoStyles.btnEditar} onPress={() => openModal("fondo")}>
                    <Text style={profileInfoStyles.txtbtn}>Editar Fondo</Text>
                </TouchableOpacity>
            </View>

            {/* Modal para ingresar URL */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        width: 300,
                        padding: 20,
                        backgroundColor: "white",
                        borderRadius: 10
                    }}>
                        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 18 }}>
                            Ingresa la URL de la {editingType === "foto" ? "foto" : "imagen de fondo"}
                        </Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 15
                            }}
                            placeholder="https://..."
                            value={tempUrl}
                            onChangeText={setTempUrl}
                        />
                        <TouchableOpacity
                            onPress={saveImage}
                            style={{
                                backgroundColor: "#ED1D24",
                                padding: 10,
                                borderRadius: 8,
                                marginBottom: 10
                            }}
                        >
                            <Text style={{ color: "white", textAlign: "center" }}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                backgroundColor: "#ccc",
                                padding: 10,
                                borderRadius: 8
                            }}
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
    contenedor:{
        gap:20
    },
    header:{

    },
    footer:{
        gap:20,
        alignSelf:"center"
    },
    fotosContainer:{
    },
    userInfoContainer:{
        bottom:40,
        width:340,
        alignSelf:"center"
    },
    usuario:{
        fontSize:45,
        fontWeight:"bold",
        color:"#ED1D24"
    },
    email:{
        fontSize:25,
        fontWeight:"bold",
        color:"white"
    },
    fondo:{
        width:"100%",
        height:250
    },
    foto:{
        width:100,
        height:100,
        borderRadius:100,
        bottom:50,
        left:10
    },
    btnEditar:{
        width:340,
        height:60,
        borderWidth:1,
        borderColor:"#929090",
        justifyContent:"center",
        borderRadius:20
    },
    txtbtn:{
        color:"#929090",
        textAlign:"center",
        fontSize:20
    }
})

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
        marginTop:100
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