class MenuPage {
    constructor(parent, product){
        this.parent = parent
        this.product = product
    }

Card(e){
    const cardBox = document.createElement('div')
    cardBox.classList.add("menu__card")

    const cardImg = document.createElement('img')
    cardImg.classList.add('card__img')
    cardImg.setAttribute('src', e.imgurl)
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



}