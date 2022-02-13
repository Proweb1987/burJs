let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 500,
        get Summ() {
            return this.price * this.amount         
        },
        get Call() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'гамбургер FRESH',
        price: 20500,
        amount: 0,
        kcall: 900,
        get Summ() {
            return this.price * this.amount
        },
        get Call() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        amount: 0,
        kcall: 1200,
        get Summ() {
            return this.price * this.amount
        },
        get Call() {
            return this.kcall * this.amount
        }
    }
}

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 3000,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 80
    }
}

let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    recipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn');

btnPlusOrMinus.forEach(function(btn) {
    btn.addEventListener('click', function(){
        plusOrMinus(this)
    })
})

function plusOrMinus(el) {
    // closest() - делает подключение к ближайщему родительскому элементу
    // getAttribute() - берет значение у указаного атрибута
    let parentId = el.closest('.main__product').getAttribute('id'),
        out = el.closest('.main__product').querySelector('.main__product-num'),
        price = el.closest('.main__product').querySelector('.main__product-price span'),
        kcall = el.closest('.main__product').querySelector('.main__product-kcall span');

        if(el.getAttribute('data-symbol') == '+'){
            product[parentId].amount++
        }else if(el.getAttribute('data-symbol') == '-' && product[parentId].amount > 0){
            product[parentId].amount--
        }

        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Call;
}

checkExtraProduct.forEach(function(product){
    product.addEventListener('click', function(){
        addExtraProduct(this)
    })
})

function addExtraProduct(el) {
    let parentId = el.closest('.main__product').getAttribute('id');

    product[parentId][el.getAttribute('data-extra')] = el.checked
    
    let price = el.closest('.main__product').querySelector('.main__product-price span'),
        kcall = el.closest('.main__product').querySelector('.main__product-kcall span'),
        elDataExtra = el.getAttribute('data-extra');

    if(product[parentId][elDataExtra] == true) {
        product[parentId].price += extraProduct[elDataExtra].price;
        product[parentId].kcall = product[parentId].kcall + extraProduct[elDataExtra].kcall;
    }else {
        product[parentId].price -= extraProduct[elDataExtra].price;
        product[parentId].kcall = product[parentId].kcall - extraProduct[elDataExtra].kcall;
    }

    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Call;

}


let korzina = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function() {
    for(let key in product) {
        let burgersName = product[key];
        if(burgersName.amount > 0) {
            korzina.push(burgersName)
            for(let newKey in burgersName) {
                if(burgersName[newKey] === true) {
                    burgersName.name += ` и ${extraProduct[newKey].name}`
                }
            }
            burgersName.price = burgersName.Summ;
            burgersName.kcall = burgersName.Call;
        }
    }

    for ( let i = 0; i < korzina.length; i++){
        let item = korzina[i];
        totalPrice += item.price;
        totalKcall += item.kcall;
        totalName += '\n' + el.name + '\n';
        // \n - экранирование  - наше след значение будет появляться с новой строки
    }

})


const time = 500;
const step = 1;

function outNum (num, elem) {
    let timeOut = document.querySelector('.header__timer-extra');
        lvl = document.querySelector('.header__timer');
    n = 0;
    let timer = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if(n == num) {
            clearInterval(interval);
            lvl.style.fontSize = '80px';
            lvl.style.color = 'green';
            lvl.style.animation = 'animate__heartBeat';
           
        }
        timeOut.innerHTML = n;
    },
    timer);
}
outNum(100, '.header__timer-extra');







