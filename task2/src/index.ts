import * as components from "./components";

import "./styles.scss";

// define all custom element components
for (let key in components) {
  const component = components[key];
  window.customElements.define(component.selector, component);
}

// attach root app component instance to DOM
document.body.appendChild(new components.AppComponent());
