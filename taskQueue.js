/*

 1.lazyMan( 'Hank' ) => Hi! This is Hank!
 2.lazyMan( 'Hank' ).sleep(10).eat('dinner') => Hi! This is Hank! => 等待10秒 => eat dinner
 3.lazyMan( 'Hank' ).eat('dinner').eat('supper') => Hi! This is Hank! => eat dinner => eat supper
 4.lazyMan( 'Hank' ).sleepFirst(5).eat('supper') => 等待5秒 => Wake up after 5 => Hi! This is Hank! => eat supper

*/

class LazyMan {

  constructor( name = '' ){
    this.taskQueue = []
    this.taskQueueHistory = []
    this.name = name
    this.taskQueue.push( `base-${ this.name }` )
    this.taskQueueHistory.push( `base-${ this.name }` )
    setTimeout(()=>{
      this.runNextTask()
    },0)
    return this
  }

  baseTask( name ){
    console.log( `Hi! This is ${ name }!` )
    this.runNextTask()
  }

  sleep( time = 0 ){
    this.taskQueue.push( `sleep-${time}` )
    this.taskQueueHistory.push( `sleep-${time}` )
    return this
  }

  sleepTask( time = 0 ){
    let that = this
    setTimeout(function(){
      that.runNextTask()
    }, time*1000 )
  }

  sleepFirst( time = 0 ){
    this.taskQueue.unshift( `sleepFirst-${time}` )
    this.taskQueueHistory.unshift( `sleepFirst-${time}` )
    return this
  }

  sleepFirstTask( time = 0 ){
    let that = this
    setTimeout(function(){
      console.log(`Wake up after ${ time }`)
      that.runNextTask()
    }, time*1000 )
  }

  eat( food = '' ){
    this.taskQueue.push( `eat-${food}` )
    this.taskQueueHistory.push( `eat-${food}` )
    return this
  }

  eatTask( food = '' ){
    console.log( `eat ${food}` )
    this.runNextTask()
  }

  runNextTask(){
    if( this.taskQueue.length == 0 ) return
    let taskName = this.taskQueue[0].split( '-' )[0] + 'Task'
    let param = this.taskQueue[0].split( '-' )[1]
    param = isNaN( param*1 ) ? param : param*1
    this.taskQueue.shift()
    eval( `this.${taskName}('${ param }')` )
  }

}

const lazyMan = name => {
  return new LazyMan( name )
}

// const queue = lazyMan( 'Hank' ).sleep(3).eat('dinner').sleepFirst(5).eat('supper')

const queue = lazyMan( 'Hank' ).sleep(3).eat('dinner').sleepFirst(5).eat('supper')

console.log( '%c' + queue.taskQueueHistory.join( ' => ' ) , 'background: #6cf; color: #fff; font-size:18px;' )
