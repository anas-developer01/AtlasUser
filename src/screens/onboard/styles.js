import { StyleSheet } from "react-native";
import { BackgroundClr, H, W } from '../../constant/Common';

export const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:BackgroundClr,
    },
    logo:{
        height:H(10),
        width:W(60),
        resizeMode:'contain',
        marginLeft:H(2),
        marginTop:H(1)
    }
});
