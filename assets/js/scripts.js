import NiceClock from "./NiceClock/NiceClock.js";
import Page from "./Page.js";
const defaultLanguage = 'en',
    mainContainer = document.getElementById('content-container'),
    greetingElement = mainContainer.querySelector('#greeting'),
    nameElement = mainContainer.querySelector('#name'),
    dateElement = mainContainer.querySelector('#date'),
    clockContainer = document.getElementById('nice-clock-container'),
    footer = document.getElementById('footer'),
    niceClock = new NiceClock(clockContainer, {
        autoRefresh: 10,
        language: defaultLanguage,
    }),
    page = new Page({
        container: mainContainer,
        backgroundImagesCount: 41,
        appendLanguageSelectorsTo: footer,
        defaultLanguage,
        niceClock,
        greetingElement,
        nameElement,
        dateElement,
    })