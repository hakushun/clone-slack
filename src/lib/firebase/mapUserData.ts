export const mapUserData = (
  user: firebase.default.User,
): { id: string; username: string; avatarURL: string } => {
  const { uid, displayName, photoURL } = user;
  return {
    id: uid,
    username: displayName || 'undefined',
    avatarURL: photoURL || '',
  };
};
