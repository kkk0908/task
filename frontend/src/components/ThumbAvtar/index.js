import React from "react";
import Avatar from "@material-ui/core/Avatar";
const img = require("../../assets/img/user.png");

export default class ThumbAvtar extends React.Component {
  state = {
    loading: true,
    thumb: img,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<Avatar
      src={thumb}
      style={{ height: "100px", width: "100px", border: '1px' }}
    />);
  }
}
