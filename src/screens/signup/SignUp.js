import React, { useState } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { signUp } from '../../api/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = (props) => {
    const { navigate, goBack } = props?.navigation;
    const [showpass, setShowPass] = useState(true);
    const [name, setName] = useState('');
    const [designation, setDeisgnation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [region, setRegion] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [isloading, setisLoading] = useState(false);
    const [location, setLocation] = useState('');

    const validation = () => {
        if(
            name === '' || 
            designation === '' ||
            email === '' ||
            phone === '' ||
            company === '' ||
            region === '' ||
            password === '' ||
            cPassword === ''
        ){
            alert('Please Enter All Data');
        } else if(password !== cPassword) {
            alert('Password not match')
        } else {
            signUpUser();
        }
    }

    const signUpUser = async () => {
        setisLoading(true);
        let data = { 
            email, 
            password, 
            name, 
            designation, 
            phone, 
            company_name:company, 
            region_coverage:region, 
            password, 
            password_confirmation:cPassword, 
            location:location,
            verified_by:'email'
        }
        console.log(data);
        const signUpRes = await signUp(data);
        console.log('signUpRes',signUpRes);
        if(signUpRes?.status === 1){
            setisLoading(false);
            navigate('Otp',{email:email});
        } else {
            setisLoading(false);
            if(signUpRes?.data?.email){
                alert(signUpRes?.data?.email[0]); 
            } else {            
                alert(signUpRes?.data?.location[0]);             
            }
        }
    } 

    return(
        <KeyboardAwareScrollView 
            style={{ flex: 1, backgroundColor: White }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            enableOnAndroid={true}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled">
            <StatusBar backgroundColor={'#F5F6F7'} />
            
            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(5)}}>
            <TouchableOpacity
            onPress={() => {goBack()}}
            style={{
                height:H(4),
                width:W(10),
                borderWidth:H(.1),
                borderColor:Grey,
                borderRadius:H(.5),
                marginLeft:H(3),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Ionicons name={'arrow-back'} size={22} color={Grey} />
            </TouchableOpacity>
            <Text style={{color:Black,fontSize:22,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>Sign Up</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Name</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={name}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(name) => setName(name)}/>
            </View>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Designation</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={designation}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(designation) => setDeisgnation(designation)}/>
            </View>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Email</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={email}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(email) => setEmail(email)}/>
            </View>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Phone</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={phone}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(phone) => setPhone(phone)}/>
            </View>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Company Name</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={company}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(company) => setCompany(company)}/>
            </View>

            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Region Coverage</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={region}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(region) => setRegion(region)}/>
            </View>

            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Location</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput 
                value={location}
                style={{paddingLeft:H(1),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(location) => setLocation(location)}/>
            </View>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Password</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
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
                elevation:1,
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
                if(isloading === false){                    
                    validation();
                }
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(5),
                alignItems:'center',
                justifyContent:'center'
            }}>
                {isloading === true ? (
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Sign Up</Text>}
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:H(2),marginBottom:H(3)}}>
                <Text style={{color:Black,fontFamily:'Poppins-Medium'}}>Already have an Account, </Text>
                <TouchableOpacity onPress={() => {navigate('SignIn')}}>
                    <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium'}}>Login</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default SignUp;