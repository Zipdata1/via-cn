import {useState} from 'react';
import {Pane} from './pane';
import styled from 'styled-components';
import {
  ControlRow,
  Label,
  Detail,
  Grid,
  MenuCell,
  Row,
  IconContainer,
  SpanOverflowCell,
} from './grid';
import {AccentSlider} from '../inputs/accent-slider';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'src/store/hooks';
import {
  getShowDesignTab,
  getDisableFastRemap,
  toggleCreatorMode,
  toggleFastRemap,
  getThemeMode,
  toggleThemeMode,
  getThemeName,
  updateThemeName,
  getRenderMode,
  updateRenderMode,
} from 'src/store/settingsSlice';
import {AccentSelect} from '../inputs/accent-select';
import {THEMES} from 'src/utils/themes';
import {MenuContainer} from './configure-panes/custom/menu-generator';
import {MenuTooltip} from '../inputs/tooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faToolbox} from '@fortawesome/free-solid-svg-icons';
import {getSelectedConnectedDevice} from 'src/store/devicesSlice';
import {ErrorMessage} from '../styled';
import {webGLIsAvailable} from 'src/utils/test-webgl';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;

const DiagnosticContainer = styled(Container)`
  margin-top: 20px;
  padding-top: 20px;
`;

const SettingsErrorMessage = styled(ErrorMessage)`
  margin: 0;
  font-style: italic;
`;

export const Settings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showDesignTab = useAppSelector(getShowDesignTab);
  const disableFastRemap = useAppSelector(getDisableFastRemap);
  const themeMode = useAppSelector(getThemeMode);
  const themeName = useAppSelector(getThemeName);
  const renderMode = useAppSelector(getRenderMode);
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);

  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const themeSelectOptions = Object.keys(THEMES).map((k) => ({
    label: i18next.t(`settings.theme.${k}`, { defaultValue: k.replaceAll('_', ' ') }),
    value: k,
  }));
  const themeDefaultValue = themeSelectOptions.find(
    (opt) => opt.value === themeName,
  );

  const renderModeOptions = webGLIsAvailable
    ? [
        {
          label: i18next.t('settings.renderMode2D'),
          value: '2D',
        },
        {
          label: i18next.t('settings.renderMode3D'),
          value: '3D',
        },
      ]
    : [{label: i18next.t('settings.renderMode2D'), value: '2D'}];
  const renderModeDefaultValue = renderModeOptions.find(
    (opt) => opt.value === renderMode,
  );
  return (
    <Pane>
      <Grid style={{overflow: 'hidden'}}>
        <MenuCell style={{pointerEvents: 'all', borderTop: 'none'}}>
          <MenuContainer>
            <Row $selected={true}>
              <IconContainer>
                <FontAwesomeIcon icon={faToolbox} />
                <MenuTooltip>General</MenuTooltip>
              </IconContainer>
            </Row>
          </MenuContainer>
        </MenuCell>
        <SpanOverflowCell style={{flex: 1, borderWidth: 0}}>
          <Container>
            <ControlRow>
              <Label>{t('settings.showDesignTab')}</Label>
              <Detail>
                <AccentSlider
                  onChange={() => dispatch(toggleCreatorMode())}
                  isChecked={showDesignTab}
                />
              </Detail>
            </ControlRow>
            <ControlRow>
              <Label>{t('settings.fastKeyMapping')}</Label>
              <Detail>
                <AccentSlider
                  onChange={() => dispatch(toggleFastRemap())}
                  isChecked={!disableFastRemap}
                />
              </Detail>
            </ControlRow>
            <ControlRow>
              <Label>{t('settings.lightMode')}</Label>
              <Detail>
                <AccentSlider
                  onChange={() => dispatch(toggleThemeMode())}
                  isChecked={themeMode === 'light'}
                />
              </Detail>
            </ControlRow>
            <ControlRow>
              <Label>{t('settings.keycapTheme')}</Label>
              <Detail>
                <AccentSelect
                  defaultValue={themeDefaultValue}
                  options={themeSelectOptions}
                  onChange={(option: any) => {
                    option && dispatch(updateThemeName(option.value));
                  }}
                />
              </Detail>
            </ControlRow>
            <ControlRow>
              <Label>{t('settings.renderMode')}</Label>
              <Detail>
                <AccentSelect
                  defaultValue={renderModeDefaultValue}
                  options={renderModeOptions}
                  onChange={(option: any) => {
                    option && dispatch(updateRenderMode(option.value));
                  }}
                />
              </Detail>
            </ControlRow>
            <ControlRow>
              <Label>{t('settings.showDiagnostics')}</Label>

              <Detail>
                {selectedDevice ? (
                  <AccentSlider
                    onChange={() => setShowDiagnostics(!showDiagnostics)}
                    isChecked={showDiagnostics}
                  />
                ) : (
                  <SettingsErrorMessage>
                    {t('settings.requiresDevice')}
                  </SettingsErrorMessage>
                )}
              </Detail>
            </ControlRow>
          </Container>
          {showDiagnostics && selectedDevice ? (
            <DiagnosticContainer>
              <ControlRow>
                <Label>{t('settings.viaProtocol')}</Label>
                <Detail>{selectedDevice.protocol}</Detail>
              </ControlRow>
            </DiagnosticContainer>
          ) : null}
        </SpanOverflowCell>
      </Grid>
    </Pane>
  );
};