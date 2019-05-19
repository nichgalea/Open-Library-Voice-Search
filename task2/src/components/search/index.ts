import debounce from "lodash/debounce";

import styles from "./styles.scss";
import bookService from "src/services/library.service";
import { LastSearchComponent } from "./last-search";
import { RecordButtonComponent } from "./record-button";

export class SearchComponent extends HTMLElement {
  public static readonly selector = "lib-search";

  private lastSearchComponent: LastSearchComponent | null = null;
  private input!: HTMLInputElement;

  constructor(private onResults: (results: LibrarySearchResult) => void) {
    super();

    this.handleInput = debounce(this.handleInput.bind(this), 750);
    this.search = this.search.bind(this);
    this.updateLastSearch = this.updateLastSearch.bind(this);
    this.onVoiceResult = this.onVoiceResult.bind(this);
  }

  connectedCallback() {
    this.appendChild(this.renderSearchInput());
  }

  private renderSearchInput() {
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Search...";
    this.input.className = styles.searchInput;
    this.input.oninput = this.handleInput;
    this.input.onfocus = this.input.select;

    const container = document.createElement("div");
    container.className = styles.inputContainer;
    container.append(this.input, new RecordButtonComponent(this.onVoiceResult));

    return container;
  }

  private handleInput() {
    this.search();
  }

  private search() {
    const trimmedValue = this.input.value.trim();

    if (trimmedValue.length > 0) {
      this.className = styles.isSearching;

      this.updateLastSearch();

      bookService.search(trimmedValue).then(this.onResults); // todo: handle error
    }
  }

  private updateLastSearch() {
    if (this.lastSearchComponent) {
      this.lastSearchComponent.lastUpdateTime = new Date();
    } else {
      this.lastSearchComponent = new LastSearchComponent(new Date());
      this.appendChild(this.lastSearchComponent);
    }
  }

  private onVoiceResult(result: string) {
    this.input.value = result;
    this.search();
  }
}

export * from "./last-search";
export * from "./record-button";
