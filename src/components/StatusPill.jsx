import React from 'react';

const CLASS_BY_STATUS = {
  'On Google Play': '',
  'Prototype': 'prototype',
  'In progress': 'progress',
  'In development': 'progress',
};

export default function StatusPill({ status }) {
  return <span className={`pill ${CLASS_BY_STATUS[status] ?? ''}`}>{status}</span>;
}
