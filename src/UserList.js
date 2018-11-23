import React, { Component } from 'react';
import users from './mock';
import ListEntry from './ListEntry';

const TIMEOUT = 500;

class UserList extends Component {
  state = {
    users: [],
    page: 0,
    scrolling: true,
    startX: '',
    endX: ''
  }
  componentDidMount(){
    this.getUsers();
    window.addEventListener('scroll', () => this.handleScroll());
  }
  componentWillMount() {
    window.removeEventListener('scroll', () => this.handleScroll())
  }
  handleScroll(){
    const {scrolling} = this.state;
    if (scrolling) return;
    const lastDiv = document.querySelector('div.list:last-child');
    const lastDivOffset = lastDiv.offsetTop+lastDiv.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    let bottomOffset = 100;
    if(pageOffset > lastDivOffset - bottomOffset) this.loadMore();
  }
  getUsers() {
    return new Promise(resolve => {
      setTimeout(() => resolve(users), TIMEOUT)
    }).then(users => {
      if (this.state.page === 0) {
        let list = users.slice(this.state.page, this.state.page + 20);
        this.setState({
          users: list,
          scrolling: false
        })
        localStorage.setItem('users', JSON.stringify(list))
      } else {
        let list = [...this.state.users, ...users.slice(this.state.page * 20, (this.state.page * 20) + 20)]
        this.setState({
          users: list,
          scrolling: false
        })
        localStorage.setItem('users', JSON.stringify(list))
      }
    }
    )
  }
  loadMore = () => {
    this.setState(prevState=>({
      page: prevState.page +1,
      scrolling: true
    }), this.getUsers)
  }
  handleClick = (userid) => {
    let getlocalstorage = JSON.parse(localStorage.getItem("users")).filter(user => user._id !== userid )
    localStorage.setItem('users', JSON.stringify(getlocalstorage))
    console.log(JSON.parse(localStorage.getItem("users")))
  }
  render() {
    const { users, scrolling } = this.state
    return (
      <div>
        <ListEntry users={users} click={this.handleClick}/>
        {scrolling ? <h1>Loading...</h1> : ''}
      </div>
    )
  }
}

export default UserList;