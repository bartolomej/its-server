# ITS email module

### Functions

<a id="parse"></a>


▸ **service.send**(toAddress: _`string`_, senderName?: _`string`_, subject: _`string`_, text: _`string`_): Email

Sends an template email to address: `toAddress`. 
You specify email body text via `text` argument. 
Module parses newline (`\n`) chars in `text` to html `<br>` element.

_**example**_:

```js
const sendEmail = require('email/service').send;

let sentEmail = await service.send(
      '<receiver-email-address>', 'ITS', 'Test',
      `Pozdravljen uporabnik,\n\nTo je testni email.\n\nEkipa ITS`
);

// will parse as
Pozdravljen uporabnik,
<br>
<br>
To je testni email.
<br>
<br>
Ekipa ITS


```