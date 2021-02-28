import * as mongoose from 'mongoose';
import {Sound} from '../models/sound';
import * as moment from 'moment';

export function saveSoundData(data) {
    return Sound.findOneAndUpdate(data, {$set: {newSound: data}}, { new: true, upsert: true })
    .then(sound => {
        console.log(`saving sound: ${sound}`);
        sound.discount = 0;
        sound.status = 'active';
        sound.price = 3;
        sound.filePath = 'wfa-'+ sound.title + '-' + moment().format();
        sound.save();
        return sound;
    })
    .catch(err => console.log('there was an error saving sound: ', err));
}