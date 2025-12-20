import * as vitest from 'vitest';
// Provide the 'jest' global for backward compatibility
(globalThis as any).jest = vitest.vi;
(globalThis as any).vi = vitest.vi;

import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed();
