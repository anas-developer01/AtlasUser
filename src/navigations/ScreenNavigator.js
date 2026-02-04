import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/splash/Splash';
import Onboard from '../screens/onboard/Onboard';
import SignIn from '../screens/signin/SignIn';
import SignUp from '../screens/signup/SignUp';
import Forgot from '../screens/forgot/Forgot';
import Home from '../screens/home/Home';
import AddTicket from '../screens/addticket/AddTicket';
import Ticket from '../screens/ticket/Ticket';
import InProgress from '../screens/inprogress/InProgress';
import AllTickets from '../screens/alltickets/AllTickets';
import Profile from '../screens/profile/Profile';
import EditProfile from '../screens/editprofile/EditProfile';
import Inbox from '../screens/inbox/Inbox';
import Chat from '../screens/chat/Chat';
import Pending from '../screens/pending/Pending';
import FeedBack from '../screens/feedback/FeedBack';
import ChangePassword from '../screens/changepassword/ChangePassword';
import SinglePost from '../screens/singlepost/SinglePost';
import Otp from '../screens/otp/Otp';
import ResetPassword from '../screens/resetpassword/ResetPassword';

const Stack = createNativeStackNavigator();

export const  ScreenNavigator = (props) => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
      <Stack.Screen name="Onboard" component={Onboard} options={{headerShown:false}}/>
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="Forgot" component={Forgot} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="AddTicket" component={AddTicket} options={{headerShown:false}}/>
      <Stack.Screen name="Ticket" component={Ticket} options={{headerShown:false}}/>
      <Stack.Screen name="InProgress" component={InProgress} options={{headerShown:false}}/>
      <Stack.Screen name="AllTickets" component={AllTickets} options={{headerShown:false}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
      <Stack.Screen name="Inbox" component={Inbox} options={{headerShown:false}}/>
      <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
      <Stack.Screen name="Pending" component={Pending} options={{headerShown:false}}/>
      <Stack.Screen name="FeedBack" component={FeedBack} options={{headerShown:false}}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
      <Stack.Screen name="SinglePost" component={SinglePost} options={{headerShown:false}}/>
      <Stack.Screen name="Otp" component={Otp} options={{headerShown:false}}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}