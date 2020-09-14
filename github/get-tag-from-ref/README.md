# get-tag-from-ref

**get-tag-from-ref** converts the `{{ github.ref }}` value from a string that looks like `refs/tags/v1.0.0` to `v1.0.0`. It produces an output you can use in later steps.

## Example usage

```yaml
name: My workflow
on:
  push:
    tags:
      - v*
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master
      with:
        fetch-depth: '0'
    - name: Get tag
      id: tag
      uses: jimmysawczuk/get-tag-from-ref@master
      with:
        ref: ${{ github.ref }}
    - name: Use tag
      run: echo ${{ steps.tag.outputs.tag }}
```

## License

[MIT](/LICENSE)