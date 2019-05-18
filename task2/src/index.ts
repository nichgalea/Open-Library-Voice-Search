import components from "./components";

import { AppComponent } from "./components/app";

import "./styles.scss";

// define all custom elements
components.forEach(c => window.customElements.define(c.selector, c));

// attach root app component instance to DOM
document.body.appendChild(new AppComponent());
