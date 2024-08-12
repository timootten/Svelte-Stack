

export async function load({ locals, request, setHeaders, depends }) {
  depends("current:page")

  console.log("Called page test3");

  return {
clock: new Date().toLocaleString('de-de'),
    x: {
       takesLong: { done: new Date().toLocaleString('de-de')}
    }
  };
}