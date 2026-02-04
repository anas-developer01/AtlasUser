import React from 'react';
import { BG, ButtonClr, H, Logo, Primary, W, White } from '../../constant/Common';
import { styles } from './styles';
import { ImageBackground, StatusBar, Text, Image, View, TouchableOpacity } from 'react-native';

const Onboard = (props) => {
    const { navigate } = props?.navigation;

    return(
        <ImageBackground source={BG} style={styles.main}>
            <StatusBar backgroundColor={'transparent'} translucent />
            <Text style={{fontSize:33,fontFamily:'Poppins-SemiBold',color:White,marginTop:H(10),marginLeft:H(2)}}>Atlas Controls</Text>
            <Text style={{fontSize:33,fontFamily:'Poppins-SemiBold',marginTop:-H(1),color:White,marginLeft:H(2)}}>Pvt Ltd</Text>
            <Image source={Logo} style={styles.logo}/>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:H(50)}}>
                <TouchableOpacity
                onPress={() => {navigate('SignIn')}}
                style={{
                    height:H(6.6),
                    width:W(43),
                    backgroundColor:ButtonClr,
                    marginLeft:H(2),
                    borderRadius:H(1),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                    height:H(6.6),
                    width:W(43),
                    backgroundColor:ButtonClr,
                    marginRight:H(2),
                    borderRadius:H(1),
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{color:White,fontFamily:'Poppins-Medium'}}>What we Offer</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:H(2)}}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Don't have an Account, </Text>
                <TouchableOpacity onPress={() => {navigate('SignUp')}}>
                    <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium'}}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default Onboard;