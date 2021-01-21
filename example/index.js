import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withState } from 'recompose';
import AddressForm, { init } from '../src/index';

import '../src/styles.css';

init(require('../address.json'));

storiesOf('Component', module)
  .add('montage', () => (
    <div style={{ width: 350 }}>
      <AddressForm onAddressSelected={action('onSelectedAdress')} />
      <code>{'<AddressForm onAddressSelected={action(\'onSelectedAdress\')} />'}</code>
    </div>
  ))
  .add('handle result', () => {
    const WithStateComponent = withState('result', 'setResult', null)(({ result, setResult }) => (
      <div style={{ width: 350 }}>
        <div>
          selected : {result ? `${result.p} ${result.a} ${result.d} ${result.z}` : null}
        </div>
        <AddressForm onAddressSelected={address => setResult(address)} />
      </div>
      ));
    return (<div>
      <WithStateComponent />
      <code>
        {`
         <div style={{ width: 350 }}>
          <div>
            selected : {result ? \`\${result.p} \${result.a} \${result.d} \${result.z}\` : null}
          </div>
          <AddressForm onAddressSelected={address => setResult(address)} />
        </div>
        `}
      </code>
    </div>);
  })
  .add('custom render result', () => (
    <div style={{ width: 400 }}>
      <AddressForm
        renderResult={data => <b>{`Hi ${data.p}:${data.d} ${data.a}`}</b>}
        onAddressSelected={action('onSelectedAdress')}
      />
    </div>
  ));

