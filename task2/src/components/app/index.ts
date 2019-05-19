import styles from "./styles.scss";
import cx from "classnames";

import { CarouselComponent, BookComponent } from "src/components";
import { SearchComponent } from "../search";

export class AppComponent extends HTMLElement {
  public static readonly selector = "lib-app";

  private information!: HTMLDivElement;
  private carousel: CarouselComponent | null = null;

  constructor() {
    super();

    this.handleResult = this.handleResult.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  connectedCallback() {
    this.information = document.createElement("div");
    this.information.className = cx(styles.information, styles.hidden);

    const search = new SearchComponent(this.handleResult, this.handleError);
    this.append(search, this.information);
  }

  private handleResult(result: LibrarySearchResult) {
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
    if (this.carousel) {
      this.carousel.items = [];
    }

    this.information.className = styles.information;
    this.information.innerText = "There was an error while getting your results!";
  }
}
