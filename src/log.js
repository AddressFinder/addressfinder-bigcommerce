export default function(message, data=undefined){
  // widget.debug should be on
  if (window.console) {
    if (data != undefined) {
      console.log(`${message}`, data)
    }
    else {
      console.log(`${message}`)
    }
  }
}
