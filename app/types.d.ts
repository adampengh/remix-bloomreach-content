export interface LoaderProps {
  configuration: Configuration;
  page: Page;
  pageJson: PageModel;
  isPreview: boolean;
}

export interface DocumentModels {
  document: import('@bloomreach/spa-sdk').Reference;
}

export interface DocumentContent {
  value: string;
}

export interface DocumentData {
  author: string;
  content: DocumentContent;
  date: number;
  publicationDate: number;
  image: import('@bloomreach/spa-sdk').Reference;
  introduction: string;
  title: string;

  [property: string]: any;
}

export interface MenuModels {
  menu: import('@bloomreach/spa-sdk').Reference;
}

export interface Pageable {
  currentPage: number;
  currentRange: number[];
  endOffset: number;
  endPage: number;
  items: import('@bloomreach/spa-sdk').Reference[];
  maxSize: number;
  next: boolean;
  nextBatch: boolean;
  nextPage: number | null;
  pageNumbersArray: number[];
  pageSize: number;
  previous: boolean;
  previousPage: number | null;
  showPagination: boolean;
  startOffset: number;
  startPage: number;
  total: number;
  totalPages: number;
  visiblePages: number;
}

export interface PageableModels {
  pageable: Pageable;
}