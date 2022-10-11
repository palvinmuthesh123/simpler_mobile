const lgArr = [];
var _remoteLog = true;

export function lg() {
  if (window.console) {
    var d = new Date();
    var txt=txt='['+ d.toLocaleTimeString() + '] ' + arguments[0];
    if (arguments.length >1 ){
      console.log(txt,Array.from(arguments).slice(1));
    }
    else {
      console.log(txt);
    }

    if (lgArr.length > 900) {
      lgArr.shift();
    }
    if (_remoteLog) {
      lgArr.push(txt);
    }
  }
}
export function getLog(){
    return lgArr;
}
