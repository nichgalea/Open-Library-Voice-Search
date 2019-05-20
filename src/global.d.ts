declare module "*.scss";
declare module "*.svg";

// I generated this using http://www.jsontots.com/ using an actual result from the API for the sake of being thorough

interface LibrarySearchResult {
  start: number;
  num_found: number;
  numFound: number;
  docs: Book[];
}

interface Book {
  title_suggest: string;
  edition_key: string[];
  cover_i?: number;
  isbn?: string[];
  has_fulltext: boolean;
  text: string[];
  author_name?: string[];
  seed: string[];
  oclc?: string[];
  author_key?: string[];
  subject?: string[];
  title: string;
  publish_date: string[];
  type: string;
  ebook_count_i: number;
  publish_place?: string[];
  edition_count: number;
  key: string;
  id_goodreads?: string[];
  id_overdrive?: string[];
  publisher?: string[];
  language?: string[];
  last_modified_i: number;
  id_librarything?: string[];
  cover_edition_key?: string;
  publish_year: number[];
  first_publish_year: number;
  contributor?: string[];
  ia?: string[];
  ia_collection_s?: string;
  printdisabled_s?: string;
  ia_box_id?: string[];
  public_scan_b?: boolean;
  lccn?: string[];
  author_alternative_name?: string[];
  place?: string[];
  subtitle?: string;
  first_sentence?: string[];
  time?: string[];
  ia_loaded_id?: string[];
  lending_identifier_s?: string;
  lending_edition_s?: string;
  id_amazon?: string[];
  overdrive_s?: string;
  id_wikidata?: string[];
}

// Since Intl.RelativeTimeFormat still isn't supported by existing TypeScript libs, this will have to suffice.
// GitHub Issue: https://github.com/Microsoft/TypeScript/issues/29129

declare namespace Intl {
  function getCanonicalLocales(locales: string | string[]): string[];
  const RelativeTimeFormat: any;
}
