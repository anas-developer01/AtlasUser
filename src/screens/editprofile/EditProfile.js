import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Image, TextInput, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { profile, update_profile } from "../../api/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfile = (props) => {
    const { goBack, navigate } = props?.navigation;
    const { user } = useContext(AppContext);
    const [name, setName] = useState('');
    const [designation, setDeisgnation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [region, setRegion] = useState('');
    const [location, setLocation] = useState('');
    const [isloading, setisLoading] = useState(false);

    useEffect(() => {getProfile()},[user]);

    const getProfile = async () => {
        const profileRes = await profile(user?.token);
        console.log('profileRes',profileRes);
        setName(profileRes?.data?.records?.name);
        setDeisgnation(profileRes?.data?.records?.designation);
        setEmail(profileRes?.data?.records?.email);
        setPhone(profileRes?.data?.records?.phone);
        setCompany(profileRes?.data?.records?.company_name);
        setRegion(profileRes?.data?.records?.region_coverage);
        setLocation(profileRes?.data?.records?.location);
    }

    const updateProfile = async () => {
        setisLoading(true);
        let data = { 
            email, 
            name, 
            designation, 
            phone, 
            company_name:company, 
            region_coverage:region, 
            location:location
        }
        console.log(data);
        const updateRes = await update_profile(user?.token,data);
        console.log('updateRes',updateRes);
        if(updateRes?.status === 1){
            setisLoading(false);
            navigate('Home');
        } else {
            setisLoading(false);
            alert(updateRes?.data?.email[0]);
        }
    } 

    return(
        <KeyboardAwareScrollView 
            style={{ flex: 1, backgroundColor: White }}
            contentContainerStyle={{ flexGrow: 2 }}
            enableOnAndroid={true}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled">
            {/* <StatusBar backgroundColor={'#F5F6F7'} />             */}
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(6)}}>
            <TouchableOpacity
            onPress={() => {goBack()}}
            style={{
                height:H(4),
                width:W(9),
                borderWidth:H(.1),
                borderColor:Grey,
                borderRadius:H(.5),
                marginLeft:H(3),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Ionicons name={'arrow-back'} size={22} color={Grey} />
            </TouchableOpacity>
            <Text style={{color:Black,fontSize:16,width:W(64),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>My Profile</Text>
            </View>

            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(5),marginLeft:H(3)}}>Name</Text>
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
                style={{paddingLeft:H(1)}}
                placeholder='Name'
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
                style={{paddingLeft:H(1)}}
                placeholder='Designation'
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
                style={{paddingLeft:H(1)}}
                placeholder='john@gmail.com'
                placeholderTextColor={Grey}
                onChangeText={(email) => setEmail()}/>
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
                style={{paddingLeft:H(1)}}
                placeholder='Phone'
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
                style={{paddingLeft:H(1)}}
                placeholder='Company'
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
                style={{paddingLeft:H(1)}}
                placeholder='Region'
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
                style={{paddingLeft:H(1)}}
                placeholder='Location'
                placeholderTextColor={Grey}
                onChangeText={(location) => setLocation(location)}/>
            </View>
            <TouchableOpacity 
            onPress={() => {updateProfile()}}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(3),
                marginBottom:H(2),
                alignItems:'center',
                justifyContent:'center'
            }}>
                {isloading === true ? (
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Save</Text>}
            </TouchableOpacity>
            </ScrollView>

        </KeyboardAwareScrollView>
    );
};

export default EditProfile;