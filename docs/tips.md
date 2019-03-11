# common pitfalls

- when using `setInterval` in a component
  always `clearInterval` on `componentWillUnmount`

```
  componentDidMount() {
    this.timer = setInterval(() => {
      ...
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer: any;
```

- always add key prop in list of components like `VirtualList` or generating components from an array e.g. `arr.map(el => <Comp>el</Comp>)`. Avoid using array index as key.

TODO: add actual examples

- avoid using inline functions inside `render`

```
// avoid this
<TouchableOpacity onPress={() => doStuff('stuff')}>
```

```
// do this instead
someFunc = () => {
  doStuff('stuff');
}

<TouchableOpacity onPress={this.someFunc}>
```

when making views with text, always test by using very long strings first

```
<MyComp>
  <Text>insert very long text here</Text>
</MyComp>
```

- avoid unnecessary re-rendering by using `PureComponent` or by implementingn `shouldComponentUpdate` in `Component`.
