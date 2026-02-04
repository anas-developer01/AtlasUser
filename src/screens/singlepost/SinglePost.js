import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, TextInput, Modal, Image } from 'react-native';
import { Black, ButtonClr, Entypo, Grey, H, ImageBaseUrl, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { customerFeedback, defaultTicketByPostID, ticketByPostID } from "../../api/ticket";

const SinglePost = (props) => {
    const { goBack, navigate } = props?.navigation;
    const [images, setImages] = useState([
        {
            path:require('../../assets/images/img1.png')
        },
        {
            path:require('../../assets/images/img2.png')
        },
        {
            path:require('../../assets/images/img1.png')
        },
        {
            path:require('../../assets/images/img2.png')
        },
    ]);
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);
    const [data, setData] = useState();
    const [feedback, setFeedback] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {getData()},[user]);

    const getData = async () => {
        console.log('PROPS',props?.route?.params?.item?.post_type);
        if(props?.route?.params?.item?.post_type === 'default'){
            console.log('PROPS',props?.route?.params?.item?.id);
            const Res = await defaultTicketByPostID(user?.token,props?.route?.params?.item?.id);
            console.log('RES',Res?.data?.record);
            Res.data.record.tickets_status_post_images = Res.data.record.tickets_status_images;
            if(Res?.data?.record){
                setData(Res?.data?.record);
            }    
        } else {
            const Res = await ticketByPostID(user?.token,props?.route?.params?.item?.id);
            console.log('RES',Res?.data?.record);
            if(Res?.data?.record){
                setData(Res?.data?.record);
            }    
        }
    }

    const addCustomerFeedback = async () => {
        // customerFeedback
        let data = {
            "tickets_status_post_id": props?.route?.params?.item?.id,
            "customer_feeback": feedback
        }
        const addRes = await customerFeedback(user?.token,data);
        console.log('addRes',addRes);
        if(addRes?.status === 1){
            setisLoading(false);
            alert('Thank you for your feedback! Your response has been successfully recorded for the ticket status.');
            // navigate('Home');
            getData();
        } else {
            setisLoading(false);
            alert(addRes?.data.toString());
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
            <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Single Post</Text>
            {/* <TouchableOpacity onPress={() => {navigate('Chat',{item:props?.route?.params?.item})}} style={{marginRight:H(2),height:H(5),width:W(11),borderRadius:H(1),alignItems:'center',justifyContent:'center'}}>
                <Ionicons name={'chatbox-outline'} size={28} color={ButtonClr} />
            </TouchableOpacity> */}
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3),textTransform:'capitalize'}}>{data?.tickets_status?.status}</Text>
            </View>
            <Text style={{color:Grey,fontSize:12,fontFamily:'Poppins-Regular',marginLeft:H(3),marginTop:H(1)}}>{data?.feedback}</Text>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(2)}}>Images</Text>
            {data?.tickets_status_post_images?.length > 0 ? (
            <View style={{height:H(13),marginLeft:H(2),marginTop:H(.5)}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {data?.tickets_status_post_images?.map((item,i) => {
                return(
                    <TouchableOpacity 
                    key={i}
                    onPress={() => {
                        setSelectedImage(item);
                        setShowModal(true);
                    }}>
                    <ImageBackground key={i} borderRadius={H(1)} source={{uri:ImageBaseUrl+item?.image}} style={{height:H(13),width:W(28),marginRight:H(.5),marginLeft:H(.5)}}/>
                    </TouchableOpacity>
                )
            })}
            </ScrollView>
            </View>
            ):null}

            {props?.route?.params?.item?.post_type !== 'default' ? (
            <>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3)}}>{props?.route?.params?.item?.post_type === 'default' ? 'Feedback':'Customer Feedback'}</Text>
            {data?.customer_feeback ? (
            <Text style={{color:Grey,fontSize:12,fontFamily:'Poppins-Regular',marginLeft:H(3),marginTop:H(1)}}>{data?.customer_feeback }</Text>
            ):
            <>
            {data ? (
            <View style={{
                height:H(12),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                marginTop:H(.5),
            }}>
                <TextInput
                value={feedback}
                style={{paddingLeft:H(1),marginLeft:H(.5),color:Black,marginTop:H(1)}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(feedback) => setFeedback(feedback)}/>
            </View>
            ):null}
            </>}
            </>
            ):
            <>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3)}}>{props?.route?.params?.item?.post_type === 'default' ? 'Feedback':'Customer Feedback'}</Text>
            {data?.customer_feeback || data?.feedback ? (
            <Text style={{color:Grey,fontSize:12,fontFamily:'Poppins-Regular',marginLeft:H(3),marginTop:H(1)}}>{props?.route?.params?.item?.post_type === 'default' ? data?.feedback:data?.customer_feeback }</Text>
            ):null}
            </>}

            {props?.route?.params?.item?.tickets_status?.status === 'resolved' && data?.customer_feeback ? (
            <TouchableOpacity 
            onPress={() => {navigate('FeedBack',{id:props?.route?.params?.item?.id})}}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:'#72BB13',
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(40),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Make As Resolved</Text>
            </TouchableOpacity>
            ):
            <>
            {data && !data?.customer_feeback && props?.route?.params?.item?.post_type !== 'default' ? (
                <TouchableOpacity 
                onPress={() => {addCustomerFeedback()}}
                style={{
                    height:H(6.5),
                    width:W(87),
                    backgroundColor:'#72BB13',
                    alignSelf:'center',
                    borderRadius:H(.5),
                    justifyContent:'center',
                    marginTop:H(33),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Submit</Text>
                </TouchableOpacity>
            ):null}
            </>}
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

export default SinglePost;