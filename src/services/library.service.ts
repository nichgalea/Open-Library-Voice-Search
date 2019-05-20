export class LibraryService {
  private readonly url = "http://openlibrary.org";

  search(query: string): Promise<LibrarySearchResult> {
    const url = new URL(this.url);
    url.pathname = "search.json";
    url.searchParams.set("q", query);

    return fetch(url.toString()).then(r => r.json());
  }
}

export default new LibraryService();
