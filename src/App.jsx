import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

const initialData = {
  currentUser: '',
  messages: []
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialData

    this.socket = new WebSocket('ws://localhost:3001')
  }

  componentDidMount() {
    let {socket} = this

    socket.onopen = () => {
      console.log('Connected to server')
    }

    socket.onmessage = (event) => {
      let {message} = JSON.parse(event.data)

      let exists
      this.state.messages.forEach(m => {
        exists = m.id === message.id
             ? true
             : false
      })

      if (exists) return

      this.setState(state => state.messages.push(message))
    }

    console.log("componentDidMount <App />");
  }

  render() {
    let {name} = this.state.currentUser || ''
    return (
      <div>
        <Nav></Nav>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar user={name} insertMessage={this.insertMessage} setCurrentUser={this.setCurrentUser}></ChatBar>
      </div>
    );
  }

  insertMessage = message => {
    console.log('message sent')
    this.socket.send(JSON.stringify({message}))
  }

  setCurrentUser = username => this.setState({currentUser: username})
}

export default App;
