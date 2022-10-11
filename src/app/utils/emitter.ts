import {lg} from './logger';

export class Emitter {
    events:any = []
    debug:boolean=false
    constructor (events = [], debug:boolean=false) {
        this.events = new Map(events)
        this.debug=debug
      }
    
      subscribe (name, cb) {
        this.events.set(name, [
          ...(this.events.has(name) ? this.events.get(name) : []),
          cb
        ])
        lg("Emitter.subscribe on name: "+name+". totals now: "+this.events.get(name).length);
        return () =>
          this.events.set(name, this.events.get(name).filter(fn => fn !== cb))
      }
      unsubscribe (name, cb) {
        let cbs=this.events.has(name) ? this.events.get(name) : []
        if (!cbs) { return; }
        let newcbs=cbs.filter( cbIn => cbIn!=cb)
        lg("emmiter unsubscribe from "+name +". totals now:"+newcbs.length)
        this.events.set(name, newcbs);
      }
     
      emit (name, ...args) {
        if (this.debug) { lg("Emitter.emit name: "+name); }
        return this.events.has(name) && this.events.get(name).map(fn => fn(...args))
      }
     
}
