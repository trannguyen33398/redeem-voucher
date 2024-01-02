import { Fragment } from 'react';
import { PolicyText, PolicyTextContent, PolicyTitle } from './PolicyText';

export interface PolicyContent {
  title: string;
  content: (string | PolicyTextContent)[][];
}

function PolicyContainer({ contents }: { contents: PolicyContent[] }) {
  return (
    <>
      {contents.map((policy, i) => (
        <Fragment key={`policy-${i}`}>
          <PolicyTitle idx={i + 1} title={policy.title} />
          {policy.content.map((pContent, idxPContent) => (
            <div key={`policy-${i}-${idxPContent}`}>
              {pContent.map((textContent, idxTextContent) => (
                <PolicyText
                  content={textContent}
                  key={`policy-${i}-${idxPContent}-${idxTextContent}`}
                />
              ))}
            </div>
          ))}
        </Fragment>
      ))}
    </>
  );
}

export default PolicyContainer;
