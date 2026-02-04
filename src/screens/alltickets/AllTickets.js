import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { Black, ButtonClr, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { tickets } from "../../api/ticket";

const AllTickets = (props) => {
    const { goBack, navigate } = props?.navigation
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);
    const [alltickets, setAllTickects] = useState([]);

    useEffect(() => {getData()},[user]);

    const getData = async () => {
        setisLoading(true);
        const Res = await tickets(user?.token);
        setisLoading(false);
        setAllTickects(Res?.data?.records);
    }

    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} />             */}
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
            <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>All Tickets</Text>
            </View>

            {isloading ? (
                <ActivityIndicator size={'large'} color={Black} />
            ):<>
            {alltickets?.length === 0 ? (
                <Text style={{color:Black,fontSize:16,fontWeight:'600'}}>No Data Found</Text>
            ):null}
            </>}
            
            {alltickets?.map((item,i) => {
                return(
                    <TouchableOpacity
                    key={i}
                    onPress={() => {navigate('Ticket',{item:item})}}
                    style={{
                        height:H(9),
                        width:W(88),
                        alignSelf:'center',
                        backgroundColor:White,
                        marginTop:H(2),
                        borderRadius:H(1),
                        borderWidth:H(.1),
                        borderColor:LightGrey
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text numberOfLines={1} style={{color:Black,fontSize:14,fontFamily:'Poppins-Medium',width:W(26),marginLeft:H(2),marginTop:H(1)}}>{item?.details}</Text>
                        <Text style={{color:White,fontSize:10,marginRight:H(1),backgroundColor:ButtonClr,paddingLeft:H(1),paddingRight:H(1),borderRadius:H(.5),paddingTop:H(.3),fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>{item?.status}</Text>
                        </View>
                        <Text style={{color:Grey,fontSize:9,fontFamily:'Poppins-Regular',marginRight:H(2),marginTop:H(1)}}>{item?.created_at}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:W(88),alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{color:Grey,fontSize:13,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>{item?.service_id?.title}</Text>
                        <Text style={{color:Grey,fontSize:13,fontFamily:'Poppins-Regular',marginRight:H(2),marginTop:H(1)}}>{item?.category_id?.title}</Text>
                        </View>
                    </TouchableOpacity>        
                )
            })}
        </View>
    );
};

export default AllTickets;