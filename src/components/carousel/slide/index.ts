import styles from "./styles.scss";

export class CarouselSlideComponent extends HTMLElement {
  public static readonly selector = "lib-carousel-slide";

  public set active(value: boolean) {
    if (value) {
      this.classList.add(styles.active);
    } else {
      this.classList.remove(styles.active);
    }
  }

  constructor(private content: HTMLElement) {
    super();
  }

  connectedCallback() {
    this.append(this.content);
  }
}
