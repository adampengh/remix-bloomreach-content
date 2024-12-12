import { BrManageContentButton, BrPageContext, BrProps } from '@bloomreach/react-sdk';
import { Document } from '@bloomreach/spa-sdk';
import { Link } from '@remix-run/react';

import React from 'react';
import { Pageable, PageableModels } from '~/types';

interface NewsListItemProps {
  item: Document;
}

export function NewsListItem({ item }: NewsListItemProps): JSX.Element {
  const { author, date, introduction, title } = item.getData<any>();

  return (
    <div className="card mb-3">
      <BrManageContentButton content={item} />
      <div className="card-body">
        {title && (
          <h2 className="card-title">
            <Link to={item.getUrl() ?? '/'}>
              {title}
            </Link>
          </h2>
        )}
        {author && <div className="card-subtitle mb-3 text-muted">{author}</div>}
        {date && <div className="card-subtitle mb-3 small text-muted">{new Date(date).toDateString()}</div>}
        {introduction && <p className="card-text">{introduction}</p>}
      </div>
    </div>
  );
}

export function NewsListPagination(props: Pageable): JSX.Element | null {
  const page = React.useContext(BrPageContext);

  if (!page || !props.showPagination) {
    return null;
  }

  return (
    <nav aria-label="News List Pagination">
      <ul className="pagination">
        <li className={`page-item ${props.previous ? '' : 'disabled'}`}>
          <Link to={props.previous ? page.getUrl(`?page=${props.previousPage}`) : '/'} className="page-link"
                aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
        </li>
        {props.pageNumbersArray.map((pageNumber, key) => (
          <li key={key} className={`page-item ${pageNumber === props.currentPage ? 'active' : ''}`}>
            <Link to={page.getUrl(`?page=${pageNumber}`)} className="page-link">
              {pageNumber}
            </Link>
          </li>
        ))}
        <li className={`page-item ${props.next ? '' : 'disabled'}`}>
          <Link to={props.next ? page.getUrl(`?page=${props.nextPage}`) : '/'} className="page-link"
                aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function NewsList(props: BrProps): JSX.Element | null {
  const pageable = props.component?.getModels<PageableModels>().pageable;

  if (!pageable) {
    return null;
  }

  return (
    <div>
      {pageable.items.map(
        (reference, key) => props.page && <NewsListItem key={key} item={props.page.getContent<Document>(reference)!} />,
      )}
      {props.page?.isPreview() && (
        <div className="has-edit-button float-right">
          <BrManageContentButton
            documentTemplateQuery="new-news-document"
            folderTemplateQuery="new-news-folder"
            root="news"
          />
        </div>
      )}
      <NewsListPagination {...pageable} />
    </div>
  );
}