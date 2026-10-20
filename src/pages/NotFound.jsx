import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="wrap">
      <h1>Page not found</h1>
      <p className="muted" style={{ marginTop: 12 }}>
        This page does not exist, or it moved when I redesigned the site.
      </p>
      <div className="buttons">
        <Link to="/" className="btn primary">Go to the home page</Link>
      </div>
    </div>
  );
}
