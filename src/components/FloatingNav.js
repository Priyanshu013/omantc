import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

const order = ['/', '/heritage', '/dates', '/wellness', '/culture'];

export default function FloatingNav() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { pathname } = useLocation();
  const idx = order.indexOf(pathname);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;

  return (
    <div className="toolbar">
      <button className="btn" onClick={() => prev && navigate(prev)} disabled={!prev}>{t('cta.back')}</button>
      <button className="btn" onClick={() => navigate('/')}>{t('cta.home')}</button>
      <button className="btn btn--primary" onClick={() => next && navigate(next)} disabled={!next}>{t('cta.next')}</button>
    </div>
  );
}


