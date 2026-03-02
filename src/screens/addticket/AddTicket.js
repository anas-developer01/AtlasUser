import React, { useContext, useEffect, useState, useRef } from "react";
import { View, Text, StatusBar, TouchableOpacity, TextInput, Modal, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { Black, Blue, ButtonClr, Entypo, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import ImageCropPicker from "react-native-image-crop-picker";
import { AppContext } from "../../context/AppProvider";
import { addTicke, categories, childbysubcategories, department, services, subcategories } from "../../api/ticket";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddTicket = (props) => {
    const { goBack, navigate } = props?.navigation;
    const detailsRef = useRef(null);
    const scrollRef = useRef(null);
    const fieldYPositions = useRef({});
    const SCROLL_OFFSET_ABOVE_KEYBOARD = 140;

    const scrollToDetailsAboveKeyboard = () => {
        setTimeout(() => {
            const y = fieldYPositions.current.details;
            if (typeof y === 'number' && scrollRef.current?.scrollToPosition) {
                scrollRef.current.scrollToPosition(
                    0,
                    Math.max(0, y - SCROLL_OFFSET_ABOVE_KEYBOARD),
                    true
                );
            }
        }, 200);
    };
    const [selectionType, setSelectionType] = useState('Select Product/Service');
    const [showModal, setShowModal] = useState(false);
    const [selectProduct, setSelectProduct] = useState();
    const [selectCategory, setSelectCategory] = useState();
    const [selectSubCategory, setSelectSubCategory] = useState();
    const [selectChildBySubCategory, setSelectChildBySubCategory] = useState();
    const [selectDepartment, setSelectDepartment] = useState();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [childBySubCategory, setChildBySubCategory] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [details, setDetails] = useState('');
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);

    useEffect(() => {getData()},[user]);

    const getData = async () => {
        const depRes = await department(user?.token);
        const departments = depRes?.data?.records;
        setDepartmentData(departments);
        // const selectedDepartment = departments?.[0];
        // setSelectDepartment(selectedDepartment);

        // const serRes = await services(user?.token, selectedDepartment?.id);
        // const serviceRecords = serRes?.data?.records;
        // setProduct(serviceRecords);
        // const selectedService = serviceRecords?.[0];
        // setSelectProduct(selectedService);

        // const catRes = await categories(user?.token, selectedService?.id);
        // const catRecords = catRes?.data?.records;
        // setCategory(catRecords);
        // const selectedCategory = catRecords?.[0];
        // setSelectCategory(selectedCategory);

        // getSubCategory(selectedCategory?.id);
    }

    const getSubCategory = async (id) => {
        const depRes = await subcategories(user?.token,id);
        // setSelectSubCategory(depRes?.data?.records[0]);
        setSubCategory(depRes?.data?.records);
        // getChildBySubCategory(depRes?.data?.records[0]?.id)
    }

    const getChildBySubCategory = async (id) => {
        const depRes = await childbysubcategories(user?.token,id);
        // setSelectChildBySubCategory(depRes?.data?.records[0]);
        setChildBySubCategory(depRes?.data?.records);
    }

    const addNewTicket = async () => {
        setisLoading(true);
        let imageData = [];
        images?.map((item,i) => {
            imageData.push('data:image/jpeg;base64,'+ item.data);
        });
        let data = {
            "department_id":selectDepartment?.id,
            "service_id": selectProduct?.id,
            "category_id": selectCategory?.id,
            "subcategory_id":selectSubCategory?.id,
            "childcategory_id":selectChildBySubCategory?.id,
            "details": details,
            "tickets_images": imageData
        }
        const addRes = await addTicke(user?.token,data);
        console.log('addRes',addRes);
        if(addRes?.status === 1){
            setisLoading(false);
            alert('Ticket Created Successfully');
            // navigate('Home');
            navigate('Ticket',{item:addRes?.data});
        } else {
            setisLoading(false);
            alert(addRes?.data.toString());
        }
    }

    const selectImages = () => {
        ImageCropPicker.openPicker({
            width:300,
            height:400,
            mediaType: "photo",
            multiple:true,
            includeBase64:true
          }).then(image => {
            console.log('IMAGE',image);
            let data = images?.length > 0 ? images:[];
            image?.map((item,i) => {data.push(item)});
            setImages(data);
            let ref = refresh+1;
            setRefresh(ref);
          });
    }

    return(
        <KeyboardAwareScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={150}
            extraHeight={150}
            keyboardOpeningTime={0}
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll={true}
            viewIsInsideTabBar={false}>
            <StatusBar backgroundColor={'#F5F6F7'} />            
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
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>New Ticket</Text>
            </View>

            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3)}}>Department</Text>
            <TouchableOpacity 
            onPress={() => {
                setSelectionType('Select Department');
                setShowModal(true);
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(2)}}>{selectDepartment?.title ? selectDepartment?.title:'Select Department'}</Text>
                <Ionicons name={'arrow-forward'} size={22} color={ButtonClr} style={{marginRight:H(2)}} />
            </TouchableOpacity>

            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3)}}>Product/Service</Text>
            <TouchableOpacity 
            onPress={() => {
                setSelectionType('Select Product/Service');
                setShowModal(true);
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(2)}}>{selectProduct?.title ? selectProduct?.title:'Select Product/Service'}</Text>
                <Ionicons name={'arrow-forward'} size={22} color={ButtonClr} style={{marginRight:H(2)}} />
            </TouchableOpacity>
            <></>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Category</Text>
            <TouchableOpacity
            onPress={() => {
                setSelectionType('Select Category');
                setShowModal(true);
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(2),}}>{selectCategory?.title ? selectCategory?.title:'Select Category'}</Text>
                <Ionicons name={'arrow-forward'} size={22} color={ButtonClr} style={{marginRight:H(2)}} />
            </TouchableOpacity>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Sub Category</Text>
            <TouchableOpacity
            onPress={() => {
                setSelectionType('Select Sub Category');
                setShowModal(true);
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(2),}}>{selectSubCategory?.title ? selectSubCategory?.title:'Select Sub Category'}</Text>
                <Ionicons name={'arrow-forward'} size={22} color={ButtonClr} style={{marginRight:H(2)}} />
            </TouchableOpacity>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Child Category</Text>
            <TouchableOpacity
            onPress={() => {
                setSelectionType('Select Child By Sub Category');
                setShowModal(true);
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Text style={{color:Grey,fontFamily:'Poppins-Regular',marginLeft:H(2),}}>{selectChildBySubCategory?.title ? selectChildBySubCategory?.title:'Select Child Category'}</Text>
                <Ionicons name={'arrow-forward'} size={22} color={ButtonClr} style={{marginRight:H(2)}} />
            </TouchableOpacity>

            <View onLayout={(e) => { fieldYPositions.current.details = e.nativeEvent.layout.y; }}>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Details</Text>
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
                        ref={detailsRef}
                        value={details}
                        style={{paddingLeft:H(1),marginLeft:H(.5),color:Black,marginTop:H(1)}}
                        placeholder='Type here'
                        placeholderTextColor={Grey}
                        multiline={true}
                        returnKeyType="default"
                        onFocus={scrollToDetailsAboveKeyboard}
                        onChangeText={(details) => setDetails(details)}/>
                </View>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Add Images</Text>
            <TouchableOpacity onPress={() => {selectImages()}}>
                <Text style={{color:ButtonClr,fontSize:16,fontFamily:'Poppins-Medium',marginRight:H(3),marginTop:H(1.5)}}>Upload</Text>
            </TouchableOpacity>
            </View>
            <View style={{
                height:H(12),
                width:W(87),
                backgroundColor:'#D4D4D4',
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                marginTop:H(.5),
                justifyContent:'center',
            }}>
            {images?.length > 0 ? (
            <View style={{height:H(10)}}>
            <ScrollView horizontal>
            {images?.map((item,i) => {
                return(
                    <ImageBackground key={i} borderRadius={H(1)} source={{uri:item?.url ? item?.url:item?.path}} style={{height:H(10),width:W(20),marginRight:H(.5),marginLeft:H(.5)}}>
                        <TouchableOpacity 
                        onPress={() => {
                        images.splice(i,1);
                        let ref = refresh+1;
                        setRefresh(ref);
                        }} 
                        style={{backgroundColor:ButtonClr,height:18,width:18,borderRadius:18/2,alignItems:'center',justifyContent:'center',marginRight:H(.3),marginTop:H(.2),alignSelf:'flex-end'}}>
                            <Entypo name={'cross'} size={18} color={White} />
                        </TouchableOpacity>
                    </ImageBackground>
                )
            })}
            </ScrollView>
            </View>
            ):null}
            </View>
            <TouchableOpacity 
            onPress={() => {
                if(images?.length === 0){
                    alert("Please Select Image");
                } else if(isloading === false){
                    addNewTicket();
                }
                // navigate('Ticket')
            }}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:Blue,
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(10),
                alignItems:'center',
                justifyContent:'center',
                marginBottom:H(2)
            }}>
                {isloading === true ? (
                    <ActivityIndicator size={'small'} color={White} />
                ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Make Complaint</Text>}
            </TouchableOpacity>

            <Modal visible={showModal} animationType={'fade'} transparent={true}>
                <View style={{
                    flex:1,
                    backgroundColor:'#F5F6F7'
                }}>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:H(6),marginBottom:H(2)}}>
                <TouchableOpacity
                onPress={() => {setShowModal(false)}}
                style={{
                    height:H(4),
                    width:W(9),
                    borderWidth:H(.1),
                    borderColor:Grey,
                    borderRadius:H(.5),
                    marginLeft:H(3),
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <Ionicons name={'arrow-back'} size={22} color={Grey} />
                </TouchableOpacity>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>{selectionType}</Text>
                </View>
                {selectionType === 'Select Category' ? (<>
                    {category?.map((item,i) => {
                    return(
                        <TouchableOpacity
                        onPress={() => {
                            setSelectCategory(item);
                            getSubCategory(item?.id);
                            setShowModal(false);
                        }}
                        style={{
                            height:H(6.5),
                            width:W(87),
                            backgroundColor:White,
                            borderWidth:H(.1),
                            borderColor:item?.title === selectCategory?.title ? ButtonClr:LightGrey,
                            alignSelf:'center',
                            elevation:1,
                            borderRadius:H(.5),
                            justifyContent:'center',
                            marginTop:H(2),
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <Text style={{color:item?.title === selectCategory?.title ? ButtonClr:Black,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>{item?.title}</Text>
                        </TouchableOpacity>
                        )
                    })}
                </>):null}
                {selectionType === 'Select Department' ? (
                <>
                {departmentData?.map((item,i) => {
                    return(
                        <TouchableOpacity
                        onPress={async () => {
                            setSelectProduct('');
                            setCategory('');
                            setSelectSubCategory('');
                            setSelectChildBySubCategory('');
                            setSelectCategory('');
                            setSelectDepartment(item);
                            setShowModal(false);
                            const serRes = await services(user?.token, item?.id);
                            const serviceRecords = serRes?.data?.records;
                            setProduct(serviceRecords);
                        }}
                        style={{
                            height:H(6.5),
                            width:W(87),
                            backgroundColor:White,
                            borderWidth:H(.1),
                            borderColor:item?.title === selectDepartment?.title ? ButtonClr:LightGrey,
                            alignSelf:'center',
                            elevation:1,
                            borderRadius:H(.5),
                            justifyContent:'center',
                            marginTop:H(2),
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <Text style={{color:item?.title === selectDepartment?.title ? ButtonClr:Black,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>{item?.title}</Text>
                        </TouchableOpacity>
                    )
                })}
                </>
                ):null}
                {selectionType === 'Select Product/Service' ? (
                <>
                {product?.map((item,i) => {
                    return(
                        <TouchableOpacity
                        onPress={async () => {
                            setSelectProduct(item);
                            setShowModal(false);
                            const catRes = await categories(user?.token, item?.id);
                            const catRecords = catRes?.data?.records;
                            setCategory(catRecords);
                            getSubCategory(item?.id);
                        }}
                        style={{
                            height:H(6.5),
                            width:W(87),
                            backgroundColor:White,
                            borderWidth:H(.1),
                            borderColor:item?.title === selectProduct?.title ? ButtonClr:LightGrey,
                            alignSelf:'center',
                            elevation:1,
                            borderRadius:H(.5),
                            justifyContent:'center',
                            marginTop:H(2),
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <Text style={{color:item?.title === selectProduct?.title ? ButtonClr:Black,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>{item?.title}</Text>
                        </TouchableOpacity>
                    )
                })}
                </>):null}
                {selectionType === 'Select Sub Category' ? (
                <>
                {subCategory?.map((item,i) => {
                    return(
                        <TouchableOpacity
                        onPress={() => {
                            setSelectSubCategory(item);
                            setShowModal(false);
                            getChildBySubCategory(item?.id)
                        }}
                        style={{
                            height:H(6.5),
                            width:W(87),
                            backgroundColor:White,
                            borderWidth:H(.1),
                            borderColor:item?.title === selectSubCategory?.title ? ButtonClr:LightGrey,
                            alignSelf:'center',
                            elevation:1,
                            borderRadius:H(.5),
                            justifyContent:'center',
                            marginTop:H(2),
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <Text style={{color:item?.title === selectSubCategory?.title ? ButtonClr:Black,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>{item?.title}</Text>
                        </TouchableOpacity>
                    )
                })}
                </>):null}
                {selectionType === 'Select Child By Sub Category' ? (
                <>
                {childBySubCategory?.map((item,i) => {
                    return(
                        <TouchableOpacity
                        onPress={() => {
                            setSelectChildBySubCategory(item);
                            setShowModal(false);
                        }}
                        style={{
                            height:H(6.5),
                            width:W(87),
                            backgroundColor:White,
                            borderWidth:H(.1),
                            borderColor:item?.title === selectChildBySubCategory?.title ? ButtonClr:LightGrey,
                            alignSelf:'center',
                            elevation:1,
                            borderRadius:H(.5),
                            justifyContent:'center',
                            marginTop:H(2),
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <Text style={{color:item?.title === selectChildBySubCategory?.title ? ButtonClr:Black,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>{item?.title}</Text>
                        </TouchableOpacity>
                    )
                })}
                </>):null}

                </View>
            </Modal>

        </KeyboardAwareScrollView>
    );
};

export default AddTicket;