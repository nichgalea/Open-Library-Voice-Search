import styles from "./styles.scss";

export class BookComponent extends HTMLElement {
  public static readonly selector = "lib-book";

  get author(): string {
    return this.book.author_name ? this.book.author_name[0] : "Unknown";
  }

  get cover(): string {
    return `http://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`;
  }

  constructor(private book: Book) {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="${styles.cover}">
        <img src=${this.cover} />
      </div>
      <div class="${styles.details}">
        <h3 class="${styles.title}">${this.book.title}</h3>
        <p class="${styles.author}">By: <b>${this.author}</b></p>
        <p>Published: ${this.book.publish_date[0]}</p>
      </div>
    `;
  }
}

// 12 rules for life jordan peterson
