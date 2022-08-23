
export default defineComponent({
  name: 'abc',
  setup () {
    const add = () => {
      console.log('局部 TSX 组件');
    }
    return {add}
  },
  render () {
    return (
      <div class="">
        <NInput />
        <NButton onClick={() => {this.add()}} >局部 TSX 组件</NButton>
      </div>
    )
  }
})
