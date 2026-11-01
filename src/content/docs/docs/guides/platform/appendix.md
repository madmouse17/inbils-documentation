---
title: "13. Appendix"
description: "Quick reference tables for the operator panel: which sensitive actions need confirmation, the key limits and time periods, and a glossary of terms."
---

## 13.1 Confirming sensitive actions


| Action | Reason | Type the company code | Operator password |
| --- | --- | --- | --- |
| Suspend tenant | Yes | Yes | Yes |
| Reactivate | Yes | No | No |
| Request deletion | No | Yes | Yes |
| Request export | No | Yes | Yes |
| Sign in as user | Yes | No | Yes |
| Turn on edit mode | No | Yes | If the confirmation is older than 5 minutes |
| Return to read mode | No | No | No |
| Release sign-in lock | No | No | No |
| Reset user 2FA | No | No | Yes |
| Resend invitation | No | No | No |
| Create, edit or delete a role template; repair a company role | No | No | Yes |
| Generate new operator recovery codes | No | No | Yes |
| Add subsidiary | No | No | No |
| Create company | No | No | No |
| Create subsidiary from a tenant request | No | No | No |
| Reject subsidiary request | Yes | No | Yes |

"Yes" in the **Kata sandi operator** (Operator password) column means the dialog asks for the password only if the last confirmation is older than 5 minutes ([section 2.5](/docs/guides/platform/sign-in-and-account-security/)).


## 13.2 Important limits


| Limit | Value |
| --- | --- |
| Operator session without activity | 30 minutes |
| Support access session | at most 30 minutes from the start |
| Operator password confirmation | 5 minutes, valid for all sensitive actions |
| Sign-in waiting for the 2FA code | 10 minutes |
| TOTP code | changes every 30 seconds, single use |
| New recovery codes | 8 codes, each single use |
| Reason for an action | 5 to 200 characters |
| Admin invitation link | 60 minutes |
| Invitation resend | 6 times per minute per user |
| Suspension before a deletion request | 30 days |
| Export archive ready to download | 24 hours from completion |
| Export build considered stuck | 2 hours |
| Failed jobs on the tenant page | 7 days summary, 30 days full |
| Platform and support audit | 730 days |


## 13.3 Terms


| Term | Meaning |
| --- | --- |
| 2FA | Two-step authentication: password plus an authenticator code or recovery code. |
| Support access | A session in which the operator signs in as a tenant user to check that user's screens and permissions. |
| Company admin | A tenant user who holds the `roles.manage` permission in their home company, usually through the Admin role. Not a platform operator. |
| Subsidiary | A company one level below the parent company. Data stays separate. |
| Platform audit | The internal log of operators and support access across the whole installation. |
| Head | The top parent company of one tenant. |
| Initial fill | The choice between Starter catalogue and Empty when a company is created. |
| Starter catalogue | Standard master data without stock and network assets. |
| Company code | The fixed code that confirms sensitive actions. It must be typed exactly; two companies cannot use codes that differ only in letter case. |
| Recovery code | A single-use code for signing in when the authenticator app is not available. |
| Read mode | The starting mode of support access, which refuses changes. |
| Edit mode | The support access mode that allows changes according to the target's permissions. |
| Platform operator | A separate account in `platform_admins` that manages the whole installation. |
| Deletion request | A marker that the tenant is ready to be purged once the requirements are met. It does not delete data from the web app. |
| Subsidiary request | A request from the parent company admin for the operator to create a subsidiary. It stays open until the operator creates the subsidiary or rejects it. A tenant has only one open request. |
| Role template | A starting role copied to new companies when they are created. Changing it does not change existing companies. |
| Platform queue | The dedicated queue for sample data and tenant exports. |
| Purge | Permanent deletion of a tenant through the server console. |
| Step-up | Re-confirmation of the operator password for sensitive actions. It is valid for 5 minutes and shared by all dialogs. |
| Tenant | One parent company together with its subsidiaries. |
| Admin invitation | An email with a 60-minute link so the first admin can set a password. |
