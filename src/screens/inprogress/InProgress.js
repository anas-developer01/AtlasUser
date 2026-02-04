import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Black, ButtonClr, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { ticketByPost } from "../../api/ticket";

const InProgress = (props) => {
    const { goBack, navigate } = props?.navigation;
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {getData()},[user]);

    const getData = async () => {
        const Res = await ticketByPost(user?.token,props?.route?.params?.item?.id);
        console.log('RES--->',Res?.data?.default_tickets_status);
        if(Res?.data?.records){
            let updateData = [];
            Res.data.default_tickets_status.post_type = 'default';
            if(!Res.data.default_tickets_status.feedback){
                Res.data.default_tickets_status.customer_feeback = 'default';
            }
            updateData.push(Res?.data?.default_tickets_status);
            Res?.data?.records?.map((item,i) => {updateData.push(item)});
            setData(updateData);
        }
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
            <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Work In Progress</Text>
            {/* <TouchableOpacity onPress={() => {navigate('Chat',{id:props?.route?.params?.item?.id})}} style={{marginRight:H(2),height:H(5),width:W(11),borderRadius:H(1),alignItems:'center',justifyContent:'center'}}>
                <Ionicons name={'chatbox-outline'} size={28} color={ButtonClr} />
            </TouchableOpacity> */}
            </View>

            {data?.map((item,i) => {
                console.log(item);
                return(
                    <TouchableOpacity 
                    key={i}
                    onPress={() => {navigate('SinglePost',{item:item})}}
                    style={{
                        // height:H(12),
                        width:W(88),
                        alignSelf:'center',
                        backgroundColor:White,
                        marginTop:H(2),
                        borderRadius:H(1),
                        borderWidth:H(.1),
                        borderColor:LightGrey,
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{color:Black,fontSize:14,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>{item?.customer_id?.name}</Text>
                        <Text style={{color:Grey,fontSize:11,fontFamily:'Poppins-Regular',marginRight:H(2),marginTop:H(1)}}>{item?.created_at}</Text>
                        </View>
                        <Text numberOfLines={3} style={{color:Grey,fontSize:11,width:W(78),fontFamily:'Poppins-Regular',marginBottom:H(1),marginLeft:H(2)}}>{item?.feedback}</Text>
                    </TouchableOpacity>        
                )
            })}
        </View>
    );
};

export default InProgress;