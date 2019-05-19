import styles from "./styles.scss";

export class LoadingComponent extends HTMLElement {
  public static readonly selector = "lib-loading";

  public set loading(value: boolean) {
    if (value) {
      this.classList.add(styles.loading);
    } else {
      this.classList.remove(styles.loading);
    }
  }

  constructor() {
    super();
  }
}
