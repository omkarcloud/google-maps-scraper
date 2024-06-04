import { css } from '@emotion/react'

const buttoncss = `

/*! CSS Used from: https://getbootstrap.com/docs/5.0/dist/css/bootstrap.min.css */
button {
    border-radius: 0;
    cursor: pointer;
}
button:focus:not(:focus-visible) {
    outline: 0;
}
button {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
button {
    text-transform: none;
}
[type='button'],
button {
    -webkit-appearance: button;
}
::-moz-focus-inner {
    padding: 0;
    border-style: none;
}
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
    .btn {
        transition: none;
    }
}
.btn:hover {
    color: #212529;
}
.btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.btn:disabled {
    pointer-events: none;
    opacity: 0.65;
}
.btn-outline-primary {
    color: #0d6efd;
    border-color: #0d6efd;
}
.btn-outline-primary:hover {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
.btn-outline-primary:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
}
.btn-outline-primary:active {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
.btn-outline-primary:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
}
.btn-outline-primary:disabled {
    color: #0d6efd;
    background-color: transparent;
}
.btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:focus {
    box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
}
.btn-outline-secondary:active {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
}
.btn-outline-secondary:disabled {
    color: #6c757d;
    background-color: transparent;
}
.btn-outline-success {
    color: #198754;
    border-color: #198754;
}
.btn-outline-success:hover {
    color: #fff;
    background-color: #198754;
    border-color: #198754;
}
.btn-outline-success:focus {
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
}
.btn-outline-success:active {
    color: #fff;
    background-color: #198754;
    border-color: #198754;
}
.btn-outline-success:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
}
.btn-outline-success:disabled {
    color: #198754;
    background-color: transparent;
}
.btn-outline-info {
    color: #0dcaf0;
    border-color: #0dcaf0;
}
.btn-outline-info:hover {
    color: #000;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
}
.btn-outline-info:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
}
.btn-outline-info:active {
    color: #000;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
}
.btn-outline-info:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
}
.btn-outline-info:disabled {
    color: #0dcaf0;
    background-color: transparent;
}
.btn-outline-warning {
    color: #ffc107;
    border-color: #ffc107;
}
.btn-outline-warning:hover {
    color: #000;
    background-color: #ffc107;
    border-color: #ffc107;
}

.btn-outline-warning:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
}
.btn-outline-warning:active {
    color: #000;
    background-color: #ffc107;
    border-color: #ffc107;
}
.btn-outline-warning:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
}
.btn-outline-warning:disabled {
    color: #ffc107;
    background-color: transparent;
}
.btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
}
.btn-outline-danger:hover {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}
.btn-outline-danger:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
}
.btn-outline-danger:active {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}
.btn-outline-danger:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
}
.btn-outline-danger:disabled {
    color: #dc3545;
    background-color: transparent;
}
.btn-outline-light {
    color: #f8f9fa;
    border-color: #f8f9fa;
}
.btn-outline-light:hover {
    color: #000;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}
.btn-outline-light:focus {
    box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
}
.btn-outline-light:active {
    color: #000;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}
.btn-outline-light:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
}
.btn-outline-light:disabled {
    color: #f8f9fa;
    background-color: transparent;
}
.btn-outline-dark {
    color: #212529;
    border-color: #212529;
}
.btn-outline-dark:hover {
    color: #fff;
    background-color: #212529;
    border-color: #212529;
}
.btn-outline-dark:focus {
    box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
}
.btn-outline-dark:active {
    color: #fff;
    background-color: #212529;
    border-color: #212529;
}
.btn-outline-dark:active:focus {
    box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
}
.btn-outline-dark:disabled {
    color: #212529;
    background-color: transparent;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
}

/*No box shadow*/
.btn {
    box-shadow: none !important;
}

`
export const globalStyles = css`
  #__next,
  .euiDataGrid__content {
    background: inherit;
  }

  html {
    background-color: unset;
    font-size: 16px;
  }

  body {
    background: #f6e2e7;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .container-padding-only {
    margin: 0 auto;
    padding: 0 12px;
  }

  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
  }

  .video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .page-card-wrapper {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-card-wrapper-large {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-content {
    min-height: calc(100vh);
  }

  .page-inner-content {
    min-height: calc(100vh - 48px);
  }

  .content {
    height: calc(100vh - 48px);
  }

  .euiHeader + * {
    padding-top: 48px;
  }

  .euiHeader + .home-container {
    padding-top: 68px;
  }

  .sidebar-height {
    height: calc(100vh - 48px - 2rem);
  }

  .table-height {
    height: calc(100vh - 48px - 2rem - 32px);
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollable-lt {
    max-height: 512px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  nav.euiCollapsibleNav,
  .euiOverlayMask {
    top: 48px;
  }
  .child-iframe-m-auto iframe {
    margin: auto !important;
  }
  .euiForm__errors {
    text-align: left;
    margin-bottom: 24px;
  }

  .primary-link {
    font-weight: 500;
    text-align: left;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    color: #006bb8;
    padding: 0;
    line-height: inherit;
    font-size: 12px;
  }

  .euiHeaderSectionItem {
    min-width: 0px;
  }

  .child-h-full > * {
    height: 100%;
  }
  .euiCollapsibleNavGroup__children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bg-cta {
    background-color: #0065f2 !important;
  }

  .cta-button {
    padding: 40px 16px;
    font-size: 20px;
    font-weight: 600;
  }

  .cta-button .euiButton__text {
    font-size: 20px;
    font-weight: 600;
  }
  .force-eui-primary,
  .landing .hide-section a,
  .landing .hide-section .euiLink {
    color: #006bb8 !important;
  }
  .text-m {
    color: inherit;
    clear: both;
    font-size: 1.1429rem;
    line-height: 1.7143rem;
  }

  .translucent {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal-dialog {
    width: 600px;
    overflow: hidden;
    border-radius: 0.375rem;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  }

  .modal-dialog__header {
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(234, 236, 242, var(--tw-border-opacity));
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    --tw-text-opacity: 1;
    color: rgba(220, 53, 69, var(--tw-text-opacity));
  }

  .modal-dialog__body {
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(234, 236, 242, var(--tw-border-opacity));
    padding: 1rem;
  }

  .modal-dialog__footer {
    padding: 1rem;
  }
  .modal-dialog__footer {
    display: flex;
    justify-content: flex-end;
  }
  .modal-dialog__body > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }

  .modal-dialog__footer > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  ${buttoncss}

  .menu-item {
    display: block;
    width: 100%;
  }
  .menu-item {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.25rem;
    --tw-text-opacity: 1;
    color: rgba(55, 65, 81, var(--tw-text-opacity));
  }

  .menu-item:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  }

  .center-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pointer {
    cursor: pointer;
  }

  .euiCheckbox .euiCheckbox__input {
    left: 0;
  }

  .remove-tabs-bottom-border .euiTabs--bottomBorder {
    box-shadow: none;
  }
  .euiAccordion legend:hover {
    text-decoration: none;
  }

  .filter-prompt > div {
    width: 768px;
  }

  img {
    border: none;
  }

  .row-label-auto .euiFormRow__labelWrapper  {
    width: auto;
  }
  `
