export default class Time{
    static split(time){
        const timeArr = time.split(':')
        if(timeArr.length < 2){
            console.error('Invalid time given')
        }
        return timeArr
    }

    static roundToFive(number){
        return (number % 5) >= 2.5 ? Math.floor(number / 5) * 5 + 5 : Math.floor(number / 5) * 5;
    }

    static roundMinutes(minutes){
        const rounded = Time.roundToFive(minutes)
        return rounded >= 60 ? 0: rounded
    }

    static increaseHours(hours){
        return hours === 23 ? 0: ++hours
    }

    static formatTime(hours, minutes){
        minutes = minutes < 10 ? `0${minutes}`: minutes
        hours = hours < 10 ? `0${hours}`: hours
        return [hours, minutes].join(':')
    }

    static round({minutes, hours}){
        let roundedMinutes, roundedHours
        roundedMinutes = Time.roundMinutes(minutes)
        roundedHours = roundedMinutes === 0 && minutes > 57? Time.increaseHours(hours): hours
        return {minutes: roundedMinutes, hours: roundedHours}
    }
}