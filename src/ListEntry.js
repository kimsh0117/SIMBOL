import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import List from './List';

const ListEntry = ({ users, click }) => {
  const lists = users.map((user, index) => <List user={user} key={index} click={click}/>);
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
    {lists}
    </ReactCSSTransitionGroup>
  )
}

export default ListEntry;