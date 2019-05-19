import debounce from "lodash/debounce";

import styles from "./styles.scss";
import bookService from "src/services/library.service";
import { LastSearchComponent } from "./last-search";
import { RecordButtonComponent } from "./record-button";

export class SearchComponent extends HTMLElement {
  public static readonly selector = "lib-search";

  private voiceCommandButton!: RecordButtonComponent;
  private lastSearchComponent: LastSearchComponent | null = null;
  private input!: HTMLInputElement;
  private instructions!: HTMLDivElement;
  private inputContainer!: HTMLDivElement;

  constructor(private onResults: (results: LibrarySearchResult) => void, private onError: () => void) {
    super();

    this.handleInput = debounce(this.handleInput.bind(this), 750);
    this.search = this.search.bind(this);
    this.updateLastSearch = this.updateLastSearch.bind(this);
    this.handleVoiceCommandResult = this.handleVoiceCommandResult.bind(this);
    this.handleInvalidCommand = this.handleInvalidCommand.bind(this);
    this.handleNoCommandDetected = this.handleNoCommandDetected.bind(this);
  }

  connectedCallback() {
    this.append(this.renderSearchInput(), this.renderInstructions());
    this.input.focus();
  }

  private renderSearchInput() {
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Type to Search...";
    this.input.className = styles.searchInput;
    this.input.oninput = this.handleInput;
    this.input.onfocus = this.input.select;

    this.voiceCommandButton = new RecordButtonComponent(
      this.handleNoCommandDetected,
      this.handleInvalidCommand,
      this.handleVoiceCommandResult
    );

    this.inputContainer = document.createElement("div");
    this.inputContainer.className = styles.inputContainer;
    this.inputContainer.append(this.input, this.voiceCommandButton);

    return this.inputContainer;
  }

  renderInstructions() {
    this.instructions = document.createElement("div");
    this.instructions.innerHTML = '<p><b>Voice Search:</b> Say "Search for", followed by your query.</p>';
    this.instructions.className = styles.instructions;

    return this.instructions;
  }

  private handleInput() {
    this.resetInput();
    this.search();
  }

  private search() {
    const trimmedValue = this.input.value.trim();

    if (trimmedValue.length > 0) {
      this.className = styles.isSearching;

      this.updateLastSearch();

      bookService
        .search(trimmedValue)
        .then(this.onResults)
        .catch(this.onError);
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

  private handleVoiceCommandResult(result: string) {
    this.resetInput();
    this.input.value = result;
    this.search();
  }

  private handleNoCommandDetected() {
    this.inputContainer.classList.remove(styles.error);
    this.inputContainer.classList.add(styles.error);
    this.input.value = "";
    this.input.placeholder = "No voice detected";
  }

  private handleInvalidCommand() {
    this.inputContainer.classList.remove(styles.error);
    this.inputContainer.classList.add(styles.error);
    this.input.value = "";
    this.input.placeholder = "Invalid command";
  }

  private resetInput() {
    this.inputContainer.classList.remove(styles.error);
    this.input.placeholder = "Type to Search...";
  }
}

export * from "./last-search";
export * from "./record-button";
