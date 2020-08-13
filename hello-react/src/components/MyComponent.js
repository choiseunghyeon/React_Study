import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  render() {
    const { name, number, children } = this.props;
    return (
      <div>
        안녕하세요 제 이름은 {name}
        children 값은 {children}
        <br />
        좋아하는 숫자는 {number}
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: "기본 이름",
};
MyComponent.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number.isRequired,
};

export default MyComponent;
