import React from 'react';
import Layout from '@theme/Layout';

export default function Portfolio(): JSX.Element {
  return (
    <Layout
      title="Portfolio"
      description="InKeun Kim's Portfolio">
      <div style={{
        width: '100%',
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        margin: 0,
      }}>
        <iframe
          src="/portfolio.pdf"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Portfolio PDF"
        />
      </div>
    </Layout>
  );
}
