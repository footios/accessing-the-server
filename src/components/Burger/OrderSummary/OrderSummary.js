import React, { Component } from "react";
import Eject from "../../../hoc/Eject/Eject";
import Button from "../../UI/Button/Button";

// Note: the Modal wraps the OrderSummary and that of course
// means that whenever ingredients or the price changes
// since these are props of orderSummary, orderSummary will be re-rendered
// however if the modal is not visible, we don't need to do that.
// So actually only if the modal is shown,
// re-rendering of that wrapped element makes sense...
// So we'll use lifecycle hooks to improve performance

// child of BurgerBuiler
class OrderSummary extends Component {
  //  this could be a functional component,
  // doesn't have to be a class.
  componentWillUpdate() {
    console.log("OrderSummary will update");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkey, i) => {
        return (
          <li key={igkey + i}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );
    return (
      <Eject>
        <h3>Your Order</h3>
        <p>Burger ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanselled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Eject>
    );
  }
}

export default OrderSummary;
