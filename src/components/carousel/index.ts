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
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    this.track = document.createElement("div");
    this.track.className = styles.track;
    this.appendChild(this.track);
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  private setupTrack() {
    this.track.innerHTML = "";
    this.track.append(...this._items.map(i => new CarouselSlideComponent(i)));
    this.setTrackPosition(0);
  }

  private setTrackPosition(index = this._currentIndex) {
    const halfChildWidth = this.slideWidth / 2;
    const halfScreenWidth = window.innerWidth / 2;

    const slideWidth = this.slideWidth + 16; // + margin between slides

    const offset = halfScreenWidth - halfChildWidth - slideWidth * index;

    this.track.style.left = `${offset}px`;
    console.log(offset);

    if (this.track.children[index]) {
      const previousIndex = (index === 0 ? this._items.length : index) - 1;
      const previous = <CarouselSlideComponent>this.track.children[previousIndex];
      previous.active = false;

      (<CarouselSlideComponent>this.track.children[index]).active = true;
    }
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

  private handleVisibilityChange() {
    if (document.hidden) {
      this.stopMoving();
    } else {
      this.startMoving();
    }
  }

  private handleResize() {
    this.setTrackPosition();
  }
}

export * from "./slide";
