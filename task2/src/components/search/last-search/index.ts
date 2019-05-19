import styles from "./styles.scss";

export class LastSearchComponent extends HTMLElement {
  public static readonly selector = "lib-last-search";

  private updateIntervalId!: number;
  private relativeTimeFormatter = new Intl.RelativeTimeFormat(navigator.language);

  constructor(public lastUpdateTime: Date) {
    super();

    this.startUpdates = this.startUpdates.bind(this);
    this.update = this.update.bind(this);
  }

  connectedCallback() {
    this.startUpdates();
    this.classList.add(styles.show);
  }

  disconnectedCallback() {
    window.clearInterval(this.updateIntervalId);
  }

  private startUpdates() {
    this.update();

    this.updateIntervalId = window.setInterval(this.update, 1000);
  }

  private update() {
    const totalSeconds = Math.round((Date.now() - this.lastUpdateTime.getTime()) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const result = this.constructRelativeTimeString(minutes, seconds);

    if (this.innerText !== result) {
      this.innerText = result;
    }
  }

  private constructRelativeTimeString(minutes: number, seconds: number): string {
    if (minutes > 0) {
      return this.relativeTimeFormatter.format(-minutes, "minute");
    } else {
      return this.relativeTimeFormatter.format(-seconds, "second");
    }
  }
}
