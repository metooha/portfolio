import * as React from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from '../patterns/SharedForm/SharedForm';
import {TextField} from '../components/TextField/TextField';
import {TextArea} from '../components/TextArea/TextArea';
import {Button} from '../components/Button/Button';
import {Body, Heading} from '../components/Text/Text';
import {
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

export default function FormPage() {
  const [submittedValues, setSubmittedValues] = React.useState<Record<string, string> | null>(null);

  return (
    <PageWrapper
      title="Form"
      category="Shared Components"
      description="A portable form management system with built-in validation, error messages, and accessible field bindings. Replaces react-hook-form with a lightweight context-based approach."
    >
      <ExampleSection
        title="Component Configuration"
        description="A simple form with name and email fields demonstrating required validation, minimum length, and pattern matching."
      >
        <DocsCard title="Validated form" description="Submit empty fields to see required and pattern validation messages.">
          <Form
            onSubmit={(values) => {
              setSubmittedValues(values);
            }}
            UNSAFE_style={{maxWidth: 'min(400px, 100%)'}}
          >
            <FormField name="name" rules={{required: 'Name is required', minLength: {value: 2, message: 'Name must be at least 2 characters'}}}>
              <FormItem>
                <FormControl>
                  <TextField
                    label="Name"
                    onChange={() => {}}
                    helperText="Your full name as it appears on official documents."
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="email" rules={{required: 'Email is required', pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address'}}}>
              <FormItem>
                <FormControl>
                  <TextField
                    label="Email"
                    type="email"
                    onChange={() => {}}
                    helperText="We will use this email for account communications."
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="bio" rules={{maxLength: {value: 200, message: 'Bio must be 200 characters or less'}}}>
              <FormItem>
                <FormControl>
                  <TextArea
                    label="Bio"
                    onChange={() => {}}
                    maxLength={200}
                    textAreaProps={{rows: 3}}
                    helperText="Optional. Maximum 200 characters."
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <Button type="submit" variant="primary" isFullWidth>
              Submit
            </Button>
          </Form>

          {submittedValues && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '4px',
              backgroundColor: 'var(--ld-semantic-color-surface-secondary, #f5f5f5)',
              fontSize: '0.875rem',
              color: 'var(--ld-semantic-color-text, #2e2f32)',
            }}>
              <strong>Submitted values:</strong>
              <pre style={{margin: '8px 0 0', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.8125rem'}}>
                {JSON.stringify(submittedValues, null, 2)}
              </pre>
            </div>
          )}
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Custom validation"
        description="Demonstrates custom validation logic using the validate rule."
      >
        <DocsCard title="Custom rules" description="Validate min length, allowed characters, uppercase, and number requirements.">
          <Form
            onSubmit={() => {}}
            UNSAFE_style={{maxWidth: 'min(400px, 100%)'}}
          >
            <FormField
              name="username"
              rules={{
                required: 'Username is required',
                minLength: {value: 3, message: 'Username must be at least 3 characters'},
                validate: (value: string) => {
                  if (value.includes(' ')) return 'Username cannot contain spaces';
                  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
                  return true;
                },
              }}
            >
              <FormItem>
                <FormControl>
                  <TextField
                    label="Username"
                    onChange={() => {}}
                    helperText="Letters, numbers, and underscores only. No spaces."
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {value: 8, message: 'Password must be at least 8 characters'},
                validate: (value: string) => {
                  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
                  if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
                  return true;
                },
              }}
            >
              <FormItem>
                <FormControl>
                  <TextField
                    label="Password"
                    type="password"
                    onChange={() => {}}
                    helperText="At least 8 characters with one uppercase letter and one number."
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <Button type="submit" variant="primary" isFullWidth>
              Create Account
            </Button>
          </Form>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Form to coordinate validation, field values, and accessible error messaging across LD inputs. Keep validation rules close to each field, avoid duplicate helper and error copy, and submit only after validateAll succeeds."
        defaultValue="noValidate=true, field value=''"
      >
        <div style={{display: 'grid', gap: 12}}>
          <Heading as="h3" size="small" style={{margin: 0}}>
            Accessibility requirements
          </Heading>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>Focus on validation failure (WCAG 3.3.1).</strong> When a submit fails, focus must move to the first invalid field — never rely on an <code>aria-live</code> announcement alone. A validation failure is a blocking, corrective requirement: the user must fix it before proceeding, so the correct pattern per the Focus vs. Announcement Decision Tree is to move focus, not announce.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>Required fields.</strong> Fields with a <code>required</code> rule must have the <code>required</code> attribute on the native input so assistive technologies communicate the expectation before the user submits.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>Error identification (WCAG 1.3.1).</strong> Error messages must be programmatically associated with their field via <code>aria-describedby</code>, and the field must carry <code>aria-invalid="true"</code> so screen readers announce the error state on focus.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
