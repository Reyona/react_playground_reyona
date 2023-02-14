// 1.
function setUserInfo(name: string): boolean
// 允许调用函数时传入name, age, gender三个参数
function setUserInfo(name: string, age: number, gender: number): string
// 实现签名，统一处理逻辑
function setUserInfo(name: string, age?: number, gender?: number): boolean | string {
    // 真值校验，由于两套重载签名规定，调用函数时要么传入三个参数
    // 因此，传入了age，则必定也传入了gender
    if (age) {
        return `我叫 ${name}, 今年 ${age} 岁啦！`
    } else {
        return false
    }
}

// setUserInfo() // 不传参数，报错
setUserInfo('cc') // 传入一个参数，正确
// setUserInfo('cc', 18) // 传入两个参数，报错，因为没有定义两个参数的重载签名
setUserInfo('cc', 18, 2) // 传入三个参数，正确


// 2.
interface User {
    name: string;
    age: number;
    play: {
        (toy: string): string;
        (toy: string, time: number): string;
    }
}

let tom: User = {
    name: 'tom',
    age: 3,
    play: (target: string, time?: number) => target + 'hahaha' + (time || 0)
}
console.log(tom.play('cars', 3))


// 3.
type Fish = {
    swim: () => void
}
type Dog = {
    bark: () => void
}

function isDog(obj: Fish | Dog): obj is Dog {
    return ('bark' in obj)
}

let animal: Fish | Dog = {
    swim: () => console.log('I am Fish')
}
if (isDog(animal)) { // 进行类型缩减
    animal.bark()
} else {
    animal.swim()
}


// 4.
interface Circle {
    kind: 'circle',
    radius: number
}

interface Square {
    kind: 'square',
    side: number
}

type Shape = Circle | Square

function getArea(obj: Shape) {
    if (obj.kind === 'circle') {
        // 是Circle，必然有radius属性
        return Math.PI * obj.radius ** 2
    } else if (obj.kind === 'square') {
        // 是Square，必然有side属性
        return obj.side ** 2
    } else {
        // 在最后一个分支进行穷举校验
        const _isExhaustive: never = obj // obj: never
        return _isExhaustive
    }
}

 // 5.

 interface Student {
    name: string,
    age: number,
    room: string,
 }

 type Student2 = Pick<Student, 'name' | 'room'>

 let student2: Student2 = {
    name: 'jane',
    room: '101'
 }

 let student:Record<number, string> = {
    '1': '1',
    '2': '2'
 }

export default () => (<div>This is TypeScript playground.</div>)