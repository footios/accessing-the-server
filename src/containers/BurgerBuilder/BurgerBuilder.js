import React, { Component } from "react";
import Eject from "../../hoc/Eject/Eject";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    //object of ingredients
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    // const sum = Object.values(ingredients).reduce((acc, elem) => {
    //   return acc + elem;
    // }, 0);

    const sum = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, elem) => {
        return acc + elem;
      }, 0);

    // this.setState({ purchasable: sum === 0 ? false : true });
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDiduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDiduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCanselHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("You continue!");

    //Let's send an order:
    // Note: In real world apps, you wouldn't do the calculation on the page,
    // but on the server. Otherwise the client could manipulate them.
    const order = {
      ingredinets: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Foti",
        address: {
          street: "testStreet 1",
          zipCode: "2356",
          country: "Greece"
        },
        email: "test@otest.com"
      },
      deliveryMethod: "fastest"
    };

    // especially fro firebase, we add .json
    axios
      .post("/orders.json", order)
      .then(response => console.log(response))
      .then(error => console.log(error));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // Here we assing to the value a boolean => true/false
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Eject>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCanselHandler}
        >
          <OrderSummary
            price={this.state.totalPrice.toFixed(2)}
            purchaseCanselled={this.purchaseCanselHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Eject>
    );
  }
}

export default BurgerBuilder;
