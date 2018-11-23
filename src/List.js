import React, { Component } from 'react';

const getAge = (birth) => {
  let getCurrentYear = new Date().getFullYear(),
    getUserYear = () => birth.split("-", 3).filter(src => Number(src.length === 4));
  return function () { return getCurrentYear - getUserYear() }()
}

class List extends Component {
  constructor(props){
    super(props)
    this.handle = this.handle.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.state ={
      fading: false,
      a: false,
      startX: '',
      endX: ''
    }
  }

  handle(startX, endX, left, right, target){
    endX - startX < 0 ? left(target) : right(target)
  }
  mouseDown(event){
    this.setState({
      startX: event.clientX
    })
  }
  mouseLeave(event){
    this.setState({
      endX: event.clientX
    })
    this.handle(this.state.startX, this.state.endX, this.left, this.right, event.target)
  }
  left(e){
    e.style.background = '#D8335B';
    this.props.click(this.props.user._id);
    this.setState({fading: true})
    setTimeout(()=>{
      this.setState({a: true})
    }, 500)
  }
  right(e){
    e.style.background = '#2C82C9';
    this.props.click(this.props.user._id);
    this.setState({fading: true})
    setTimeout(()=>{
      this.setState({a: true})
    }, 500)
  }
  render(){
    const { user } = this.props;
    const { fading, a } = this.state;
    const age = getAge(user.birth)
    return (
        <div className={fading ? "active": "list"} id={a ? "aa": ""} onMouseDown={this.mouseDown} onMouseUp={this.mouseLeave}>
          <ul>
            <li>id: {user._id}</li>
            <li>avatar: {user.avatar}</li>
            <li>firstName: {user.name.first}</li>
            <li>LastName: {user.name.last}</li>
            <li>old: {age}</li>
          </ul>
        </div>
    )
  }
}

export default List;
// onClick={this.handle}