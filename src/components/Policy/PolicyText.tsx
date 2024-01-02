import { isArray, isString } from 'lodash';
import React from 'react';

export interface PolicyTextContent {
  href?: string;
  content:
    | (string | (string | PolicyTextContent)[])[]
    | string
    | PolicyTextContent;
  italic?: boolean;
  underline?: boolean;
  type: 'text' | 'ol' | 'subhead' | 'ul';
  quota?: boolean;
  olType?: string;
}

export function PolicyText({
  content,
}: {
  content: string | PolicyTextContent;
}) {
  if (isString(content)) {
    return <>{content} </>;
  }
  if (content?.type === 'text' && isString(content.content)) {
    if (content?.href) {
      return <PolicyHyperText content={content.content} href={content.href} />;
    }
    if (content?.italic || content?.underline) {
      return (
        <PolicyTextStyle
          quota={content?.quota}
          italic={content?.italic}
          content={content.content}
          underline={content?.underline}
        />
      );
    }
  }
  if (['ol', 'ul'].includes(content?.type) && isArray(content?.content)) {
    const _content = content?.content.map((v, i) => (
      <li key={`abc-${i}`}>
        {isArray(v) ? (
          v.map((v1, i1) => <PolicyText key={i1} content={v1} />)
        ) : (
          <PolicyText content={v} />
        )}
      </li>
    ));
    if (content?.type === 'ol') {
      console.log(content?.olType);
      return (
        <ol style={{ padding: 'revert', listStyle: content?.olType || 'auto' }}>
          {_content}
        </ol>
      );
    }
    return (
      <ul className="list-disc" style={{ padding: 'revert' }}>
        {_content}
      </ul>
    );
  }
  if (content.type === 'subhead' && isString(content?.content)) {
    return (
      <span className="text-lg font-display font-semibold">
        {content?.content}
      </span>
    );
  }
  return <></>;
}

function PolicyHyperText({ content, href }: { content: string; href: string }) {
  return (
    <a style={{ color: '#5c80b8', fontWeight: 'bold' }} href={href}>
      {content}{' '}
    </a>
  );
}

function PolicyTextStyle({
  italic,
  bold,
  content,
  underline,
  quota,
}: {
  italic?: boolean;
  bold?: boolean;
  content: string;
  underline?: boolean;
  quota?: boolean;
}) {
  let res = <>{content}</>;
  if (underline) {
    res = <u>{res}</u>;
  }
  if (quota) {
    res = <>“{res}“</>;
  }

  if (italic) {
    res = <i>{res}</i>;
  }
  if (bold) {
    res = <b>{res}</b>;
  }

  return <>{res} </>;
}

export function PolicyTitle({ title, idx }: { title: string; idx: number }) {
  return (
    <h1 className="text-3xl font-display font-semibold">
      {idx}. {title.toUpperCase()}
    </h1>
  );
}
