/** @jsx React.DOM */
define(
  [
    'dropzone',
    'mp3'
  ], function 
  (
    Dropzone
  ) {
  var Uploader = React.createClass({
    getInitialState: function() {
      return {
        dropzone: null
      };
    },
    playSong: function () {
      this.player.asset.start();
    },
    updateWaveForm: function (data) {
    },
    handleFilePicker: function (file, done) {
      var asset, player, uploader;

      uploader = this;
      player = AV.Player.fromFile(file);
      asset = player.asset;

      asset.on('decodeStart', function () {
        this.decoder.on('data', uploader.updateWaveForm.bind(uploader));
      });
      this.player = player;
    },
    componentDidMount: function () {
      this.dropzone = new Dropzone("div.dropzone", { url: "/file/post", accept: this.handleFilePicker.bind(this) });
      this.waveform = new Waveform({ container: document.getElementById("waveform"), data: [1, 0, 0.5, 0.2, 0.3] });
    },
    render: function() {
      return (
        <div>
          <div className="dropzone">
            Drop a file here
          </div>
          <div onClick={this.playSong} className="another">
          </div>
          <div id="waveform">
          </div>
        </div>
      );
    }
  });
  return Uploader;
});