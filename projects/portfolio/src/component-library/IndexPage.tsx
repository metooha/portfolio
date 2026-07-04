import * as React from 'react';
import {AdminNav, ADMIN_NAV_HEIGHT} from '@/app/components/admin/AdminNav';
import {initMegaMode} from '@/app/components/utils/themeManager';
import {useViewport} from '@/app/components/utils/Layout';
import AppNav from './AppNav';
import {
  AccordionPage,
  CarouselPage,
  AvatarPage,
  MenuPage,
  A11ySystemPage,
  ComponentCommunicationPage,
  ProductCatalogPage,
  UtilitiesPage,
  OverviewPage,
  ThemeEditorPage,
  PaletteGeneratorPage,
  ActionTilePage,
  AlertPage,
  BannerPage,
  BadgePage,
  BottomSheetPage,
  BreadcrumbPage,
  ButtonPage,
  ButtonTogglePage,
  CalloutPage,
  CardPage,
  CheckboxPage,
  ChipPage,
  ContentMessagePage,
  DataTablePage,
  DatePickerPage,
  DividerPage,
  FormGroupPage,
  IconsPage,
  IllustrationsPage,
  MediaPage,
  LottiePage,
  IconButtonPage,
  IconSelectorPage,
  LinkButtonPage,
  LinkPage,
  ListPage,
  ProviderPage,
  MagicBoxPage,
  MetricPage,
  ModalPage,
  NudgePage,
  PanelPage,
  ProgressIndicatorPage,
  ProgressTrackerPage,
  RadioPage,
  RatingPage,
  SelectPage,
  SelectCardPage,
  SkeletonPage,
  SpinnerPage,
  SpotIconPage,
  SwitchPage,
  TabNavigationPage,
  TagPage,
  TagInteractivePage,
  TextAreaPage,
  TextFieldPage,
  BasicBannerPage,
  ActionGroupPage,
  CategoryNavPage,
  ContentCardPage,
  CountrySelectPage,
  FlagPage,
  FloatingButtonPage,
  HeartViewPage,
  ItemTilePage,
  RichMediaSheetPage,
  RichSnackbarPage,
  RichTextEditorPage,
  SearchBarPage,
  SectionHeaderPage,
  SignatureCapturePage,
  TimerViewPage,
  UploadImagePage,
  UploadFilePage,
  CarouselsAndGridsPage,
  FooterPatternsPage,
  OrderCardPatternsPage,
  OrderStatusCardsPage,
  QueuePatternsPage,
  SearchResultsPage,
  SideNavPage,
  HeaderPage,
  SpinButtonPage,
  TooltipPage,
  TreePage,
  SliderPage,
  AlertDialogPage,
  CommandPage,
  ContextMenuPage,
  SelectDropdownPage,
  FormPage,
  PaginationPage,
  QuantityStepperPage,
  ScrollAreaPage,
  SegmentedControlPage,
  TogglePage,
  TablePaginationPage,
  DataVizPage,
  AgentCanvasPage,
  ProcessingTracePage,
  // Ported from ax-px-migration
  AssociatePatternsPage,
  AttributePage,
  ButtonGroupPage,
  ClockingWidgetPage,
  DataTableConfigPanelPage,
  DatePickerCalendarPage,
  DateRangePickerPage,
  HeaderInstructionalPage,
  HeaderSectionPage,
  HeaderWidgetPage,
  HighlightTextPage,
  IntelligentInsightPage,
  IntelligentRecommendationPage,
  ItemRecommendationPage,
  ItemTileCondensedPage,
  LanguageSelectorPage,
  ListActionPage,
  ListAssociatePage,
  ListGoalPage,
  ListMembersPage,
  LocationBreadcrumbPage,
  MenubarPage,
  MetricGroupPage,
  MobileMegaNavPage,
  NativeNavigationPage,
  PlaceholderMediaPage,
  PopoverPage,
  RatingDisplayPage,
  ResizablePage,
  ScheduleWidgetPage,
  ScrimOverlayPage,
  SidebarPage,
  SideNavigationPage,
  SnackbarPage,
  ToggleGroupPage,
  AspectRatioPage,
  MastheadPage,
  SlotPage,
  // Component pages (waves 1–4)
  LabelPage,
  TextPage,
  SectionPage,
  ContainerPage,
  GridPage,
  ImagePage,
  LineClampPage,
  LogoPage,
  FilterChipPage,
  ComboboxPage,
  DateFieldPage,
  SearchFieldPage,
  TextFieldSplitPage,
  PageHeaderPage,
  GaugePage,
  CircularProgressPage,
  ErrorMessagePage,
  CollapsePage,
  CollapsiblePage,
  FeedbackPage,
  ClockStatusPage,
  BottomNavPage,
  FluentMenuPage,
  CountryCodePhoneInputPage,
  PagePage,
  AgentResponsePage,
  UserResponsePage,
  SourcesPage,
  PromptComposerPage,
  AttachmentTilePage,
  SkylineBannerPage,
  // Pattern pages
  ProductCardGridPage,
  ProductCardListPage,
  CarouselProductCardPage,
  PromotionalItemTilePage,
  FlashDealsItemTilePage,
  AppHeaderPage,
  AxBottomNavPage,
  MaintenanceHealthCardPage,
  DelayedDeliveryCardPage,
  AutoCareUpsellOfferCardPage,
  AgentSidebarPage,
  CaseStudyTemplatePage,
  CaseStudyComponentsPage,
  CaseStudyTypographyPage,
} from './pages';

function useHashRoute(): [string, (route: string) => void] {
  const [route, setRoute] = React.useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'overview';
  });

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setRoute(hash || 'overview');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = React.useCallback((newRoute: string) => {
    window.location.hash = newRoute;
  }, []);

  return [route, navigate];
}

function PageRouter({route, navigate}: {route: string; navigate: (r: string) => void}) {
  switch (route) {
    case 'overview': return <OverviewPage navigate={navigate} />;
    case 'theme-editor': return <ThemeEditorPage embedded />;
    case 'palette-generator': return <PaletteGeneratorPage />;
    case 'a11y-checks': return <A11ySystemPage />;
    case 'component-communication': return <ComponentCommunicationPage />;
    case 'product-catalog': return <ProductCatalogPage />;
    case 'system-utilities': return <UtilitiesPage />;
    case 'icons':
    case 'icons-ld':
    case 'icons-wcp':
    case 'icons-sams-club':
    case 'icons-ax':
    case 'icons-ax-sams-club':
    case 'icons-px':
    case 'icons-px-sams-club':
    case 'icons-bodega':
      return <IconsPage />;
    case 'illustrations':
    case 'illustrations-mono-small':
    case 'illustrations-mono-large':
    case 'illustrations-spot':
      return <IllustrationsPage />;
    case 'media':
    case 'media-wcp':
    case 'media-walmart-business':
    case 'media-walmart-legacy':
    case 'media-walmart-mx':
    case 'media-walmart-ca':
    case 'media-walmart-plus':
    case 'media-sams-club':
    case 'media-sams-club-maverick':
    case 'media-members-mark':
    case 'media-bodega':
      return <MediaPage />;
    case 'lottie':
      return <LottiePage />;

    // Patterns
    case 'patterns-agent-canvas': return <AgentCanvasPage />;
    case 'patterns-processing-trace': return <ProcessingTracePage />;
    case 'patterns-carousels-grids': return <CarouselsAndGridsPage />;
    case 'patterns-data-viz': return <DataVizPage />;
    case 'patterns-footer': return <FooterPatternsPage />;
    case 'patterns-header': return <HeaderPage />;
    case 'patterns-order-card': return <OrderCardPatternsPage />;
    case 'patterns-order-status': return <OrderStatusCardsPage />;
    case 'patterns-queue': return <QueuePatternsPage />;
    case 'patterns-search-results': return <SearchResultsPage />;
    case 'patterns-side-navigation': return <SideNavPage />;
    case 'patterns-table-pagination': return <TablePaginationPage />;

    // Components
    case 'components-accordion': return <AccordionPage />;
    case 'components-action-tile': return <ActionTilePage />;
    case 'components-alert': return <AlertPage />;
    case 'components-alert-dialog': return <AlertDialogPage />;
    case 'components-aspect-ratio': return <AspectRatioPage />;
    case 'components-avatar': return <AvatarPage />;
    case 'components-badge': return <BadgePage />;
    case 'components-banner': return <BannerPage />;
    case 'components-basic-banner': return <BasicBannerPage />;
    case 'components-bottom-sheet': return <BottomSheetPage />;
    case 'components-breadcrumb': return <BreadcrumbPage />;
    case 'components-button': return <ButtonPage />;
    case 'components-button-toggle': return <ButtonTogglePage />;
    case 'components-action-group': return <ActionGroupPage />;
    case 'components-callout': return <CalloutPage />;
    case 'components-card': return <CardPage />;
    case 'components-carousel': return <CarouselPage />;
    case 'components-category-nav': return <CategoryNavPage />;
    case 'components-checkbox': return <CheckboxPage />;
    case 'components-chip': return <ChipPage />;
    case 'components-command': return <CommandPage />;
    case 'components-content-card': return <ContentCardPage />;
    case 'components-content-message': return <ContentMessagePage />;
    case 'components-context-menu': return <ContextMenuPage />;
    case 'components-country-select': return <CountrySelectPage />;
    case 'components-data-table': return <DataTablePage />;
    case 'components-date-picker': return <DatePickerPage />;
    case 'components-divider': return <DividerPage />;
    case 'components-select-dropdown': return <SelectDropdownPage />;
    case 'components-flag': return <FlagPage />;
    case 'components-floating-button': return <FloatingButtonPage />;
    case 'components-form': return <FormPage />;
    case 'components-form-group': return <FormGroupPage />;
    case 'components-heart-view': return <HeartViewPage />;
    case 'components-icon-button': return <IconButtonPage />;
    case 'components-icon-selector': return <IconSelectorPage />;
    case 'components-item-tile': return <ItemTilePage />;
    case 'components-link': return <LinkPage />;
    case 'components-link-button': return <LinkButtonPage />;
    case 'components-list': return <ListPage />;
    case 'components-provider': return <ProviderPage />;
    case 'components-magic-box': return <MagicBoxPage />;
    case 'components-masthead': return <MastheadPage />;
    case 'components-menu': return <MenuPage />;
    case 'components-metric': return <MetricPage />;
    case 'components-modal': return <ModalPage />;
    case 'components-nudge': return <NudgePage />;
    case 'components-pagination': return <PaginationPage />;
    case 'components-panel': return <PanelPage />;
    case 'components-progress-indicator': return <ProgressIndicatorPage />;
    case 'components-progress-tracker': return <ProgressTrackerPage />;
    case 'components-quantity-stepper': return <QuantityStepperPage />;
    case 'components-radio': return <RadioPage />;
    case 'components-rating': return <RatingPage />;
    case 'components-rich-media-sheet': return <RichMediaSheetPage />;
    case 'components-rich-snackbar': return <RichSnackbarPage />;
    case 'components-rich-text-editor': return <RichTextEditorPage />;
    case 'components-scroll-area': return <ScrollAreaPage />;
    case 'components-search-bar': return <SearchBarPage />;
    case 'components-section-header': return <SectionHeaderPage />;
    case 'components-segmented-control': return <SegmentedControlPage />;
    case 'components-select': return <SelectPage />;
    case 'components-select-card': return <SelectCardPage />;
    case 'components-signature-capture': return <SignatureCapturePage />;
    case 'components-skeleton': return <SkeletonPage />;
    case 'components-slider': return <SliderPage />;
    case 'components-slot': return <SlotPage />;
    case 'components-spin-button': return <SpinButtonPage />;
    case 'components-spinner': return <SpinnerPage />;
    case 'components-spot-icon': return <SpotIconPage />;
    case 'components-switch': return <SwitchPage />;
    case 'components-tab-navigation': return <TabNavigationPage />;
    case 'components-tag': return <TagPage />;
    case 'components-tag-interactive': return <TagInteractivePage />;
    case 'components-text-area': return <TextAreaPage />;
    case 'components-text-field': return <TextFieldPage />;
    case 'components-timer-view': return <TimerViewPage />;
    case 'components-toggle': return <TogglePage />;
    case 'components-tooltip': return <TooltipPage />;
    case 'components-tree': return <TreePage />;
    case 'components-upload-image': return <UploadImagePage />;
    case 'components-upload-file': return <UploadFilePage />;

    // ── Ported from ax-px-migration ──────────────────────────────
    case 'components-attribute': return <AttributePage />;
    case 'components-data-table-config-panel': return <DataTableConfigPanelPage />;
    case 'components-date-picker-calendar': return <DatePickerCalendarPage />;
    case 'components-date-range-picker': return <DateRangePickerPage />;
    case 'components-header-instructional': return <HeaderInstructionalPage />;
    case 'components-header-section': return <HeaderSectionPage />;
    case 'components-header-widget': return <HeaderWidgetPage />;
    case 'components-highlight-text': return <HighlightTextPage />;
    case 'components-intelligent-insight': return <IntelligentInsightPage />;
    case 'components-intelligent-recommendation': return <IntelligentRecommendationPage />;
    case 'components-item-recommendation': return <ItemRecommendationPage />;
    case 'components-item-tile-condensed': return <ItemTileCondensedPage />;
    case 'components-language-selector': return <LanguageSelectorPage />;
    case 'components-location-breadcrumb': return <LocationBreadcrumbPage />;
    case 'components-menubar': return <MenubarPage />;
    case 'components-metric-group': return <MetricGroupPage />;
    case 'components-placeholder-media': return <PlaceholderMediaPage />;
    case 'components-popover': return <PopoverPage />;
    case 'components-rating-display': return <RatingDisplayPage />;
    case 'components-resizable': return <ResizablePage />;
    case 'components-scrim-overlay': return <ScrimOverlayPage />;
    case 'components-sidebar': return <SidebarPage />;
    case 'components-snackbar': return <SnackbarPage />;
    case 'components-toggle-group': return <ToggleGroupPage />;
    case 'components-action-group-walmart': return <ButtonGroupPage />;

    // ── Component pages (waves 1–4) ──────────────────────────────
    case 'components-label': return <LabelPage />;
    case 'components-text': return <TextPage />;
    case 'components-section': return <SectionPage />;
    case 'components-container': return <ContainerPage />;
    case 'components-grid': return <GridPage />;
    case 'components-image': return <ImagePage />;
    case 'components-line-clamp': return <LineClampPage />;
    case 'components-logo': return <LogoPage />;
    case 'components-filter-chip': return <FilterChipPage />;
    case 'components-combobox': return <ComboboxPage />;
    case 'components-date-field': return <DateFieldPage />;
    case 'components-search-field': return <SearchFieldPage />;
    case 'components-text-field-split': return <TextFieldSplitPage />;
    case 'components-page-header': return <PageHeaderPage />;
    case 'components-gauge': return <GaugePage />;
    case 'components-circular-progress': return <CircularProgressPage />;
    case 'components-error-message': return <ErrorMessagePage />;
    case 'components-collapse': return <CollapsePage />;
    case 'components-collapsible': return <CollapsiblePage />;
    case 'components-feedback': return <FeedbackPage />;
    case 'components-clock-status': return <ClockStatusPage />;
    case 'components-bottom-nav': return <BottomNavPage />;
    case 'components-fluent-menu': return <FluentMenuPage />;
    case 'components-country-code-phone-input': return <CountryCodePhoneInputPage />;
    case 'components-page': return <PagePage />;
    case 'components-agent-response': return <AgentResponsePage />;
    case 'components-user-response': return <UserResponsePage />;
    case 'components-sources': return <SourcesPage />;
    case 'components-prompt-composer': return <PromptComposerPage />;
    case 'components-attachment-tile': return <AttachmentTilePage />;
    case 'components-skyline-banner': return <SkylineBannerPage />;

    // ── Pattern pages ────────────────────────────────────────────
    case 'patterns-product-card-grid': return <ProductCardGridPage />;
    case 'patterns-product-card-list': return <ProductCardListPage />;
    case 'patterns-carousel-product-card': return <CarouselProductCardPage />;
    case 'patterns-promotional-item-tile': return <PromotionalItemTilePage />;
    case 'patterns-flash-deals-item-tile': return <FlashDealsItemTilePage />;
    case 'patterns-app-header': return <AppHeaderPage />;
    case 'patterns-ax-bottom-nav': return <AxBottomNavPage />;
    case 'patterns-maintenance-health-card': return <MaintenanceHealthCardPage />;
    case 'patterns-delayed-delivery-card': return <DelayedDeliveryCardPage />;
    case 'patterns-auto-care-upsell-offer-card': return <AutoCareUpsellOfferCardPage />;
    case 'patterns-agent-sidebar': return <AgentSidebarPage />;
    case 'patterns-case-study-template': return <CaseStudyTemplatePage />;
    case 'patterns-case-study-components': return <CaseStudyComponentsPage />;
    case 'patterns-case-study-typography': return <CaseStudyTypographyPage />;

    case 'patterns-associate': return <AssociatePatternsPage />;
    case 'patterns-clocking-widget': return <ClockingWidgetPage />;
    case 'patterns-list-action': return <ListActionPage />;
    case 'patterns-list-associate': return <ListAssociatePage />;
    case 'patterns-list-goal': return <ListGoalPage />;
    case 'patterns-list-members': return <ListMembersPage />;
    case 'patterns-mobile-mega-nav': return <MobileMegaNavPage />;
    case 'patterns-native-navigation': return <NativeNavigationPage />;
    case 'patterns-schedule-widget': return <ScheduleWidgetPage />;
    case 'patterns-side-navigation-ax': return <SideNavigationPage />;

    default: return <OverviewPage navigate={navigate} />;
  }
}

export default function Index() {
  const [currentRoute, navigate] = useHashRoute();
  const {isAtLeastLarge} = useViewport();
  const isDrawer = !isAtLeastLarge;
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const previousFontFamily = document.body.style.fontFamily;
    return () => {
      document.body.style.fontFamily = previousFontFamily;
    };
  }, []);

  React.useEffect(() => { initMegaMode(); }, []);

  // Snap the drawer closed whenever we leave mobile so the re-shown sidebar
  // doesn't briefly flash an "open" overlay during the transition.
  React.useEffect(() => {
    if (!isDrawer) setIsDrawerOpen(false);
  }, [isDrawer]);

  return (
    <>
      <style>{`
        body, input, textarea, select, button {
        }
        #sidebar-search-input::placeholder {
          color: #74767C !important;
          font-size: 13px !important;
        }
        #sidebar-search-input::-webkit-input-placeholder {
          color: #74767C !important;
          font-size: 13px !important;
        }
        #sidebar-search-input::-moz-placeholder {
          color: #74767C !important;
          font-size: 13px !important;
        }
        #sidebar-search-input:-ms-input-placeholder {
          color: #74767C !important;
          font-size: 13px !important;
        }
      `}</style>
      <div className="min-h-screen bg-[#F7F7F8] pt-16 flex flex-col">
        <AdminNav currentPage="component-library" />
        <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1, minHeight: 0 }}>
        <AppNav
          currentRoute={currentRoute}
          navigate={navigate}
          topOffset={ADMIN_NAV_HEIGHT}
          isDrawer={isDrawer}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        <main style={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',
          backgroundColor: '#ffffff',
        }}>
          {isDrawer && (
            <header
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                background: '#ffffff',
                borderBottom: '1px solid #E6E6E8',
              }}
            >
              <button
                type="button"
                aria-label="Open navigation"
                aria-expanded={isDrawerOpen}
                onClick={() => setIsDrawerOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '1px solid #E6E6E8',
                  borderRadius: '8px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#2E2F32',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <img src={`${import.meta.env.BASE_URL}ld-logo.png`} alt="" width={28} height={28} style={{borderRadius: '7px', flexShrink: 0}} />
              <span style={{fontSize: '14px', fontWeight: 700, color: '#2E2F32', letterSpacing: '-0.2px'}}>Component Library</span>
            </header>
          )}
          <PageRouter route={currentRoute} navigate={navigate} />
        </main>
        </div>
      </div>
    </>
  );
}
