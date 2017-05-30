import React, {Component} from 'react';


const defaultState = {content: '', username: ''}

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder='Your name here'
          onChange={this.updateUser}
          value= {this.state.username} />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleInput}
          onKeyPress={this.submitInput} />
      </footer>
    )
  }

  handleInput = (e) => {
    this.setState({content: e.target.value})
  }

  submitInput = (e) => {
    let content = this.state.content
    let username = this.state.username || 'Anonymous'

    if (e.key === 'Enter') {
      this.props.insertMessage({content, username})
      this.setState(defaultState)
    }
  }
  updateUser = (e) => {
    this.setState({username: e.target.value})
  }
}

export default ChatBar
