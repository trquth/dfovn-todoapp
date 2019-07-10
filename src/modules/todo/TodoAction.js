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
    createDate: new Date()
  });
}

export const updateNote = (id, currentStatus) => {
  return firebase
    .firestore()
    .runTransaction(async transaction => {
      const doc = await transaction.get(ref.doc(id));

      if (!doc.exists) {
        return Promise.reject("Doc doesn't exist")
      }

      transaction.update(ref.doc(id), {
        status: currentStatus === noteStatus.active ? noteStatus.done : noteStatus.active
      })
      return doc
    })
}

export const deleteNote = (id) => {
  return firebase
    .firestore()
    .runTransaction(async transaction => {
      const doc = await transaction.get(ref.doc(id));

      if (!doc.exists) {
        return Promise.reject("Doc doesn't exist")
      }
      transaction.delete(ref.doc(id));
      return doc
    })
}

export const filterNoteByStatus = (status) => {
  return ref.where('status', '==', status)
}

export const getAllNotes = () => {
  return ref.orderBy('createDate', 'desc')
}

