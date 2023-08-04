import Time from "./Time.js";
import English from "./Languages/English.js";
import Word from "./Word.js";
import Collection from "./Collection.js";
import German from "./Languages/German.js";
export default class NiceClock{
    #language
    #userContainer
    #container
    #sectionContainer
    #sectionContainerTag
    #sectionContainerClass
    #containerTag
    #containerClass
    #wordTag
    #wordClass
    #wordActiveClass
    #options
    #keyWords
    #minutes
    #hours
    #finishers
    #binders
    #autoRefresh
    #wordsRandomOrder
    #time
    #fillLines
    #dummyTextContainer
    #dummyTextContainerTag
    #dummyTextContainerClass
    #dummyTextElementTag
    #dummyTextElementClass
    #dummyTextElements

    constructor(userContainer, options = this.constructor.defaultOptions){
        this.userContainer = userContainer
        this.options = {...this.constructor.defaultOptions, ...options}
        this.reconstruct()
    }

    emptyUserContainer(){
        this.userContainer.innerHTML = ''
    }

    reconstruct(){
        this.emptyUserContainer()
        this.init().toggleWords().injectContainer()
        if(this.fillLines){
            this.createDummyText().initDummyTextContainer().injectDummyTextContainer()
        }
    }

    initDummyTextContainer(){
        this.dummyTextContainer = document.createElement(this.dummyTextContainerTag)
        this.dummyTextContainer.classList.add(this.dummyTextContainerClass)
        this.dummyTextElements.map(element => this.dummyTextContainer.append(element))
        return this
    }

    createDummyText(){
        const linesCount = this.countLines
        this.dummyTextElements = this.createDummyTextElements(linesCount)
        return this
    }

    createDummyTextElements(linesCount){
        const lines = []
        for(let x = 0; x < linesCount; x++){
            lines.push(this.createDummyTextElement())
        }
        return lines
    }

    createDummyTextElement(){
        const element = document.createElement(this.dummyTextElementTag)
        element.classList.add(this.dummyTextElementClass)
        element.innerText = this.randomDummyText()
        return element
    }

    lineLength(line){
        return line.reduce((total, word) => total + word.value.length, 0)
    }

    randomDummyText(){
        const minLength = this.longestLineLength * 2, chars = this.language.letters,
            collection = Collection.from(chars)
        return collection.duplicateTillLength(minLength).shuffle().data.join('')
    }

    injectDummyTextContainer(){
        this.container.append(this.dummyTextContainer)
    }

    init(){
        this.initContainer()
        this.initKeyWords()
        this.initMinutesWords()
        this.initBindersWords()
        this.initHoursWords()
        this.initFinishersWords()
        this.insertWordsInContainer()
        return this
    }

    initContainer(){
        this.container = document.createElement(this.containerTag)
        this.container.classList.add(this.containerClass)
        return this
    }

    injectContainer(){
        this.userContainer.append(this.container)
    }

    insertWordsInContainer(){
        this.wordsCollections.map(collection => collection.appendTo(this.container))
    }

    initWords(words, options = {}){
        const wordsArray = Object.entries(words)
            .map(([key, value]) => new Word(key, value, {
                elementTag: this.wordTag,
                elementClass: this.wordClass,
                activeClass: this.wordActiveClass
        }))
        return Collection.from(wordsArray, {
            containerElement: this.sectionContainer, containerTag: this.sectionContainerTag,
            containerClass: this.sectionContainerClass, shuffleData: this.wordsRandomOrder,
            ...options
        })
    }

    initKeyWords(){
        this.keyWords = this.initWords(this.language.keySentence, {shuffleData: false}).activateAll()
    }

    initMinutesWords(){
        this.minutes = this.initWords(this.language.minutes)
    }

    initBindersWords(){
        this.binders = this.initWords(this.language.binders, {shuffleData: false})
    }

    initHoursWords(){
        this.hours = this.initWords(this.language.hours)
    }

    initFinishersWords(){
        this.finishers = this.initWords(this.language.finishers)
    }

    toggleWords(){
        const {minutes, binders, hours, finishers} = this.language.wordsFromTime(this.roundedTime)
        this.minutes.toggleActivationByKey(minutes === null ? null: minutes.toString())
        this.binders.toggleActivationByKeys(binders)
        this.hours.toggleActivationByKey(hours.toString())
        this.finishers.toggleActivationByKeys(finishers)
        return this
    }

    refresh(){
        this.toggleWords()
        return this
    }

    refreshEverySeconds(seconds){
        this.interval = setInterval(() => this.refresh(), seconds * 1000)
        return this
    }

    refreshEveryMinutes(minutes){
        this.refreshEverySeconds(minutes * 60)
        return this
    }

    stopRefreshing(){
        clearInterval(this.interval)
        return this
    }

    //getters
    get userContainer(){
        return this.#userContainer
    }

    get container(){
        return this.#container
    }

    get options(){
        return this.#options
    }

    get roundedTime(){
        return Time.round(this.time)
    }

    get time(){
        if(this.#time !== undefined){
            return this.#time
        }
        const date = new Date()
        return {
            minutes: date.getMinutes(),
            hours: date.getHours() % 12 || 12
        }
    }

    get language(){
        return this.#language
    }

    get wordTag(){
        return this.#wordTag
    }

    get wordClass(){
        return this.#wordClass
    }

    get wordActiveClass(){
        return this.#wordActiveClass
    }

    get sectionContainer(){
        return this.#sectionContainer
    }

    get sectionContainerTag(){
        return this.#sectionContainerTag
    }

    get sectionContainerClass(){
        return this.#sectionContainerClass
    }

    get containerTag(){
        return this.#containerTag
    }

    get containerClass(){
        return this.#containerClass
    }

    get keyWords(){
        return this.#keyWords
    }

    get minutes(){
        return this.#minutes
    }

    get hours(){
        return this.#hours
    }

    get finishers(){
        return this.#finishers
    }

    get binders(){
        return this.#binders
    }

    get wordsCollections(){
        return [
            this.keyWords, this.minutes, this.binders, this.hours, this.finishers
        ]
    }

    get words(){
        return this.wordsCollections.map(collection => collection.data).flat()
    }

    get autoRefresh(){
        return this.#autoRefresh
    }

    get wordsRandomOrder(){
        return this.#wordsRandomOrder
    }

    get fillLines(){
        return this.#fillLines
    }

    get dummyTextContainer(){
        return this.#dummyTextContainer
    }

    get dummyTextElements(){
        return this.#dummyTextElements
    }

    get dummyTextContainerTag(){
        return this.#dummyTextContainerTag
    }

    get dummyTextContainerClass(){
        return this.#dummyTextContainerClass
    }

    get dummyTextElementTag(){
        return this.#dummyTextElementTag
    }

    get dummyTextElementClass(){
        return this.#dummyTextElementClass
    }

    get lines(){
        const words = this.words
        let lastOffsetTop, offsetTop, lines = [], lastLine = []
        for(let word of words){
            offsetTop = word.element.offsetTop
            if(lastOffsetTop !== undefined && lastOffsetTop !== offsetTop){
                lines.push(lastLine)
                lastLine = []
            }
            lastLine.push(word)
            lastOffsetTop = offsetTop
        }
        lines.push(lastLine)
        return lines
    }

    get countLines(){
        return this.lines.length
    }

    get longestLine(){
        let longestLine
        this.lines.map(line => {
            if(longestLine === undefined || this.lineLength(longestLine) < this.lineLength(line)){
                longestLine = line
            }
        })
        return longestLine
    }

    get longestLineLength(){
        return this.lineLength(this.longestLine)
    }

    //setters
    set userContainer(userContainer){
        this.#userContainer = userContainer
    }

    set container(container){
        this.#container = container
    }

    set options(options){
        const properties = this.constructor.properties
        Object.entries(options).forEach(([index, val]) => {
            if(properties.includes(index)){
                this[index] = val
            }else{
                console.error(`${index} is not a valid option`)
            }
        })
        this.#options = options
    }

    set language(language){
        const oldLanguage = this.#language
        this.#language = this.constructor.languages[language]
        if(oldLanguage !== undefined) {
            this.reconstruct()
        }
    }

    set wordTag(wordTag){
        this.#wordTag = wordTag
    }

    set wordClass(wordClass){
        this.#wordClass = wordClass
    }

    set wordActiveClass(wordActiveClass){
        this.#wordActiveClass = wordActiveClass
    }

    set sectionContainer(sectionContainer){
        this.#sectionContainer = sectionContainer
    }

    set sectionContainerTag(sectionContainerTag){
        this.#sectionContainerTag = sectionContainerTag
    }

    set sectionContainerClass(sectionContainerClass){
        this.#sectionContainerClass = sectionContainerClass
    }

    set containerTag(containerTag){
        this.#containerTag = containerTag
    }

    set containerClass(containerClass){
        this.#containerClass = containerClass
    }

    set keyWords(keyWords){
        this.#keyWords = keyWords
    }

    set minutes(minutes){
        this.#minutes = minutes
    }

    set hours(hours){
        this.#hours = hours
    }


    set finishers(finishers){
        this.#finishers = finishers
    }

    set binders(binders){
        this.#binders = binders
    }

    set autoRefresh(autoRefresh){
        if(autoRefresh){
            this.refreshEverySeconds(autoRefresh)
        }
        this.#autoRefresh = autoRefresh
    }

    set time(time){
        this.#time = time
    }

    set wordsRandomOrder(wordsRandomOrder){
        this.#wordsRandomOrder = wordsRandomOrder
    }

    set fillLines(fillLines){
        this.#fillLines = fillLines
    }

    set dummyTextContainer(dummyTextContainer){
        this.#dummyTextContainer = dummyTextContainer
    }

    set dummyTextElements(dummyTextElements){
        this.#dummyTextElements = dummyTextElements
    }

    set dummyTextContainerTag(dummyTextContainerTag){
        this.#dummyTextContainerTag = dummyTextContainerTag
    }

    set dummyTextContainerClass(dummyTextContainerClass){
        this.#dummyTextContainerClass = dummyTextContainerClass
    }

    set dummyTextElementTag(dummyTextElementTag){
        this.#dummyTextElementTag = dummyTextElementTag
    }

    set dummyTextElementClass(dummyTextElementClass){
        this.#dummyTextElementClass = dummyTextElementClass
    }

    //static getters
    static get languages(){
        return {
            en: English,
            de: German
        }
    }

    static get defaultOptions(){
        return {
            language: 'en',
            wordTag: 'span',
            wordClass: 'nice-clock-word',
            wordActiveClass: 'active',
            sectionContainer: false,
            sectionContainerTag: 'div',
            sectionContainerClass: 'nice-clock-collection-container',
            containerTag: 'div',
            containerClass: 'nice-clock-words-container',
            autoRefresh: false,
            wordsRandomOrder: true,
            fillLines: true,
            dummyTextContainerTag: 'div',
            dummyTextContainerClass: 'dummy-text-container',
            dummyTextElementTag: 'p',
            dummyTextElementClass: 'dummy-text'
        }
    }

    static get properties(){
        return [
            'language', 'wordTag', 'wordClass','wordActiveClass',
            'sectionContainer', 'sectionContainerTag', 'sectionContainerClass',
            'containerTag', 'containerClass', 'autoRefresh', 'wordsRandomOrder',
            'fillLines', 'dummyTextContainerTag', 'dummyTextContainerClass',
            'dummyTextElementTag', 'dummyTextElementClass'
        ]
    }
}