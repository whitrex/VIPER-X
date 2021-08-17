/* Copyright 2021 (c) @TOXIC-DEVIL
   # Active Collaborator
   # Coded for Julie Mwol
   # OWNER @farhan-dqz
   # Made For Julie Mwol 
   Copyright 2021 (c) @TOXIC-DEVIL */

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');

const fs = require('fs');
const axios = require('axios');
const conf = require('../config');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');

let td = conf.WORKTYPE == 'public' ? false : true

var Desc = ''
if (Config.LANG == 'AZ') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'TR') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'EN') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'ML') Desc = 'റിപ്ല്യ്‌ ആയി നല്‍കുന്ന പാട്ട് കണ്ടെത്തുന്നു.*'
if (Config.LANG == 'ID') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'PT') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'RU') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'HI') Desc = 'Finds the Replied song/audio.'
if (Config.LANG == 'ES') Desc = 'Finds the Replied song/audio.'

var ldc = ''
if (Config.LANG == 'AZ') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'TR') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'EN') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'ML') ldc = '*നിങ്ങള്‍ ഒരു പാട്ട് റിപ്ല്യ്‌ ആയി നല്‍കണം*'
if (Config.LANG == 'ID') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'PT') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'RU') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'HI') ldc = '*You Must Reply To an Audio/Song!*'
if (Config.LANG == 'ES') ldc = '*You Must Reply To an Audio/Song!*'

var ldcc = ''
if (Config.LANG == 'AZ') ldcc = '*Artist:*'
if (Config.LANG == 'TR') ldcc = '*Artist:*'
if (Config.LANG == 'EN') ldcc = '*Artist:*'
if (Config.LANG == 'ML') ldcc = '*ആര്‍ട്ടിസ്റ്റ്:*'
if (Config.LANG == 'ID') ldcc = '*Artist:*'
if (Config.LANG == 'PT') ldcc = '*Artist:*'
if (Config.LANG == 'RU') ldcc = '*Artist:*'
if (Config.LANG == 'HI') ldcc = '*Artist:*'
if (Config.LANG == 'ES') ldcc = '*Artist:*'

var ldccc = ''
if (Config.LANG == 'AZ') ldccc = '*Title:*'
if (Config.LANG == 'TR') ldccc = '*Title:*'
if (Config.LANG == 'EN') ldccc = '*Title:*'
if (Config.LANG == 'ML') ldccc = '*പേര്:*'
if (Config.LANG == 'ID') ldccc = '*Title:*'
if (Config.LANG == 'PT') ldccc = '*Title:*'
if (Config.LANG == 'RU') ldccc = '*Title:*'
if (Config.LANG == 'HI') ldccc = '*Title:*'
if (Config.LANG == 'ES') ldccc = '*Title:*'

Asena.addCommand({pattern: 'find', fromMe: td, desc: Desc}, (async (message, match) => {
    if (message.reply_message === false) return await message.client.sendMessage(message.jid, ldc, MessageType.text);
    var filePath = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });
    var form = new FormData();
    ffmpeg(filePath).format('mp3').save('music.mp3').on('end', async () => {
        form.append('api_token', '2bd1fcb3ccd15607f72cdbb527907ce6');
        form.append('file', fs.createReadStream('./music.mp3'));
        form.append('return', 'apple_music, spotify');
        var configs = {
            headers: {
                ...form.getHeaders()
            }
        }
        await axios.post('https://api.audd.io/', form, configs).then(async (response) => {
            var res = response.data
            if (res === 'success') {
                await message.client.sendMessage(message.jid, `${ldccc} : ${res.title}\n${ldcc} : ${res.artist}`, MessageType.text);
            } else {
                await message.client.sendMessage(message.jid, 'I Cannot find any song in this name. 😖', MessageType.text);
            }
        }).catch((error) =>  {
            console.log(error);
        });
    });

})); 
