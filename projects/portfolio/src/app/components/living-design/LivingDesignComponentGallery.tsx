import { useState, type ReactNode } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Body,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Caption,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  ChipGroup,
  CircularProgress,
  ClockStatus,
  Divider,
  Display,
  FilterChip,
  Heading,
  Icon,
  IconButton,
  Label,
  Link,
  LinkButton,
  Metric,
  ProgressIndicator,
  Radio,
  Skeleton,
  SkeletonText,
  Spinner,
  SpotIcon,
  Switch,
  TabNavigation,
  TabNavigationItem,
  Tag,
  TextField,
  Tooltip,
  VisuallyHidden,
} from "@/living-design";
import { COMPONENT_NAMES } from "./livingDesignThemeOptions";

function PreviewCard({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-h-[140px] flex-col gap-3 rounded-[16px] border border-[color:var(--ld-semantic-color-border,#dedede)] bg-[color:var(--ld-semantic-color-background,#fff)] p-4 shadow-sm">
      <Caption as="p" color="subtlest">
        {name}
      </Caption>
      <div className="flex min-h-[72px] flex-1 flex-wrap items-center gap-3">
        {children}
      </div>
    </article>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Remember me"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return <Switch label="Notifications" isOn={on} onClick={() => setOn(!on)} />;
}

function TextFieldDemo() {
  const [value, setValue] = useState("");
  return (
    <TextField
      label="Store number"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Enter store ID"
    />
  );
}

function ChipDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <ChipGroup aria-label="Filter by status">
      <Chip selected={selected} onClick={() => setSelected(!selected)}>
        In stock
      </Chip>
      <Chip>On sale</Chip>
    </ChipGroup>
  );
}

function FilterChipDemo() {
  const [selected, setSelected] = useState(true);
  return (
    <FilterChip selected={selected} onSelectedChange={setSelected}>
      Category
    </FilterChip>
  );
}

function RadioDemo() {
  const [value, setValue] = useState("pickup");
  return (
    <>
      <Radio
        name="fulfillment-preview"
        value="pickup"
        label="Pickup"
        checked={value === "pickup"}
        onChange={() => setValue("pickup")}
      />
      <Radio
        name="fulfillment-preview"
        value="delivery"
        label="Delivery"
        checked={value === "delivery"}
        onChange={() => setValue("delivery")}
      />
    </>
  );
}

function TabNavigationDemo() {
  const [tab, setTab] = useState("overview");
  return (
    <TabNavigation aria-label="Preview tabs" pattern="tablist">
      <TabNavigationItem isCurrent={tab === "overview"} onClick={() => setTab("overview")}>
        Overview
      </TabNavigationItem>
      <TabNavigationItem isCurrent={tab === "details"} onClick={() => setTab("details")}>
        Details
      </TabNavigationItem>
    </TabNavigation>
  );
}

const PREVIEW_MAP: Record<string, ReactNode> = {
  Alert: (
    <>
      <Alert variant="success">Saved</Alert>
      <Alert variant="warning">Review needed</Alert>
    </>
  ),
  Avatar: (
    <>
      <Avatar a11yLabel="Amy Ha" name="Amy Ha" size="medium" />
      <Avatar a11yLabel="Badge" name="Jd" indicator="badge" badgeContent="2" size="medium" />
    </>
  ),
  Badge: (
    <>
      <Badge color="brand">Brand</Badge>
      <Badge color="green">Active</Badge>
      <Badge color="neutral">Neutral</Badge>
    </>
  ),
  Breadcrumb: (
    <Breadcrumb aria-label="Location">
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Services</BreadcrumbItem>
      <BreadcrumbItem current>Pickup</BreadcrumbItem>
    </Breadcrumb>
  ),
  Button: (
    <ButtonGroup>
      <Button variant="primary" size="small">
        Primary
      </Button>
      <Button variant="secondary" size="small">
        Secondary
      </Button>
      <Button variant="tertiary" size="small">
        Tertiary
      </Button>
    </ButtonGroup>
  ),
  Card: (
    <Card size="small">
      <CardHeader title="Service card" />
      <CardContent>
        <Body as="p" color="subtle">
          Compact card preview.
        </Body>
      </CardContent>
      <CardActions>
        <Button variant="primary" size="small">
          Action
        </Button>
      </CardActions>
    </Card>
  ),
  Checkbox: <CheckboxDemo />,
  Chip: <ChipDemo />,
  CircularProgress: <CircularProgress a11yLabel="Loading" />,
  ClockStatus: (
    <>
      <ClockStatus active />
      <ClockStatus active={false} />
    </>
  ),
  Divider: <Divider title="Section break" aria-hidden={false} aria-label="Section break" />,
  FilterChip: <FilterChipDemo />,
  IconButton: (
    <Tooltip content="Settings">
      <IconButton a11yLabel="Settings" color="primary" size="medium">
        <Icon name="Gear" decorative />
      </IconButton>
    </Tooltip>
  ),
  Icons: (
    <>
      <Icon name="Search" size="medium" a11yLabel="Search" />
      <Icon name="Truck" size="medium" a11yLabel="Truck" />
      <Icon name="Calendar" size="medium" a11yLabel="Calendar" />
    </>
  ),
  Label: <Label htmlFor="ld-preview-label">Field label</Label>,
  Link: <Link href="#">View details</Link>,
  LinkButton: <LinkButton href="#">Learn more</LinkButton>,
  Metric: (
    <Metric title="On-time pickup" value="94" unit="%" variant="positiveUp" textLabel="Last 30 days" />
  ),
  ProgressIndicator: (
    <ProgressIndicator value={68} valueLabel="68%" variant="success" label="Completion" />
  ),
  Radio: <RadioDemo />,
  Skeleton: <Skeleton width={120} height={16} />,
  Spinner: <Spinner a11yLabel="Loading" />,
  SpotIcon: (
    <>
      <SpotIcon color="green" size="small">
        <Icon name="Truck" decorative />
      </SpotIcon>
      <SpotIcon color="brand" size="small" shape="square">
        <Icon name="Home" decorative />
      </SpotIcon>
    </>
  ),
  Switch: <SwitchDemo />,
  TabNavigation: <TabNavigationDemo />,
  Tag: (
    <>
      <Tag color="brand">Brand</Tag>
      <Tag color="green">Active</Tag>
    </>
  ),
  Text: (
    <div className="flex flex-col gap-1">
      <Display as="span" size="small">
        Display
      </Display>
      <Heading as="span" size="small">
        Heading
      </Heading>
      <Body as="span">Body</Body>
      <Caption as="span">Caption</Caption>
    </div>
  ),
  TextField: <TextFieldDemo />,
  Tooltip: (
    <Tooltip content="Helpful hint">
      <Button variant="secondary" size="small">
        Hover me
      </Button>
    </Tooltip>
  ),
  VisuallyHidden: (
    <Button variant="secondary" size="small">
      Save
      <VisuallyHidden> to favorites</VisuallyHidden>
    </Button>
  ),
};

function FallbackPreview({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Badge color="neutral">{name}</Badge>
      <Body as="p" color="subtlest">
        Migrated component — use in context on product surfaces.
      </Body>
      <SkeletonText lines={2} />
    </div>
  );
}

export function LivingDesignComponentGallery() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Heading as="h2" size="medium">
          All components
        </Heading>
        <Body as="p" color="subtle">
          Live previews for every component in the migrated kit. Components
          without a standalone demo show their migration status and skeleton
          placeholder.
        </Body>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {COMPONENT_NAMES.map((name) => (
          <PreviewCard key={name} name={name}>
            {PREVIEW_MAP[name] ?? <FallbackPreview name={name} />}
          </PreviewCard>
        ))}
      </div>
    </section>
  );
}
