# Netflix - Google Translate Captions

Translate any netflix shows captions using google translate (Any Language).

<img width="951" alt="screen shot 2017-10-01 at 2 12 34 am" src="https://user-images.githubusercontent.com/3493710/31053256-05c051c4-a64e-11e7-95c3-24720a89a9dd.png">

If I see more usage I'll turn this into a chrome plugin.

## Usage:

1. Populate API key in `universalTranslator.js`
2. Choose 2 letter language code for target language
3. Copy javascript into the developer console while on the netflix site.

Note: this will cost a small amount of money to use (Based on the translation rates provided by google)

Some of the translations can be glitchy; (Flashing on screen; displaced; PRs are welcome!)

## Development:

1. Open a show on netflix with english captions
2. Copy current code into javascript console

Refreshing the page clears out current state; clearing the interval will stop translation.
