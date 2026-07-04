import * as React from 'react';
import {Badge, Caption} from '@/app/components';

export function ThemeEditorPanel({
  title,
  badge,
  children,
}: {
  title?: string;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="theme-editor-panel">
      {title && (
        <div className="theme-editor-panel__header">
          <Caption as="span" weight="alt">{title}</Caption>
          {badge != null && badge > 0 && <Badge color="brand">{badge}</Badge>}
        </div>
      )}
      {children}
    </div>
  );
}
