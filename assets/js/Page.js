import English from "./Languages/English.js";
import German from "./Languages/German.js";

export default class Page{
    #options
    #container
    #defaultLanguage
    #language
    #niceClock
    #greetingElement
    #nameElement
    #dateElement
    #backgroundNamePrefix
    #backgroundImagesExtension
    #backgroundImagesCount
    #backgroundImage
    #backgroundImagesDir
    #languageSelectors
    #activeLanguageClass
    #showLanguageSelectors
    #languageSelectorsContainer
    #languageSelectorsContainerTag
    #languageSelectorsContainerClass
    #languageSelectorsElementsTag
    #languageSelectorsElementsClass
    #appendLanguageSelectorsTo

    constructor(options = this.constructor.defaultOptions) {
        this.options = {...this.constructor.defaultOptions, ...options}
        this.refresh()
        this.setListeners()
    }

    setListeners(){
        this.listeners.map(listener => {const listenerMethod = listener.bind(this); listenerMethod()})
    }

    refresh(){
        return this.refreshLanguage().refreshGreeting().refreshName().refreshDate()
            .refreshBackgroundImage().refreshLanguageSelectors()
    }

    removeLanguageSelectorsContainer(){
        if(this.languageSelectorsContainer){
            this.languageSelectorsContainer.remove()
            this.languageSelectorsContainer = null
        }
        return this
    }

    createLanguageSelectorsContainer(){
        this.languageSelectorsContainer = document.createElement(this.languageSelectorsContainerTag)
        this.languageSelectorsContainer.classList.add(this.languageSelectorsContainerClass)
        return this
    }

    refreshLanguageSelectors(){
        this.removeLanguageSelectorsContainer()
        if(this.showLanguageSelectors){
            this.createLanguageSelectorsContainer()
            this.initLanguageSelectors()
            this.constructor.availableLanguages.forEach(language => {
                const languageSelector = this.createLanguageSelector(language)
                this.languageSelectors.push(languageSelector)
                this.languageSelectorsContainer.append(languageSelector)
            })
            this.appendLanguageSelectorsTo.append(this.languageSelectorsContainer)
        }
        return this
    }

    initLanguageSelectors(){
        this.languageSelectors = []
        return this
    }

    createLanguageSelector(language){
        const languageSelector = document.createElement(this.languageSelectorsElementsTag)
        languageSelector.classList.add(this.languageSelectorsElementsClass)
        languageSelector.dataset.language = language
        languageSelector.innerText = language.toUpperCase()
        languageSelector.classList.toggle(this.activeLanguageClass, language === this.languageAbbreviation)
        return languageSelector
    }

    refreshLanguage(){
        this.language = this.languageAbbreviation || this.defaultLanguage
        return this
    }

    onChangeLanguage(){
        this.refreshGreeting().refreshDate().changeNiceClockLanguage()
    }

    changeNiceClockLanguage(){
        if (this.niceClock !== undefined){
            this.niceClock.language = this.languageAbbreviation
        }
        return this
    }

    refreshGreeting(){
        if(this.greetingElement !== undefined){
            this.greetingElement.innerText = this.greeting
        }
        return this
    }

    refreshName(){
        if(this.nameElement !== undefined){
            this.nameElement.innerText = this.name
        }
        return this
    }

    refreshDate(){
        if(this.dateElement !== undefined){
            this.dateElement.innerHTML = this.date
        }
        return this
    }

    refreshBackgroundImage(){
        if(![this.backgroundNamePrefix, this.backgroundImagesCount, this.backgroundImagesDir].includes(false)){
            this.backgroundImage = this.randomBackgroundImage
        }
        return this
    }

    //listeners
    nameListener(){
        if(this.nameElement !== undefined){
            ['blur','keydown'].forEach( event =>{
                this.nameElement.addEventListener(event, this.nameChangeHandler.bind(this))
            });
        }
    }

    languageSelectorListener(){
        if(this.languageSelectors){
            this.languageSelectors.forEach(languageSelector => {
                languageSelector.addEventListener('click', this.languageChangeHandler.bind(this))
            })
        }
    }

    //handlers
    nameChangeHandler(e){
        if(e.type === 'keydown' && e.code === 'Enter'){
            e.preventDefault()
            this.nameElement.blur()
        }else if(e.type === 'blur'){
            this.name = this.nameElement.innerText
        }
    }

    languageChangeHandler(e){
        const selectedLanguage = e.target.dataset.language
        this.languageSelectors.forEach(languageSelector => {
            languageSelector.classList.toggle(this.activeLanguageClass, selectedLanguage === languageSelector.dataset.language)
        })
        this.language = selectedLanguage
    }

    //getters
    get options(){
        return this.#options
    }

    get container(){
        return this.#container
    }

    get name(){
        return localStorage.getItem(this.constructor.nameIndex) || this.namePlaceholder
    }

    get date(){
        return this.language.date
    }

    get greeting(){
        const date = new Date(), hours = date.getHours(), greetingIndex = hours >= 18 ? 'evening': (hours >= 12 ? 'afternoon': 'morning')
        return this.language.greetings[greetingIndex]
    }

    get defaultLanguage(){
        return this.#defaultLanguage
    }

    get language(){
        return this.constructor.languages[localStorage.getItem(this.constructor.languageIndex)]
    }

    get languageAbbreviation(){
        return localStorage.getItem(this.constructor.languageIndex)
    }

    get niceClock(){
        return this.#niceClock
    }

    get nameElement(){
        return this.#nameElement
    }

    get greetingElement(){
        return this.#greetingElement
    }

    get dateElement(){
        return this.#dateElement
    }

    get backgroundNamePrefix(){
        return this.#backgroundNamePrefix
    }

    get backgroundImagesExtension(){
        return this.#backgroundImagesExtension
    }

    get backgroundImagesCount(){
        return this.#backgroundImagesCount
    }

    get namePlaceholder(){
        return this.language.namePlaceholder
    }

    get randomBackgroundImage(){
        return `${this.backgroundNamePrefix}${this.randomBackgroundNumber}.${this.backgroundImagesExtension}`
    }

    get randomBackgroundNumber(){
        return Math.floor(Math.random() * this.backgroundImagesCount) + 1
    }

    get backgroundImage(){
        return this.#backgroundImage
    }

    get backgroundImagesDir(){
        return this.#backgroundImagesDir
    }

    get activeLanguageClass(){
        return this.#activeLanguageClass
    }

    get languageSelectors(){
        return this.#languageSelectors
    }

    get languageSelectorsContainer(){
        return this.#languageSelectorsContainer
    }

    get showLanguageSelectors(){
        return this.#showLanguageSelectors
    }

    get languageSelectorsContainerTag(){
        return this.#languageSelectorsContainerTag
    }

    get languageSelectorsContainerClass(){
        return this.#languageSelectorsContainerClass
    }

    get languageSelectorsElementsTag(){
        return this.#languageSelectorsElementsTag
    }

    get languageSelectorsElementsClass(){
        return this.#languageSelectorsElementsClass
    }

    get appendLanguageSelectorsTo(){
        return this.#appendLanguageSelectorsTo
    }

    get backgroundImagePath(){
        return `${this.backgroundImagesDir}${this.backgroundImage}`
    }

    get listeners(){
        return [
            this.nameListener,
            this.languageSelectorListener
        ]
    }

    //setters
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

    set container(container){
        this.#container = container
    }

    set name(name){
        localStorage.setItem(this.constructor.nameIndex, name)
        this.refreshName()
    }

    set defaultLanguage(defaultLanguage){
        this.#defaultLanguage = defaultLanguage
    }

    set language(language){
        const oldLanguage = this.language
        this.#language = language
        localStorage.setItem(this.constructor.languageIndex, language)
        if(oldLanguage !== undefined){
            this.onChangeLanguage()
        }
    }

    set niceClock(niceClock){
        this.#niceClock = niceClock
    }

    set nameElement(nameElement){
        this.#nameElement = nameElement
    }

    set greetingElement(greetingElement){
        this.#greetingElement = greetingElement
    }

    set dateElement(dateElement){
        this.#dateElement = dateElement
    }

    set backgroundNamePrefix(backgroundNamePrefix){
        this.#backgroundNamePrefix = backgroundNamePrefix
    }

    set backgroundImagesExtension(backgroundImagesExtension){
        this.#backgroundImagesExtension = backgroundImagesExtension
    }

    set backgroundImagesCount(backgroundImagesCount){
        this.#backgroundImagesCount = backgroundImagesCount
    }

    set backgroundImage(backgroundImage){
        this.#backgroundImage = backgroundImage
        this.container.style.backgroundImage = `url(${this.backgroundImagePath})`
    }

    set backgroundImagesDir(backgroundImagesDir){
        this.#backgroundImagesDir = backgroundImagesDir
    }

    set activeLanguageClass(activeLanguageClass){
        this.#activeLanguageClass = activeLanguageClass
    }

    set showLanguageSelectors(showLanguageSelectors){
        this.#showLanguageSelectors = showLanguageSelectors
    }

    set languageSelectors(languageSelectors){
        this.#languageSelectors = languageSelectors
    }

    set languageSelectorsContainer(languageSelectorsContainer){
        this.#languageSelectorsContainer = languageSelectorsContainer
    }

    set languageSelectorsContainerTag(languageSelectorsContainerTag){
        return this.#languageSelectorsContainerTag = languageSelectorsContainerTag
    }

    set languageSelectorsContainerClass(languageSelectorsContainerClass){
        return this.#languageSelectorsContainerClass = languageSelectorsContainerClass
    }

    set languageSelectorsElementsTag(languageSelectorsElementsTag){
        return this.#languageSelectorsElementsTag = languageSelectorsElementsTag
    }

    set languageSelectorsElementsClass(languageSelectorsElementsClass){
        return this.#languageSelectorsElementsClass = languageSelectorsElementsClass
    }

    set appendLanguageSelectorsTo(appendLanguageSelectorsTo){
        return this.#appendLanguageSelectorsTo = appendLanguageSelectorsTo
    }
    //static getters
    static get languages(){
        return {
            en: English,
            de: German
        }
    }

    static get availableLanguages(){
        return Object.entries(Page.languages).map(([languageID, Class]) => languageID)
    }

    static get defaultOptions(){
        return {
            container: null,
            defaultLanguage: 'en',
            niceClock: null,
            greetingElement: null,
            nameElement: null,
            dateElement: null,
            backgroundNamePrefix: 'background-',
            backgroundImagesExtension: 'jpg',
            backgroundImagesCount: 1,
            backgroundImagesDir: '../../images/Backgrounds/',
            activeLanguageClass: 'active',
            showLanguageSelectors: true,
            languageSelectorsContainerTag: 'ul',
            languageSelectorsContainerClass: 'language-selectors-container',
            languageSelectorsElementsTag: 'li',
            languageSelectorsElementsClass: 'language-selector',
            appendLanguageSelectorsTo: document.getElementsByTagName('body')[0],
        }
    }

    static get properties(){
        return [
            'container', 'defaultLanguage', 'niceClock', 'nameElement', 'dateElement',
            'greetingElement', 'backgroundNamePrefix', 'backgroundImagesExtension',
            'backgroundImagesCount', 'backgroundImagesDir', 'activeLanguageClass',
            'showLanguageSelectors', 'appendLanguageSelectorsTo', 'languageSelectorsContainerTag',
            'languageSelectorsElementsTag', 'languageSelectorsElementsClass', 'languageSelectorsContainerClass'
        ]
    }

    static get nameIndex(){
        return 'name'
    }

    static get languageIndex(){
        return 'language'
    }
}