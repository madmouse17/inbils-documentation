---
title: "Domain .test lokal"
description: "Proxy dev HTTPS opsional yang menyajikan Sail dan stack bergaya deploy di inbils.test dan deploy.inbils.test, dengan langkah host sekali jalan dan batasannya."
---

Secara default Inbils menjawab di `http://localhost` (Sail) dan `http://localhost:8080` (stack bergaya produksi). Proxy pengembangan opsional memberi keduanya nama dengan HTTPS. Proxy ini hanya untuk pengembangan.

## Yang Anda dapatkan

`docker/devproxy/compose.yaml` menambahkan dua container:

| Alamat | Menuju |
| --- | --- |
| <https://inbils.test> | Sail (`laravel.test:80`) |
| <https://deploy.inbils.test> | stack 8080 (`app:8080`) |

- `caddy`: HTTPS di `127.0.0.1:443`, dengan sertifikat dari certificate authority lokalnya sendiri. Port 80 tetap milik Sail, jadi tidak ada redirect HTTP.
- `dns`: dnsmasq di `127.0.0.2:53`. Ia menjawab setiap nama `*.test` dengan `127.0.0.1` dan tidak lebih.

Container `caddy` bergabung ke network Sail dan deploy sebagai external network, jadi jalankan Sail dan stack 8080 lebih dulu. Lalu jalankan proxy:

```bash
DOCKER_CONTEXT=default docker compose -f docker/devproxy/compose.yaml up -d --build
```

## Langkah host sekali jalan

Langkah berikut berbentuk ringkasan. Perintah lengkap, termasuk varian tanpa NetworkManager dan impor Firefox, ada di `docs/operations/DOCKER.md` di repositori, bagian "Local `*.test` domains".

1. **Arahkan lookup `.test` ke container `dns`.** Pada desktop dengan NetworkManager, tambahkan interface dummy yang membawa DNS server `127.0.0.2` dan search domain `~test`. systemd-resolved lalu hanya mengarahkan `*.test` ke sana; nama lain tetap memakai resolver biasa. Periksa dengan `resolvectl query inbils.test`, yang harus menjawab `127.0.0.1`.
2. **Percayai certificate authority lokal.** Salin `root.crt` dari container `caddy` (`/data/caddy/pki/authorities/local/root.crt`) dan tambahkan ke NSS store yang dibaca Chrome dan Brave di Linux, lalu restart browser. Alat command-line seperti `curl` juga memerlukan certificate store sistem. Firefox menyimpan daftarnya sendiri.

:::caution
Authority lokal dapat menandatangani sertifikat untuk nama apa pun, dan kuncinya ada di volume `caddy_data`. Jangan pernah menyalin volume itu keluar dari mesin Anda. Pertahankan volume tersebut, atau setiap browser harus mempercayai authority baru.
:::

Browser yang secure DNS-nya diset ke provider tetap (Google, Cloudflare) melewati resolver lokal. Setel ke penyedia layanan saat ini, atau matikan.

## Proxy tepercaya

Isi `TRUSTED_PROXIES=172.16.0.0/12` (network Docker) di `.env` dan `.env.docker`; file contohnya membiarkannya kosong. Ini menjaga skema `https` di belakang Caddy. Tanpa itu halaman memuat asetnya lewat `http` dan browser memblokirnya, yang tampak sebagai halaman tanpa gaya. Di server sungguhan, sebutkan proxy yang sebenarnya.

`APP_URL` tetap `http://localhost` dan `http://localhost:8080`, jadi tautan email dan queue, suite E2E, dan health check tidak berubah. Sail berjalan dengan `APP_ENV=local`, yang tidak memeriksa host oleh Laravel. Stack 8080 baru begitu jika Anda mengisinya di `.env.docker`; file contohnya memakai `production`. Stack yang diganti ke `production` harus memakai nama `.test` sebagai `APP_URL`, atau pemeriksaan host menolaknya.

## Batasan

- **Vite HMR tidak berfungsi di belakang proxy HTTPS.** `npm run dev` melayani `http://localhost:5173`, dan browser memblokir script HTTP biasa itu pada halaman HTTPS. Pakai <http://localhost> untuk HMR, atau jalankan `npm run build`.
- Emulator Android tidak dapat me-resolve `*.test`, jadi aplikasi mobile tetap memakai `10.0.2.2`.
- Jika alamat `*.test` menjawab 502 setelah Sail atau stack 8080 di-down lalu di-up lagi, pasang ulang proxy:

```bash
DOCKER_CONTEXT=default docker compose -f docker/devproxy/compose.yaml up -d --force-recreate
```

Untuk menghapus proxy, jalankan `docker compose -f docker/devproxy/compose.yaml down`, hapus koneksi NetworkManager `inbils-dns`, dan hapus entri "Inbils local CA" dari NSS store.
