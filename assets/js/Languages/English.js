export default class English{

    //static getters
    static get greetings(){
        return {
            morning: 'Good morning',
            afternoon: 'Good afternoon',
            evening: 'Good evening'
        }
    }

    static get days(){
        return [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ]
    }

    static get months(){
        return [
            'January', 'February', 'March', 'April', 'May', 'Jun',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    }

    static get date(){
        const date = new Date(),
            dayIndex = date.getDay(),
            dayDate = English.twoDigits(date.getDate()),
            monthIndex = date.getMonth(),
            day = English.dayAbbreviation(dayIndex),
            month = English.monthAbbreviation(monthIndex)
        return `${day} &middot; ${dayDate}-${month}`
    }

    static get namePlaceholder(){
        return '[name]'
    }

    //statics
    static dayAbbreviation(dayIndex){
        return English.days[dayIndex].substring(0, 3)
    }

    static monthAbbreviation(monthIndex){
        return English.months[monthIndex].substring(0, 3)
    }

    static twoDigits(number){
        return `${number > 9 ? '': '0' }${number}`
    }
}