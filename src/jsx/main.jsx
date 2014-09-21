/** @jsx React.DOM */
define(
  [
    'jsx/uploader'
  ]
  , function 
  (
    Uploader
  ) {
    var Vinylize = React.createClass({
      render: function() {
        return (
          <div>
            <Uploader />
          </div>
        );
      }
    });

    return React.renderComponent.bind(React, <Vinylize />, document.getElementById('react-root'));
});