let countProduct
class menuPage{
    constructor(parent, product){
        this.product = product
        this.parent = parent
        this.wrapperContent = this.createWrapperContent()
        this.renderContent()
    }

createWrapperContent(){
    const wrapperContent = document.createElement('div')
    wrapperContent.classList.add('menu__cards')
    return wrapperContent
}

clearCardsFiller(){
    this.wrapperContent.innerHTML = ''
}

filtrCard(e){
    this.clearCardsFiller()
    this.product.forEach(element => {
        if (element.category === e){
            this.wrapperContent.append(this.cardFiller(element))
        }
    });
}

renderContent(){
    this.parent.append(this.createButtons())
    this.parent.append(this.wrapperContent)
    this.filtrCard('coffee')
}

changeValue(){
    if (window.screen.width > 1440) {
        countProduct = 8;
    } else if ((window.screen.width >= 768) && (window.screen.width < 1440)) {
        countProduct = 4;
    } else {
        countProduct = 4;
    }
}

cardFiller(e){
    const cardBox = document.createElement('div')
    cardBox.classList.add("menu__card", 'card')

    const cardImg = document.createElement('img')
    cardImg.classList.add('card__img')
    cardImg.setAttribute('src', e.img)
    cardImg.setAttribute('alt', e.name)


    const cardName = document.createElement('h5')
    cardName.classList.add('card__title')
    cardName.textContent = e.name

    const cardDescr = document.createElement('p')
    cardDescr.classList.add('card__desc')
    cardDescr.textContent = e.description

    const cardPrice = document.createElement('p')
    cardPrice.classList.add('card__price')
    cardPrice.textContent = e.price

    cardBox.append(cardImg, cardName, cardDescr, cardPrice)
    return cardBox
}

createButtons(){
    const buttonsWrapper = document.createElement('div')
    buttonsWrapper.classList.add('container__buttons')

    const menuButtonCoffee = document.createElement('button')
    menuButtonCoffee.classList.add('container__button')
    menuButtonCoffee.textContent = 'Coffee'

    const iconMenuButtonCoffee = document.createElement('img')
    iconMenuButtonCoffee.src = '../../images/tea.svg'

    menuButtonCoffee.addEventListener('click', () => {
        this.filtrCard('coffee')
    })

    menuButtonCoffee.append(iconMenuButtonCoffee)

    const menuButtonTea = document.createElement('button')
    menuButtonTea.classList.add('container__button')
    menuButtonTea.textContent = 'Tea'

    const iconMenuButtonTea = document.createElement('img')
    iconMenuButtonTea.src = '../../images/kettle.svg'

    menuButtonTea.addEventListener('click', () => {
        this.filtrCard('tea')
    })

    menuButtonCoffee.append(iconMenuButtonTea)

    const menuButtonCake = document.createElement('button')
    menuButtonCake.classList.add('container__button')
    menuButtonCake.textContent = 'Cake'

    menuButtonCake.addEventListener('click', () => {
        this.filtrCard('dessert')
    })

    const iconMenuButtonCake = document.createElement('img')
    iconMenuButtonCake.src = '../../images/kettle.svg'

    menuButtonCake.append(iconMenuButtonCake)

    buttonsWrapper.append(menuButtonCoffee, menuButtonTea, menuButtonCake)
    return buttonsWrapper
}
}
export default menuPage