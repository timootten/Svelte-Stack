
export async function compress(input: string) {
  const reader = new Blob([input]).stream().pipeThrough(new CompressionStream('gzip')).getReader();
  let buffer = '';
  for (; ;) {
    const { done, value } = await reader.read();
    if (done) {
      reader.releaseLock();
      return btoa(buffer).replaceAll('+', '-').replaceAll('/', '_');
    } else {
      for (let i = 0; i < value.length; i++) {
        // decoding as utf-8 will make btoa reject the string
        buffer += String.fromCharCode(value[i]);
      }
    }
  }
}

export async function decompress(input: string) {
  const decoded = atob(input.replaceAll('-', '+').replaceAll('_', '/'));
  // putting it directly into the blob gives a corrupted file
  const u8 = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    u8[i] = decoded.charCodeAt(i);
  }
  const stream = new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}

export function compressSync(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Simple RLE compression
  let compressed = [];
  let count = 1;
  for (let i = 1; i <= data.length; i++) {
    if (i < data.length && data[i] === data[i - 1]) {
      count++;
    } else {
      compressed.push(count, data[i - 1]);
      count = 1;
    }
  }

  // Convert to base64 and make URL-safe
  const base64 = btoa(String.fromCharCode.apply(null, compressed));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decompressSync(input: string) {
  // Reverse URL-safe base64
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const data = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  // Simple RLE decompression
  let decompressed = [];
  for (let i = 0; i < data.length; i += 2) {
    const count = data[i];
    const value = data[i + 1];
    for (let j = 0; j < count; j++) {
      decompressed.push(value);
    }
  }

  // Convert back to string
  const decoder = new TextDecoder();
  return decoder.decode(new Uint8Array(decompressed));
}