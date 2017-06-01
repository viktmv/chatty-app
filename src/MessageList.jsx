import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    let {messages} = this.props
    return (
      <main className="messages">
          {messages.map(message => {
            return <Message key={message.id} colour={message.colour} name={message.username} content={message.content} type={message.type}></Message>
          })}
      </main>
    )
  }
}

export default MessageList
