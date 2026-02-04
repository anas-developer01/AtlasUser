import React, { useState } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { forgot } from '../../api/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Forgot = (props) => {
    const { navigate } = props?.navigation;
    const [email, setEmail] = useState('');
    const [isloading, setisLoading] = useState(false);

    const validation = async () => {
        if(email === ''){
            alert('Please Enter Email');
        } else {
            forgotPass()
        }
    }

    const forgotPass = async () => {
        setisLoading(true);
        let data = { 
            email
        }
        console.log(data);
        const forgotRes = await forgot(data);
        console.log('forgotRes',forgotRes);
        if(forgotRes?.status === 1){
            setisLoading(false);
                navigate('Otp',{email:email,screen:'forgot'});
        } else {
            setisLoading(false);
            alert(forgotRes?.data?.email[0]);
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
            <Text style={{color:Black,fontSize:26,fontFamily:'Poppins-SemiBold',marginLeft:H(3),marginTop:H(1)}}>Forgot Password</Text>
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
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Submit</Text>}
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

export default Forgot;