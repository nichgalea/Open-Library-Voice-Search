import styles from "./styles.scss";
import cx from "classnames";

import { CarouselComponent, BookComponent, SearchComponent, LoadingComponent } from "src/components";

export class AppComponent extends HTMLElement {
  public static readonly selector = "lib-app";

  private loading!: LoadingComponent;
  private information!: HTMLDivElement;
  private carousel: CarouselComponent | null = null;

  constructor() {
    super();

    this.handleResult = this.handleResult.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSearchStart = this.handleSearchStart.bind(this);
  }

  connectedCallback() {
    this.information = document.createElement("div");
    this.information.className = cx(styles.information, styles.hidden);

    this.loading = new LoadingComponent();

    this.append(
      this.loading,
      new SearchComponent(this.handleSearchStart, this.handleResult, this.handleError),
      this.information
    );
  }

  private handleSearchStart() {
    this.loading.loading = true;
  }

  private handleResult(result: LibrarySearchResult) {
    this.loading.loading = false;

    if (!this.carousel) {
      this.carousel = new CarouselComponent();
      this.appendChild(this.carousel);
    }

    this.carousel.items = result.docs.map(b => new BookComponent(b));

    if (result.docs.length > 0) {
      this.information.className = cx(styles.information, styles.hidden);
    } else {
      this.information.innerText = "We didn't find anything matching that query! :/";
      this.information.className = styles.information;
    }
  }

  private handleError() {
    this.loading.loading = false;

    if (this.carousel) {
      this.carousel.items = [];
    }

    this.information.className = styles.information;
    this.information.innerText = "There was an error while getting your results!";
  }
}
