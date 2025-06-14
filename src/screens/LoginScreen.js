import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';


export default function LoginScreen(){
    return(
        <ScrollView style={{backgroundColor:"#242121"}}>
            <ImagenSesionRegistro url={"https://i.pinimg.com/564x/59/14/ab/5914ab799cd22252546c0c372d93c77c.jpg"}></ImagenSesionRegistro>
            <FormularioInicioSesion></FormularioInicioSesion>
        </ScrollView>
    )    
}


// Imagen de Presentacion para el Formulario de Incio de Sesion
function ImagenSesionRegistro({url}){
    return(
        <View style={estilosImagen.container}>
            <Image style={estilosImagen.imagen} source={{uri: url}}></Image>
        </View>
    )
}

const estilosImagen = StyleSheet.create({
    container:{
        width:"100%",
        height:380,
        backgroundColor:"red"
    },
    imagen:{
        width:"100%",
        height: "100%",
    }
})


// Formulario de Inicio de Sesion
function FormularioInicioSesion(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  

    const navegacion = useNavigation()

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if(user){
                navegacion.replace("HomeScreen")
            }
        })

        return unsubscribe
    }, [])  


    const handleLogin = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in with:", user.email);
        })
        .catch((error) => {
        alert(error.message);
        });
    }

    return(
        <View style={form.container}>
            <View style={form.contenedorInputs}>
                <Text style={form.titulo}>Iniciar Sesion</Text>
                <TextInput style={form.inputEmail} placeholder="Coloca tu email" placeholderTextColor={"#929090"} value={email} onChangeText={text=> setEmail(text)}></TextInput>
                <TextInput style={form.inputContraseña} placeholder="Coloca tu contraseña" placeholderTextColor={"#929090"} secureTextEntry value={password} onChangeText={text=> setPassword(text)}></TextInput>
            </View>

            <View style={form.contendorBotones}> 
                <TouchableOpacity style={form.botonInicioSesion} onPress={handleLogin}>
                    <Text style={form.botonInicioSesionTexto}>Iniciar Sesion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={form.botonRegistro}
                    onPress={()=>{
                        navegacion.navigate("RegistroScreen")
                    }}
                >
                    <Text style={form.botonRegistroTexto}>Registrate</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const form = StyleSheet.create({
    container:{
        marginTop:10,
        display:"flex",
        flexDirection:"column",
        gap:30
    },
    titulo:{
        fontWeight:"bold",
        fontSize: 40,
        color:"#ED1D24",
        textAlign:"center"
    },
    contenedorInputs:{
        display:"flex",
        flexDirection:"column",
        gap:25
    },
    inputEmail:{
        height:60,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#929090",
        width:340,
        borderRadius:20,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign:"center",
        fontSize: 20,
        alignSelf:"center",
        color:"white"
    },
    inputContraseña:{
        height:60,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#929090",
        width:340,
        borderRadius:20,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign:"center",
        fontSize: 20,
        alignSelf:"center",
        color:"white"
    },
    contendorBotones:{
        display:"flex",
        flexDirection:"column",
        gap:25
    },
    botonInicioSesion:{
        height:60,
        backgroundColor:"#ED1D24",
        width: 340,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignSelf:"center"
    },
    botonInicioSesionTexto:{
        textAlign:"center",
        color:"white",
        fontSize:20,
        fontWeight:"bold",
    },
    botonRegistro:{
        height:60,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#ED1D24",
        width:340,
        borderRadius:20,
        alignSelf:"center",
        justifyContent:"center"
    },
    botonRegistroTexto:{
        textAlign:"center",
        color:"#ED1D24",
        fontSize:20
    }
})