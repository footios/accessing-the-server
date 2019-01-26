import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Eject from "../Eject/Eject";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    UNSAFE_componentWillMount = () => {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          console.log(error);

          this.setState({ error: error });
        }
      );
    };

    // prevent memory leaks
    componentWillUnmount = () => {
      console.log("Will Unmount", this.reqInterceptor, this.resInterceptor);

      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    };

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
