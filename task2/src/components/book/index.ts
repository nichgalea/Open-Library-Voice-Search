import styles from "./styles.scss";

export class BookComponent extends HTMLElement {
  public static readonly selector = "lib-book";

  private get author(): string {
    return this.book.author_name ? this.book.author_name[0] : "Unknown";
  }

  constructor(private book: Book) {
    super();
  }

  connectedCallback() {
    const srcset = `
      http://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg?default=false 200w,
      http://covers.openlibrary.org/b/id/${this.book.cover_i}-L.jpg?default=false 400w
    `;

    this.innerHTML = `
      <div class="${styles.cover}">
        <img srcset="${srcset}" sizes="50vw" width="200" alt="${this.book.title}" />
      </div>
      <div class="${styles.details}">
        <h3 class="${styles.title}">${this.book.title}</h3>
        <p class="${styles.author}">By: <b>${this.author}</b></p>
        <p>Published: ${this.book.publish_date ? this.book.publish_date[0] : "Unknown"}</p>
      </div>
    `;
  }
}
