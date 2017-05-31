import React, {Component} from 'react';

const defaultState = {content: ''}

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
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

      this.updateUser(e)
      this.props.insertMessage({type: "postNotification", content, username})
    }
  }
  submitInput = e => {
    let content = this.state.content
    let username = this.state.username || 'Anonymous'

    if (e.key === 'Enter') {
      this.props.insertMessage({type: "postMessage", content, username})
      this.setState(defaultState)
    }

    this.props.setCurrentUser(username)
  }
  updateUser = (e) => {
    this.setState({username: e.target.value})
  }
}

export default ChatBar
