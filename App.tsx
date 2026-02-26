import React, { useContext, useEffect } from 'react';
import { ScreenNavigator } from './src/navigations/ScreenNavigator';
import { AppContext } from './src/context/AppProvider';
import PushNotification, {
   PushNotificationObject,
} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging, {
   FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';


const App = () => {
   const { login } = useContext(AppContext);

   useEffect(() => {
      configurePushNotifications();
      createAndroidChannel();
      requestFCMPermission();

      const unsubscribe = messaging().onMessage(
         async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            console.log('Foreground FCM:', remoteMessage);

            if (!remoteMessage.notification) return;

            const localNotification: PushNotificationObject = {
               id: '0',
               title: remoteMessage.notification.title,
               message: remoteMessage.notification.body ?? '',
               channelId: 'com.atlasuser',
               playSound: true,
               soundName: 'default',
               importance: 'high',
               priority: 'high',
            };

            PushNotification.localNotification(localNotification);
         },
      );

      return unsubscribe;
   }, []);

   useEffect(() => {
      login();
   }, []);

   return (
      <>
         <ScreenNavigator />
      </>
   )
};




const configurePushNotifications = (): void => {
   PushNotification.configure({
      onRegister: (token: string) => {
         console.log('Push Token:', token);
      },

      onNotification: (notification: PushNotificationObject) => {
         console.log('Notification tapped:', notification);

         if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
         }
      },

      onRegistrationError: (err: Error) => {
         console.log('Registration Error:', err);
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
   });
};

const createAndroidChannel = (): void => {
   if (Platform.OS !== 'android') return;

   PushNotification.createChannel(
      {
         channelId: 'com.atlasuser',
         channelName: 'Atlas User Notifications',
         importance: 4,
         vibrate: true,
      },
      (created: any) => console.log(`Channel created: ${created}`),
   );
};

const requestFCMPermission = async (): Promise<void> => {
   if (Platform.OS === 'ios') {
      await messaging().requestPermission();
   }
};

export default App;