import React, { useContext, useState } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { verify } from '../../api/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { AppContext } from '../../context/AppProvider';

const Otp = (props) => {
    const { navigate } = props?.navigation;
    const [otp, setOtp] = useState('');
    const [isloading, setisLoading] = useState(false);
    const { login } = useContext(AppContext);

    const verification = async () => {
        setisLoading(true);
        let data = { 
            email:props?.route?.params?.email, 
            otp:otp
        }
        if(props?.route?.params?.screen === 'forgot'){
            data.redirectToPassword = true
        }
        console.log(data);
        const verifyRes = await verify(data);
        console.log('verifyRes',verifyRes);
        setisLoading(false);
        if(verifyRes?.status === 1){
            AsyncStorage.setItem('UserData',JSON.stringify(verifyRes?.data),() => {
                if(props?.route?.params?.screen === 'forgot'){
                    navigate('ResetPassword');
                } else {
                    login();
                    navigate('Home');
                }
            });
        } else {
            alert(verifyRes?.message)
        }
    }

    return(
        <View style={{flex:1,backgroundColor:White}}>
            <StatusBar backgroundColor={Blue} />
            <View style={{
                height:H(33),
                width:W(100),
                backgroundColor:Blue,
                borderBottomLeftRadius:H(4),
                borderBottomRightRadius:H(4),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Image source={Logo} style={{height:H(38),width:W(70),resizeMode:'contain'}} />
            </View>
            <Text style={{color:Black,fontSize:26,fontFamily:'Poppins-SemiBold',marginLeft:H(3),marginTop:H(1)}}>Verify Email</Text>
            <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(3)}}>Verification Code sent to {props?.route?.params?.email}</Text>

            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Code</Text>
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
                style={{paddingLeft:H(1),color:Black}}
                placeholder='1234'
                placeholderTextColor={Grey}
                onChangeText={(otp) => setOtp(otp)}/>
            </View>

            <TouchableOpacity 
            onPress={() => {
                if(otp === ''){
                    alert('Please Enter Code');
                } else if(isloading === false) {
                    verification();
                }
            }}
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
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Submit</Text>}
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:H(2)}}>
                <Text style={{color:Black,fontFamily:'Poppins-Medium'}}>Already have an Account, </Text>
                <TouchableOpacity onPress={() => {navigate('SignIn')}}>
                    <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium'}}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Otp;