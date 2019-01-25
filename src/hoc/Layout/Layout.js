import React, { Component } from "react";
import Eject from "../Eject/Eject";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// We moved Layout to hoc because it wraps the BurgerBuilder
// in the App comp.

// Child of App
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ showSideDrawer: window.innerWidth < 500 });
    });
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    if (window.innerWidth < 500) {
      this.setState(prevState => {
        return { showSideDrawer: !prevState.showSideDrawer };
      });
    }
  };

  render() {
    return (
      <Eject>
        <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Eject>
    );
  }
}

export default Layout;
