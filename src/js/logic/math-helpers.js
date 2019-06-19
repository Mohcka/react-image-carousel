// negative proof modulo
export default (n, m) => {
    return ((n % m) + m) % m;
  };