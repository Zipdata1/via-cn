import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {VIALogo} from '../icons/via';
import {CategoryMenuTooltip} from '../inputs/tooltip';
import {CategoryIconContainer} from '../panes/grid';
import { useTranslation } from "react-i18next";

const ExternalLinkContainer = styled.span`
  position: absolute;
  right: 1em;
  display: flex;
  gap: 1em;
`;

export const ExternalLinks = () => {
  const { t } = useTranslation();
  return (
  <ExternalLinkContainer>
    <a href="https://caniusevia.com/" target="_blank">
      <CategoryIconContainer>
        <VIALogo height="25px" fill="currentColor" />
        <CategoryMenuTooltip>Firmware + Docs</CategoryMenuTooltip>
      </CategoryIconContainer>
    </a>
    <a href="https://discord.gg/NStTR5YaPB" target="_blank">
      <CategoryIconContainer>
        <FontAwesomeIcon size={'xl'} icon={faDiscord} />
        <CategoryMenuTooltip>{t('nav.discord')}</CategoryMenuTooltip>
      </CategoryIconContainer>
    </a>
    <a href="https://github.com/the-via/app" target="_blank">
      <CategoryIconContainer>
        <FontAwesomeIcon size={'xl'} icon={faGithub} />
        <CategoryMenuTooltip>{t('nav.github')}</CategoryMenuTooltip>
      </CategoryIconContainer>
    </a>
  </ExternalLinkContainer>
); }