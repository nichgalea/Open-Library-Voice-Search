import "./styles.scss";

import { CarouselComponent, BookComponent } from "src/components";
import { SearchComponent } from "../search";

export class AppComponent extends HTMLElement {
  public static readonly selector = "lib-app";

  private carousel: CarouselComponent | null = null;

  constructor() {
    super();

    this.handleResult = this.handleResult.bind(this);
  }

  connectedCallback() {
    this.append(new SearchComponent(this.handleResult));
  }

  private handleResult(result: LibrarySearchResult) {
    if (!this.carousel) {
      this.carousel = new CarouselComponent();
      this.appendChild(this.carousel);
    }

    this.carousel.items = result.docs.map(b => new BookComponent(b));
  }
}
