export default class German{
    static get keySentence(){
        return {
            0: 'Es',
            1: 'ist'
        }
    }

    static get minutes(){
        return {
            5: 'fünf', 10: 'zehn', 15: 'viertel', 20: 'zwanzig',
        }
    }

    static get binders(){
        return {
            to: 'vor', past: 'nach', half: 'halb'
        }
    }

    static get hours(){
        return {
            1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf',
            6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn', 11: 'elf', 12: 'zwölf'
        }
    }

    static get finishers(){
        return {
            oclock: 'uhr'
        }
    }

    static wordsFromTime({hours, minutes}){
        return {
            minutes: German.minutesWordFromMinutes(minutes),
            binders: German.bindersFromMinutes(minutes),
            hours: German.hoursWordFromTime({hours, minutes}),
            finishers: German.finishersWordFromMinutes(minutes)
        }
    }

    static isHalfBinderNeeded(minutes){
        return minutes >= 25 && minutes <= 35
    }

    static bindersFromMinutes(minutes){
        const binders = [],
            binder = minutes === 25 || minutes >= 40 ? 'to': 'past'
        if(German.isHalfBinderNeeded(minutes)){
            binders.push('half')
        }
        if(minutes !== 30 && minutes !== 0){
            binders.push(binder)
        }
        return binders
    }

    static minutesWordFromMinutes(minutes){
        return minutes === 30 ? null: (minutes >= 40? 60 - minutes: (minutes <= 20? minutes: 5))
    }

    static hoursWordFromTime({hours, minutes}){
        const hr = minutes >= 25 ? ++hours: hours
        return hr >= 13 ? hr - 12: hr
    }

    static finishersWordFromMinutes(minutes){
        return minutes === 0 ? ['oclock']: []
    }

    static get letters(){
        return 'aäbcdefghijklmnoöpqrsßtuüvwxyz'.split('')
    }
}