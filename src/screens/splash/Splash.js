import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';
import { BG, Logo } from '../../constant/Common';
import { AppContext } from '../../context/AppProvider';

const Splash = (props) => {
    const { replace } = props.navigation;
    const { user } = useContext(AppContext);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if (isReady) {  
            if (user) {
                replace('Home');
            } else {
                replace('Onboard');
            }
        }
    }, [isReady, user]);

    return(
        <ImageBackground source={BG} style={styles.main}>
            <StatusBar backgroundColor={'transparent'} translucent />
            <Animatable.View animation="zoomIn">
                <Image source={Logo} style={styles.logo}/>
            </Animatable.View>
        </ImageBackground>
    )
}

export default Splash;