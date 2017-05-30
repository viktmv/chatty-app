import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'


const incrementedID = (function() {
    let counter = 0
    return () => counter++
  })()

const initialData = {
  // currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: incrementedID()
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: incrementedID()
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialData
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: incrementedID(), username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 6000);
  }

  render() {
    let {name} = this.state.currentUser || ''
    return (
      <div>
        <Nav></Nav>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar user={name} insertMessage={this.insertMessage}></ChatBar>
      </div>
    );
  }

  insertMessage = message => {
    message.id = incrementedID()
    console.log(message)
    this.setState((state) => {
      state.messages.push(message)
      return state
    })
  }
}

export default App;
