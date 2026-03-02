import React, { useState, useRef } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { signUp } from '../../api/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignUp = (props) => {
    const { navigate, goBack } = props?.navigation;
    const insets = useSafeAreaInsets();

    const nameRef = useRef(null);
    const designationRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const companyRef = useRef(null);
    const regionRef = useRef(null);
    const locationRef = useRef(null);
    const passwordRef = useRef(null);
    const cPasswordRef = useRef(null);
    const scrollRef = useRef(null);
    const fieldYPositions = useRef({});
    const SCROLL_OFFSET_ABOVE_KEYBOARD = 140;
    const [showpass, setShowPass] = useState(true);

    const focusNextAndScroll = (nextInputRef, fieldKey) => {
        if (nextInputRef?.current) {
            nextInputRef.current.focus();
            setTimeout(() => {
                const y = fieldYPositions.current[fieldKey];
                if (typeof y === 'number' && scrollRef.current?.scrollToPosition) {
                    scrollRef.current.scrollToPosition(
                        0,
                        Math.max(0, y - SCROLL_OFFSET_ABOVE_KEYBOARD),
                        true
                    );
                }
            }, 150);
        }
    };
    const [name, setName] = useState('');
    const [designation, setDeisgnation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [region, setRegion] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [isloading, setisLoading] = useState(false);
    const [location, setLocation] = useState('');

    const validation = () => {
        if (
            name === '' ||
            designation === '' ||
            email === '' ||
            phone === '' ||
            company === '' ||
            region === '' ||
            password === '' ||
            cPassword === ''
        ) {
            alert('Please Enter All Data');
        } else if (password !== cPassword) {
            alert('Password not match')
        } else {
            signUpUser();
        }
    }

    const signUpUser = async () => {
        setisLoading(true);
        let data = {
            email,
            password,
            name,
            designation,
            phone,
            company_name: company,
            region_coverage: region,
            password,
            password_confirmation: cPassword,
            location: location,
            verified_by: 'email'
        }
        console.log(data);
        const signUpRes = await signUp(data);
        console.log('signUpRes', signUpRes);
        if (signUpRes?.status === 1) {
            setisLoading(false);
            navigate('Otp', { email: email });
        } else {
            setisLoading(false);
            if (signUpRes?.data?.email) {
                alert(signUpRes?.data?.email[0]);
            } else {
                alert(signUpRes?.data?.location[0]);
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: White, paddingTop: insets.top }}>

        <KeyboardAwareScrollView
            ref={scrollRef}
            style={{ flex: 1, backgroundColor: White }}
            enableOnAndroid={true}
            extraScrollHeight={120}
            extraHeight={120}
            keyboardOpeningTime={0}
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll={true}
            viewIsInsideTabBar={false}>
            <StatusBar backgroundColor={'#F5F6F7'} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: H(5) }}>
                <TouchableOpacity
                    onPress={() => { goBack() }}
                    style={{
                        height: H(4),
                        width: W(10),
                        borderWidth: H(.1),
                        borderColor: Grey,
                        borderRadius: H(.5),
                        marginLeft: H(3),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Ionicons name={'arrow-back'} size={22} color={Grey} />
                </TouchableOpacity>
                <Text style={{ color: Black, fontSize: 22, fontFamily: 'Poppins-Regular', marginLeft: H(2), marginTop: H(1) }}>Sign Up</Text>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.name = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Name</Text>
                <View style={{
                    height: H(6.5),
                    width: W(87),
                    backgroundColor: White,
                    borderWidth: H(.1),
                    borderColor: LightGrey,
                    alignSelf: 'center',
                    elevation: 1,
                    borderRadius: H(.5),
                    justifyContent: 'center',
                    marginTop: H(.5)
                }}>
                    <TextInput
                        ref={nameRef}
                        value={name}
                        style={{ paddingLeft: H(1), color: Black }}
                        placeholder='Type here'
                        placeholderTextColor={Grey}
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextAndScroll(designationRef, 'designation')}
                        blurOnSubmit={false}
                        onChangeText={(name) => setName(name)} />
                </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.designation = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Designation</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                justifyContent: 'center',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={designationRef}
                    value={designation}
                    style={{ paddingLeft: H(1), color: Black }}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(emailRef, 'email')}
                    blurOnSubmit={false}
                    onChangeText={(designation) => setDeisgnation(designation)} />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.email = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Email</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                justifyContent: 'center',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={emailRef}
                    value={email}
                    style={{ paddingLeft: H(1), color: Black }}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(phoneRef, 'phone')}
                    blurOnSubmit={false}
                    onChangeText={(email) => setEmail(email)} />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.phone = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Phone</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                justifyContent: 'center',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={phoneRef}
                    value={phone}
                    style={{ paddingLeft: H(1), color: Black }}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(companyRef, 'company')}
                    blurOnSubmit={false}
                    onChangeText={(phone) => setPhone(phone)} />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.company = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Company Name</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                justifyContent: 'center',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={companyRef}
                    value={company}
                    style={{ paddingLeft: H(1), color: Black }}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(regionRef, 'region')}
                    blurOnSubmit={false}
                    onChangeText={(company) => setCompany(company)} />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.region = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Region Coverage</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                justifyContent: 'center',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={regionRef}
                    value={region}
                    style={{ paddingLeft: H(1), color: Black }}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(locationRef, 'location')}
                    blurOnSubmit={false}
                    onChangeText={(region) => setRegion(region)} />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.location = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Location</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                justifyContent: 'center',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={locationRef}
                    value={location}
                    style={{ paddingLeft: H(1), color: Black }}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(passwordRef, 'password')}
                    blurOnSubmit={false}
                    onChangeText={(location) => setLocation(location)} />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.password = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Password</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={passwordRef}
                    value={password}
                    secureTextEntry={showpass}
                    style={{ paddingLeft: H(1), marginLeft: H(1), width: W(75), color: Black }}
                    placeholder='*********'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(cPasswordRef, 'cPassword')}
                    blurOnSubmit={false}
                    onChangeText={(password) => setPassword(password)} />
                <TouchableOpacity onPress={() => {
                    if (showpass === true) {
                        setShowPass(false);
                    } else {
                        setShowPass(true);
                    }
                }} style={{ marginRight: H(2) }}>
                    <Ionicons name={showpass === true ? 'eye-off-outline' : 'eye-outline'} size={22} color={ButtonClr} />
                </TouchableOpacity>
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.cPassword = e.nativeEvent.layout.y; }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: H(2), marginLeft: H(3) }}>Confirm Password</Text>
            <View style={{
                height: H(6.5),
                width: W(87),
                backgroundColor: White,
                borderWidth: H(.1),
                borderColor: LightGrey,
                alignSelf: 'center',
                elevation: 1,
                borderRadius: H(.5),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: H(.5)
            }}>
                <TextInput
                    ref={cPasswordRef}
                    value={cPassword}
                    secureTextEntry={showpass}
                    style={{ paddingLeft: H(1), marginLeft: H(1), width: W(75), color: Black }}
                    placeholder='*********'
                    placeholderTextColor={Grey}
                    returnKeyType="done"
                    onSubmitEditing={() => cPasswordRef.current?.blur()}
                    onChangeText={(cPassword) => setCPassword(cPassword)} />
                <TouchableOpacity onPress={() => {
                    if (showpass === true) {
                        setShowPass(false);
                    } else {
                        setShowPass(true);
                    }
                }} style={{ marginRight: H(2) }}>
                    <Ionicons name={showpass === true ? 'eye-off-outline' : 'eye-outline'} size={22} color={ButtonClr} />
                </TouchableOpacity>
            </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    if (isloading === false) {
                        validation();
                    }
                }}
                style={{
                    height: H(6.5),
                    width: W(87),
                    backgroundColor: ButtonClr,
                    alignSelf: 'center',
                    borderRadius: H(.5),
                    justifyContent: 'center',
                    marginTop: H(5),
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                {isloading === true ? (
                    <ActivityIndicator size={'small'} color={White} />
                ) : <Text style={{ color: White, fontFamily: 'Poppins-Medium' }}>Sign Up</Text>}
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: H(2), marginBottom: H(3) }}>
                <Text style={{ color: Black, fontFamily: 'Poppins-Medium' }}>Already have an Account, </Text>
                <TouchableOpacity onPress={() => { navigate('SignIn') }}>
                    <Text style={{ color: ButtonClr, fontFamily: 'Poppins-Medium' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
        </View>
    )
}

export default SignUp;