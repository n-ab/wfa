import * as mongoose from 'mongoose';
import {Sound, SoundObject} from '../models/sound';
import * as moment from 'moment';

export interface IsearchQuery {
  searchQuery: string,
  searchBy:    string
}

export function saveSoundData(data) {
    return Sound.findOneAndUpdate(data, {$set: {newSound: data}}, { new: true, upsert: true })
    .then(sound => {
        sound.price = 3;
        sound.discount = 0;
        sound.status = 'active';
        sound.filePath = 'wfa-'+ sound.title + '-' + moment().format();
        sound.save();
        console.log(`saved ${sound.title} to ${sound.filePath}`);
        return sound;
    })
    .catch(err => console.log('there was an error saving sound: ', err));
}

export function fetch() {
  return Sound.find({})
    .then(sounds => sounds)
    .catch(err => err);
}