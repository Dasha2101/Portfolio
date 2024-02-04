class Menu{
  constructor(parent, data, startGame){
    this.parent = parent;
    this.data = data;
    this.startGame = startGame;

    this.menuContainer = null;

    this.init();
  }


  init(){
    this.menuContainer = document.createElement('div');
    this.menuContainer.classList.add('menu');

    this.createMenuItem();
  }


  createMenuItem(){

    this.data.sort((a,b) => parseInt(a.lvl) - parseInt(b.lvl));

    this.data.forEach((item) => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu_item');
      menuItem.textContent = `${item.name} (lvl ${item.lvl})`;
      const lvlMenu = document.createElement('div');
      lvlMenu.classList.add('menu__item_lvl')

      menuItem.addEventListener('click', () => {
        this.startGame(item.matrix);
      });

      this.menuContainer.append(menuItem);
    });
  }

  showHTML(){
    return this.menuContainer;
  }
}

export default Menu