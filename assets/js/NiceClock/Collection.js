export default class Collection{
    #data
    #originalData
    #container
    #options
    #containerElement
    #containerTag
    #containerClass
    #shuffleData

    constructor(data, options = this.constructor.defaultOptions) {
        this.data = data
        this.originalData = data
        this.options = {...this.constructor.defaultOptions, ...options}
        if(this.containerElement){
            this.initContainer()
        }
    }

    initContainer(){
        this.container = document.createElement(this.containerTag)
        this.container.classList.add(this.containerClass)
        this.data.map(object => object.appendTo(this.container))
    }

    appendTo(container){
        if(this.container === undefined){
            this.data.map(object => object.appendTo(container))
        }else{
            container.append(this.container)
        }
        return this
    }

    toggleActivationByKey(key){
        this.data.map(word => key !== null && word.key === key ? word.activate(): word.deactivate())
        return this
    }

    toggleActivationByKeys(keys){
        this.data.map(word => keys.includes(word.key) ? word.activate(): word.deactivate())
        return this
    }

    activateAll(){
        this.data.map(word => word.activate())
        return this
    }

    duplicateTillLength(length){
        this.data = this.constructor.duplicateArrayTillLength(this.data, length)
        return this
    }

    reset(){
        this.data = this.originalData
        return this
    }

    shuffle(){
        this.data = this.constructor.shuffleArray(this.data)
        return this
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

    set data(data){
        this.#data = data
    }

    set originalData(originalData){
        this.#originalData = originalData
    }

    set container(container){
        this.#container = container
    }

    set containerTag(containerTag){
        this.#containerTag = containerTag
    }

    set containerElement(containerElement){
        this.#containerElement = containerElement
    }

    set containerClass(containerClass){
        this.#containerClass = containerClass
    }

    set shuffleData(shuffleData){
        shuffleData ? this.shuffle() : this.reset()
        this.#shuffleData = shuffleData
    }

    //getters
    get originalData(){
        return this.#originalData
    }

    get data(){
        return this.#data
    }

    get container(){
        return this.#container
    }

    get containerElement(){
        return this.#containerElement
    }

    get containerTag(){
        return this.#containerTag
    }

    get containerClass(){
        return this.#containerClass
    }

    get shuffleData(){
        return this.#shuffleData
    }

    //static getters
    static get defaultOptions(){
        return {
            containerElement: false,
            containerTag: 'div',
            containerClass: 'container',
            shuffleData: false
        }
    }

    static get properties(){
        return [
            'containerElement', 'containerTag', 'containerClass', 'shuffleData'
        ]
    }

    //statics
    static from(data, options){
        return new Collection(data, options)
    }

    static shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)), temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    static duplicateArrayTillLength(array, length){
        if(array.length === 0 || length === 0)
            return array
        const duplicatedArray = [...array, ...array]
        return array.length < length? (duplicatedArray.length < length? Collection.duplicateArrayTillLength(duplicatedArray, length): duplicatedArray): array
    }
}