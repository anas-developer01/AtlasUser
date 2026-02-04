import React, { useContext, useState } from "react";
import { View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Customer, Grey, H, LightGrey, W, White } from "../../constant/Common";
import StarRating from 'react-native-star-rating-widget';
import { addFeedback } from "../../api/ticket";
import { AppContext } from "../../context/AppProvider";

const FeedBack = (props) => {
    const { navigate, goBack } = props?.navigation;
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);

    const addReview = async () => {
        setisLoading(true);
        let data = {
            tickets_status_post_id:props?.route?.params?.id,
            rating:rating,
            feedback:feedback,
        }
        const Res = await addFeedback(user?.token,data);
        console.log('RES',Res);
        if(Res.status === 1){
            setisLoading(false);
            alert(Res?.message);
            navigate('Home')
        } else {
            setisLoading(false);
        }
    }

    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} /> */}
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:H(2)}}>
                <Text style={{width:W(20)}}></Text>
                <Text style={{color:Black,fontSize:14,fontFamily:'Poppins-Medium',marginTop:H(1)}}>Share Feedback</Text>
                <TouchableOpacity onPress={() => {goBack()}}>
                <Text style={{color:ButtonClr,fontSize:14,fontFamily:'Poppins-Medium',marginRight:H(2),marginTop:H(1)}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <Customer width={W(88)} height={H(44)} alignSelf={'center'} />

            <StarRating
                rating={rating}
                onChange={setRating}
                style={{alignSelf:'center'}}
                starSize={44}
            />
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Customer Feedback</Text>
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
                style={{paddingLeft:H(1),marginLeft:H(.5),color:Black}}
                placeholder='Type here'
                placeholderTextColor={Grey}
                onChangeText={(feedback) => setFeedback(feedback)}/>
            </View>

            <TouchableOpacity
            onPress={() => {navigate('Hom')}}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:'#72BB13',
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(6),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Generate Completion Certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                if(isloading === false){
                    addReview();
                }
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(2),
                alignItems:'center',
                justifyContent:'center'
            }}>
                {isloading === true ? (
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Submit</Text>}
            </TouchableOpacity>
        </View>
    );
};

export default FeedBack;