# Open Library Search

Built using:

- Web Components
- TypeScript
- Webpack
- CSS Modules

Install NPM dependencies, and `npm start` to run. Server will host at http://localhost:9000

All components are built using custom elements ([Web Components standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)).

Search books using queries like "1984", "George Orwell" or "Oscar Wilde". Results are loaded in a carousel that scrolls and loops automatically. Carousel movement stops when window is inactive.

## Voice Search

For voice search, click on the microphone button and say the words "search for", followed by your query. While the microphone button is flashing, speech is being detected (behaviour may vary -- see below).

This internally uses `SpeechRecognition`. Due to this it's recommended that this project is run on latest version of Chrome only.

**Note:** `SpeechReconigition` is still an experimental API, and due to this, expected behaviour can happen; e.g. the speech input stops being received without any "end" (`onend`, `onspeechend`, `onaudioend`, etc.) events firing from the instance. In this case simply click on the microphone button until it starts flashing again.

Also, `SpeechGrammarList` would have been useful to set predefined grammar for the `SpeechReconigition` API. This was not possible due to [this open issue](https://bugs.chromium.org/p/chromium/issues/detail?id=799849).
