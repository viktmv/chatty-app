import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {type} = this.props
    
    if (type === 'incomingMessage')
      return (
        <div className="message">
          <span className="message-username">{this.props.name}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    else return (
        <div className="message system">
          {this.props.content}
        </div>
      )
  }
}

export default Message
