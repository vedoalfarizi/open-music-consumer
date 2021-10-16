class Listener {
  constructor(songPlaylistService, mailSender) {
    this._songPlaylistService = songPlaylistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { songPlaylistId, targetEmail } = JSON.parse(message.content.toString());

      const songPlaylist = await this._songPlaylistService.getUserSongPlaylist(songPlaylistId);
      console.log(JSON.stringify(songPlaylist), 'traceContent');
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songPlaylist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
