import { Component } from "react";

export default class Async extends Component {
  state = {
    payload: null,
    isResolved: false,
    isRejected: false
  };

  componentDidMount() {
    this.props.promise
      .then(data => {
        this.setState({
          isResolved: true,
          payload: data
        });
      })
      .catch(() => {
        this.setState({ isRejected: true });
      });
  }

  render() {
    if (this.state.isResolved) {
      return this.props.onResolve(this.state.payload);
    }
    if (this.state.isRejected) {
      return this.props.onReject();
    }
    return this.props.onLoading();
  }
}
