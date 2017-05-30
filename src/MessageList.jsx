import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {

    let {messages} = this.props
    let {newID }= this.props
    return (
      <main className="messages">
          {messages.map(message => {

            return <Message key={newID()} name={message.username} content={message.content}></Message>
          })}
          <div className="message system">
            Anonymous1 changed their name to nomnom.
          </div>
      </main>
    )
  }
}

export default MessageList
