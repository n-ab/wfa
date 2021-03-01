import * as mongoose from 'mongoose';
import {Sound} from '../models/sound';
import * as moment from 'moment';

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

export function fetch(data: any) {
    const yourShit = Object.entries(data);
    // console.log(yourShit);
    console.log('searchBy', yourShit[7][1]);
    console.log('searchQuery', yourShit[8][1]);
    if (yourShit[7][1] = 'name') {
        if (yourShit[8][1] == '') {
            console.log('returning all sounds.');
            return Sound.find({});
        }
    }
    if (data.findBy = 'keywords')
    return Sound.find({keywords: {}})
}

// export async function fetch(data: object) {
//     const sortedData = await sort(data);
//     if (sortedData.searchBy = 'name') {
//         return Sound.find({name: { }})
//     }
//     if (data.findBy = 'keywords')
//     return Sound.find({keywords: {}})
// }

// export function sort(data: object) {
//     const preSortedData = Object.entries(data);
//     const searchBy = preSortedData[7];
//     const searchQuery = preSortedData[8];
//     return {searchBy, searchQuery};
// }