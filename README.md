# agent-cost-policy

Cost governance middleware. Per-session caps, auto-downgrade model tiers.

```typescript
import { CostPolicy } from "agent-cost-policy";
const cp = new CostPolicy({ sessionBudget: 1, downgradeChain: ["gpt-4o", "gpt-4o-mini"] });
cp.record("gpt-4o", 5000); // cost ~$0.0625
cp.activeModel(); // "gpt-4o" if still under budget
```

MIT
