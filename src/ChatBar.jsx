import React, {Component} from 'react';

const defaultState = {content: ''}

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      colour: props.colour
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder='Your name here'
          onKeyPress={this.newUsernameInput}
        />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleInput}
          onKeyPress={this.submitInput} />
      </footer>
    )
  }

  handleInput = e => {
    this.setState({content: e.target.value})
  }

  newUsernameInput = e => {
    if (e.key === 'Enter') {
      let prevName = this.state.username || 'Anonymous'
      let username = e.target.value
      let content = `${prevName} changed their name to ${username}`
      let colour = this.props.colour

      this.updateUser(e)
      this.props.insertMessage({
        type: "postNotification",
        content,
        username,
        colour
      })
    }
  }
  submitInput = e => {
    let content = this.state.content
    let username = this.state.username || 'Anonymous'
    let colour = this.props.colour

    if (e.key === 'Enter') {
      this.props.insertMessage({
        type: "postMessage",
        content,
        username,
        colour
      })
      this.setState({content: '', colour: this.props.colour})
    }

    this.props.setCurrentUser(username)
  }
  updateUser = (e) => {
    this.setState({username: e.target.value})
  }
}

export default ChatBar
