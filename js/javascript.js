(function() {


/* Model (list) Containing Cats */
var Model = {
  adminView: false,
  cats: [{
    name: 'Cat_A',
    imgUrl: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
    count: 0,
  },{
    name: 'Cat_B',
    imgUrl: 'http://exmoorpet.com/wp-content/uploads/2012/08/cat.png',
    count: 0,
  },{
    name: 'Cat_C',
    imgUrl: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
    count: 0,
  }],
  currentCat: null,
  currentCatIndex: null,
  setCurrentCat: function(ndx) {
    this.currentCat = this.cats[ndx];
  },
  setCurrentCatIndex: function(ndx) {
    this.currentCatIndex = ndx;
  },
  increment: function() {
    this.currentCat.count++;
  },
  initialize: function() {
    this.setCurrentCat(0);
    this.setCurrentCatIndex(0);
  }
};

/*  */
var CatList = {

  initialize: function() {
    var list = document.getElementById('list');
    
    Model.cats.forEach(function(cat, index) {
      var li = document.createElement('li');
      var name = document.createElement('h3');
      var nameNode = document.createTextNode(cat.name);
      name.appendChild(nameNode);
      li.appendChild(name);
      li.addEventListener('click', function() {
        Controller.clickList(index);
      });
      list.appendChild(li);
    });
  }
};


var AdminPanel = {

  container: document.getElementById('admin-view'),
  catName: document.getElementById('adminName'),
  imgUrl: document.getElementById('adminUrl'),
  count: document.getElementById('adminCount'),
  
  initialize: function() {
    var button = document.getElementById('admin');
    var save = document.getElementById('adminSave');
    var cancel = document.getElementById('adminCancel');

    button.addEventListener('click', function() {
      Controller.changeAdminView();
    });
    save.addEventListener('click', function(e) {
      e.preventDefault();
      Controller.updateCat();
    });
    cancel.addEventListener('click', function(e) {
      e.preventDefault();
      Controller.changeAdminView();
    });
  },
  
  render: function() {
    var cat = Controller.getCurrentCat();
    this.catName.value = cat.name;
    this.imgUrl.value = cat.imgUrl;
    this.count.value = cat.count;
  }
};

/**
 * The View That is Being Rendered
 */
var View = {

  catImg: document.getElementById('catImg'),
  catName: document.getElementById('catName'),
  count: document.getElementById('count'),

  initialize: function() {
    console.log('poop');
    var _this = this;
    catImg.addEventListener('click', function() {
      Controller.increment();
      _this.renderCount();
    });
    this.renderView();
  },
  
  renderView: function() {
    var currentCat = Controller.getCurrentCat();
    this.catImg.set = this.catImg.setAttribute('src', currentCat.imgUrl);
    this.catName.innerHTML = currentCat.name;
    this.renderCount();
  },

  renderCount: function() {
    var currentCat = Controller.getCurrentCat();
    this.count.innerHTML = currentCat.count;
  }
};

/* */
var Controller = {

  initialize: function() {
    Model.initialize();
    CatList.initialize();
    View.initialize();
    AdminPanel.initialize();
  },

  increment: function() {
    Model.increment();
    View.renderView();
  },

  getCurrentCat: function() {
    return Model.currentCat;
  },

  getCurrentCatIndex: function() {
    return Model.currentCatIndex;
  },

  clickList: function(ndx) {
    Model.setCurrentCat(ndx);
    Model.setCurrentCatIndex(ndx);
    View.renderView();
    AdminPanel.render();
  },

  showAdmin: function() {
    AdminPanel.container.style.display = 'block';
  },

  hideAdmin: function() {
    AdminPanel.container.style.display = 'none';
  },

  changeAdminView: function() {
    Model.adminView = !Model.adminView;
    var view = Model.adminView;
    if (view) {
      this.showAdmin();
    } else {
      this.hideAdmin();
    }
    AdminPanel.render();
  },

  updateCat: function() {
    var catIndex = this.getCurrentCatIndex();
    var info = AdminPanel;
    var updatedCat = {
      name: info.catName.value,
      imgUrl: info.imgUrl.value,
      count: info.count.value
    };
    Model.cats[catIndex] = updatedCat;
    Model.setCurrentCat(catIndex);
    this.changeAdminView();
    View.renderView();
  }
};

Controller.initialize();
})();