require('dotenv').config();

const amqp = require('amqplib');
const SongPlaylistService = require('./SongPlaylistService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const songPlaylistService = new SongPlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(songPlaylistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistSongs', {
    durable: true,
  });

  channel.consume('export:playlistSongs', listener.listen, { noAck: true });
  console.log('consumer ready');
};

init();
