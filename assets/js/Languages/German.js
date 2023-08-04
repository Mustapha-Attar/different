export default class German{

    //static getters
    static get greetings(){
        return {
            morning: 'Guten Morgen',
            afternoon: 'Guten Tag',
            evening: 'Guten Abend'
        }
    }

    static get days(){
        return [
            'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
        ]
    }

    static get months(){
        return [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ]
    }

    static get date(){
        const date = new Date(),
            dayIndex = date.getDay(),
            dayDate = German.twoDigits(date.getDate()),
            monthIndex = date.getMonth(),
            day = German.dayAbbreviation(dayIndex),
            month = German.monthAbbreviation(monthIndex)
        return `${day}, ${dayDate}.${month}`
    }

    static get namePlaceholder(){
        return '[Name]'
    }

    //statics
    static dayAbbreviation(dayIndex){
        return German.days[dayIndex].substring(0, 2)
    }

    static monthAbbreviation(monthIndex){
        return German.months[monthIndex].substring(0, 3)
    }

    static twoDigits(number){
        return `${number > 9 ? '': '0' }${number}`
    }
}