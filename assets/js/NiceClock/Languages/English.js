export default class English{
    static get keySentence(){
        return {
            0: 'it\'s'
        }
    }

    static get minutes(){
        return {
            5: 'five', 10: 'ten', 15: 'quarter', 20: 'twenty', 25: 'twenty-five', 30: 'half'
        }
    }

    static get binders(){
        return {
            to: 'to', past: 'past'
        }
    }

    static get hours(){
        return {
            1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
            6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve'
        }
    }

    static get finishers(){
        return {
            oclock: 'o\'clock'
        }
    }

    static wordsFromTime({hours, minutes}){
        return {
            minutes: English.minutesWordFromMinutes(minutes),
            binders: English.bindersFromMinutes(minutes),
            hours: English.hoursWordFromTime({hours, minutes}),
            finishers: English.finishersWordFromMinutes(minutes)
        }
    }

    static bindersFromMinutes(minutes){
        return minutes === 0 ? []: (minutes > 30 ? ['to']: ['past'])
    }

    static minutesWordFromMinutes(minutes){
        return minutes >= 35 ? (60 - minutes): minutes
    }

    static hoursWordFromTime({hours, minutes}){
        const hr = minutes >= 35 ? ++hours: hours
        return hr >= 13 ? hr - 12: hr
    }

    static finishersWordFromMinutes(minutes){
        return minutes === 0 ? ['oclock']: []
    }

    static get letters(){
        return 'abcdefghijklmnopqrstuvwxyz'.split('')
    }
}