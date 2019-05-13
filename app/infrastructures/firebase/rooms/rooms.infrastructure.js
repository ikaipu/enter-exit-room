import { firestore } from '../firebase.infrastructure';

const ROOMS_COLLECTION = 'rooms';

const addUserAndRoom = async (roomId: string, userId: string) => {
  const roomRef = firestore.collection(ROOMS_COLLECTION).doc(roomId);
  const userRef = firestore.collection(ROOMS_COLLECTION).doc(roomId);
  const roomSnapShot = await roomRef.get();
  if (roomSnapShot.exists) {
    const room = roomSnapShot.data();
    const batch = firestore.batch();
    batch.update(roomRef, { users: { ...room.users, [userId]: true } });
    batch.set(userRef, { roomId }, { merge: true });
    return batch.commit();
  }
  return null;
};

const subscribeRoom = (roomId: string, emit: Function) => {
  const roomRef = firestore.collection(ROOMS_COLLECTION).doc(roomId);
  const unsubscribeRoom = roomRef.onSnapshot(roomSnapShot => {
    const room = roomSnapShot.data();
    emit(room);
  });
  return unsubscribeRoom;
};

export { addUserAndRoom, subscribeRoom };
