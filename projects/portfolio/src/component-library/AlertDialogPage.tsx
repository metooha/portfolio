import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/app/components/AlertDialog/AlertDialog';
import {Body} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

function ConfirmationDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Show confirmation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        title="Confirm your action"
        actions={
          <>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </>
        }
      >
        <Body as="p" size="medium">
          Do you want to proceed with this action? You can always undo this later.
        </Body>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DestructiveDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        title="Are you absolutely sure?"
        actions={
          <>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </>
        }
      >
        <Body as="p" size="medium">
          This action cannot be undone. This will permanently delete your account and
          remove your data from our servers.
        </Body>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function UnsavedChangesDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Discard changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        title="Discard unsaved changes?"
        actions={
          <>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </>
        }
      >
        <Body as="p" size="medium">
          You have unsaved changes that will be lost if you leave this page.
        </Body>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open controlled dialog
      </Button>
      <Body as="span" size="small" color="subtle">
        Open: {String(open)}
      </Body>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          title="Controlled dialog"
          actions={
            <>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction>OK</AlertDialogAction>
            </>
          }
        >
          <Body as="p" size="medium">
            This dialog&apos;s open state is controlled by the parent component.
          </Body>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AlertDialogPage() {
  return (
    <PageWrapper
      title="Alert Dialog"
      category="Shared Components"
      description="Alert dialogs interrupt users with urgent information or actions. Unlike regular dialogs they do not close on Escape or outside click — users must explicitly confirm or cancel."
    >
      <ExampleSection
        title="Common patterns"
        description="Confirm, destructive, and unsaved-changes flows use the same composition; only the action emphasis changes."
      >
        <DocsGrid>
          <DocsCard
            title="Confirmation"
            description="A standard confirmation dialog that asks the user to proceed or cancel an action."
          >
            <ConfirmationDemo />
          </DocsCard>
          <DocsCard
            title="Destructive action"
            description="A destructive alert warns the user about an irreversible action like deleting an account."
          >
            <DestructiveDemo />
          </DocsCard>
          <DocsCard
            title="Unsaved changes"
            description="Warn users about unsaved work before they navigate away."
          >
            <UnsavedChangesDemo />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Controlled open state"
        description="AlertDialog supports a controlled open prop for programmatic control."
      >
        <DocsCard>
          <ControlledDemo />
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Alert Dialog only when a decision is urgent enough to block the surrounding interface. Provide a clear, action-named primary button (Delete, Discard, Confirm) rather than generic OK. Pair destructive actions with the destructive variant so the visual weight matches the consequence."
        defaultValue="open={false}"
      />
    </PageWrapper>
  );
}
