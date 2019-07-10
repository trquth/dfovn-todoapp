import firebase from 'react-native-firebase';

const ref = firebase.firestore().collection('todos');
export const noteStatus = {
  done: "DONE",
  active: "ACTIVE"
}

export const addNote = (content) => {
  ref.add({
    content: content,
    status: noteStatus.active,
  });
}

export const updateNote = (id, currentStatus) => {
  return firebase
    .firestore()
    .runTransaction(async transaction => {
      const doc = await transaction.get(ref.doc(id));

      if (!doc.exists) {
        return Promise.reject("Doc don't exist")
      }

      ref.doc(id).update({
        status: currentStatus === noteStatus.active ? noteStatus.done : noteStatus.active,
      });
      return doc
    })
}

export const deleteNote = (id) => {
  return firebase
    .firestore()
    .runTransaction(async transaction => {
      const doc = await transaction.get(ref.doc(id));

      if (!doc.exists) {
        return Promise.reject("Doc don't exist")
      }
      ref.doc(id).delete();
      return doc
    })
}

export const filterNoteByStatus = (status) => {
  ref.where('status', '==', status).onSnapshot((querySnapshot) => {
    console.log('querySnapshot', querySnapshot)
  })
}

export const getAllNotes = () => {
  return ref
}

