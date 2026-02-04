import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Image, TextInput } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, ImageBaseUrl, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { profile, update_profile } from "../../api/auth";
import { AppContext } from "../../context/AppProvider";
import ImageCropPicker from "react-native-image-crop-picker";

const Profile = (props) => {
    const { goBack, navigate } = props?.navigation;
    const { user } = useContext(AppContext);
    const [profileData, setProfileData] = useState();
    const [img, setImg] = useState();
    const [isloading, setisLoading] = useState(false);

    useEffect(() => {getProfile()},[user]);

    const getProfile = async () => {
        const profileRes = await profile(user?.token);
        console.log('profileRes',profileRes);
        setProfileData(profileRes?.data);
    }

    const selectImages = () => {
        ImageCropPicker.openCamera({
            width:300,
            height:400,
            mediaType: "photo",
            includeBase64:true
          }).then(image => {
            console.log('IMAGE',image);
            // setImg(image);
            updateProfile(image)
          });
    }

    const updateProfile = async (image) => {
        setisLoading(true);
        let data = {
            image:'data:image/jpeg;base64,'+ image.data
        }
        const updateRes = await update_profile(user?.token,data);
        console.log('updateRes',updateRes);
        if(updateRes?.status === 1){
            setisLoading(false);
            getProfile();
        } else {
            setisLoading(false);
            alert(updateRes?.data?.email[0]);
        }
    } 

    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} /> */}
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
            <TouchableOpacity onPress={() => {navigate('EditProfile')}}>
            <Text style={{color:ButtonClr,fontSize:16,fontFamily:'Poppins-Medium',marginTop:H(1)}}>Edit</Text>
            </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                height:H(13),
                width:W(88),
                alignSelf:'center',
                backgroundColor:Blue,
                marginTop:H(2),
                borderRadius:H(1),
                flexDirection:'row',
                alignItems:'center'
            }}>
                <View style={{
                    height:80,
                    width:80,
                    borderRadius:80/2,
                    borderWidth:H(.5),
                    borderColor:ButtonClr,
                    marginLeft:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    {img ? (
                    <Image source={{uri:img?.path}} style={{height:66,width:66,borderRadius:66/2}}/>
                    ):<Image source={{uri:ImageBaseUrl+profileData?.records?.image}} style={{height:66,width:66,borderRadius:66/2}}/>}
                </View>
                <View>
                <Text style={{color:White,marginLeft:H(2),fontSize:18,fontFamily:'Poppins-Medium'}}>{profileData?.records?.name}</Text>
                <TouchableOpacity onPress={() => {selectImages()}}>
                <Text style={{color:ButtonClr,marginLeft:H(2),fontSize:11,fontFamily:'Poppins-Medium'}}>Change Dp</Text>
                </TouchableOpacity>
                </View>
            </View>
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
                value={profileData?.records?.name}
                style={{paddingLeft:H(1)}}
                placeholder='John Doe'
                placeholderTextColor={Grey}
                editable={false}/>
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
                editable={false}
                value={profileData?.records?.email}
                style={{paddingLeft:H(1)}}
                placeholder='john@gmail.com'
                placeholderTextColor={Grey}/>
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
                value={profileData?.records?.designation}
                editable={false}
                style={{paddingLeft:H(1)}}
                placeholder='Designation'
                placeholderTextColor={Grey}/>
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
                value={profileData?.records?.phone}
                editable={false}                
                style={{paddingLeft:H(1)}}
                placeholder='Phone'
                placeholderTextColor={Grey}/>
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
                value={profileData?.records?.company_name}
                editable={false}
                style={{paddingLeft:H(1)}}
                placeholder='Leader'
                placeholderTextColor={Grey}/>
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
                value={profileData?.records?.region_coverage}
                editable={false}
                style={{paddingLeft:H(1)}}
                placeholder='Leader'
                placeholderTextColor={Grey}/>
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
                value={profileData?.records?.location}
                editable={false}
                style={{paddingLeft:H(1)}}
                placeholder='Leader'
                placeholderTextColor={Grey}/>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}></Text>
            <TouchableOpacity onPress={() => {navigate('ChangePassword')}}>
            <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginRight:H(3)}}>Change Password</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};

export default Profile;