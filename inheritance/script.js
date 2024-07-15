function Builder(value) {
    this.value = value;
}

Builder.prototype.minus = function() {}
Builder.prototype.multiply = function() {}
Builder.prototype.divide = function() {}

Builder.prototype.plus = function(){
    for(let i = 0; i < arguments.length; i++){
        this.value += arguments[i];
    }
    return this;
}

Builder.prototype.get = function() {
    return this.value
}

class IntBuilder extends Builder{
    constructor(value = 0){
        super(value)
    }

    minus = (...n) => {
        for(let value of n){
            this.value -= value
        }
        return this
    }

    mod = (n) => {
        this.value %= n
        return this
    }

    static random = (from, to) =>{
        return Math.round(Math.random() * (to - from) + from)
    }

    multiply = (n) =>{
        this.value *= n
        return this
    }

    divide = (n) => {
        this.value /= n
        this.value = parseInt(this.value)
        return this
    }

    get = () =>{
        return this.value
    }
}

function StringBuilder(value){
    Builder.call(this, value || "");
}

StringBuilder.prototype = Object.create(Builder.prototype)
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function(n) {
   this.value = this.value.substring(0, this.value.length-n);
   return this;
};

StringBuilder.prototype.multiply = function(n){
    this.value = this.value.repeat(n);
    return this;
};

StringBuilder.prototype.divide = function(n){
    var k = Math.floor(this.value.length / n);
    this.value = this.value.substring(0, k);
    return this;
};

StringBuilder.prototype.remove = function(n){
    this.value = this.value.split(n).join("");
    return this;
};

StringBuilder.prototype.sub = function(from, n){
    this.value = this.value.substring(from, from+n);
    return this;
};

//example
console.log(IntBuilder.random(10, 100));

const intBuilder = new IntBuilder(10); // 10;
console.log(intBuilder
  .plus(2, 3, 2)                      // 17;
  .minus(1, 2)                       // 14;
  .multiply(2)                       // 28;
  .divide(4)                         // 7;
  .mod(3)                            // 1;
  .get());

var strBuilder = new StringBuilder('Hello'); // 'Hello';
  console.log(strBuilder
    .plus(' all', '!')                         // 'Hello all!'
    .minus(4)                                  // 'Hello '
    .multiply(3)                               // 'Hello Hello Hello '
    .divide(4)                                 // 'Hell';
    .remove('l')                               // 'He';
    .sub(1,1)                                  // 'e';
    .get());                                   //-> 'e'
