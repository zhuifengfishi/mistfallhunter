# Sitewide Advertising Slot Design

## Goal

Install the provided EffectiveCPM ad unit throughout the site without loading
the third-party script more than once per page.

## Design

- A dedicated `Advertisement` component owns the provider script and the ad
  container.
- The script is loaded from the localized root layout, which covers every
  public page once.
- The ad container replaces the existing article advertisement placeholder.
- The component keeps an accessible advertisement label and reserves layout
  space so the page does not jump while the provider fills the unit.

## Validation

- Verify rendered article HTML includes the provider container and script URL.
- Run the production build and existing test suite.
