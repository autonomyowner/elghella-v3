export let navigate = (
  _p0?: string,
  _p1?: { state: { redirectUrl: string } }
) => {};

export const setNavigate = (fn: () => void) => {
  navigate = fn;
};
