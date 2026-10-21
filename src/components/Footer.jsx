import React from 'react';
import { PROFILE } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.town} ·{' '}
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
        <p>
          "Mirkuz Technologies" is the name I use to publish my apps, for example on Google Play.
          It is not a registered company. I work on these projects as an individual student.
        </p>
      </div>
    </footer>
  );
}
