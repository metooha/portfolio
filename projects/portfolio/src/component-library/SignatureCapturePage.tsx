import * as React from 'react';

import {Button} from '@/app/components/Button/Button';
import {Chip} from '@/app/components/Chip/Chip';
import {
  SignatureBase,
  SignatureReauth,
  SignatureTerms,
  SignatureTrigger,
} from '@/app/components/SignatureCapture/SignatureCapture';
import {A11yAnnouncementProvider} from '@/app/components/A11yAnnouncement';
import {
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

export default function SignatureCapturePage() {
  // Terms controls
  const [termsState, setTermsState] = React.useState<'signed' | 'signed-as'>('signed');
  const [showPreviewWarning, setShowPreviewWarning] = React.useState(false);

  // Base controls
  const [fullName, setFullName] = React.useState('');
  const [previewedName, setPreviewedName] = React.useState('');
  const [baseSignatureState, setBaseSignatureState] = React.useState<'unsigned' | 'signed'>('unsigned');
  const [isSignChecked, setIsSignChecked] = React.useState(false);
  const [showTechError, setShowTechError] = React.useState(false);
  const [showPetNameWarning, setShowPetNameWarning] = React.useState(false);
  const [showSignBeforeSubmit, setShowSignBeforeSubmit] = React.useState(false);
  const [showCheckboxError, setShowCheckboxError] = React.useState(false);

  // Reauth controls
  const [reauthSubVariant, setReauthSubVariant] = React.useState<'agree-sign' | 'signed' | 'signed-as'>('agree-sign');
  const [showReauthError, setShowReauthError] = React.useState(false);

  const resetBase = () => {
    setFullName('');
    setPreviewedName('');
    setBaseSignatureState('unsigned');
    setIsSignChecked(false);
    setShowTechError(false);
    setShowPetNameWarning(false);
    setShowSignBeforeSubmit(false);
    setShowCheckboxError(false);
  };

  return (
    <A11yAnnouncementProvider>
    <PageWrapper
      title="Signature Capture"
      category="WCP Components"
      description="Digital signature capture with trigger, terms acceptance, signature pad, and re-authentication variants."
    >
      <ExampleSection
        title="Variant: Trigger"
        description={'An “Agree & sign” secondary button with a pencil icon and subtext explaining why a signature is required.'}
      >
        <DocsCard title="Trigger">
          <div style={{maxWidth: 'min(500px, 100%)'}}>
            <SignatureTrigger
              subText="Sign to confirm your identity for this order"
              onAgreeAndSign={() => {}}
            />
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Variant: Terms"
        description={'Shows the user’s captured signature alongside a “Change signature” link. Used after a signature has already been captured.'}
      >
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16}}>
          <Chip size="small" selected={termsState === 'signed'} onClick={() => setTermsState('signed')}>signed</Chip>
          <Chip size="small" selected={termsState === 'signed-as'} onClick={() => setTermsState('signed-as')}>signed-as</Chip>
          <Chip size="small" selected={showPreviewWarning} onClick={() => setShowPreviewWarning((value) => !value)}>Preview warning</Chip>
        </div>
        <DocsCard title={`SignatureTerms — ${termsState}${showPreviewWarning ? ' + warning' : ''}`}>
          <div style={{maxWidth: 'min(500px, 100%)'}}>
            <SignatureTerms
              title="Subscription agreement"
              signatureState={termsState}
              signedName="John Smith"
              showPreviewWarning={showPreviewWarning}
              onChangeSignature={() => {}}
              onRefreshPage={() => {}}
            />
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Variant: Base"
        description={'The full signature capture form. The user enters their full name, clicks “Preview signature” to see the script font rendering, then checks a consent checkbox to sign.'}
      >
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16}}>
          <Chip size="small" selected={showTechError} onClick={() => setShowTechError((value) => !value)}>Tech error</Chip>
          <Chip size="small" selected={showPetNameWarning} onClick={() => setShowPetNameWarning((value) => !value)}>Pet name warning</Chip>
          <Chip size="small" selected={showSignBeforeSubmit} onClick={() => setShowSignBeforeSubmit((value) => !value)}>Sign before submit</Chip>
          <Chip size="small" selected={showCheckboxError} onClick={() => setShowCheckboxError((value) => !value)}>Checkbox error</Chip>
          <Button variant="secondary" size="small" onClick={resetBase}>Reset</Button>
        </div>
        <DocsCard title="SignatureBase — interactive">
          <div style={{maxWidth: 'min(500px, 100%)'}}>
            <SignatureBase
              userName="John Smith"
              fullName={fullName}
              onFullNameChange={setFullName}
              signatureState={baseSignatureState}
              signedName={previewedName}
              isSignChecked={isSignChecked}
              onSignCheckedChange={setIsSignChecked}
              onPreviewSignature={() => { setPreviewedName(fullName); setBaseSignatureState('signed'); }}
              showTechError={showTechError}
              showPetNameWarning={showPetNameWarning}
              showSignBeforeSubmitError={showSignBeforeSubmit}
              showPreviewBeforeSignError={false}
              showCheckboxError={showCheckboxError}
              onRefreshPage={() => resetBase()}
            />
          </div>
        </DocsCard>

        <div style={{marginTop: 24}}>
          <DocsCard title="SignatureBase — all errors enabled">
            <div style={{maxWidth: 'min(500px, 100%)'}}>
              <SignatureBase
                userName="John Smith"
                fullName="J. Smith"
                onFullNameChange={() => {}}
                signatureState="signed"
                signedName="John Smith"
                isSignChecked={false}
                onSignCheckedChange={() => {}}
                onPreviewSignature={() => {}}
                showTechError
                showPetNameWarning
                showSignBeforeSubmitError
                showPreviewBeforeSignError
                showCheckboxError
                onRefreshPage={() => {}}
              />
            </div>
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Variant: Reauth"
        description="A condensed variant used when the user needs to re-authorize a subscription, such as modifying an existing subscription."
      >
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16}}>
          <Chip size="small" selected={reauthSubVariant === 'agree-sign'} onClick={() => setReauthSubVariant('agree-sign')}>Agree &amp; Sign</Chip>
          <Chip size="small" selected={reauthSubVariant === 'signed'} onClick={() => setReauthSubVariant('signed')}>Signed</Chip>
          <Chip size="small" selected={reauthSubVariant === 'signed-as'} onClick={() => setReauthSubVariant('signed-as')}>Signed As</Chip>
          <Chip size="small" selected={showReauthError} onClick={() => setShowReauthError((value) => !value)}>Reauth error</Chip>
        </div>
        <DocsCard title={`SignatureReauth — ${reauthSubVariant}${showReauthError ? ' + error' : ''}`}>
          <div style={{maxWidth: 'min(500px, 100%)'}}>
            <SignatureReauth
              subVariant={reauthSubVariant}
              signedName="John Smith"
              showReauthError={showReauthError}
              onAgreeAndSign={() => {}}
              onConfirm={() => {}}
              onChangeSignature={() => {}}
              onRefreshPage={() => {}}
            />
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use the Signature Capture variants together: Trigger to initiate, Base to capture, Terms to display a captured signature, and Reauth for short re-authorization flows. Surface validation through the showXError props so users see the specific recovery step instead of a generic 'Try again' message."
        defaultValue="signatureState='unsigned', isSignChecked=false"
      />
    </PageWrapper>
    </A11yAnnouncementProvider>
  );
}
