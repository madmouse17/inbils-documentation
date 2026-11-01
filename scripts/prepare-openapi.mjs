// Prepares the OpenAPI file the reference pages are built from.
//
//   node scripts/prepare-openapi.mjs ../inbils
//
// The contract of the apps (docs/api/mobile-v1.openapi.json) is generated from the code, and its operations
// carry either no summary or a whole paragraph as the summary. starlight-openapi uses the summary as the page
// title and the sidebar label, so this script gives every operation a short title (below), and moves the
// original summary and description into the description, which the page prints. Nothing else changes.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (!process.argv[2]) {
  console.error('usage: node scripts/prepare-openapi.mjs <path to the application repository>');
  process.exit(1);
}
const spec = JSON.parse(
  readFileSync(join(resolve(process.argv[2]), 'docs/api/mobile-v1.openapi.json'), 'utf8'),
);

const titles = {
  'v1.auth.login': 'Sign in',
  'v1.auth.two-factor': 'Complete two-step sign-in',
  'v1.auth.forgot-password': 'Request a password reset',
  'v1.auth.token.refresh': 'Refresh the token',
  'v1.auth.logout': 'Sign out',
  'v1.me': 'Get the signed-in user',
  'v1.me.update': 'Update the profile',
  'v1.me.password': 'Change the password',
  'v1.me.device-token.store': 'Register a push token',
  'v1.me.device-token.destroy': 'Remove a push token',
  'v1.me.push-test': 'Send a test push',
  'v1.devices.index': 'List devices',
  'v1.devices.destroy': 'Revoke a device',
  'v1.notifications.index': 'List notifications',
  'v1.notifications.read-all': 'Mark all notifications as read',
  'v1.notifications.read': 'Mark a notification as read',
  'v1.media.show': 'Download a media file',
  'v1.customer.home-feed': 'Get the home feed',
  'v1.customer.profile': 'Get the customer profile',
  'v1.customer.announcements.show': 'Get an announcement',
  'v1.customer.promo-banners.tap': 'Record a promo banner tap',
  'v1.customer.invoices.index': 'List invoices',
  'v1.customer.invoices.show': 'Get an invoice',
  'v1.customer.invoices.pay': 'Pay an invoice',
  'v1.customer.invoices.receipt': 'Download a receipt',
  'v1.customer.payments.index': 'List payments',
  'v1.customer.subscriptions.index': 'List subscriptions',
  'v1.customer.subscriptions.show': 'Get a subscription',
  'v1.customer.subscriptions.connection': 'Get the connection status',
  'v1.customer.ticket-categories.index': 'List ticket categories',
  'v1.customer.tickets.index': 'List tickets',
  'v1.customer.tickets.store': 'Create a ticket',
  'v1.customer.tickets.show': 'Get a ticket',
  'v1.customer.tickets.confirmation': 'Rate a resolved ticket',
  'v1.customer.tickets.comments.store': 'Comment on a ticket',
  'v1.customer.tickets.attachments.store': 'Attach a file to a ticket',
  'v1.customer.tickets.attachments.destroy': 'Remove a ticket attachment',
  'v1.customer.work-orders.index': 'List technician visits',
  'v1.customer.work-orders.show': 'Get a technician visit',
  'v1.technician.my-work': 'Get my work',
  'v1.technician.products.index': 'List products',
  'v1.technician.warehouses.index': 'List warehouses',
  'v1.technician.inventory-requests.index': 'List item requests',
  'v1.technician.inventory-requests.store': 'Create an item request',
  'v1.technician.inventory-requests.cancel': 'Cancel an item request',
  'v1.technician.material-returns.index': 'List material returns',
  'v1.technician.material-returns.show': 'Get a material return',
  'v1.technician.material-returns.declare': 'Declare a material return',
  'v1.technician.tickets.show': 'Get a ticket',
  'v1.technician.tickets.start': 'Start a ticket',
  'v1.technician.tickets.resolve': 'Resolve a ticket',
  'v1.technician.tickets.comments.store': 'Comment on a ticket',
  'v1.technician.tickets.attachments.store': 'Attach a file to a ticket',
  'v1.technician.tickets.attachments.destroy': 'Remove a ticket attachment',
  'v1.technician.work-orders.show': 'Get a work order',
  'v1.technician.work-orders.start': 'Start a work order',
  'v1.technician.work-orders.en-route': 'Mark the technician on the way',
  'v1.technician.work-orders.submit': 'Submit a work order for review',
  'v1.technician.work-orders.evidence.store': 'Upload photo evidence',
  'v1.technician.work-orders.evidence.destroy': 'Delete photo evidence',
  'v1.technician.work-orders.items.store': 'Declare material used',
  'v1.technician.work-orders.items.destroy': 'Withdraw material used',
  'v1.technician.work-orders.network-credentials': 'Show the PPPoE login',
};

const methods = ['get', 'post', 'put', 'patch', 'delete'];
const operations = [];
for (const item of Object.values(spec.paths)) {
  for (const method of methods) if (item[method]) operations.push(item[method]);
}

const missing = operations.filter((op) => !titles[op.operationId]).map((op) => op.operationId);
if (missing.length) {
  console.error(`no title for: ${missing.join(', ')}`);
  process.exit(1);
}

// The same title in two roles ("Get a ticket" for customers and for technicians) gets the role in brackets.
const seen = new Map();
for (const op of operations)
  seen.set(titles[op.operationId], (seen.get(titles[op.operationId]) ?? 0) + 1);
for (const op of operations) {
  let title = titles[op.operationId];
  if (seen.get(title) > 1) title += ` (${op.operationId.split('.')[1]})`;
  const original = [op.summary, op.description].filter(Boolean).join('\n\n');
  op.summary = title;
  if (original) op.description = original;
  else delete op.description;
}

writeFileSync(join(root, 'src/data/mobile-v1.openapi.json'), `${JSON.stringify(spec, null, 2)}\n`);
console.log(`${operations.length} operations titled`);
