import * as React from 'react';
import {Panel} from '../Panel';
import {Button} from '../Button';
import {SignatureBase, SignatureBaseProps} from '../SignatureCapture';
import './SignatureCapturePanel.css';

export interface SignatureCapturePanelProps extends SignatureBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'left' | 'right';
  onSubmit?: () => void;
  submitLabel?: string;
}

export const SignatureCapturePanel: React.FunctionComponent<SignatureCapturePanelProps> = ({
  isOpen,
  onClose,
  title = 'Subscription agreement',
  size = 'medium',
  position = 'right',
  onSubmit,
  submitLabel = 'Agree & sign',
  ...signatureBaseProps
}) => (
  <Panel
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size={size}
    position={position}
    actions={
      <Button variant="primary" size="medium" isFullWidth onClick={onSubmit}>
        {submitLabel}
      </Button>
    }
  >
    <SignatureBase {...signatureBaseProps} />
  </Panel>
);
SignatureCapturePanel.displayName = 'SignatureCapturePanel';
