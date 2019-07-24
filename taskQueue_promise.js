/*

 1.lazyMan( 'Hank' ) => Hi! This is Hank!
 2.lazyMan( 'Hank' ).sleep(10).eat('dinner') => Hi! This is Hank! => 等待10秒 => eat dinner
 3.lazyMan( 'Hank' ).eat('dinner').eat('supper') => Hi! This is Hank! => eat dinner => eat supper
 4.lazyMan( 'Hank' ).sleepFirst(5).eat('supper') => 等待5秒 => Wake up after 5 => Hi! This is Hank! => eat supper

*/

class LazyMan {

  constructor( name = '' ){
    this.taskQueue = []
    this.workQueue = new Promise((resolve,reject)=>resolve())
    this.sayHi( name )
    setTimeout(()=>{
      this.runTask()
    },0)
    return this
  }

  runTask(){
    // console.log( this.taskQueue )
    this.taskQueue.forEach( item => {
      this.workQueue = this.workQueue.then( item )
    })
  }

  sayHi( name = '' ){
    let task = () => {
      console.log(`Hi! This is ${ name }!`)
      return Promise.resolve()
    }
    this.taskQueue.push( task )
  }

  sleep( time = 0 ){
    let task = () => new Promise((resolve,reject)=>{
      setTimeout( resolve , time * 1000 )
    })
    this.taskQueue.push( task )
    return this
  }

  sleepFirst( time = 0 ){
    let task = () => new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log(`Wake up after ${ time }`)
        resolve()
      }, time * 1000 )
    })
    this.taskQueue.unshift( task )
    return this
  }

  eat( food = '' ){
    let task = () => {
      console.log(`eat ${ food }`)
      return Promise.resolve()
    }
    this.taskQueue.push( task )
    return this
  }

}

const lazyMan = name => {
  return new LazyMan( name )
}


lazyMan( 'Hank' ).sleep(3).eat('dinner').sleepFirst(5).eat('supper')
