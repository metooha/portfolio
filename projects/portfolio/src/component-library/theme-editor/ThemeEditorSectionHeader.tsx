import * as React from 'react';
import {Badge, Caption, Heading} from '@/app/components';

export function ThemeEditorSectionHeader({
  title,
  badge,
  description,
}: {
  title: string;
  badge?: number;
  description: string;
}) {
  return (
    <>
      <div className="theme-editor-section-header">
        <Heading as="h3" size="small">{title}</Heading>
        {badge != null && badge > 0 && <Badge color="brand">{badge}</Badge>}
      </div>
      <Caption as="p" color="subtle" style={{ margin: 0 }}>
        {description}
      </Caption>
    </>
  );
}
