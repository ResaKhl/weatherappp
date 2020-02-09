function cat(name, meow) { 
    this.name = name;
    this.talk = function() { console.log(this.name + 'say' + meow)}
}

cat1 = new cat('felix', `purr`);
cat1.talk();
cat2 = new cat('ginger', 'hisss');
cat2.talk();

ali = [12,3,4,5]
console.log(ali.indexOf(10))