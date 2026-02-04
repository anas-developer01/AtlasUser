import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Modal, Image } from 'react-native';
import { Black, ButtonClr, Entypo, Grey, H, ImageBaseUrl, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { ticketDetail } from "../../api/ticket";

const Ticket = (props) => {
    const { goBack, navigate } = props?.navigation;
    const [images, setImages] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);
    const [details, setDetails] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {getData()},[user]);

    const getData = async () => {
        const Res = await ticketDetail(user?.token,props?.route?.params?.item?.id);
        console.log('RES',Res?.data?.record);
        setDetails(Res?.data?.record);
        setImages(Res?.data?.record?.tickets_images);
        setTimeline(Res?.data?.record?.tickets_status);
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
            <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Ticket</Text>
            {props?.route?.params?.item?.employee_id ? (
            <TouchableOpacity onPress={() => {navigate('Chat',{item:props?.route?.params?.item})}} style={{marginRight:H(2),height:H(5),width:W(11),borderRadius:H(1),alignItems:'center',justifyContent:'center'}}>
                <Ionicons name={'chatbox-outline'} size={28} color={ButtonClr} />
            </TouchableOpacity>
            ):null}
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3)}}>{details?.service_id?.title}</Text>
                <Text style={{color:Grey,fontSize:14,fontFamily:'Poppins-Regular',marginRight:H(3),marginTop:H(3)}}>{details?.category_id?.title}</Text>
            </View>
            <Text style={{color:Grey,fontSize:12,fontFamily:'Poppins-Regular',marginLeft:H(3),marginTop:H(1),marginBottom:H(1)}}>{details?.details}</Text>
            <View style={{
                // height:H(15),
                width:W(87),
                backgroundColor:'#0000000F',
                borderWidth:H(.2),
                borderColor:LightGrey,
                alignSelf:'center',
                borderRadius:H(.5),
                marginTop:H(.5),
            }}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>Name <Text style={{color:Grey}}>{details?.customer_id?.name}</Text></Text>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginRight:H(1),marginTop:H(1)}}>Date <Text style={{color:Grey}}>{details?.created_at}</Text></Text>
                </View>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>Location <Text style={{color:Grey}}>{details?.customer_id?.location}</Text></Text>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>Department <Text style={{color:Grey}}>{details?.department_id?.title}</Text></Text>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1),marginBottom:H(1)}}>Category <Text style={{color:Grey}}>{details?.category_id?.title} {details?.subcategory_id?.title ? '> '+details?.subcategory_id?.title:''} {details?.childcategory_id?.title ? '> '+details?.childcategory_id?.title:''}</Text></Text>
            </View>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(2)}}>Images</Text>
            {images?.length > 0 ? (
            <View style={{height:H(13),marginLeft:H(2),marginTop:H(.5)}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {images?.map((item,i) => {
                return(
                    <TouchableOpacity 
                    key={i}
                    onPress={() => {
                        setSelectedImage(item);
                        setShowModal(true);
                    }}>
                        <ImageBackground borderRadius={H(1)} source={{uri:ImageBaseUrl+item?.image}} style={{height:H(13),width:W(28),marginRight:H(.5),marginLeft:H(.5)}}/>
                    </TouchableOpacity>
                )
            })}
            </ScrollView>
            </View>
            ):null}
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(2)}}>Timeline</Text>
            
            {timeline?.map((item,i) => {
                return(
                    <View key={i} style={{flexDirection:'row',alignItems:'center',marginLeft:H(3),marginTop:H(1.5)}}>
                    <View style={{height:12,width:12,borderRadius:12/2,backgroundColor:i+1 === timeline?.length ? '#72BB13':ButtonClr}}></View>
                    <TouchableOpacity onPress={() => {navigate('InProgress',{item:item})}} style={{height:H(7.5),width:W(82),backgroundColor:White,borderWidth:H(.1),borderColor:Grey,marginLeft:H(1),borderRadius:H(1),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                            <Text style={{color:Black,fontSize:13,fontFamily:'Poppins-Regular',marginLeft:H(2)}}>Ticket {item?.status}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(.5)}}>
                                <Ionicons name={'chatbox-outline'} size={16} color={ButtonClr} style={{marginLeft:H(2)}} />
                                <Text style={{color:Grey,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1)}}>{item?.tickets_status_posts_count} Post</Text>
                            </View>
                        </View>
                        <Text style={{color:Grey,fontSize:11,fontFamily:'Poppins-Regular',marginRight:H(1)}}>{item?.created_at}</Text>
                    </TouchableOpacity>
                </View>    
                )
            })}

            <Modal visible={showModal} animationType={'fade'} transparent={true}>
                <View style={{
                    flex:1,
                    backgroundColor:'#0004',
                }}>
                    <TouchableOpacity onPress={() => {setShowModal(false)}} style={{alignSelf:'flex-end',height:H(7),marginTop:H(2),marginRight:H(1),width:W(10)}}>
                        <Entypo name={'cross'} size={33} color={White} />
                    </TouchableOpacity>
                    <Image source={{uri:ImageBaseUrl+selectedImage?.image}} style={{height:H(80),width:W(100),resizeMode:'contain'}} />
                </View>
            </Modal>
        </View>
    );
};

export default Ticket;