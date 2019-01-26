import React, { Component } from "react";
import classes from "./Modal.module.css";
import Eject from "../../../hoc/Eject/Eject";
import Backdrop from "../Backdrop/Backdrop";

// child of BurgerBuilder
class Modal extends Component {
  // It should only update, if this.props.show changes...
  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.show);
    return (
      this.props.show !== nextProps.show ||
      nextProps.children !== this.props.children
    );
  }
  // So now, only if above is true Modal will update and also OrderSummary
  componentWillUpdate() {
    console.log("Modal will update");
  }
  render() {
    return (
      <Eject>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Eject>
    );
  }
}

export default Modal;
