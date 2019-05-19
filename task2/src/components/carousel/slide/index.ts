import "./styles.scss";

export class CarouselSlideComponent extends HTMLElement {
  public static readonly selector = "lib-carousel-slide";

  constructor(private content: HTMLElement) {
    super();
  }

  connectedCallback() {
    this.append(this.content);
  }
}
