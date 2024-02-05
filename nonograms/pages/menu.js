class Menu{
  constructor(parent, data, startGame, restart, updateTimer){
    this.parent = parent;
    this.data = data;
    this.startGame = startGame;
    this.restart = restart;
    this.updateTimer = updateTimer;

    this.menuContainer = null;
    this.showSolutionCall = null;

    this.init();
  }


  init(){
    this.menuContainer = document.createElement('div');
    this.menuContainer.classList.add('menu');

    this.createMenuItem();

    const menuButton = document.createElement('button');
    menuButton.classList.add('menu__button-menu');
    menuButton.textContent = 'Menu'
    menuButton.addEventListener('click', () => {
      const menu_list = document.getElementById('menu_list');
      menu_list.classList.toggle('show');
    });

    const randomButton = document.createElement('button');
    randomButton.classList.add('menu__button-random');
    randomButton.textContent = 'Random game'
    randomButton.addEventListener('click', this.randomGame.bind(this));

    const solutionButton = document.createElement('button');
    solutionButton.classList.add('menu__button-solution');
    solutionButton.textContent = 'Solution';
    solutionButton.addEventListener('click', this.showSolution.bind(this));

    this.menuContainer.append(menuButton, randomButton, solutionButton);
  }

  showSolution(){
    if (typeof this.showSolutionCall === 'function'){
      this.showSolutionCall();
    }
  }

  updateTimer(value){
    this.timer = value;
    this.restart();
}

  randomGame(){
    const randomIndex = Math.floor(Math.random() * this.data.length);
    const randomMatrix = this.data[randomIndex].matrix;
    this.restart();
    this.startGame(randomMatrix);
    this.updateTimer(0);
  }


  createMenuItem(){

    this.data.sort((a,b) => parseInt(a.lvl) - parseInt(b.lvl));

    const menu_list = document.createElement('div');
    menu_list.classList.add('menu_list');
    menu_list.id = 'menu_list';
    this.menuContainer.append(menu_list);
    this.data.forEach((item) => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu_item');
      menuItem.textContent = `${item.name} (lvl ${item.lvl})`;
      const lvlMenu = document.createElement('div');
      lvlMenu.classList.add('menu__item_lvl')

      menuItem.addEventListener('click', () => {
        this.startGame(item.matrix);
        const menu_list = document.getElementById('menu_list');
        menu_list.classList.toggle('show');
        this.updateTimer(0);
      });

      menu_list.append(menuItem);
    });
  }


  setShowSolutionCall(callback) {
    this.showSolutionCall = callback;
  }

  showHTML(){
    return this.menuContainer;
  }
}

export default Menu