/** @jsx React.DOM */

var OverlayTriggerMixin = require('react-bootstrap').OverlayTriggerMixin;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;

// Our custom component is managing wether the Modal is visible
var CustomTrigger = React.createClass({
  mixins: [OverlayTriggerMixin],

  getInitialState: function () {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function () {
    return (
      <Button onClick={this.handleToggle} bsStyle="primary">{this.props.children}</Button>
    );
  },

  // This is called by `OverlayTriggerMixin` when this
  // component is mounted or updated and the return value
  // is appended to the body
  renderOverlay: function () {
    if (this.state.isModalOpen) {
      return (
        <Modal title={'# ' + this.props.data.pos + ' ' + this.props.data.children} onRequestHide={this.handleToggle}>
          <div className="modal-body">
            <h2>
              {this.props.data.text}
            </h2>
            <div>
              {this.props.data.desc}
            </div>
          </div>
          <div className="modal-footer">
            <Button onClick={this.handleToggle}>Close</Button>
          </div>
        </Modal>
      )
    }

    return <span/>;
  }
});

module.exports = CustomTrigger;