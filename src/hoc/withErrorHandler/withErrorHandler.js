import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Eject from "../Eject/Eject";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          console.log(error);

          this.setState({ error: error });
        }
      );
      this.state = {
        error: null
      };
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Eject>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Eject>
      );
    }
  };
};

export default withErrorHandler;
