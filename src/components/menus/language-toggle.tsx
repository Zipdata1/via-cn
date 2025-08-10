
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { CategoryMenuTooltip } from '../inputs/tooltip';
import { CategoryIconContainer } from '../panes/grid';

const ToggleContainer = styled.span`
  position: absolute;
  right: 8.5em; /* leave room for ExternalLinks icons on the far right */
  display: inline-flex;
  align-items: center;
`;

const Pill = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  line-height: 1;
  background: ${({theme}) => theme.alpha.bg3};
  color: ${({theme}) => theme.alpha.fg1};
  box-shadow: 0 0 0 1px ${({theme}) => theme.alpha.border};
  &:hover { background: ${({theme}) => theme.alpha.bg4}; }
`;

export const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isZh = i18n.language.startsWith('zh');
  const next = isZh ? 'en' : 'zh';
  const label = isZh ? '中' : 'EN';
  const tip = isZh ? t('common.english') : t('common.chineseSimplified');

  const onClick = () => {
    i18n.changeLanguage(next);
    try { localStorage.setItem('i18nextLng', next); } catch {}
  };

  return (
    <ToggleContainer>
      <CategoryIconContainer>
        <Pill onClick={onClick} aria-label={tip} title={tip}>{label}</Pill>
        <CategoryMenuTooltip>{t('common.language')}</CategoryMenuTooltip>
      </CategoryIconContainer>
    </ToggleContainer>
  );
};
