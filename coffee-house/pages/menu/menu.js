
class menuPage{
    constructor(parent, product){
        this.product = product
        this.changeValue()
        this.parent = parent
        this.wrapperContent = this.createWrapperContent()
        this.renderContent()
    }
countProduct
visibleProductCount

category = "coffee"

createWrapperContent(){
    const wrapperContent = document.createElement('div')
    wrapperContent.classList.add('menu__cards')
    wrapperContent.append(this.createButtonMore())
    return wrapperContent
}

clearCardsFiller(){
    this.wrapperContent.innerHTML = ''
}

filtrCard(){
    this.clearCardsFiller()
    this.product.filter(element => element.category === this.category).slice(0, this.visibleProductCount).forEach(element => {
        console.log(element)
        this.wrapperContent.append(this.cardFiller(element))
    });
    this.wrapperContent.append(this.createButtonMore())
}

renderContent(){
    this.parent.append(this.createButtons())
    this.parent.append(this.wrapperContent)
    this.filtrCard()
}

changeValue(){
    if (window.screen.width > 1440) {
        this.countProduct = 8;
        this.visibleProductCount = 8
    } else if ((window.screen.width >= 768) && (window.screen.width < 1440)) {
        this.countProduct = 4;
        this.visibleProductCount = 4
    } else {
        this.countProduct = 4;
        this.visibleProductCount = 4
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
        this.category = "coffee"
        this.visibleProductCount = this.countProduct
        this.filtrCard()
    })

    menuButtonCoffee.append(iconMenuButtonCoffee)

    const menuButtonTea = document.createElement('button')
    menuButtonTea.classList.add('container__button')
    menuButtonTea.textContent = 'Tea'

    const iconMenuButtonTea = document.createElement('img')
    iconMenuButtonTea.src = '../../images/kettle.svg'

    menuButtonTea.addEventListener('click', () => {
        this.category = "tea"
        this.visibleProductCount = this.countProduct
        this.filtrCard()
    })

    menuButtonCoffee.append(iconMenuButtonTea)

    const menuButtonCake = document.createElement('button')
    menuButtonCake.classList.add('container__button')
    menuButtonCake.textContent = 'Cake'

    menuButtonCake.addEventListener('click', () => {
        this.category = "dessert"
        this.visibleProductCount = this.countProduct
        this.filtrCard()
    })

    const iconMenuButtonCake = document.createElement('img')
    iconMenuButtonCake.src = '../../images/kettle.svg'

    menuButtonCake.append(iconMenuButtonCake)

    buttonsWrapper.append(menuButtonCoffee, menuButtonTea, menuButtonCake)
    return buttonsWrapper
}

createButtonMore(){
    if (this.visibleProductCount >= this.product.filter(element => element.category === this.category).length){
        return ""
    }
    const buttonMore = document.createElement('button')
    buttonMore.classList.add('button__more')
    buttonMore.innerHTML = 'More'
    buttonMore.addEventListener("click" , () => {
        this.visibleProductCount += this.countProduct
        this.visibleProduct = this.product.slice(0, this.visibleProductCount)
        console.log(this.visibleProduct)
        this.filtrCard()

    })
    return buttonMore

}

}
export default menuPage