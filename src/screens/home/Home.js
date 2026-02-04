import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Black, Blue, ButtonClr, Feather, H, Ionicons, LogoHome, W, White, Support, AddTicket, Progress, AllTickets, Pending, Profile } from "../../constant/Common";
import AsyncStorage from "@react-native-community/async-storage";
import { dashboard } from "../../api/ticket";
import { AppContext } from "../../context/AppProvider";
import { delete_account } from "../../api/auth";

const Home = (props) => {
    const { navigate } = props?.navigation;
    const { user } = useContext(AppContext);
    const [data, setData] = useState();
 
    useEffect(() => {
        getData();
        const willFocusSubscription = props?.navigation.addListener('focus', () => {
            getData();
        });
        return willFocusSubscription;
    },[user]);

    const getData = async () => {
        const Res = await dashboard(user?.token);
        setData(Res?.data);
    }

    return(
        <View style={{flex:1,backgroundColor:'#F5F6F7'}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} /> */}
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:H(5)}}>
                <Image source={LogoHome} style={{height:H(11),width:W(55),resizeMode:'contain',marginLeft:H(3)}} />
                <TouchableOpacity onPress={() => {navigate('Inbox')}} style={{marginRight:H(2),height:H(5),width:W(11),borderRadius:H(1),alignItems:'center',justifyContent:'center',backgroundColor:White}}>
                    <Ionicons name={'chatbox-outline'} size={22} color={ButtonClr} />
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{
                    height:H(20),
                    width:W(44),
                    backgroundColor:'#000024',
                    borderRadius:H(1),
                    marginLeft:H(2),
                    marginTop:H(2)
                }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <Text style={{color:White,fontSize:16,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>Total</Text>
                        <Text style={{color:White,fontSize:16,marginTop:-H(.5),fontFamily:'Poppins-Regular',marginLeft:H(2)}}>Tickets</Text>
                        </View>
                        <Feather name={'arrow-up-right'} size={36} color={ButtonClr} style={{marginRight:H(2)}} />
                    </View>
                    <Text style={{color:White,fontSize:55,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>{data?.total_tickets_count ? data?.total_tickets_count:0}</Text>
                </View>

                <View>
                <View style={{
                    height:H(9),
                    width:W(44),
                    backgroundColor:ButtonClr,
                    borderRadius:H(1),
                    marginRight:H(2),
                    marginTop:H(2),
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                    <Text style={{color:White,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(2),width:W(22)}}>In Progress</Text>
                    <Text style={{color:White,fontSize:33,fontFamily:'Poppins-Medium',marginRight:H(2)}}>{data?.in_progress_count ? data?.in_progress_count:0}</Text>
                </View>
                <View style={{
                    height:H(9),
                    width:W(44),
                    backgroundColor:ButtonClr,
                    borderRadius:H(1),
                    marginRight:H(2),
                    marginTop:H(2),
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                    <Text style={{color:White,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(2),width:W(22)}}>Tickets Resolved</Text>
                    <Text style={{color:White,fontSize:33,fontFamily:'Poppins-Medium',marginRight:H(2)}}>{data?.resolved_count ? data?.resolved_count:0}</Text>
                </View>
                </View>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                <TouchableOpacity
                onPress={() => {navigate('AddTicket')}}
                style={{
                    height:H(14),
                    width:W(28),
                    backgroundColor:White,
                    borderRadius:H(.5),
                    marginLeft:H(2),
                    marginTop:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <AddTicket width={120} height={66}/>
                </TouchableOpacity>
                <Text style={{color:Black,marginTop:H(.6),fontFamily:'Poppins-Medium',alignSelf:'center'}}>Add Ticket</Text>
                </View>
                <View>
                <TouchableOpacity
                onPress={() => {navigate('Pending',{screen:'In Progress'})}}
                style={{
                    height:H(14),
                    width:W(28),
                    backgroundColor:White,
                    borderRadius:H(.5),
                    marginLeft:H(1.7),
                    marginTop:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Progress width={120} height={66}/>
                </TouchableOpacity>
                <Text style={{color:Black,marginTop:H(.6),fontFamily:'Poppins-Medium',alignSelf:'center'}}>In Progress</Text>
                </View>
                <View>
                <TouchableOpacity
                onPress={() => {navigate('AllTickets')}}
                style={{
                    height:H(14),
                    width:W(28),
                    backgroundColor:White,
                    borderRadius:H(.5),
                    marginLeft:H(1.7),
                    marginTop:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <AllTickets width={120} height={66}/>
                </TouchableOpacity>
                <Text style={{color:Black,marginTop:H(.6),fontFamily:'Poppins-Medium',alignSelf:'center'}}>All Tickets</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                <TouchableOpacity
                onPress={() => {navigate('Pending',{screen:'Pending'})}}
                style={{
                    height:H(14),
                    width:W(28),
                    backgroundColor:White,
                    borderRadius:H(.5),
                    marginLeft:H(2),
                    marginTop:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Pending width={120} height={66}/>
                </TouchableOpacity>
                <Text style={{color:Black,marginTop:H(.6),fontFamily:'Poppins-Medium',alignSelf:'center'}}>Pending</Text>
                </View>
                <View>
                <TouchableOpacity
                onPress={() => {navigate('Profile')}}
                style={{
                    height:H(14),
                    width:W(28),
                    backgroundColor:White,
                    borderRadius:H(.5),
                    marginLeft:H(1.7),
                    marginTop:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Profile width={120} height={66}/>
                </TouchableOpacity>
                <Text style={{color:Black,marginTop:H(.6),fontFamily:'Poppins-Medium',alignSelf:'center'}}>My Profile</Text>
                </View>
                <View>
                <TouchableOpacity
                onPress={() => {navigate('Chat')}}
                style={{
                    height:H(14),
                    width:W(28),
                    backgroundColor:White,
                    borderRadius:H(.5),
                    marginLeft:H(1.7),
                    marginTop:H(2),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Support width={120} height={66}/>
                </TouchableOpacity>
                <Text style={{color:Black,marginTop:H(.6),fontFamily:'Poppins-Medium',alignSelf:'center'}}>Support</Text>
                </View>
            </View>

            <TouchableOpacity 
            onPress={() => {navigate('AddTicket')}}
            style={{
                height:H(6.5),
                width:W(90),
                backgroundColor:'#000024',
                alignSelf:'center',
                elevation:5,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(5),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Make New Ticket</Text>
            </TouchableOpacity>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                width:W(90),
                alignSelf:'center'
            }}>
            <TouchableOpacity 
            onPress={async() => {
                const Res = await delete_account(user?.token);
                AsyncStorage.removeItem('UserData',() => {
                    navigate('Onboard');                    
                })
            }}
            style={{
                height:H(6.5),
                width:W(44),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                elevation:5,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(2),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.removeItem('UserData',() => {
                    navigate('Onboard');                    
                })
            }}
            style={{
                height:H(6.5),
                width:W(44),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                elevation:5,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(2),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Logout</Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}

export default Home;