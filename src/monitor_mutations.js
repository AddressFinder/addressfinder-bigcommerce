export default class MonitorMutations {
  mutationHandler(mutations){
    const changedNodes = mutations.reduce((nodes, mutation) => {
      // ignore this mutation if the target is the AddressFinder UL element
      if (mutation.target && mutation.target.classList && mutation.target.classList.contains("af_list")) {
        return nodes
      }

      return nodes.concat([...mutation.addedNodes]).concat([...mutation.removedNodes])
    }, [])

    const anyBigCommerceChanges = changedNodes.find((node) => {
      return !(node.classList && node.classList.contains("af_list"))
    })

    if (!anyBigCommerceChanges) {
      return // ignore AddressFinder changes
    }

    if (this._mutationTimeout) {
      clearTimeout(this._mutationTimeout) // reset previous timeout
    }

    // ignore any further changes for the next 750 mS
    this._mutationTimeout = setTimeout(this.resetAndReloadFormHelpers.bind(this), 750)
  }

  domNodeModifiedHandler(event){
    if (event.target.className && event.target.className.includes("af_list")) {
      return // ignore AddressFinder changes
    }

    if (event.relatedNode && event.relatedNode.className && event.relatedNode.className.includes("af_list")) {
      return // ignore AddressFinder changes
    }

    if (this._mutationTimeout) {
      clearTimeout(this._mutationTimeout) // reset previous timeout
    }

    // ignore any further changes for the next 750 mS
    this._mutationTimeout = setTimeout(this.resetAndReloadFormHelpers.bind(this), 750)
  }


  monitorMutations(){
    if (window.MutationObserver) {
      /* for modern browsers */
      var observer = new MutationObserver(this.mutationHandler.bind(this));
      observer.observe(document.body, {childList: true, subtree: true});

    } else if (window.addEventListener) {
      /* for IE 9 and 10 */
      document.body.addEventListener('DOMNodeInserted', this.domNodeModifiedHandler.bind(this), false);
      document.body.addEventListener('DOMNodeRemoved', this.domNodeModifiedHandler.bind(this), false);
    } else {
        if (window.console) {
          console.info('AddressFinder Error - please use a more modern browser')
        }
    }
  }
}