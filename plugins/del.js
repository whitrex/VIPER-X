const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const DEL_DESC = "Deletes The Replied Message Send By The Bot."
const Config = require('../config');

let farhan = Config.WORKTYPE == 'public' ? false : true

Asena.addCommand({pattern: 'del', fromMe: farhan, desc: DEL_DESC}, (async (message, match) => {

  await message.reply_message.delete();

}));

Asena.addCommand({pattern: 'delete', fromMe: farhan, desc: DEL_DESC}, (async (message, match) => {

  await message.reply_message.delete();

}));
