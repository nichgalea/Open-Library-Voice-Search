export class AppComponent extends HTMLElement {
  public static readonly selector = "lib-app";

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <lib-search></lib-search>
    `;
  }
}
