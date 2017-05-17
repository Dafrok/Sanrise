export default (() => {
  return {
    getContent () {
      return this.content
    },
    setContent (content) {
      this.content = content
    }
  }
})()