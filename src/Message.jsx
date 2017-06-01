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
          <span className={`message-username ${this.props.colour}`}>{this.props.name}</span>
          <span className="message-content">{this.imgCheck()}</span>
        </div>
      )
    else return (
        <div className="message system">
          {this.props.content}
        </div>
      )
  }

  imgCheck() {
    return /\.(jpe?g)|(png)|(gif)$/gi.test(this.props.content)
    ? <img src={this.props.content} style={{width: '60%'}} />
    : this.props.content
  }
}

export default Message
