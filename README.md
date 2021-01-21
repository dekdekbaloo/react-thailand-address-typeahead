# react-thailand-address-typeahead (jQuery free)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This project is forked from
[jquery.Thailand.js](https://github.com/earthchie/jquery.Thailand.js) / [react-thailand-address-typeahead](https://github.com/zapkub/react-thailand-address-typeahead)

## Added Features
- Updated set of data
- Added `init` function requiring custom `address.json` for flexibility
- Custom container `className`

## Demo
[Original example with storybook](http://zapkub.github.io/react-thailand-address)

## Requirement
- react

## Usage

```js
import AddressFormTypeahead, { init } from 'react-thailand-address-typeahead';

// Before rendering
init(requrie('path/to/your/address.json'))

export default () => (
  <AddressFormTypeahead
    className='custom-container-class'
    onAddressSelected={(addressObject) => console.log(addressObject)}
  />
)
```

> NOTE: For component styles you can include or use loader `./dist/styles.css` to your app or implement by yourself [styles](./dist/styles.css)

Further examples: [Example](./example/index.js)
## Development
- Clone this project
- run `npm install`
- start development via storybook `npm run storybook`
- navigate to `localhost:9001`
## Testing
- `npm test`
## Contribute
- open for any pullrequest
- Commitizen is preferred !! 😎
## Original fork and idea

[earthchie](https://github.com/earthchie/) - Project Owner, Original fork
(you should treat him a beer 😎🍺)
## License
- Original : WTFPL 2.0 http://www.wtfpl.net/
- Also MIT (formally)
