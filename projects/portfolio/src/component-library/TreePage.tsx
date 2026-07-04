import * as React from 'react';
import {Tree} from '@/app/components/SideNavigation/Tree';
import {PageWrapper, ExampleSection} from './shared';

const fileSystemData = [
  {id: 'src', label: 'src', children: [
    {id: 'src-components', label: 'components', children: [
      {id: 'src-components-button', label: 'Button.tsx'},
      {id: 'src-components-card', label: 'Card.tsx'},
      {id: 'src-components-tree', label: 'Tree.tsx'},
    ]},
    {id: 'src-pages', label: 'pages', children: [
      {id: 'src-pages-home', label: 'HomePage.tsx'},
      {id: 'src-pages-settings', label: 'SettingsPage.tsx'},
    ]},
    {id: 'src-app', label: 'App.tsx'},
  ]},
  {id: 'public', label: 'public', children: [
    {id: 'public-index', label: 'index.html'},
    {id: 'public-favicon', label: 'favicon.ico'},
  ]},
  {id: 'package', label: 'package.json'},
  {id: 'readme', label: 'README.md'},
];

const orgChartData = [
  {id: 'ceo', label: 'CEO', children: [
    {id: 'cto', label: 'CTO', children: [
      {id: 'eng-lead', label: 'Engineering Lead', children: [
        {id: 'dev-1', label: 'Senior Developer'},
        {id: 'dev-2', label: 'Developer'},
      ]},
      {id: 'design-lead', label: 'Design Lead', children: [
        {id: 'designer-1', label: 'UX Designer'},
      ]},
    ]},
    {id: 'cfo', label: 'CFO', children: [
      {id: 'finance-mgr', label: 'Finance Manager'},
    ]},
  ]},
];

const categoryData = [
  {id: 'electronics', label: 'Electronics', children: [
    {id: 'phones', label: 'Phones', children: [
      {id: 'iphone', label: 'iPhone 16'},
      {id: 'galaxy', label: 'Galaxy S25'},
      {id: 'pixel', label: 'Pixel 9'},
    ]},
    {id: 'laptops', label: 'Laptops', children: [
      {id: 'macbook', label: 'MacBook Pro'},
      {id: 'thinkpad', label: 'ThinkPad X1'},
    ]},
  ]},
  {id: 'clothing', label: 'Clothing', children: [
    {id: 'mens', label: "Men's"},
    {id: 'womens', label: "Women's"},
    {id: 'kids', label: "Kids"},
  ]},
  {id: 'home', label: 'Home & Garden'},
];

export default function TreePage() {
  const [selectedFile, setSelectedFile] = React.useState<string | undefined>();
  const [selectedPerson, setSelectedPerson] = React.useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>();

  return (
    <PageWrapper title="Tree" category="CORE COMPONENTS" description="Trees display hierarchical data as an expandable and collapsible structure. Useful for file browsers, navigation menus, org charts, and category selectors.">
      <ExampleSection title="File system browser" description="A tree with pre-expanded nodes and selection tracking.">
        <div style={{ maxWidth: '320px' }}>
          <Tree
            label="Project files"
            data={fileSystemData}
            defaultExpandedIds={['src', 'src-components']}
            selectedId={selectedFile}
            onSelect={setSelectedFile}
          />
          {selectedFile && (
            <p style={{ fontSize: '13px', color: '#74767C', marginTop: '12px' }}>Selected: {selectedFile}</p>
          )}
        </div>
      </ExampleSection>

      <ExampleSection title="Organization chart" description="Nested tree representing reporting structure.">
        <div style={{ maxWidth: '320px' }}>
          <Tree
            label="Organization"
            data={orgChartData}
            defaultExpandedIds={['ceo', 'cto']}
            selectedId={selectedPerson}
            onSelect={setSelectedPerson}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Category browser" description="Product categories with mixed leaf and branch nodes.">
        <div style={{ maxWidth: '320px' }}>
          <Tree
            label="Categories"
            data={categoryData}
            defaultExpandedIds={['electronics', 'phones']}
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Fully collapsed" description="All nodes start collapsed by default.">
        <div style={{ maxWidth: '320px' }}>
          <Tree
            label="Collapsed tree"
            data={fileSystemData}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Accessible via external label" description="Using a11yLabelledBy instead of a visible label.">
        <div style={{ maxWidth: '320px' }}>
          <h3 id="external-tree-label" style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600 }}>Departments</h3>
          <Tree
            a11yLabelledBy="external-tree-label"
            data={orgChartData}
            defaultExpandedIds={['ceo']}
          />
        </div>
      </ExampleSection>
    </PageWrapper>
  );
}
