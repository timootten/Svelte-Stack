

export async function load({ locals, request, setHeaders, depends }) {
  depends("x:x")

  console.log("Called page");

  return {
clock: new Date().toLocaleString('de-de'),
    x: {
       takesLong: { done: new Date().toLocaleString('de-de')}
    }
  };
}