export const labData = Array.from({ length: 5 }, (_, tableIndex) => ({
  table: tableIndex + 1,
  pcs: Array.from({ length: 4 }, (_, pcIndex) => ({
    pc: pcIndex + 1,
    components: {
      cpu: { working: true, available: true },
      monitor: { working: true, available: true },
      keyboard: { working: true, available: true },
      mouse: { working: true, available: true },
    },
  })),
}));
