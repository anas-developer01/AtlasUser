import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Image, TextInput } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { getChat } from "../../api/support";

const Inbox = (props) => {
    const { goBack, navigate } = props?.navigation;
    const [inboxlist, setInboxList] = useState([]);
    const { user } = useContext(AppContext);
    const [data, setData] = useState();
 
    useEffect(() => {getData()},[user]);

    const getData = async () => {
        const Res = await getChat(user?.token);
        console.log('RES',Res);
        setInboxList(Res?.data)
    }

    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} />             */}
            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(5)}}>
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
            <Text style={{color:Black,fontSize:16,width:W(64),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Inbox</Text>
            </View>
            
            {inboxlist?.map((item,i) => {
                return(
                    <TouchableOpacity
                    onPress={() => {
                        let data = {
                            id:item?.ticket_id,
                            employee_id:{
                                id:user?.id === item?.sender_id? item?.receiver_id:item?.sender_id,
                                name:user?.id === item?.sender_id? item?.receiver?.name:item?.sender?.name
                            }
                        }
                        navigate('Chat',{item:data});
                    }}
                    key={i} style={{
                        height:H(8),
                        width:W(88),
                        alignSelf:'center',
                        backgroundColor:White,
                        borderRadius:H(1),
                        marginTop:H(2),
                        borderWidth:H(.1),
                        borderColor:Grey
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center',width:W(66)}}>
                            <Text numberOfLines={1} style={{color:Black,width:W(44),fontSize:13,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>{user?.id === item?.sender_id? item?.receiver?.name:item?.sender?.name}</Text>                    
                            <Text style={{color:White,fontSize:10,backgroundColor:item?.status === 'Completed' ? '#72BB13':'#FF4949',paddingLeft:H(1),paddingRight:H(1),borderRadius:H(.5),paddingTop:H(.3),fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>{item?.ticket?.status}</Text>
                        </View>
                        <Text style={{color:Grey,fontSize:10,marginRight:H(1),fontFamily:'Poppins-Regular'}}>{new Date(item?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text numberOfLines={1} style={{color:Grey,width:W(66),fontSize:12,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(.5)}}>{item?.message}</Text>
                            {item?.status !== 'Completed' && item?.unread_count > 0 ? (
                            <View style={{height:18,width:18,borderRadius:18/2,backgroundColor:ButtonClr,marginRight:H(2),alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:White,fontSize:12,fontFamily:'Poppins-Medium'}}>{item?.unread_count}</Text>
                            </View>
                            ):null}
                        </View>
                    </TouchableOpacity>        
                )
            })}

        </View>
    );
};

export default Inbox;