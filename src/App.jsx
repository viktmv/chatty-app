import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

const initialData = {
  currentUser: '',
  messages: [],
  usersOnline: 0
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialData
    this.socket = new WebSocket('ws://localhost:3001')
  }

  componentDidMount() {
    // Connect and handle incoming messages
    let {socket} = this
    socket.onopen = () => {
      console.log('Connected to server')
    }

    socket.onmessage = (event) => {
      let {message, counter, colour} = JSON.parse(event.data)

      if (colour) this.setState({ colour })
      if (counter) this.updateCounter(counter)
      if (message) this.updateMessage(message)
    }
  }

  render() {
    let {name} = this.state.currentUser || ''
    return (
      <div>
        <Nav count={this.state.usersOnline}></Nav>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar
          user={name}
          colour={this.state.colour}
          insertMessage={this.insertMessage}
          setCurrentUser={this.setCurrentUser}>
        </ChatBar>
      </div>
    );
  }

  updateCounter(counter) {
    this.setState({ usersOnline: counter})
  }

  updateMessage(message) {
    let exists
    this.state.messages.forEach(m => {
      exists = m.id === message.id
           ? true
           : false
    })

    if (exists) return

    this.setState(state => {
      state.messages.push(message)
    })
  }

  insertMessage = message => {
    this.socket.send(JSON.stringify({message}))
  }

  setCurrentUser = username => this.setState({currentUser: username})
}

export default App;
