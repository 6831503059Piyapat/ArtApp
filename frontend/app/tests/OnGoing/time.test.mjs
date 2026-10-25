import assert from 'node:assert/strict';
import test from 'node:test';
import { getRunTiming } from '../../sales/OnGoing/time.ts';

test('calculates booth timing from backend timestamps', () => {
  assert.deepEqual(
    getRunTiming('2026-10-24T00:00:00Z', '2026-10-31T00:00:00Z', Date.parse('2026-10-25T04:00:00Z')),
    {
      elapsed: '1d 4h',
      remaining: '5d 20h remaining of 7d max',
      progress: 16.666666666666664,
    },
  );
});

test('rejects an invalid schedule', () => {
  assert.deepEqual(getRunTiming('invalid', '2026-10-31T00:00:00Z', Date.now()), {
    elapsed: '--',
    remaining: 'Invalid schedule',
    progress: 0,
  });
});
