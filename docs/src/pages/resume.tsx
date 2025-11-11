import React from 'react';
import Layout from '@theme/Layout';

export default function Resume(): JSX.Element {
  return (
    <Layout
      title="Resume"
      description="InKeun Kim's Resume">
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
          src="/resume.pdf"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Resume PDF"
        />
      </div>
    </Layout>
  );
}
