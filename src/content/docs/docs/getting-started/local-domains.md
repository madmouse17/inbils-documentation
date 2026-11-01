---
title: "Local .test domains"
description: "Optional HTTPS dev proxy that serves Sail and the deploy-like stack at inbils.test and deploy.inbils.test, with the one-time host steps and known limits."
---

By default Inbils answers on `http://localhost` (Sail) and `http://localhost:8080` (the production-style stack). An optional development proxy gives both a name with HTTPS. It is for development only.

## What you get

`docker/devproxy/compose.yaml` adds two containers:

| Address | Goes to |
| --- | --- |
| <https://inbils.test> | Sail (`laravel.test:80`) |
| <https://deploy.inbils.test> | the 8080 stack (`app:8080`) |

- `caddy`: HTTPS on `127.0.0.1:443`, with certificates from its own local certificate authority. Port 80 stays with Sail, so there is no HTTP redirect.
- `dns`: dnsmasq on `127.0.0.2:53`. It answers every `*.test` name with `127.0.0.1` and nothing else.

Both containers join the Sail and deploy networks as external networks, so start Sail and the 8080 stack first. Then start the proxy:

```bash
DOCKER_CONTEXT=default docker compose -f docker/devproxy/compose.yaml up -d --build
```

## One-time host steps

These steps are in summary form. The full commands, including the variant without NetworkManager and the Firefox import, are in `docs/operations/DOCKER.md` in the repository, section "Local `*.test` domains".

1. **Send `.test` lookups to the `dns` container.** On a desktop with NetworkManager, add a dummy interface that carries the DNS server `127.0.0.2` and the search domain `~test`. systemd-resolved then routes only `*.test` there; every other name keeps the normal resolver. Check with `resolvectl query inbils.test`, which must answer `127.0.0.1`.
2. **Trust the local certificate authority.** Copy `root.crt` out of the `caddy` container (`/data/caddy/pki/authorities/local/root.crt`) and add it to the NSS store that Chrome and Brave read on Linux, then restart the browser. Command-line tools such as `curl` need the system certificate store too. Firefox keeps its own list.

:::caution
The local authority can sign a certificate for any name, and its key is in the `caddy_data` volume. Never copy that volume off your machine. Keep the volume, or every browser must trust a new authority.
:::

A browser whose secure DNS is set to a fixed provider (Google, Cloudflare) skips the local resolver. Set it to the current service provider, or turn it off.

## Trusted proxies

Both `.env` and `.env.docker` set `TRUSTED_PROXIES=172.16.0.0/12` (the Docker networks). This keeps the `https` scheme behind Caddy. Without it the page loads its assets over `http` and the browser blocks them, which shows as a page without styles. On a real server, name the real proxy instead.

`APP_URL` stays `http://localhost` and `http://localhost:8080`, so mail and queued links, the E2E suite and the health checks do not change. Both stacks run with `APP_ENV=local`, where Laravel does not check the host. A stack switched to `production` must get the `.test` name as its `APP_URL`, or the host check refuses it.

## Limits

- **Vite HMR does not work behind the HTTPS proxy.** `npm run dev` serves `http://localhost:5173`, and the browser blocks that plain-HTTP script on an HTTPS page. Use <http://localhost> for HMR, or run `npm run build`.
- The Android emulator cannot resolve `*.test`, so the mobile apps keep `10.0.2.2`.
- If a `*.test` address answers 502 after Sail or the 8080 stack was taken down and up again, reattach the proxy:

```bash
DOCKER_CONTEXT=default docker compose -f docker/devproxy/compose.yaml up -d --force-recreate
```

To remove the proxy, run `docker compose -f docker/devproxy/compose.yaml down`, delete the NetworkManager connection `inbils-dns` and remove the "Inbils local CA" entry from the NSS store.
