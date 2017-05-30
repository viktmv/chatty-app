import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      counter: 0
    }
    this.newID = this.newID.bind(this);
  }
  newID() {
    return this.state.counter++
  }

  render() {

    let {name} = this.state.currentUser
    return (
      <div>
        <Nav></Nav>
        <MessageList messages={this.state.messages} newID={this.newID}></MessageList>
        <ChatBar user={name}></ChatBar>
      </div>
    );
  }
}
export default App;
