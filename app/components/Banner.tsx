import { BrManageContentButton, BrProps } from "@bloomreach/react-sdk";
import { ImageSet } from "@bloomreach/spa-sdk";
import { Link } from "@remix-run/react";
import { sanitize } from "~/lib/sanitize";


export function Banner({ component, page }: BrProps): JSX.Element | null {
  const documentRef = component?.getModels().document;
  const document = !!documentRef && page?.getContent(documentRef);

  if (!document || !page) {
    return null;
  }

  const { content, image: imageRef, link: linkRef, title } = document.getData<any>();
  const image = imageRef && page.getContent<ImageSet>(imageRef);
  const link = linkRef && page.getContent<Document>(linkRef);

  return (
    <div className={`jumbotron mb-3 ${page.isPreview() ? 'has-edit-button' : ''}`}>
      <BrManageContentButton content={document} />
      {title && <h1>{title}</h1>}
      {image && <img className="img-fluid" src={image.getOriginal()?.getUrl()} alt={title} />}
      {/* eslint-disable-next-line react/no-danger */}
      {content && page && <div dangerouslySetInnerHTML={{ __html: page.rewriteLinks(sanitize(content.value)) }} />}
      {link && (
        <p className="lead">
          <Link to={link.getUrl()} className="btn btn-primary btn-lg" role="button">
            Learn more
          </Link>
        </p>
      )}
    </div>
  );
}