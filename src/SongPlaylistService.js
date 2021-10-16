const { Pool } = require('pg');

class SongPlaylistService {
  constructor(songService) {
    this._pool = new Pool();
    this._songService = songService;
  }

  async getUserSongPlaylist(id) {
    const result = await this._pool.query({
      text: `SELECT song_playlists.playlist_id, songs.* FROM song_playlists
      LEFT JOIN songs ON songs.id = song_playlists.song_id
      WHERE song_playlists.playlist_id = $1`,
      values: [id],
    });

    return result.rows;
  }
}

module.exports = SongPlaylistService;
