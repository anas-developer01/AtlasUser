import React, { useContext, useState } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { signIn } from '../../api/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { AppContext } from '../../context/AppProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = (props) => {
    const { navigate } = props?.navigation;
    const [showpass, setShowPass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloading, setisLoading] = useState(false);
    const { login } = useContext(AppContext);

    const validation = () => {
        if(
            email === '' ||
            password === ''
        ){
            alert('Please Enter Email and Password');
        } else {
            signInUser();
        }
    }

    const signInUser = async () => {
        setisLoading(true);
        let data = { 
            email, 
            password, 
        }
        console.log(data);
        const signInRes = await signIn(data);
        console.log('signInRes',signInRes);
        if(signInRes?.status === 1){
            setisLoading(false);
            AsyncStorage.setItem('UserData',JSON.stringify(signInRes?.data),() => {
                login();
                navigate('Home');
            });
        } else {
            setisLoading(false);
            if(signInRes?.data?.email){
                alert(signInRes?.data?.email[0]);
            } else if(signInRes?.data?.password) {
                alert(signInRes?.data?.password[0]);
            } else {
                alert(signInRes?.message);
            }
        }
    } 

    return(
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: White }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled">
            <StatusBar backgroundColor={Blue} />
            <View style={{
                height:H(44),
                width:W(100),
                backgroundColor:Blue,
                borderBottomLeftRadius:H(4),
                borderBottomRightRadius:H(4),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Image source={Logo} style={{height:H(38),width:W(70),resizeMode:'contain'}} />
            </View>
            <Text style={{color:Black,fontSize:26,fontFamily:'Poppins-SemiBold',marginLeft:H(3),marginTop:H(1)}}>Login</Text>
            <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(3),marginTop:H(1)}}>Welcome to</Text>
            <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(3)}}>Atlas Controls</Text>

            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Email</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:5,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={email}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='name@web.com'
                placeholderTextColor={Grey}
                onChangeText={(email) => setEmail(email)}/>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Password</Text>
            <TouchableOpacity onPress={() => {navigate('Forgot')}}>
            <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginRight:H(3)}}>Forgot Password</Text>
            </TouchableOpacity>
            </View>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:5,
                borderRadius:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={password}
                secureTextEntry={showpass}
                style={{paddingLeft:H(1),marginLeft:H(1),width:W(75),color:Black}}
                placeholder='*********'
                placeholderTextColor={Grey}
                onChangeText={(password) => setPassword(password)}/>
                <TouchableOpacity onPress={() => {
                    if(showpass === true){
                        setShowPass(false);
                    } else {
                        setShowPass(true);
                    }
                }} style={{marginRight:H(2)}}>
                    <Ionicons name={showpass === true ? 'eye-off-outline':'eye-outline'} size={22} color={ButtonClr} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
            onPress={() => {validation()}}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                elevation:5,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(5),
                alignItems:'center',
                justifyContent:'center'
            }}>
                {isloading === true ? (
                    <ActivityIndicator size={'small'} color={White}/>
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Login</Text>}
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:H(2)}}>
                <Text style={{color:Black,fontFamily:'Poppins-Medium'}}>Don't have an Account, </Text>
                <TouchableOpacity onPress={() => {navigate('SignUp')}}>
                    <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium'}}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAwareScrollView>
    )
}

export default SignIn;