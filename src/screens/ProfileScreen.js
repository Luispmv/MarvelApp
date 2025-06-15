import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from "../../firebase";

export default function ProfileScreen(){
    return(
        <ScrollView style={mainContainerStyles.mainContainer}>
            <BtnBack></BtnBack>
            <ProfileInfo 
            fondo={"https://images.pexels.com/photos/26797335/pexels-photo-26797335.jpeg"} 
            foto={"https://i.pinimg.com/736x/9a/66/cf/9a66cf86fa63421cd8df09f5ac5006b9.jpg"}
            usuario={"Miguel"}
            correo={"Miguel@gmail.com"}></ProfileInfo>
            <BtnCerrarSesion></BtnCerrarSesion>
        </ScrollView>
    )
}

const mainContainerStyles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#242121",
    }
})

function ProfileInfo({fondo, foto, usuario, correo}){
    return(
        <View style={profileInfoStyles.contenedor}>
            <View style={profileInfoStyles.header}>
                <View style={profileInfoStyles.fotosContainer}>
                    <Image style={profileInfoStyles.fondo} source={{uri: fondo}}></Image>
                    <Image style={profileInfoStyles.foto} source={{uri: foto}}></Image>
                </View>
                <View style={profileInfoStyles.userInfoContainer}>
                    <Text style={profileInfoStyles.usuario}>{usuario}</Text>
                    <Text style={profileInfoStyles.email}>{correo}</Text>
                </View>
            </View>

            {/* Input o botones para editar la foto de perfil */}
            <View style={profileInfoStyles.footer}>
                <TouchableOpacity style={profileInfoStyles.btnEditar}>
                    <Text style={profileInfoStyles.txtbtn}>Editar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={profileInfoStyles.btnEditar}>
                    <Text style={profileInfoStyles.txtbtn}>Editar Fondo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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