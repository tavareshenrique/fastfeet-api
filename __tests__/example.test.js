function soma(a, b) {
  return a + b;
}

test('should be 2 + 2 = 4', () => {
  const result = soma(2, 2);

  expect(result).toBe(4);
});
