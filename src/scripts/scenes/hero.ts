import { startNetwork } from '../network';

/** The drawing behind the hero (network.ts). */
export default function mount(host: HTMLElement): void {
  const canvas = host.querySelector('canvas');
  if (canvas) startNetwork(host, canvas);
}
