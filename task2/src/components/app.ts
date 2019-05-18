export class AppComponent extends HTMLElement {
  public static readonly selector = "lib-app";

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `Hello World`;
  }
}
