import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Body} from '@/app/components/Text/Text';
import {
  DEFAULT_LANGUAGES,
  LanguageSelector,
  type Language,
} from '@/app/components/LanguageSelector';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English (US)',
  fr: 'Francais',
  es: 'Espanol',
};

const TWO_LANGUAGE_SET: Language[] = DEFAULT_LANGUAGES.slice(0, 2);

export default function LanguageSelectorPage() {
  const [language, setLanguage] = React.useState('en');
  const [compactSet, setCompactSet] = React.useState(false);
  const languages = compactSet ? TWO_LANGUAGE_SET : DEFAULT_LANGUAGES;

  return (
    <PageWrapper
      title="Language Selector"
      category="Subsystem Components"
      description="A compact flag trigger that opens a locale dropdown for language switching in navigation and account surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview controlled language state and the size of the available locale list."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Active language</Body>
                <ButtonGroup>
                  {languages.map((item) => (
                    <Button key={item.code} size="small" variant={language === item.code ? 'primary' : 'secondary'} onClick={() => setLanguage(item.code)}>
                      {item.code.toUpperCase()}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{width: 'fit-content'}}>
                <Button variant="secondary" size="small" onClick={() => setCompactSet((value) => !value)}>
                  {compactSet ? 'Use all locales' : 'Use two locales'}
                </Button>
              </div>
            </>
          }
          preview={
            <DocsCard title="Preview" description={`Active: ${LANGUAGE_LABELS[language] ?? language}`}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center', minHeight: 80}}>
                <LanguageSelector value={language} onChange={setLanguage} languages={languages} />
                <Body as="span" size="small" color="subtle">Open the trigger to choose another locale.</Body>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Locale Sets" description="Use the provided locale set by default, or pass a narrowed list for market-specific surfaces.">
        <DocsGrid>
          <DocsCard title="Default locales" description="English, French, and Spanish are available." style={{overflow: 'visible'}}>
            <LanguageSelector value="en" onChange={() => {}} />
          </DocsCard>
          <DocsCard title="Market-specific list" description="The component accepts a custom language list." style={{overflow: 'visible'}}>
            <LanguageSelector value="fr" onChange={() => {}} languages={TWO_LANGUAGE_SET} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Language Selector in global navigation or account settings where locale changes are expected. Keep the trigger compact, use full labels in the dropdown, and keep the active value controlled by the app locale state."
        defaultValue="languages=DEFAULT_LANGUAGES, value=languages[0].code"
      />
    </PageWrapper>
  );
}