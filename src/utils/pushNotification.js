import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import { saveUserDeviceToken } from '../api/auth';

/**
 * Request Notification Permission
 */
export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    }

    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    }

    return false;
  } catch (error) {
    console.log('Permission error:', error);
    return false;
  }
};

/**
 * Get FCM Token
 */
export const getFCMToken = async () => {
  try {
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) return null;

    let token = await AsyncStorage.getItem('fcmtoken');

    if (!token) {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
        console.log('New FCM Token:', token);
      }
    }
    console.log(token, 'fcm token');

    messaging().onTokenRefresh(async (newToken) => {
      console.info('token refresh called:', newToken);
      await AsyncStorage.setItem('fcmtoken', newToken);
      const storedUser = await AsyncStorage.getItem('UserData');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData?.token) {
          saveUserDeviceToken(userData.token, { device_token: newToken });
        }
      }
    });

    return token;
  } catch (error) {
    console.error('FCM Token Error:', error);
    return null;
  }
};

export const updateDeviceTokenWithBackend = async (userToken) => {
  try {
    const fcmToken = await getFCMToken();
    if (fcmToken && userToken) {
      const res = await saveUserDeviceToken(userToken, { device_token: fcmToken });
      console.log('FCM Token Saved to Backend:', res);
      return res;
    }
  } catch (error) {
    console.error('Error updating device token with backend:', error);
  }
};

/**
 * Setup Notification Listeners
 */
export const notificationListener = (onNotificationPress) => {
  // Foreground messages
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message:', remoteMessage);
  });

  // App opened from background
  const unsubscribeOpened = messaging().onNotificationOpenedApp(
    remoteMessage => {
      console.log('Opened from background:', remoteMessage);
      if (onNotificationPress) {
        onNotificationPress(remoteMessage);
      }
    },
  );

  // App opened from quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Opened from quit state:', remoteMessage);
        if (onNotificationPress) {
          onNotificationPress(remoteMessage);
        }
      }
    });

  // Token refresh
  const unsubscribeTokenRefresh = messaging().onTokenRefresh(async newToken => {
    console.log('Token refreshed:', newToken);
    await AsyncStorage.setItem('fcmtoken', newToken);
    const storedUser = await AsyncStorage.getItem('UserData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData?.token) {
        saveUserDeviceToken(userData.token, { device_token: newToken });
      }
    }
  });

  // Return unsubscribe cleanup
  return () => {
    unsubscribeOnMessage();
    unsubscribeOpened();
    unsubscribeTokenRefresh();
  };
};