import { StyleSheet } from "react-native";
import { BackgroundClr, H, W } from '../../constant/Common';

export const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:BackgroundClr,
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        height:H(10),
        width:W(100),
        resizeMode:'contain'
    }
});
