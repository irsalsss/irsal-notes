# @repo/utils

Shared utility functions for the monorepo.

## Usage

```typescript
import { getInitials } from '@repo/utils';
// or
import { getInitials } from '@repo/utils/get-initials';
```

## Available Utilities

### `getInitials`

Extracts initials from a name string.

```typescript
getInitials('John Doe'); // 'JD'
getInitials('John'); // 'J'
getInitials(''); // null
getInitials(undefined); // null
```

