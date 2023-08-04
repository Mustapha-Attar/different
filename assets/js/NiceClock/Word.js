export default class Word{
    #key
    #value
    #options
    #element
    #elementTag
    #elementClass
    #activeClass
    #active

    constructor(key, value, options = this.constructor.defaultOptions){
        this.key = key
        this.value = value
        this.options = {...Word.defaultOptions, ...options}
        this.initElement()
    }

    initElement(){
        this.element = document.createElement(this.elementTag)
        this.element.classList.add(this.elementClass)
        this.element.innerText = this.value
    }

    appendTo(container){
        container.append(this.element)
    }

    activate(){
        this.active = true
    }

    deactivate(){
        this.active = false
    }

    //setters
    set key(key){
        this.#key = key
    }

    set value(value){
        this.#value = value
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

    set element(element){
        this.#element = element
    }

    set elementTag(elementTag){
        this.#elementTag = elementTag
    }

    set elementClass(elementClass){
        this.#elementClass = elementClass
    }

    set activeClass(activeClass){
        this.#activeClass = activeClass
    }

    set active(active){
        this.#active = active
        this.element.classList.toggle(this.activeClass, active)
    }

    //getters
    get key(){
        return this.#key
    }

    get value(){
        return this.#value
    }

    get element(){
        return this.#element
    }

    get options(){
        return this.#options
    }

    get elementTag(){
        return this.#elementTag
    }

    get elementClass(){
        return this.#elementClass
    }

    get activeClass(){
        return this.#activeClass
    }

    get active(){
        return this.#active
    }

    //static getters
    static get defaultOptions(){
        return {
            elementTag: 'span',
            elementClass: 'word',
            activeClass: 'active'
        }
    }


    static get properties(){
        return [
            'elementTag', 'elementClass', 'activeClass'
        ]
    }
}