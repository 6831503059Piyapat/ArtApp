import assert from 'node:assert/strict';
import test from 'node:test';
import { matchesSalesRun } from '../../sales/OnGoing/search.ts';

const run = {
  isOwner: true,
  title: 'Nimman Artisan Weekend Pop-up',
  boothStaffList: ['@ploy_w'],
};

test('matches sales runs by title or assistant', () => {
  assert.equal(matchesSalesRun(run, 'nimman'), true);
  assert.equal(matchesSalesRun(run, 'PLOY'), true);
  assert.equal(matchesSalesRun(run, 'missing'), false);
});

test('shows every sales run for a blank query', () => {
  assert.equal(matchesSalesRun(run, '  '), true);
});

test('filters runs by ownership', () => {
  assert.equal(matchesSalesRun(run, '', 'Host Owned'), true);
  assert.equal(matchesSalesRun(run, '', 'Assistant In'), false);
  assert.equal(matchesSalesRun({ ...run, isOwner: false }, '', 'Assistant In'), true);
});
