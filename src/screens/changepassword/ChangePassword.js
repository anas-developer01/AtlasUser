import React, { useContext, useState } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { AppContext } from '../../context/AppProvider';
import { change_password } from '../../api/auth';

const ChangePassword = (props) => {
    const { navigate } = props?.navigation;
    const { user } = useContext(AppContext);
    const [showpass, setShowPass] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [isloading, setisLoading] = useState(false);

    const verification = async () => {
        setisLoading(true);
        let data = { 
            old_password:oldPassword,
            password:password,
            password_confirmation:cPassword
        }
        const changeRes = await change_password(user?.token,data);
        console.log('changeRes',changeRes);
        setisLoading(false);
        if(changeRes?.status === 1){
            navigate('SignIn');
        } else {
            alert(changeRes?.message)
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
            <Text style={{color:Black,fontSize:26,fontFamily:'Poppins-SemiBold',marginLeft:H(3),marginTop:H(1)}}>Change Password</Text>

            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Old Password</Text>
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
                value={oldPassword}
                secureTextEntry={showpass}
                style={{paddingLeft:H(1),marginLeft:H(1),width:W(75),color:Black}}
                placeholder='*********'
                placeholderTextColor={Grey}
                onChangeText={(oldPassword) => setOldPassword(oldPassword)}/>
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
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Password</Text>
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
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Confirm Password</Text>
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
                value={cPassword}
                secureTextEntry={showpass}
                style={{paddingLeft:H(1),marginLeft:H(1),width:W(75),color:Black}}
                placeholder='*********'
                placeholderTextColor={Grey}
                onChangeText={(cPassword) => setCPassword(cPassword)}/>
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
            onPress={() => {
                if(password === '' || cPassword === ''){
                    alert('Please Enter Password and Confirm Passowrd');
                } else if(password !== cPassword){
                    alert('Password not matched')
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
                {isloading ? (
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Submit</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default ChangePassword;