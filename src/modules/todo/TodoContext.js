import React, {Component, createContext} from 'react';
import {
  Alert
} from 'react-native';
import {
  addNote, updateNote,
  deleteNote,
  getAllNotes, filterNoteByStatus, noteStatus
} from './TodoAction';

const TodoContext = createContext({
  data: [],
  deleteNote: () => {},
  changeStatus: () => {},
  textInput: "",
  updateTextInput: () => {},
  addTodo: () => {},
  isLoading: false,
  upateIsLoading: () => {},
  selectedStatus: '',
  onSelectedStatus: () => {},
  toggleAction: () => {}
});

export class TodoProvider extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      deleteNote: this.deleteNote,
      changeStatus: this.changeNoteStatus,
      textInput: "",
      updateTextInput: this.updateTextInput,
      addTodo: this.addTodo,
      isLoading: false,
      upateIsLoading: this.upateIsLoading,
      selectedStatus: '',
      onSelectedStatus: this.onSelectedStatus,
      toggleAction: this.toggleAction
    };

  }

  componentDidMount() {
    this.unsubscribe = getAllNotes().onSnapshot((querySnapshot) => {
      let data = [];
      console.log('querySnapshot', querySnapshot)
      this.onSelectedStatus('')
      querySnapshot.forEach((doc) => {
        const {content, status} = doc.data();
        data.push({
          key: doc.id,
          content: content || "",
          status: status || "",
        });
      });

      this.setState({
        data: data,
      });
    })
  }

  filterData = (status) => {
    if (status === "") {
      return getAllNotes()
    } else {
      return filterNoteByStatus(status)
    }
  }

  componentWillUnmount() {
    this.unsubscribe = null
  }

  updateTextInput = (value) => {
    this.setState({textInput: value});
  }

  addTodo = (text) => {
    addNote(text)
  }

  changeNoteStatus = (id, status) => {
    this.upateIsLoading(true)
    updateNote(id, status).then(() => {this.upateIsLoading(false)}).catch(() => {
      this.upateIsLoading(false)
      Alert.alert(
        'UPDATE STATUS FAIL',
        'Update note status fail. Please try again',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    })
  }

  deleteNote = (id) => {
    this.upateIsLoading(true)
    deleteNote(id).then(() => {
      this.upateIsLoading(false)

    }).catch(() => {
      this.upateIsLoading(false)
      Alert.alert(
        'DELETE FAIL',
        'Delete note fail. Please try again',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    })
  }

  upateIsLoading = (status) => {
    this.setState({isLoading: status})
  }

  getDataFromQuerySnapShot = (querySnapshot) => {
    let data = [];
    console.log('get querySnapshot', querySnapshot)
    querySnapshot.forEach((doc) => {
      const {content, status} = doc.data();
      data.push({
        key: doc.id,
        content: content || "",
        status: status || "",
      });
    });

    this.setState({
      data: data,
    });
    this.upateIsLoading(false)
  }

  onSelectedStatus = (status) => {
    this.upateIsLoading(true)
    this.setState({selectedStatus: status})
    this.filterData(status).get().then(this.getDataFromQuerySnapShot)
      .catch(err => {
        this.upateIsLoading(false)
        console.log('ERROR', err)
      })
  }

  toggleAction = () => {
    if (this.state.selectedStatus === "") return
    this.upateIsLoading(true)
    let status = this.state.selectedStatus === noteStatus.done ? noteStatus.active : noteStatus.done
    this.setState({selectedStatus: status})
    this.filterData(status).get().then(this.getDataFromQuerySnapShot)
      .catch(err => {
        this.upateIsLoading(false)
        this.setState({selectedStatus: ''})
        console.log('ERROR', err)
      })
  }

  render() {
    return (
      <TodoContext.Provider value={this.state}>
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export const TodoConsumer = TodoContext.Consumer;
