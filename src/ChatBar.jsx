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
          onKeyPress={this.handleUsernameInput}
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

  handleUsernameInput = e => {
    if (e.key === 'Enter') this.updateUser(e.target.value)
  }

  updateUser = newUsername => {
    let prevName = this.state.username || 'Anonymous'
    let username = newUsername
    let content = `${prevName} changed their name to ${username}`
    let {colour} = this.props

    this.setState({username})
    this.props.insertMessage({
      type: "postNotification",
      content,
      username,
      colour
    })
  }

  submitInput = e => {

    let {content} = this.state
    let username = this.state.username || 'Anonymous'
    let {colour} = this.props

    if (e.key === 'Enter') {
      let usernameInput = document.querySelector('.chatbar-username').value
      if (usernameInput && username == 'Anonymous') {
        this.updateUser(usernameInput)
        username = usernameInput
      }

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
}

export default ChatBar
