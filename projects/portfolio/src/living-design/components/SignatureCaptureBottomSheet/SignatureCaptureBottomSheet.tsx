import * as React from 'react';
import {BottomSheet} from '../BottomSheet';
import {Button} from '../Button';
import {SignatureBase, SignatureBaseProps} from '../SignatureCapture';
import './SignatureCaptureBottomSheet.css';

export interface SignatureCaptureBottomSheetProps extends SignatureBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit?: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
}

export const SignatureCaptureBottomSheet: React.FunctionComponent<SignatureCaptureBottomSheetProps> = ({
  isOpen,
  onClose,
  title = 'Subscription agreement',
  onSubmit,
  submitLabel = 'Agree & sign',
  submitDisabled = false,
  ...signatureBaseProps
}) => (
  <BottomSheet
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    actions={
      <Button variant="primary" size="medium" isFullWidth onClick={onSubmit} disabled={submitDisabled}>
        {submitLabel}
      </Button>
    }
  >
    <SignatureBase {...signatureBaseProps} />
  </BottomSheet>
);
SignatureCaptureBottomSheet.displayName = 'SignatureCaptureBottomSheet';
