/** @jsx React.DOM */
define(function () {
  var Vinylize = React.createClass({
    render: function() {
      return (
        <div />
      );
    }
  });

  return React.renderComponent.bind(React, <Vinylize />, document.body);
});