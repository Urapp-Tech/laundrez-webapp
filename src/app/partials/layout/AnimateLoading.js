import React from 'react';
import { withRouter } from 'react-router-dom';
import { Progress } from 'reactstrap';

class AnimateLoading extends React.Component {
  animateTimeout;
  stopAnimateTimeout;
  state = {
    width: 0,
    routeChanged: false
  };

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.animate();
    }
  }

  animate() {
    this.animateTimeout = setTimeout(() => {
      if (this.state.width <= 100) {
        this.setState({ width: this.state.width + 10 });
        this.animate();
      } else {
        this.stopAnimate();
      }
    }, 30);
  }
  stopAnimate() {
    clearTimeout(this.animateInterval);
    this.stopAnimateTimeout = setTimeout(() => {
      this.setState({ width: 0 });
    }, 300);
  }
  componentWillUnmount() {
    if (this.stopAnimateTimeout) {
      clearTimeout(this.stopAnimateTimeout);
    }
    if (this.animateTimeout) {
      clearTimeout(this.animateTimeout);
    }
  }
  render() {
    return (
      <div
        className="header-progress-bar"
        style={{ height: '3px', width: '100%' }}
      >
        {this.state.width > 0 && (
          <Progress value={this.state.width} style={{ height: '3px' }} />
        )}
      </div>
    );
  }
}

export default withRouter(AnimateLoading);
