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

export function fetch(data: IsearchQuery): Promise<SoundObject[]> {
    console.log('searching by "' + data.searchBy + '" for sounds with "' + data.searchQuery + '"');
    if (data.searchQuery === '') { 
      return Sound.find({}).then(sounds => Promise.resolve(sounds)).catch(err => err) 
    } else {
      switch (data.searchQuery) {
        case 'title':
          Sound.find( { title: { $regex: `${data.searchQuery}` } } ).then(sounds => Promise.resolve(sounds)).catch(err => err);
          break;
        case 'keywords':
          Sound.find( { keywords: { $regex: `${data.searchQuery}` } } ).then(sounds => Promise.resolve(sounds)).catch(err => err);
          break;
        case 'library':
          Sound.find( { library: { $regex: `${data.searchQuery}` } } ).then(sounds => Promise.resolve(sounds)).catch(err => err);
          break;
        case 'misc':
          Sound.find( { misc: { $regex: `${data.searchQuery}` } } ).then(sounds => Promise.resolve(sounds)).catch(err => err);
          break;
      }

    }
}
