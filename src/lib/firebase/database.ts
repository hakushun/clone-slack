import firebase from './firebase';

export const usersRef = firebase.database().ref('users');
export const channelsRef = firebase.database().ref('channels');
export const messagesRef = firebase.database().ref('messages');
export const privateMessagesRef = firebase.database().ref('privateMessages');
export const presenceRef = firebase.database().ref('presence');

export const connectedRef = firebase.database().ref('.info/connected');
