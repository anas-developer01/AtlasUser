import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Black, Blue, ButtonClr, Feather, Grey, H, Ionicons, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { chat, getChatByID, sendMessageByID, send_message } from "../../api/support";

const Chat = (props) => {
  const { goBack } = props.navigation;
  const { user } = useContext(AppContext);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
  const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
    // Force re-render the whole screen when keyboard hides
    setRerenderKey(prev => prev + 1);
  });

    return () => keyboardDidHideListener.remove();
  }, []);

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    if (props?.route?.params?.item?.id) {
      const chatRes = await getChatByID(
        user?.token,
        props?.route?.params?.item?.employee_id?.id,
        props?.route?.params?.item?.id
      );
      setMessages(chatRes?.data);
    } else {
      const chatRes = await chat(user?.token);
      setMessages(chatRes?.data);
    }
  };

  const sendChat = async () => {
    if (!text.trim()) return;
    if (props?.route?.params?.item?.id) {
      const data = {
        ticket_id: props?.route?.params?.item?.id,
        member_id: props?.route?.params?.item?.employee_id?.id,
        message: text,
      };
      await sendMessageByID(user?.token, data);
    } else {
      const data = { receiver_id: 1, message: text };
      await send_message(user?.token, data);
    }
    getChat();
    setMessages([...messages, { message: text, sender_id: user?.id }]);
    setText('');
  };

  return (
    <SafeAreaView key={rerenderKey} style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback>
          <View style={{ flex: 1 }}>
            
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: H(5) }}>
              <TouchableOpacity
                onPress={() => goBack()}
                style={{
                  height: H(4),
                  width: W(9),
                  borderWidth: H(0.1),
                  borderColor: Grey,
                  borderRadius: H(0.5),
                  marginLeft: H(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name={'arrow-back'} size={22} color={Grey} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Black,
                  fontSize: 16,
                  width: W(64),
                  fontFamily: 'Poppins-Medium',
                  marginLeft: H(2),
                  marginTop: H(1),
                }}
              >
                {props?.route?.params?.item?.employee_id
                  ? props?.route?.params?.item?.employee_id?.name
                  : 'Support'}
              </Text>
            </View>

            {/* Messages */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: H(1.5) }}
            //   contentContainerStyle={{ paddingBottom: H(2) }}
            >
              {messages?.map((item, i) => (
                <View key={i}>
                  {item?.sender_id === user?.id ? (
                    <View
                      style={{
                        width: W(80),
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        marginTop: H(2),
                        marginRight: H(3),
                      }}
                    >
                      <Text
                        style={{
                          color: Grey,
                          fontSize: 10,
                          marginRight: H(1),
                          fontFamily: 'Poppins-Regular',
                        }}
                      >
                        {item?.created_at
                          ? new Date(item?.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : null}
                      </Text>
                      <Text
                        style={{
                          color: White,
                          backgroundColor: '#CA201C',
                          fontSize: 11,
                          fontFamily: 'Poppins-Regular',
                          paddingHorizontal: H(1.5),
                          paddingVertical: H(1),
                          borderRadius: H(0.5),
                        }}
                      >
                        {item?.message}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: W(80),
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: H(3),
                        marginTop: H(2),
                      }}
                    >
                      <Text
                        style={{
                          color: White,
                          backgroundColor: Blue,
                          fontSize: 11,
                          fontFamily: 'Poppins-Regular',
                          paddingHorizontal: H(1.5),
                          paddingVertical: H(1),
                          borderRadius: H(0.5),
                        }}
                      >
                        {item?.message}
                      </Text>
                      <Text
                        style={{
                          color: Grey,
                          fontSize: 10,
                          marginLeft: H(1),
                          fontFamily: 'Poppins-Regular',
                        }}
                      >
                        09:06 am
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Input */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: H(1.5),
                paddingHorizontal: H(2),
                // backgroundColor: '#fff',
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: White,
                  borderRadius: H(1),
                  borderWidth: H(0.1),
                  borderColor: Grey,
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder="Type here"
                  placeholderTextColor={Grey}
                  style={{ color: Black, paddingHorizontal: H(1) }}
                />
              </View>
              <TouchableOpacity
                onPress={sendChat}
                style={{
                  height: H(6),
                  width: W(14),
                  backgroundColor: ButtonClr,
                  marginLeft: H(1),
                  borderRadius: H(1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name={'send'} size={22} color={White} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;