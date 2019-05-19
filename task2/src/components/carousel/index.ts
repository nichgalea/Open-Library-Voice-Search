import styles from "./styles.scss";
import { CarouselSlideComponent } from "./slide";

export class CarouselComponent extends HTMLElement {
  public static readonly selector = "lib-carousel";

  private _slideDuration = 2500;
  public set slideDuration(duration: number) {
    this.stopMoving();
    this._slideDuration = duration;
    this.startMoving();
  }

  private _currentIndex = 0;
  private set currentIndex(index: number) {
    this._currentIndex = index % this._items.length; // next or back to first
    this.setTrackPosition();
  }

  private _items!: HTMLElement[];
  public set items(items: HTMLElement[]) {
    this.stopMoving();
    this._items = items;
    this.setupTrack();
    this.currentIndex = 0;
    this.startMoving();
  }

  private get slideWidth(): number {
    return window.innerWidth < 720 ? 300 : 400;
  }

  private intervalId: number | null = null;
  private track!: HTMLDivElement;

  constructor() {
    super();

    this.next = this.next.bind(this);
    this.setTrackPosition = this.setTrackPosition.bind(this);
  }

  connectedCallback() {
    this.track = document.createElement("div");
    this.track.className = styles.track;
    this.appendChild(this.track);
    window.addEventListener("resize", this.setTrackPosition);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.setTrackPosition);
  }

  private setTrackPosition() {
    const halfChildWidth = this.slideWidth / 2;
    const halfScreenWidth = window.innerWidth / 2;

    const slideWidth = this.slideWidth + 16; // with left margin

    const offset = halfScreenWidth - halfChildWidth - slideWidth * this._currentIndex;

    this.track.style.left = `${offset}px`;
  }

  private setupTrack() {
    this.track.innerHTML = "";
    this.track.append(...this._items.map(i => new CarouselSlideComponent(i)));
    this.setTrackPosition();
  }

  private stopMoving() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private startMoving() {
    if (!this.intervalId) {
      this.intervalId = window.setInterval(this.next, this._slideDuration);
    }
  }

  private next() {
    this.currentIndex = this._currentIndex + 1;
  }
}

export * from "./slide";
