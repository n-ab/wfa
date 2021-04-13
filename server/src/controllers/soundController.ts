import * as mongoose from 'mongoose';
import {Sound, SoundObject} from '../models/sound';
import * as moment from 'moment';

export interface IsearchQuery {
  searchQuery: string,
  searchBy:    string
}

export function saveSoundData(data) {
  console.log('attempting to save sound with data: ', data);
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

export function fetchByName(name: string) {
  console.log('searching sounds for ', name);
  return Sound.find({ "title": `${Object.values(name)[0]}` })
  .then(documents => {
    console.log('documents found by name: ', documents);
    return documents;
  })
  .catch(err => err);
}

export function fetchByKeyword(keyword: string) {
  return Sound.find({ "keywords": { "$regex": `${keyword}`, "$options": "i" } })
    .then(document => {
      console.log('document found by keyword: ', document);
      return document;
    })
    .catch(err => err);
}

export function fetchByLibrary(library: string) {
  return Sound.find({ "library": { "$regex": `${library}`, "$options": "i" } })
  .then(document => {
    console.log('document found by library: ', document);
    return document;
  })
  .catch(err => err);
}

export function fetchByPrice(price) {
  return Sound.find({price: { $lte: price }})
    .then(documents => {
      console.log(`document[s] found with price matching or less than ${price}: `, documents);
    })
}

export function fetchByAny(query: string) {
  return Sound.find({ $or : [{"title" : { $regex: `${query}` }}, {"keywords" : { $regex: `${query}` }}, {"library" : { $regex: `${query}` }}, {"misc" : { $regex: `${query}` }}, { "description": {$regex: `${query}`} }] })
  .then(documents => {
    console.log('document found by any: ', documents);
    return documents;
  })
  .catch(err => err);
}