// class Person {
//   constructor([name, age, sex] = props) {
//     (this.name = name), (this.age = age), (this.sex = sex);
//   }
//   names() {
//     return this.name;
//   }
//   changename(cn) {
//     this.name = cn;
//     return cn;
//   }
//   gretting() {
//     console.log("helio", this.name);
//   }
// }
// let p = new person(["sya", "22", "male"]);
// // console.log(p.names())

// class Student extends Person {
//   constructor(props, banji, chengji, range) {
//     super(props, banji, chengji, range);
//     (this.banji = banji), (this.chengju = chengji), (this.range = range);
//   }
//   grettings() {
//     console.log("helio,I am", this.name, "from", this.banji);
//   }
// }
// let s = new Student(["alys", "20", "fmale"], "1-1", "100", "1");

// 写一个Person的类，带有姓名，年龄，性别属性，并且暴露一个方法获取姓名属性，暴露一个方法改变姓名属性，暴露一个greeting方法 打印hi，xxx！
// 写一个类Student 继承Person，带有属性班级，成绩，排名，暴露方法打印“hello! i am xxx,from 班级”

class Person1 {
    constructor(name, sex, age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
    }
}

class Student extends Person1 {
    constructor({ name, sex, age, className, grade, rank }) {
        super(name, sex, age);
        this.className = className;
        this.grade = grade;
        this.rank = rank;
    }
}

new Student({
    name: 1,
    grade: 5,
    rank: 6,
    age: 2,
    sex: 4,
    className: 7,
});

function asleep() {
    setTimeout(function sleep() {
        console.log(1)
    }, 3000)

}