import "./styles.scss";

import { SearchComponent } from "../search";
import { BookComponent } from "../book";

export class AppComponent extends HTMLElement {
  public static readonly selector = "lib-app";

  private resultContainer!: HTMLDivElement;

  constructor() {
    super();

    this.handleResult = this.handleResult.bind(this);
  }

  connectedCallback() {
    this.appendChild(new SearchComponent(this.handleResult));
    this.resultContainer = document.createElement("div");
    this.appendChild(this.resultContainer);
  }

  private handleResult(result: LibrarySearchResult) {
    this.clearResults();
    this.resultContainer.append(...result.docs.map(b => new BookComponent(b)));
  }

  private clearResults() {
    for (const child of this.resultContainer.children) {
      child.remove();
    }
  }
}
